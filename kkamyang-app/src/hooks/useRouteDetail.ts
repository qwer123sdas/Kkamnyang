import { useCallback, useEffect, useState } from "react";

import { bookmarkService } from "../services/bookmarkService";
import { likeService } from "../services/likeService";
import { routeService } from "../services/routeService";
import type { RouteDetail } from "../types/route";
import { useAuth } from "./useAuth";

export function useRouteDetail(routeId: number | null) {
  const { session } = useAuth();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isBookmarkUpdating, setIsBookmarkUpdating] = useState(false);
  const [isLikeUpdating, setIsLikeUpdating] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [route, setRoute] = useState<RouteDetail | null>(null);

  const load = useCallback(async () => {
    if (!routeId) {
      setRoute(null);
      setErrorMessage("ROUTE_ID_REQUIRED");
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);

    try {
      const detail = await routeService.getDetail(routeId, session?.access_token);
      setRoute(detail);
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "ROUTE_DETAIL_LOAD_FAILED",
      );
    } finally {
      setIsLoading(false);
    }
  }, [routeId, session?.access_token]);

  const toggleLike = useCallback(async () => {
    if (!session) {
      setErrorMessage("AUTH_REQUIRED");
      return;
    }

    if (!route || isLikeUpdating) {
      return;
    }

    setIsLikeUpdating(true);
    setErrorMessage(null);

    try {
      const result = route.is_liked
        ? await likeService.unlike(route.route_id, session.access_token)
        : await likeService.like(route.route_id, session.access_token);

      setRoute((currentRoute) =>
        currentRoute
          ? {
              ...currentRoute,
              is_liked: result.is_liked,
              like_count: result.like_count,
            }
          : currentRoute,
      );
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "LIKE_FAILED");
    } finally {
      setIsLikeUpdating(false);
    }
  }, [isLikeUpdating, route, session]);

  const toggleBookmark = useCallback(async () => {
    if (!session) {
      setErrorMessage("AUTH_REQUIRED");
      return;
    }

    if (!route || isBookmarkUpdating) {
      return;
    }

    setIsBookmarkUpdating(true);
    setErrorMessage(null);

    try {
      const result = route.is_bookmarked
        ? await bookmarkService.unbookmark(route.route_id, session.access_token)
        : await bookmarkService.bookmark(route.route_id, session.access_token);

      setRoute((currentRoute) =>
        currentRoute
          ? {
              ...currentRoute,
              bookmark_count: result.bookmark_count,
              is_bookmarked: result.is_bookmarked,
            }
          : currentRoute,
      );
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "BOOKMARK_FAILED",
      );
    } finally {
      setIsBookmarkUpdating(false);
    }
  }, [isBookmarkUpdating, route, session]);

  useEffect(() => {
    void load();
  }, [load]);

  return {
    errorMessage,
    isBookmarkUpdating,
    isLikeUpdating,
    isLoading,
    refresh: load,
    route,
    toggleBookmark,
    toggleLike,
  };
}
