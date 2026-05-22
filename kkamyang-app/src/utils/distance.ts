import type { GeoPoint } from "../types/geo";

const EARTH_RADIUS_M = 6371000;

function toRadians(value: number) {
  return (value * Math.PI) / 180;
}

export function calculateDistanceMeters(from: GeoPoint, to: GeoPoint) {
  const latDelta = toRadians(to.latitude - from.latitude);
  const lonDelta = toRadians(to.longitude - from.longitude);
  const fromLat = toRadians(from.latitude);
  const toLat = toRadians(to.latitude);

  const haversine =
    Math.sin(latDelta / 2) ** 2 +
    Math.cos(fromLat) * Math.cos(toLat) * Math.sin(lonDelta / 2) ** 2;

  return (
    EARTH_RADIUS_M * 2 * Math.atan2(Math.sqrt(haversine), Math.sqrt(1 - haversine))
  );
}

export function calculateTotalDistanceKm(points: GeoPoint[]) {
  if (points.length < 2) {
    return 0;
  }

  const distanceMeters = points.reduce((total, point, index) => {
    if (index === 0) {
      return total;
    }

    return total + calculateDistanceMeters(points[index - 1], point);
  }, 0);

  return Math.round((distanceMeters / 1000) * 1000) / 1000;
}
