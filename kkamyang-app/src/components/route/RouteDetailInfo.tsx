import { Button, StyleSheet, Text, View } from "react-native";

import { RunningMap } from "../map/RunningMap";
import type { GeoPoint } from "../../types/geo";
import type { RouteDetail } from "../../types/route";

type RouteDetailInfoProps = {
  isBookmarkUpdating: boolean;
  isLikeUpdating: boolean;
  route: RouteDetail;
  onToggleBookmark: () => void;
  onToggleLike: () => void;
};

function formatDuration(durationSec: number) {
  const minutes = Math.floor(durationSec / 60);
  const seconds = durationSec % 60;

  return `${minutes}m ${seconds}s`;
}

function decodePolyline(encodedPolyline: string): GeoPoint[] {
  const points: GeoPoint[] = [];
  let index = 0;
  let latitude = 0;
  let longitude = 0;

  while (index < encodedPolyline.length) {
    let latResult = 0;
    let latShift = 0;
    let latByte = 0;

    do {
      latByte = encodedPolyline.charCodeAt(index) - 63;
      index += 1;
      latResult |= (latByte & 0x1f) << latShift;
      latShift += 5;
    } while (latByte >= 0x20);

    latitude += latResult & 1 ? ~(latResult >> 1) : latResult >> 1;

    let lonResult = 0;
    let lonShift = 0;
    let lonByte = 0;

    do {
      lonByte = encodedPolyline.charCodeAt(index) - 63;
      index += 1;
      lonResult |= (lonByte & 0x1f) << lonShift;
      lonShift += 5;
    } while (lonByte >= 0x20);

    longitude += lonResult & 1 ? ~(lonResult >> 1) : lonResult >> 1;

    points.push({
      latitude: latitude / 100000,
      longitude: longitude / 100000,
    });
  }

  return points;
}

export function RouteDetailInfo({
  isBookmarkUpdating,
  isLikeUpdating,
  onToggleBookmark,
  onToggleLike,
  route,
}: RouteDetailInfoProps) {
  const author = route.user.nickname || route.user.login_id || "Unknown";
  const routePoints = decodePolyline(route.encoded_polyline);

  return (
    <View style={styles.container}>
      <RunningMap points={routePoints} />
      <Text style={styles.title}>{route.title}</Text>
      {route.description ? <Text>{route.description}</Text> : null}
      <Text>RUN / {route.visibility}</Text>
      <Text>
        {route.distance_km}km / {formatDuration(route.duration_sec)}
      </Text>
      <Text>By {author}</Text>
      <Text>Likes: {route.like_count}</Text>
      <Text>Comments: {route.comment_count}</Text>
      <Text>Bookmarks: {route.bookmark_count}</Text>
      <Text>Liked: {route.is_liked ? "Yes" : "No"}</Text>
      <Text>Bookmarked: {route.is_bookmarked ? "Yes" : "No"}</Text>
      <Button
        disabled={isLikeUpdating}
        onPress={onToggleLike}
        title={route.is_liked ? "Unlike" : "Like"}
      />
      <Button
        disabled={isBookmarkUpdating}
        onPress={onToggleBookmark}
        title={route.is_bookmarked ? "Remove Bookmark" : "Bookmark"}
      />
      <Text>Encoded Polyline: {route.encoded_polyline}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
  },
});
