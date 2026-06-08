import { Pressable, StyleSheet, Text, View } from "react-native";

import type {
  BookmarkRouteItem,
  MyRouteItem,
  RouteFeedItem,
} from "../../types/route";

type RouteCardItem = BookmarkRouteItem | MyRouteItem | RouteFeedItem;

type RouteCardProps = {
  onPress?: () => void;
  route: RouteCardItem;
};

function formatDuration(durationSec: number) {
  const minutes = Math.floor(durationSec / 60);
  const seconds = durationSec % 60;

  return `${minutes}m ${seconds}s`;
}

export function RouteCard({ onPress, route }: RouteCardProps) {
  const author =
    "user" in route
      ? route.user.nickname || route.user.login_id || "Unknown"
      : null;
  const description = "description" in route ? route.description : null;
  const likeCount = "like_count" in route ? route.like_count : null;
  const commentCount = "comment_count" in route ? route.comment_count : null;
  const bookmarkCount = "bookmark_count" in route ? route.bookmark_count : null;
  const durationSec = "duration_sec" in route ? route.duration_sec : null;
  const visibility = "visibility" in route ? route.visibility : null;

  return (
    <Pressable
      accessibilityRole={onPress ? "button" : undefined}
      onPress={onPress}
      style={styles.container}
    >
      <Text style={styles.title}>{route.title}</Text>
      {description ? <Text style={styles.description}>{description}</Text> : null}
      <Text>
        {route.activity_type}
        {visibility ? ` / ${visibility}` : ""}
      </Text>
      <Text>
        {route.distance_km}km
        {durationSec !== null ? ` / ${formatDuration(durationSec)}` : ""}
      </Text>
      {author ? <Text>By {author}</Text> : null}
      {likeCount !== null && commentCount !== null && bookmarkCount !== null ? (
        <Text>
          Likes {likeCount} / Comments {commentCount} / Bookmarks{" "}
          {bookmarkCount}
        </Text>
      ) : null}
      {onPress ? (
        <View style={styles.detailButton}>
          <Text style={styles.detailButtonText}>Open Detail</Text>
        </View>
      ) : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    borderBottomColor: "#E5E7EB",
    borderBottomWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  description: {
    marginTop: 4,
  },
  detailButton: {
    alignItems: "center",
    alignSelf: "flex-start",
    backgroundColor: "#111827",
    borderRadius: 8,
    justifyContent: "center",
    marginTop: 8,
    minHeight: 40,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  detailButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
  },
});
