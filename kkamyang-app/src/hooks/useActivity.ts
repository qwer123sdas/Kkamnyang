import { useCallback, useState } from "react";

import { activityService } from "../services/activityService";
import type { Activity, ActivityFinishRequest } from "../types/activity";
import type { RecordedGeoPoint } from "../types/geo";
import { calculateTotalDistanceKm } from "../utils/distance";
import { calculateDurationSec } from "../utils/gps";
import { createRouteGeoJson, encodePolyline } from "../utils/polyline";
import { useAuth } from "./useAuth";

const DEFAULT_FINISH_TITLE = "RUN Record";
const DEFAULT_FINISH_DESCRIPTION = "";
const DEFAULT_FINISH_VISIBILITY = "PUBLIC";

function createFinishRequest(points: RecordedGeoPoint[]): ActivityFinishRequest {
  const startPoint = points[0];
  const endPoint = points[points.length - 1];

  return {
    title: DEFAULT_FINISH_TITLE,
    description: DEFAULT_FINISH_DESCRIPTION,
    visibility: DEFAULT_FINISH_VISIBILITY,
    encoded_polyline: encodePolyline(points),
    route_geojson: createRouteGeoJson(points),
    start_point: {
      lat: startPoint.latitude,
      lng: startPoint.longitude,
    },
    end_point: {
      lat: endPoint.latitude,
      lng: endPoint.longitude,
    },
    distance_km: calculateTotalDistanceKm(points),
    duration_sec: calculateDurationSec(points),
  };
}

export function useActivity() {
  const { session } = useAuth();
  const [activity, setActivity] = useState<Activity | null>(null);
  const [isFinishing, setIsFinishing] = useState(false);
  const [isStarting, setIsStarting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const start = useCallback(async () => {
    if (!session) {
      setErrorMessage("AUTH_REQUIRED");
      return null;
    }

    setIsStarting(true);
    setErrorMessage(null);

    try {
      const startedActivity = await activityService.start(session.access_token);
      setActivity(startedActivity);
      return startedActivity;
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "ACTIVITY_START_FAILED",
      );
      return null;
    } finally {
      setIsStarting(false);
    }
  }, [session]);

  const finish = useCallback(
    async (points: RecordedGeoPoint[]) => {
      if (!session) {
        setErrorMessage("AUTH_REQUIRED");
        return;
      }

      if (!activity) {
        setErrorMessage("ACTIVITY_NOT_FOUND");
        return;
      }

      if (points.length < 2) {
        setErrorMessage("GPS_POINTS_REQUIRED");
        return;
      }

      setIsFinishing(true);
      setErrorMessage(null);

      try {
        const finishedActivity = await activityService.finish(
          activity.activity_id,
          createFinishRequest(points),
          session.access_token,
        );

        setActivity({
          ...activity,
          route_id: finishedActivity.route_id,
          status: finishedActivity.status,
        });
      } catch (error) {
        setErrorMessage(
          error instanceof Error ? error.message : "ACTIVITY_FINISH_FAILED",
        );
      } finally {
        setIsFinishing(false);
      }
    },
    [activity, session],
  );

  return {
    activity,
    activityId: activity?.activity_id ?? null,
    status: activity?.status ?? null,
    isFinishing,
    isStarting,
    errorMessage,
    finish,
    start,
  };
}
