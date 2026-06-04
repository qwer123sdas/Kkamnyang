import { useCallback, useState } from "react";

import { authService } from "../services/authService";
import { commentService } from "../services/commentService";
import type { RouteComment } from "../types/route";

const COMMENT_PAGE_SIZE = 20;

export function useFeedQaComments() {
  const [comments, setComments] = useState<RouteComment[]>([]);
  const [content, setContent] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedCommentId, setSelectedCommentId] = useState<number | null>(null);

  const selectComment = useCallback((comment: RouteComment) => {
    setSelectedCommentId(comment.comment_id);
    setContent(comment.content);
  }, []);

  const clearDraft = useCallback(() => {
    setSelectedCommentId(null);
    setContent("");
  }, []);

  const load = useCallback(async (routeId: number) => {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const result = await commentService.getComments(routeId, {
        page: 1,
        size: COMMENT_PAGE_SIZE,
      });
      setComments(result.items);
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "COMMENTS_LOAD_FAILED",
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  const open = useCallback(
    async (routeId: number) => {
      setIsVisible(true);
      clearDraft();
      await load(routeId);
    },
    [clearDraft, load],
  );

  const save = useCallback(
    async (routeId: number) => {
      const nextContent = content.trim();

      if (!nextContent) {
        setErrorMessage("COMMENT_CONTENT_REQUIRED");
        return;
      }

      setIsSaving(true);
      setErrorMessage(null);

      try {
        const session = await authService.getSession();

        if (!session) {
          setErrorMessage("AUTH_REQUIRED");
          return;
        }

        const savedComment = selectedCommentId
          ? await commentService.updateComment(
              routeId,
              selectedCommentId,
              { content: nextContent },
              session.access_token,
            )
          : await commentService.createComment(
              routeId,
              { content: nextContent },
              session.access_token,
            );

        await load(routeId);
        setSelectedCommentId(savedComment.comment_id);
        setContent(savedComment.content);
      } catch (error) {
        setErrorMessage(
          error instanceof Error ? error.message : "COMMENT_SAVE_FAILED",
        );
      } finally {
        setIsSaving(false);
      }
    },
    [content, load, selectedCommentId],
  );

  const deleteSelected = useCallback(
    async (routeId: number) => {
      if (!selectedCommentId) {
        clearDraft();
        return;
      }

      setIsDeleting(true);
      setErrorMessage(null);

      try {
        const session = await authService.getSession();

        if (!session) {
          setErrorMessage("AUTH_REQUIRED");
          return;
        }

        await commentService.deleteComment(
          routeId,
          selectedCommentId,
          session.access_token,
        );
        clearDraft();
        await load(routeId);
      } catch (error) {
        setErrorMessage(
          error instanceof Error ? error.message : "COMMENT_DELETE_FAILED",
        );
      } finally {
        setIsDeleting(false);
      }
    },
    [clearDraft, load, selectedCommentId],
  );

  return {
    clearDraft,
    comments,
    content,
    deleteSelected,
    errorMessage,
    isDeleting,
    isLoading,
    isSaving,
    isVisible,
    open,
    save,
    selectComment,
    selectedCommentId,
    setContent,
  };
}
