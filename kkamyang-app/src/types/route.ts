import type { ActivityType } from "../constants/activity";
import type { RouteHistoryActivity } from "./activity";
import type { GeoPoint, RouteGeoJson } from "./geo";
import type { User } from "./user";

export type Route = {
  route_id: number;
  activity_type: ActivityType;
  encoded_polyline: string;
  route_geojson: RouteGeoJson;
  start_point: GeoPoint;
  end_point: GeoPoint;
};

export type RouteVisibility = "PUBLIC" | "PRIVATE";

export type RouteFeedItem = {
  route_id: number;
  title: string;
  description: string | null;
  activity_type: ActivityType;
  visibility: RouteVisibility;
  encoded_polyline: string;
  distance_km: number;
  duration_sec: number;
  like_count: number;
  comment_count: number;
  bookmark_count: number;
  created_at: string;
  user: Pick<User, "user_id" | "login_id" | "nickname">;
};

export type MyRouteItem = {
  route_id: number;
  title: string;
  activity_type: ActivityType;
  visibility: RouteVisibility;
  encoded_polyline: string;
  distance_km: number;
  duration_sec: number;
  created_at: string;
};

export type BookmarkRouteItem = {
  route_id: number;
  title: string;
  activity_type: ActivityType;
  encoded_polyline: string;
  distance_km: number;
  created_at: string;
};

export type RouteDetail = RouteFeedItem & {
  route_geojson: RouteGeoJson;
  is_liked: boolean;
  is_bookmarked: boolean;
};

export type RouteLikeResponse = {
  route_id: number;
  is_liked: boolean;
  like_count: number;
};

export type RouteBookmarkResponse = {
  route_id: number;
  is_bookmarked: boolean;
  bookmark_count: number;
};

export type RouteComment = {
  comment_id: number;
  content: string;
  created_at: string;
  user: Pick<User, "user_id" | "login_id" | "nickname">;
};

export type RouteCommentCreateRequest = {
  content: string;
};

export type RouteCommentCreateResponse = {
  comment_id: number;
  route_id: number;
  content: string;
  created_at: string;
};

export type RouteCommentsResponse = {
  items: RouteComment[];
  page: number;
  size: number;
  has_next: boolean;
};

export type SimilarRoute = {
  route_id: number;
  title: string;
  distance_km: number;
  similarity_score: number;
};

export type RouteClusterResponse = {
  cluster_id: number;
  items: SimilarRoute[];
};

export type RouteHistoryResponse = {
  items: RouteHistoryActivity[];
  page: number;
  size: number;
  has_next: boolean;
};

export type RouteFeedParams = {
  page: number;
  size: number;
  activity_type: ActivityType;
};

export type RouteFeedResponse = {
  items: RouteFeedItem[];
  page: number;
  size: number;
  has_next: boolean;
};

export type MyRoutesResponse = {
  items: MyRouteItem[];
  page: number;
  size: number;
  has_next: boolean;
};

export type BookmarksResponse = {
  items: BookmarkRouteItem[];
  page: number;
  size: number;
  has_next: boolean;
};
