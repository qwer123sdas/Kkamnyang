import type { BookmarksResponse, RouteBookmarkResponse } from "../types/route";
import { apiClient } from "./apiClient";

type BookmarkListParams = {
  page: number;
  size: number;
};

const DEFAULT_BOOKMARK_LIST_PARAMS: BookmarkListParams = {
  page: 1,
  size: 20,
};

function createBookmarksPath(params: BookmarkListParams) {
  const searchParams = new URLSearchParams({
    page: String(params.page),
    size: String(params.size),
  });

  return `/bookmarks/me?${searchParams.toString()}`;
}

export const bookmarkService = {
  async getBookmarks(
    params: Partial<BookmarkListParams> = {},
    accessToken: string,
  ): Promise<BookmarksResponse> {
    return apiClient.get<BookmarksResponse>(
      createBookmarksPath({
        ...DEFAULT_BOOKMARK_LIST_PARAMS,
        ...params,
      }),
      accessToken,
    );
  },

  async bookmark(
    routeId: number,
    accessToken: string,
  ): Promise<RouteBookmarkResponse> {
    return apiClient.post<RouteBookmarkResponse, object>(
      `/routes/${routeId}/bookmark`,
      {},
      accessToken,
    );
  },

  async unbookmark(
    routeId: number,
    accessToken: string,
  ): Promise<RouteBookmarkResponse> {
    return apiClient.delete<RouteBookmarkResponse>(
      `/routes/${routeId}/bookmark`,
      accessToken,
    );
  },
};
