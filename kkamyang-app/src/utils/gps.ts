import { GPS_MAX_SPEED_KMH, GPS_MIN_DISTANCE_M } from "../constants/gps";
import type { RecordedGeoPoint } from "../types/geo";
import { calculateDistanceMeters } from "./distance";

const MAX_ACCURACY_M = 50;
const MPS_TO_KMH = 3.6;

export function isAccuratePoint(point: RecordedGeoPoint) {
  return point.accuracy !== null && point.accuracy <= MAX_ACCURACY_M;
}

export function calculateSpeedKmh(
  previousPoint: RecordedGeoPoint,
  nextPoint: RecordedGeoPoint,
) {
  const distanceMeters = calculateDistanceMeters(previousPoint, nextPoint);
  const durationSec =
    (new Date(nextPoint.recorded_at).getTime() -
      new Date(previousPoint.recorded_at).getTime()) /
    1000;

  if (durationSec <= 0) {
    return 0;
  }

  return (distanceMeters / durationSec) * MPS_TO_KMH;
}

export function filterGPSNoise(points: RecordedGeoPoint[]) {
  return points.reduce<RecordedGeoPoint[]>((filteredPoints, point) => {
    if (!isAccuratePoint(point)) {
      return filteredPoints;
    }

    const previousPoint = filteredPoints[filteredPoints.length - 1];

    if (!previousPoint) {
      return [point];
    }

    const distanceMeters = calculateDistanceMeters(previousPoint, point);

    if (distanceMeters <= GPS_MIN_DISTANCE_M) {
      return filteredPoints;
    }

    if (calculateSpeedKmh(previousPoint, point) > GPS_MAX_SPEED_KMH) {
      return filteredPoints;
    }

    return [...filteredPoints, point];
  }, []);
}

export function calculateDurationSec(points: RecordedGeoPoint[]) {
  if (points.length < 2) {
    return 0;
  }

  const startedAt = new Date(points[0].recorded_at).getTime();
  const endedAt = new Date(points[points.length - 1].recorded_at).getTime();

  return Math.max(0, Math.round((endedAt - startedAt) / 1000));
}
