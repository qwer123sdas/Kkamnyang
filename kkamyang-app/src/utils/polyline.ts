import type { GeoPoint, RouteGeoJson } from "../types/geo";

function encodeCoordinate(value: number) {
  let coordinate = value < 0 ? ~(value << 1) : value << 1;
  let output = "";

  while (coordinate >= 0x20) {
    output += String.fromCharCode((0x20 | (coordinate & 0x1f)) + 63);
    coordinate >>= 5;
  }

  return output + String.fromCharCode(coordinate + 63);
}

export function encodePolyline(points: GeoPoint[]) {
  let previousLatitude = 0;
  let previousLongitude = 0;

  return points
    .map((point) => {
      const latitude = Math.round(point.latitude * 100000);
      const longitude = Math.round(point.longitude * 100000);
      const encodedPoint =
        encodeCoordinate(latitude - previousLatitude) +
        encodeCoordinate(longitude - previousLongitude);

      previousLatitude = latitude;
      previousLongitude = longitude;

      return encodedPoint;
    })
    .join("");
}

export function createRouteGeoJson(points: GeoPoint[]): RouteGeoJson {
  return {
    type: "LineString",
    coordinates: points.map((point) => [point.longitude, point.latitude]),
  };
}
