import { ACTIVITY_TYPES } from "../constants/activity";
import type {
  MyRoutesResponse,
  RouteDetail,
  RouteFeedParams,
  RouteFeedResponse,
} from "../types/route";
import { apiClient } from "./apiClient";

const DEFAULT_ROUTE_FEED_PARAMS: RouteFeedParams = {
  page: 1,
  size: 20,
  activity_type: ACTIVITY_TYPES.RUN,
};

function createRouteFeedPath(params: RouteFeedParams) {
  const searchParams = new URLSearchParams({
    page: String(params.page),
    size: String(params.size),
    activity_type: params.activity_type,
  });

  return `/routes/feed?${searchParams.toString()}`;
}

function createMyRoutesPath(params: Pick<RouteFeedParams, "page" | "size">) {
  const searchParams = new URLSearchParams({
    page: String(params.page),
    size: String(params.size),
  });

  return `/routes/me?${searchParams.toString()}`;
}

export const routeService = {
  async getFeed(
    params: Partial<RouteFeedParams> = {},
  ): Promise<RouteFeedResponse> {
    return apiClient.get<RouteFeedResponse>(
      createRouteFeedPath({
        ...DEFAULT_ROUTE_FEED_PARAMS,
        ...params,
        activity_type: ACTIVITY_TYPES.RUN,
      }),
    );
  },

  async getDetail(routeId: number): Promise<RouteDetail> {
    return apiClient.get<RouteDetail>(`/routes/${routeId}`);
  },

  async getMyRoutes(
    params: Partial<Pick<RouteFeedParams, "page" | "size">> = {},
    accessToken: string,
  ): Promise<MyRoutesResponse> {
    return apiClient.get<MyRoutesResponse>(
      createMyRoutesPath({
        page: DEFAULT_ROUTE_FEED_PARAMS.page,
        size: DEFAULT_ROUTE_FEED_PARAMS.size,
        ...params,
      }),
      accessToken,
    );
  },
};
