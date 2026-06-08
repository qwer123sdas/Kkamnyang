import { useCallback, useEffect, useState } from "react";

import { commentService } from "../services/commentService";
import { authService } from "../services/authService";
import type { RouteComment } from "../types/route";

const COMMENT_PAGE_SIZE = 20;

export function useRouteComments(routeId: number | null) {
  const [comments, setComments] = useState<RouteComment[]>([]);
  const [content, setContent] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [hasNext, setHasNext] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [page, setPage] = useState(1);
  const [selectedCommentId, setSelectedCommentId] = useState<number | null>(null);

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

  const saveComment = useCallback(
    async () => {
      const session = await authService.getSession();

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

      setIsSaving(true);
      setErrorMessage(null);

      try {
        if (selectedCommentId) {
          await commentService.updateComment(
            routeId,
            selectedCommentId,
            { content: nextContent },
            session.access_token,
          );
        } else {
          await commentService.createComment(
            routeId,
            { content: nextContent },
            session.access_token,
          );
        }
        await refresh();
        setContent("");
        setSelectedCommentId(null);
        return true;
      } catch (error) {
        setErrorMessage(
          error instanceof Error ? error.message : "COMMENT_SAVE_FAILED",
        );
        return false;
      } finally {
        setIsSaving(false);
      }
    },
    [content, refresh, routeId, selectedCommentId],
  );

  const deleteSelectedComment = useCallback(async () => {
    if (!selectedCommentId) {
      setContent("");
      return false;
    }

    const session = await authService.getSession();

    if (!session) {
      setErrorMessage("AUTH_REQUIRED");
      return false;
    }

    if (!routeId) {
      setErrorMessage("ROUTE_ID_REQUIRED");
      return false;
    }

    setIsDeleting(true);
    setErrorMessage(null);

    try {
      await commentService.deleteComment(
        routeId,
        selectedCommentId,
        session.access_token,
      );
      await refresh();
      setContent("");
      setSelectedCommentId(null);
      return true;
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "COMMENT_DELETE_FAILED",
      );
      return false;
    } finally {
      setIsDeleting(false);
    }
  }, [refresh, routeId, selectedCommentId]);

  const selectComment = useCallback((comment: RouteComment) => {
    setSelectedCommentId(comment.comment_id);
    setContent(comment.content);
  }, []);

  const clearDraft = useCallback(() => {
    setContent("");
    setSelectedCommentId(null);
    setErrorMessage(null);
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  return {
    clearDraft,
    comments,
    content,
    deleteSelectedComment,
    errorMessage,
    hasNext,
    isDeleting,
    isLoading,
    isSaving,
    loadMore,
    page,
    refresh,
    saveComment,
    selectedCommentId,
    selectComment,
    setContent,
  };
}
