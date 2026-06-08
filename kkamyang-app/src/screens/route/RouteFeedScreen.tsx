import {
  Button,
  FlatList,
  RefreshControl,
  Text,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { RouteCard } from "../../components/route/RouteCard";
import { useRouteFeed } from "../../hooks/useRouteFeed";
import type { MainStackParamList } from "../../navigation/MainNavigator";
import type { RouteFeedItem } from "../../types/route";

export default function RouteFeedScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<MainStackParamList>>();
  const {
    errorMessage,
    isLoading,
    isRefreshing,
    items,
    loadMore,
    refresh,
  } = useRouteFeed();

  function renderItem({ item }: { item: RouteFeedItem }) {
    return (
      <RouteCard
        onPress={() =>
          navigation.navigate("RouteDetail", { routeId: item.route_id })
        }
        route={item}
      />
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <Text>Route Feed Screen</Text>
      <Button onPress={() => navigation.navigate("Record")} title="Record" />
      <Button onPress={() => navigation.navigate("Profile")} title="Profile" />
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
