import { Pressable, StyleSheet, Text, View } from "react-native";

import { RunningMap } from "../map/RunningMap";
import type { GeoPoint } from "../../types/geo";
import type { RouteDetail } from "../../types/route";

type RouteDetailInfoProps = {
  isBookmarkUpdating: boolean;
  isLikeUpdating: boolean;
  onToggleBookmark: () => void;
  onToggleLike: () => void;
  route: RouteDetail;
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
      <View style={styles.actionRow}>
        <Pressable
          accessibilityRole="button"
          disabled={isLikeUpdating}
          onPress={onToggleLike}
          style={[
            styles.actionButton,
            route.is_liked ? styles.likeButtonActive : styles.actionButtonInactive,
            isLikeUpdating ? styles.actionButtonDisabled : null,
          ]}
        >
          <Text
            style={[
              styles.actionButtonText,
              route.is_liked ? styles.actionButtonTextActive : null,
            ]}
          >
            {route.is_liked ? "Liked" : "Like"}
          </Text>
        </Pressable>
        <Pressable
          accessibilityRole="button"
          disabled={isBookmarkUpdating}
          onPress={onToggleBookmark}
          style={[
            styles.actionButton,
            route.is_bookmarked
              ? styles.bookmarkButtonActive
              : styles.actionButtonInactive,
            isBookmarkUpdating ? styles.actionButtonDisabled : null,
          ]}
        >
          <Text
            style={[
              styles.actionButtonText,
              route.is_bookmarked ? styles.actionButtonTextActive : null,
            ]}
          >
            {route.is_bookmarked ? "Bookmarked" : "Bookmark"}
          </Text>
        </Pressable>
      </View>
      <Text>Encoded Polyline: {route.encoded_polyline}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  actionButton: {
    alignItems: "center",
    borderRadius: 8,
    borderWidth: 1,
    flex: 1,
    justifyContent: "center",
    minHeight: 44,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  actionButtonDisabled: {
    opacity: 0.55,
  },
  actionButtonInactive: {
    backgroundColor: "#FFFFFF",
    borderColor: "#D1D5DB",
  },
  actionButtonText: {
    color: "#111827",
    fontSize: 15,
    fontWeight: "600",
  },
  actionButtonTextActive: {
    color: "#FFFFFF",
  },
  actionRow: {
    flexDirection: "row",
    gap: 8,
    marginTop: 12,
  },
  bookmarkButtonActive: {
    backgroundColor: "#2563EB",
    borderColor: "#2563EB",
  },
  container: {
    padding: 16,
  },
  likeButtonActive: {
    backgroundColor: "#DC2626",
    borderColor: "#DC2626",
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
  },
});
