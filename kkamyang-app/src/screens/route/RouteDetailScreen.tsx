import { ScrollView, Text, View } from "react-native";
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

type RouteDetailNavigation = NativeStackNavigationProp<
  MainStackParamList,
  "RouteDetail"
>;

export default function RouteDetailScreen() {
  const navigation = useNavigation<RouteDetailNavigation>();
  const route = useRoute();
  const params = route.params as RouteDetailParams | undefined;
  const routeId = params?.routeId ?? null;
  const hasRouteId = routeId !== null;
  const {
    errorMessage,
    isBookmarkUpdating,
    isLikeUpdating,
    isLoading,
    route: routeDetail,
    toggleBookmark,
    toggleLike,
  } = useRouteDetail(routeId);
  const {
    clearDraft,
    comments,
    content,
    deleteSelectedComment,
    errorMessage: commentsErrorMessage,
    hasNext,
    isDeleting,
    isLoading: isCommentsLoading,
    isSaving,
    loadMore,
    saveComment,
    selectedCommentId,
    selectComment,
    setContent,
  } = useRouteComments(routeId);

  return (
    <ScrollView>
      <Text>Route Detail Screen</Text>
      {isLoading ? <Text>Loading route</Text> : null}
      {errorMessage ? <Text>{errorMessage}</Text> : null}
      {routeDetail ? (
        <RouteDetailInfo
          isBookmarkUpdating={isBookmarkUpdating}
          isLikeUpdating={isLikeUpdating}
          onOpenHistory={() =>
            navigation.navigate("RouteHistory", { routeId: routeDetail.route_id })
          }
          onOpenSimilarRoutes={() =>
            navigation.navigate("RouteCluster", { routeId: routeDetail.route_id })
          }
          onToggleBookmark={toggleBookmark}
          onToggleLike={toggleLike}
          route={routeDetail}
        />
      ) : null}
      {hasRouteId ? (
        <>
          <Text>Route Comments</Text>
          {commentsErrorMessage ? <Text>{commentsErrorMessage}</Text> : null}
          <CommentInput
            content={content}
            isDeleting={isDeleting}
            isSaving={isSaving}
            onChangeContent={setContent}
            onClear={clearDraft}
            onDelete={() => void deleteSelectedComment()}
            onSave={() => void saveComment()}
            selectedCommentId={selectedCommentId}
          />
          <CommentList
            comments={comments}
            hasNext={hasNext}
            isLoading={isCommentsLoading}
            onLoadMore={loadMore}
            onSelectComment={selectComment}
            selectedCommentId={selectedCommentId}
          />
        </>
      ) : (
        <Text>Route ID is required to write comments.</Text>
      )}
      {!isLoading && !errorMessage && !routeDetail ? (
        <View>
          <Text>Route detail is not available.</Text>
        </View>
      ) : null}
    </ScrollView>
  );
}
