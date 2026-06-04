import type {
  RouteCommentCreateRequest,
  RouteCommentCreateResponse,
  RouteCommentDeleteResponse,
  RouteCommentUpdateRequest,
  RouteCommentUpdateResponse,
  RouteCommentsResponse,
} from "../types/route";
import { apiClient } from "./apiClient";

type CommentListParams = {
  page: number;
  size: number;
};

const DEFAULT_COMMENT_LIST_PARAMS: CommentListParams = {
  page: 1,
  size: 20,
};

function createCommentsPath(routeId: number, params: CommentListParams) {
  const searchParams = new URLSearchParams({
    page: String(params.page),
    size: String(params.size),
  });

  return `/routes/${routeId}/comments?${searchParams.toString()}`;
}

export const commentService = {
  async getComments(
    routeId: number,
    params: Partial<CommentListParams> = {},
  ): Promise<RouteCommentsResponse> {
    return apiClient.get<RouteCommentsResponse>(
      createCommentsPath(routeId, {
        ...DEFAULT_COMMENT_LIST_PARAMS,
        ...params,
      }),
    );
  },

  async createComment(
    routeId: number,
    body: RouteCommentCreateRequest,
    accessToken: string,
  ): Promise<RouteCommentCreateResponse> {
    return apiClient.post<RouteCommentCreateResponse, RouteCommentCreateRequest>(
      `/routes/${routeId}/comments`,
      body,
      accessToken,
    );
  },

  async updateComment(
    routeId: number,
    commentId: number,
    body: RouteCommentUpdateRequest,
    accessToken: string,
  ): Promise<RouteCommentUpdateResponse> {
    return apiClient.patch<RouteCommentUpdateResponse, RouteCommentUpdateRequest>(
      `/routes/${routeId}/comments/${commentId}`,
      body,
      accessToken,
    );
  },

  async deleteComment(
    routeId: number,
    commentId: number,
    accessToken: string,
  ): Promise<RouteCommentDeleteResponse> {
    return apiClient.delete<RouteCommentDeleteResponse>(
      `/routes/${routeId}/comments/${commentId}`,
      accessToken,
    );
  },
};
