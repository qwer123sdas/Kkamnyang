import { FlatList, RefreshControl, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { RouteCard } from "../../components/route/RouteCard";
import { AsyncStateMessage } from "../../components/common/AsyncStateMessage";
import { useBookmarks } from "../../hooks/useBookmarks";
import type { MainStackParamList } from "../../navigation/MainNavigator";
import type { BookmarkRouteItem } from "../../types/route";

export default function BookmarkScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<MainStackParamList>>();
  const {
    errorMessage,
    isLoading,
    isRefreshing,
    items,
    loadMore,
    refresh,
  } = useBookmarks();

  function renderItem({ item }: { item: BookmarkRouteItem }) {
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
      <Text>Bookmark Screen</Text>
      {errorMessage ? (
        <AsyncStateMessage message={errorMessage} onRetry={() => void refresh()} />
      ) : null}
      <FlatList
        data={items}
        keyExtractor={(item) => String(item.route_id)}
        ListEmptyComponent={
          errorMessage ? null : isLoading ? (
            <AsyncStateMessage message="Loading bookmarks" />
          ) : (
            <AsyncStateMessage message="No bookmarks" />
          )
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
