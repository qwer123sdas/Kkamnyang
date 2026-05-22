import type { RouteLikeResponse } from "../types/route";
import { apiClient } from "./apiClient";

export const likeService = {
  async like(routeId: number, accessToken: string): Promise<RouteLikeResponse> {
    return apiClient.post<RouteLikeResponse, object>(
      `/routes/${routeId}/like`,
      {},
      accessToken,
    );
  },

  async unlike(routeId: number, accessToken: string): Promise<RouteLikeResponse> {
    return apiClient.delete<RouteLikeResponse>(
      `/routes/${routeId}/like`,
      accessToken,
    );
  },
};
