import { FlatList, RefreshControl, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { RouteCard } from "../../components/route/RouteCard";
import { useMyRoutes } from "../../hooks/useMyRoutes";
import type { MainStackParamList } from "../../navigation/MainNavigator";
import type { MyRouteItem } from "../../types/route";

export default function MyRoutesScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<MainStackParamList>>();
  const {
    errorMessage,
    isLoading,
    isRefreshing,
    items,
    loadMore,
    refresh,
  } = useMyRoutes();

  function renderItem({ item }: { item: MyRouteItem }) {
    return (
      <RouteCard
        onPress={() =>
          navigation.navigate("RouteDetail", {
            routeId: item.route_id,
          })
        }
        route={item}
      />
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <Text>My Routes Screen</Text>
      {errorMessage ? <Text>{errorMessage}</Text> : null}
      <FlatList
        data={items}
        keyExtractor={(item) => String(item.route_id)}
        ListEmptyComponent={
          isLoading ? <Text>Loading routes</Text> : <Text>No routes</Text>
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
