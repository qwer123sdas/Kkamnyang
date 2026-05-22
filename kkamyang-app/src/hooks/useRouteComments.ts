import { useCallback, useEffect, useState } from "react";

import { commentService } from "../services/commentService";
import type { RouteComment } from "../types/route";
import { useAuth } from "./useAuth";

const COMMENT_PAGE_SIZE = 20;

export function useRouteComments(routeId: number | null) {
  const { session } = useAuth();
  const [comments, setComments] = useState<RouteComment[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [hasNext, setHasNext] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);

  const loadPage = useCallback(
    async (nextPage: number, replace = false) => {
      if (!routeId) {
        setComments([]);
        return;
      }

      setIsLoading(true);
      setErrorMessage(null);

      try {
        const result = await commentService.getComments(routeId, {
          page: nextPage,
          size: COMMENT_PAGE_SIZE,
        });

        setComments((currentComments) =>
          replace ? result.items : [...currentComments, ...result.items],
        );
        setHasNext(result.has_next);
        setPage(result.page);
      } catch (error) {
        setErrorMessage(
          error instanceof Error ? error.message : "COMMENTS_LOAD_FAILED",
        );
      } finally {
        setIsLoading(false);
      }
    },
    [routeId],
  );

  const refresh = useCallback(async () => {
    await loadPage(1, true);
  }, [loadPage]);

  const loadMore = useCallback(async () => {
    if (isLoading || !hasNext) {
      return;
    }

    await loadPage(page + 1);
  }, [hasNext, isLoading, loadPage, page]);

  const createComment = useCallback(
    async (content: string) => {
      if (!session) {
        setErrorMessage("AUTH_REQUIRED");
        return false;
      }

      if (!routeId) {
        setErrorMessage("ROUTE_ID_REQUIRED");
        return false;
      }

      const nextContent = content.trim();

      if (!nextContent) {
        setErrorMessage("COMMENT_CONTENT_REQUIRED");
        return false;
      }

      setIsCreating(true);
      setErrorMessage(null);

      try {
        await commentService.createComment(
          routeId,
          { content: nextContent },
          session.access_token,
        );
        await refresh();
        return true;
      } catch (error) {
        setErrorMessage(
          error instanceof Error ? error.message : "COMMENT_CREATE_FAILED",
        );
        return false;
      } finally {
        setIsCreating(false);
      }
    },
    [refresh, routeId, session],
  );

  useEffect(() => {
    void refresh();
  }, [refresh]);

  return {
    comments,
    createComment,
    errorMessage,
    hasNext,
    isCreating,
    isLoading,
    loadMore,
    page,
    refresh,
  };
}
