import { useCallback, useEffect, useState } from "react";

import { routeHistoryService } from "../services/routeHistoryService";
import type { RouteHistoryActivity } from "../types/activity";

const ROUTE_HISTORY_PAGE_SIZE = 20;

export function useRouteHistory(routeId: number | null) {
  const [activities, setActivities] = useState<RouteHistoryActivity[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [hasNext, setHasNext] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);

  const loadPage = useCallback(
    async (nextPage: number, replace = false) => {
      if (!routeId) {
        setActivities([]);
        setErrorMessage("ROUTE_ID_REQUIRED");
        return;
      }

      setIsLoading(true);
      setErrorMessage(null);

      try {
        const result = await routeHistoryService.getHistory(routeId, {
          page: nextPage,
          size: ROUTE_HISTORY_PAGE_SIZE,
        });

        setActivities((currentActivities) =>
          replace ? result.items : [...currentActivities, ...result.items],
        );
        setHasNext(result.has_next);
        setPage(result.page);
      } catch (error) {
        setErrorMessage(
          error instanceof Error ? error.message : "ROUTE_HISTORY_LOAD_FAILED",
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

  useEffect(() => {
    void refresh();
  }, [refresh]);

  return {
    activities,
    errorMessage,
    hasNext,
    isLoading,
    loadMore,
    page,
    refresh,
  };
}
