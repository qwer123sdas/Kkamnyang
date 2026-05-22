import { useCallback, useEffect, useState } from "react";

import { routeClusterService } from "../services/routeClusterService";
import type { RouteClusterResponse } from "../types/route";

export function useRouteCluster(routeId: number | null) {
  const [cluster, setCluster] = useState<RouteClusterResponse | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const load = useCallback(async () => {
    if (!routeId) {
      setCluster(null);
      setErrorMessage("ROUTE_ID_REQUIRED");
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);

    try {
      const result = await routeClusterService.getSimilarRoutes(routeId);
      setCluster(result);
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "ROUTE_CLUSTER_LOAD_FAILED",
      );
    } finally {
      setIsLoading(false);
    }
  }, [routeId]);

  useEffect(() => {
    void load();
  }, [load]);

  return {
    cluster,
    errorMessage,
    isLoading,
    refresh: load,
  };
}
