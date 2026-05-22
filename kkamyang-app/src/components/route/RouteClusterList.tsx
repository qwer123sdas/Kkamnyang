import { StyleSheet, Text, View } from "react-native";

import type { SimilarRoute } from "../../types/route";

type RouteClusterListProps = {
  clusterId: number | null;
  routes: SimilarRoute[];
};

export function RouteClusterList({ clusterId, routes }: RouteClusterListProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Similar Routes</Text>
      {clusterId ? <Text>Cluster ID: {clusterId}</Text> : null}
      {routes.length === 0 ? <Text>No similar routes</Text> : null}
      {routes.map((route) => (
        <View key={route.route_id} style={styles.item}>
          <Text style={styles.itemTitle}>{route.title}</Text>
          <Text>Route ID: {route.route_id}</Text>
          <Text>Distance: {route.distance_km}km</Text>
          <Text>Similarity: {route.similarity_score}</Text>
        </View>
      ))}
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
  itemTitle: {
    fontWeight: "600",
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
  },
});
