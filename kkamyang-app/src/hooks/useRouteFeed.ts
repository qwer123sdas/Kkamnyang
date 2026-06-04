import { useCallback, useEffect, useState } from "react";

import { routeService } from "../services/routeService";
import type { RouteFeedItem } from "../types/route";

const ROUTE_FEED_PAGE_SIZE = 20;

export function useRouteFeed() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [hasNext, setHasNext] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [items, setItems] = useState<RouteFeedItem[]>([]);
  const [page, setPage] = useState(1);

  const loadPage = useCallback(async (nextPage: number, replace = false) => {
    setErrorMessage(null);

    if (replace) {
      setIsRefreshing(true);
    } else {
      setIsLoading(true);
    }

    try {
      const feed = await routeService.getFeed({
        page: nextPage,
        size: ROUTE_FEED_PAGE_SIZE,
      });
      console.log("[Feed QA] response items count", feed.items.length);
      console.log("[Feed QA] response page", feed.page);
      console.log("[Feed QA] response has_next", feed.has_next);

      const publicRunRoutes = feed.items.filter(
        (item) => item.visibility === "PUBLIC" && item.activity_type === "RUN",
      );
      console.log("[Feed QA] public RUN items count", publicRunRoutes.length);
      console.log("[Feed QA] public RUN item exists", publicRunRoutes.length > 0);

      setItems((currentItems) => {
        const nextItems = replace
          ? publicRunRoutes
          : [...currentItems, ...publicRunRoutes];
        console.log("[Feed QA] state items count", nextItems.length);
        return nextItems;
      });
      setPage(feed.page);
      setHasNext(feed.has_next);
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "ROUTE_FEED_LOAD_FAILED",
      );
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, []);

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
    size: ROUTE_FEED_PAGE_SIZE,
  };
}
