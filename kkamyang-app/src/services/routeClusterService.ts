import type { RouteClusterResponse } from "../types/route";
import { apiClient } from "./apiClient";

export const routeClusterService = {
  async getSimilarRoutes(routeId: number): Promise<RouteClusterResponse> {
    return apiClient.get<RouteClusterResponse>(`/routes/${routeId}/similar`);
  },
};
