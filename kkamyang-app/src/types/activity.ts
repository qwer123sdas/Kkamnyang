import type { ActivityType } from "../constants/activity";
import type { ApiGeoPoint, RouteGeoJson } from "./geo";

export type ActivityStatus = "STARTED" | "FINISHED";

export type Activity = {
  activity_id: number;
  activity_type: ActivityType;
  status: ActivityStatus;
  started_at: string;
  ended_at?: string;
  route_id?: number;
};

export type ActivityStartRequest = {
  activity_type: ActivityType;
};

export type ActivityFinishRequest = {
  title: string;
  description: string;
  visibility: "PUBLIC" | "PRIVATE";
  encoded_polyline: string;
  route_geojson: RouteGeoJson;
  start_point: ApiGeoPoint;
  end_point: ApiGeoPoint;
  distance_km: number;
  duration_sec: number;
};

export type ActivityFinishResponse = {
  activity_id: number;
  route_id: number;
  status: "FINISHED";
};

export type RouteHistoryActivity = {
  activity_id: number;
  route_id: number;
  distance_km: number;
  duration_sec: number;
  started_at: string;
  ended_at: string;
};
