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

  async delete<TData>(path: string, accessToken?: string): Promise<TData> {
    return request<TData>({
      method: "DELETE",
      path,
      accessToken,
    });
  },
} as const;

type ApiRequest = {
  method: "DELETE" | "GET" | "POST";
  path: string;
  accessToken?: string;
  body?: object;
};

function createUrl(path: string) {
  const baseUrl = apiClient.baseUrl.replace(/\/$/, "");
  return `${baseUrl}${apiClient.basePath}${path}`;
}

async function request<TData>({
  method,
  path,
  accessToken,
  body,
}: ApiRequest): Promise<TData> {
  const response = await fetch(createUrl(path), {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  const result = (await response.json()) as ApiResponse<TData>;

  if (!result.success) {
    throw new Error(result.message || result.error_code);
  }

  return result.data;
}
