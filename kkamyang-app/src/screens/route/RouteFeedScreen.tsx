import { FlatList, RefreshControl, Text, View } from "react-native";

import { RouteCard } from "../../components/route/RouteCard";
import { useRouteFeed } from "../../hooks/useRouteFeed";
import type { RouteFeedItem } from "../../types/route";

export default function RouteFeedScreen() {
  const {
    errorMessage,
    isLoading,
    isRefreshing,
    items,
    loadMore,
    refresh,
  } = useRouteFeed();

  function renderItem({ item }: { item: RouteFeedItem }) {
    return <RouteCard route={item} />;
  }

  return (
    <View style={{ flex: 1 }}>
      <Text>Route Feed Screen</Text>
      {errorMessage ? <Text>{errorMessage}</Text> : null}
      <FlatList
        data={items}
        keyExtractor={(item) => String(item.route_id)}
        ListEmptyComponent={
          isLoading ? <Text>Loading routes</Text> : <Text>No public routes</Text>
        }
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={refresh} />
        }
        renderItem={renderItem}
      />
    </View>
  );
}
