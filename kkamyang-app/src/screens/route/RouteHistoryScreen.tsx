import { Text, View } from "react-native";
import { useRoute } from "@react-navigation/native";

import { RouteHistoryList } from "../../components/route/RouteHistoryList";
import { useRouteHistory } from "../../hooks/useRouteHistory";

type RouteHistoryParams = {
  routeId?: number;
};

export default function RouteHistoryScreen() {
  const route = useRoute();
  const params = route.params as RouteHistoryParams | undefined;
  const routeId = params?.routeId ?? null;
  const { activities, errorMessage, hasNext, isLoading, loadMore } =
    useRouteHistory(routeId);

  return (
    <View>
      <Text>Route History Screen</Text>
      {isLoading ? <Text>Loading history</Text> : null}
      {errorMessage ? <Text>{errorMessage}</Text> : null}
      <RouteHistoryList
        activities={activities}
        hasNext={hasNext}
        isLoading={isLoading}
        onLoadMore={loadMore}
      />
    </View>
  );
}
