import { env } from "../config/env";
import { API_BASE_PATH } from "../constants/api";
import type { ApiResponse } from "../types/api";

export const apiClient = {
  baseUrl: env.apiBaseUrl,
  basePath: API_BASE_PATH,

  async get<TData>(path: string, accessToken?: string): Promise<TData> {
    return request<TData>({
      method: "GET",
      path,
      accessToken,
    });
  },

  async post<TData, TBody extends object>(
    path: string,
    body: TBody,
    accessToken?: string,
  ): Promise<TData> {
    return request<TData>({
      method: "POST",
      path,
      body,
      accessToken,
    });
  },

  async patch<TData, TBody extends object>(
    path: string,
    body: TBody,
    accessToken?: string,
  ): Promise<TData> {
    return request<TData>({
      method: "PATCH",
      path,
      body,
      accessToken,
    });
  },

  async delete<TData>(path: string, accessToken?: string): Promise<TData> {
    return request<TData>({
      method: "DELETE",
      path,
      accessToken,
    });
  },
} as const;

type ApiRequest = {
  method: "DELETE" | "GET" | "PATCH" | "POST";
  path: string;
  accessToken?: string;
  body?: object;
};

function createUrl(path: string) {
  const baseUrl = apiClient.baseUrl.replace(/\/$/, "");

  if (!baseUrl) {
    throw new Error("API_BASE_URL_NOT_CONFIGURED");
  }

  return `${baseUrl}${apiClient.basePath}${path}`;
}

function createTargetLog(url: string) {
  try {
    const parsedUrl = new URL(url);
    const hostKind =
      parsedUrl.hostname === "localhost" ||
      parsedUrl.hostname === "127.0.0.1" ||
      parsedUrl.hostname === "0.0.0.0"
        ? "LOCALHOST_OR_LOOPBACK"
        : /^\d+\.\d+\.\d+\.\d+$/.test(parsedUrl.hostname)
          ? "IP_ADDRESS"
          : "HOSTNAME";

    return {
      protocol: parsedUrl.protocol || "NOT_SET",
      host: parsedUrl.hostname ? "SET" : "NOT_SET",
      hostKind,
      port: parsedUrl.port ? "SET" : "NOT_SET",
      pathname: parsedUrl.pathname || "NOT_SET",
    };
  } catch {
    return {
      protocol: "INVALID_URL",
      host: "NOT_SET",
      hostKind: "INVALID_URL",
      port: "NOT_SET",
      pathname: "INVALID_URL",
    };
  }
}

async function request<TData>({
  method,
  path,
  accessToken,
  body,
}: ApiRequest): Promise<TData> {
  const url = createUrl(path);

  console.log("[API] request start", method, path);
  console.log("[API] authorization exists", Boolean(accessToken));
  console.log("[API] target", createTargetLog(url));

  let response: Response;

  try {
    response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
      },
      body: body ? JSON.stringify(body) : undefined,
    });
  } catch (error) {
    console.log(
      "[API] fetch error",
      method,
      path,
      error instanceof Error ? error.name : "UNKNOWN_ERROR",
      error instanceof Error ? error.message : "NETWORK_ERROR",
    );
    throw error;
  }

  console.log("[API] response status", method, path, response.status);

  const result = (await response.json()) as ApiResponse<TData>;

  console.log("[API] response success", method, path, result.success);

  if (!result.success) {
    console.log("[API] response error", method, path, result.error_code, result.message);
    throw new Error(result.message || result.error_code);
  }

  return result.data;
}
