import { Button, ScrollView, Text, View } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { CommentInput } from "../../components/route/CommentInput";
import { CommentList } from "../../components/route/CommentList";
import { RouteDetailInfo } from "../../components/route/RouteDetailInfo";
import { useRouteComments } from "../../hooks/useRouteComments";
import { useRouteDetail } from "../../hooks/useRouteDetail";
import type { MainStackParamList } from "../../navigation/MainNavigator";

type RouteDetailParams = {
  routeId?: number;
};

export default function RouteDetailScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<MainStackParamList>>();
  const route = useRoute();
  const params = route.params as RouteDetailParams | undefined;
  const routeId = params?.routeId ?? null;
  const {
    comments,
    createComment,
    errorMessage: commentsErrorMessage,
    hasNext,
    isCreating,
    isLoading: isCommentsLoading,
    loadMore,
  } = useRouteComments(routeId);
  const {
    errorMessage,
    isBookmarkUpdating,
    isLikeUpdating,
    isLoading,
    route: routeDetail,
    toggleBookmark,
    toggleLike,
  } = useRouteDetail(routeId);

  return (
    <ScrollView>
      <Text>Route Detail Screen</Text>
      {isLoading ? <Text>Loading route</Text> : null}
      {errorMessage ? <Text>{errorMessage}</Text> : null}
      {routeDetail ? (
        <>
        <RouteDetailInfo
          isBookmarkUpdating={isBookmarkUpdating}
          isLikeUpdating={isLikeUpdating}
          onToggleBookmark={toggleBookmark}
          onToggleLike={toggleLike}
          route={routeDetail}
        />
        <Button
          onPress={() =>
            navigation.navigate("RouteCluster", {
              routeId: routeDetail.route_id,
            })
          }
          title="View Similar Routes"
        />
        <Button
          onPress={() =>
            navigation.navigate("RouteHistory", {
              routeId: routeDetail.route_id,
            })
          }
          title="View Route History"
        />
        </>
      ) : null}
      {commentsErrorMessage ? <Text>{commentsErrorMessage}</Text> : null}
      <CommentInput isCreating={isCreating} onSubmit={createComment} />
      <CommentList
        comments={comments}
        hasNext={hasNext}
        isLoading={isCommentsLoading}
        onLoadMore={loadMore}
      />
      {!isLoading && !errorMessage && !routeDetail ? (
        <View>
          <Text>Route detail is not available.</Text>
        </View>
      ) : null}
    </ScrollView>
  );
}
