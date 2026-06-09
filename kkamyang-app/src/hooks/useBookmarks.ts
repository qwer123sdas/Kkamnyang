import { useCallback, useEffect, useState } from "react";

import { bookmarkService } from "../services/bookmarkService";
import { authService } from "../services/authService";
import type { BookmarkRouteItem } from "../types/route";

const BOOKMARK_PAGE_SIZE = 20;

export function useBookmarks() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [hasNext, setHasNext] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [items, setItems] = useState<BookmarkRouteItem[]>([]);
  const [page, setPage] = useState(1);

  const loadPage = useCallback(
    async (nextPage: number, replace = false) => {
      const session = await authService.getSession();

      if (!session) {
        setItems([]);
        setErrorMessage("AUTH_REQUIRED");
        return;
      }

      setErrorMessage(null);

      if (replace) {
        setIsRefreshing(true);
      } else {
        setIsLoading(true);
      }

      try {
        const result = await bookmarkService.getBookmarks(
          {
            page: nextPage,
            size: BOOKMARK_PAGE_SIZE,
          },
          session.access_token,
        );

        setItems((currentItems) =>
          replace ? result.items : [...currentItems, ...result.items],
        );
        setHasNext(result.has_next);
        setPage(result.page);
      } catch (error) {
        setErrorMessage(
          error instanceof Error ? error.message : "BOOKMARKS_LOAD_FAILED",
        );
      } finally {
        setIsLoading(false);
        setIsRefreshing(false);
      }
    },
    [],
  );

  const refresh = useCallback(async () => {
    await loadPage(1, true);
  }, [loadPage]);

  const loadMore = useCallback(async () => {
    if (isLoading || isRefreshing || !hasNext) {
      return;
    }

    await loadPage(page + 1);
  }, [hasNext, isLoading, isRefreshing, loadPage, page]);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  return {
    errorMessage,
    hasNext,
    isLoading,
    isRefreshing,
    items,
    loadMore,
    page,
    refresh,
    size: BOOKMARK_PAGE_SIZE,
  };
}
