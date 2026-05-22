import type { RouteHistoryResponse } from "../types/route";
import { apiClient } from "./apiClient";

type RouteHistoryParams = {
  page: number;
  size: number;
};

const DEFAULT_ROUTE_HISTORY_PARAMS: RouteHistoryParams = {
  page: 1,
  size: 20,
};

function createRouteHistoryPath(routeId: number, params: RouteHistoryParams) {
  const searchParams = new URLSearchParams({
    page: String(params.page),
    size: String(params.size),
  });

  return `/routes/${routeId}/history?${searchParams.toString()}`;
}

export const routeHistoryService = {
  async getHistory(
    routeId: number,
    params: Partial<RouteHistoryParams> = {},
  ): Promise<RouteHistoryResponse> {
    return apiClient.get<RouteHistoryResponse>(
      createRouteHistoryPath(routeId, {
        ...DEFAULT_ROUTE_HISTORY_PARAMS,
        ...params,
      }),
    );
  },
};
