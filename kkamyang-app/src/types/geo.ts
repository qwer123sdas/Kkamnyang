export type GeoPoint = {
  latitude: number;
  longitude: number;
};

export type ApiGeoPoint = {
  lat: number;
  lng: number;
};

export type RecordedGeoPoint = GeoPoint & {
  accuracy: number | null;
  altitude: number | null;
  recorded_at: string;
  speed_mps: number | null;
};

export type RouteGeoJson = {
  type: "LineString";
  coordinates: [number, number][];
};
