import { useCallback, useState } from "react";

import { activityService } from "../services/activityService";
import { authService } from "../services/authService";
import type { Activity, ActivityFinishRequest } from "../types/activity";
import type { RecordedGeoPoint } from "../types/geo";
import { calculateTotalDistanceKm } from "../utils/distance";
import { calculateDurationSec } from "../utils/gps";
import { createRouteGeoJson, encodePolyline } from "../utils/polyline";

const DEFAULT_FINISH_TITLE = "RUN Record";
const DEFAULT_FINISH_DESCRIPTION = "";
const DEFAULT_FINISH_VISIBILITY = "PUBLIC";

function createStationaryEndPoint(point: RecordedGeoPoint): RecordedGeoPoint {
  return {
    ...point,
    recorded_at: new Date().toISOString(),
  };
}

function normalizeFinishPoints(points: RecordedGeoPoint[]) {
  if (points.length !== 1) {
    return points;
  }

  return [points[0], createStationaryEndPoint(points[0])];
}

function createFinishRequest(points: RecordedGeoPoint[]): ActivityFinishRequest {
  const finishPoints = normalizeFinishPoints(points);
  const startPoint = finishPoints[0];
  const endPoint = finishPoints[finishPoints.length - 1];

  return {
    title: DEFAULT_FINISH_TITLE,
    description: DEFAULT_FINISH_DESCRIPTION,
    visibility: DEFAULT_FINISH_VISIBILITY,
    encoded_polyline: encodePolyline(finishPoints),
    route_geojson: createRouteGeoJson(finishPoints),
    start_point: {
      lat: startPoint.latitude,
      lng: startPoint.longitude,
    },
    end_point: {
      lat: endPoint.latitude,
      lng: endPoint.longitude,
    },
    distance_km: calculateTotalDistanceKm(finishPoints),
    duration_sec: calculateDurationSec(finishPoints),
  };
}

export function useActivity() {
  const [activity, setActivity] = useState<Activity | null>(null);
  const [isFinishing, setIsFinishing] = useState(false);
  const [isStarting, setIsStarting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const start = useCallback(async () => {
    const session = await authService.getSession();

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
  }, []);

  const finish = useCallback(
    async (points: RecordedGeoPoint[]) => {
      const session = await authService.getSession();

      if (!session) {
        setErrorMessage("AUTH_REQUIRED");
        return;
      }

      if (!activity) {
        setErrorMessage("ACTIVITY_NOT_FOUND");
        return;
      }

      if (points.length < 1) {
        setErrorMessage("GPS point is required before finishing.");
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
          ended_at: new Date().toISOString(),
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
    [activity],
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
