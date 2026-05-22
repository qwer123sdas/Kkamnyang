import { env } from "../config/env";

export const MAP_CONFIG = {
  googleMapsApiKey: env.googleMapsApiKey,
} as const;

export const DEFAULT_MAP_REGION = {
  latitude: 37.5665,
  longitude: 126.978,
  latitudeDelta: 0.01,
  longitudeDelta: 0.01,
} as const;

export const RUNNING_ROUTE_POLYLINE = {
  strokeColor: "#2563EB",
  strokeWidth: 5,
} as const;
