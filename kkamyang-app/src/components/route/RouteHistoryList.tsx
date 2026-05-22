import { Button, StyleSheet, Text, View } from "react-native";

import type { RouteHistoryActivity } from "../../types/activity";

type RouteHistoryListProps = {
  activities: RouteHistoryActivity[];
  hasNext: boolean;
  isLoading: boolean;
  onLoadMore: () => void;
};

function formatDuration(durationSec: number) {
  const minutes = Math.floor(durationSec / 60);
  const seconds = durationSec % 60;

  return `${minutes}m ${seconds}s`;
}

function formatPace(durationSec: number, distanceKm: number) {
  if (distanceKm <= 0) {
    return "-";
  }

  const paceSeconds = Math.round(durationSec / distanceKm);
  const minutes = Math.floor(paceSeconds / 60);
  const seconds = paceSeconds % 60;

  return `${minutes}m ${seconds}s/km`;
}

export function RouteHistoryList({
  activities,
  hasNext,
  isLoading,
  onLoadMore,
}: RouteHistoryListProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Route History</Text>
      {activities.length === 0 ? <Text>No activity history</Text> : null}
      {activities.map((activity) => (
        <View key={activity.activity_id} style={styles.item}>
          <Text>Started: {activity.started_at}</Text>
          <Text>Distance: {activity.distance_km}km</Text>
          <Text>Duration: {formatDuration(activity.duration_sec)}</Text>
          <Text>
            Pace: {formatPace(activity.duration_sec, activity.distance_km)}
          </Text>
        </View>
      ))}
      {hasNext ? (
        <Button
          disabled={isLoading}
          onPress={onLoadMore}
          title={isLoading ? "Loading history" : "Load more history"}
        />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  item: {
    borderTopColor: "#E5E7EB",
    borderTopWidth: 1,
    paddingVertical: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
  },
});
