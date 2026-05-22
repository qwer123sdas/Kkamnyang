import { Text, View } from "react-native";
import { useRoute } from "@react-navigation/native";

import { RouteClusterList } from "../../components/route/RouteClusterList";
import { useRouteCluster } from "../../hooks/useRouteCluster";

type RouteClusterParams = {
  routeId?: number;
};

export default function RouteClusterScreen() {
  const route = useRoute();
  const params = route.params as RouteClusterParams | undefined;
  const routeId = params?.routeId ?? null;
  const { cluster, errorMessage, isLoading } = useRouteCluster(routeId);

  return (
    <View>
      <Text>Route Cluster Screen</Text>
      {isLoading ? <Text>Loading similar routes</Text> : null}
      {errorMessage ? <Text>{errorMessage}</Text> : null}
      {cluster ? (
        <RouteClusterList
          clusterId={cluster.cluster_id}
          routes={cluster.items}
        />
      ) : null}
    </View>
  );
}
