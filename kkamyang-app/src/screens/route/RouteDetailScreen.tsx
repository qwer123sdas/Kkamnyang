import { ScrollView, Text, View } from "react-native";
import { useRoute } from "@react-navigation/native";

import { CommentInput } from "../../components/route/CommentInput";
import { CommentList } from "../../components/route/CommentList";
import { RouteDetailInfo } from "../../components/route/RouteDetailInfo";
import { useRouteComments } from "../../hooks/useRouteComments";
import { useRouteDetail } from "../../hooks/useRouteDetail";

type RouteDetailParams = {
  routeId?: number;
};

export default function RouteDetailScreen() {
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
    comments,
    createComment,
    errorMessage: commentsErrorMessage,
    hasNext,
    isCreating,
    isLoading: isCommentsLoading,
    loadMore,
  } = useRouteComments(routeId);

  return (
    <ScrollView>
      <Text>Route Detail Screen</Text>
      {isLoading ? <Text>Loading route</Text> : null}
      {errorMessage ? <Text>{errorMessage}</Text> : null}
      {hasRouteId ? (
        <>
          <Text>Route Comments</Text>
          {commentsErrorMessage ? <Text>{commentsErrorMessage}</Text> : null}
          <CommentInput isCreating={isCreating} onSubmit={createComment} />
          <CommentList
            comments={comments}
            hasNext={hasNext}
            isLoading={isCommentsLoading}
            onLoadMore={loadMore}
          />
        </>
      ) : (
        <Text>Route ID is required to write comments.</Text>
      )}
      {routeDetail ? (
        <RouteDetailInfo
          isBookmarkUpdating={isBookmarkUpdating}
          isLikeUpdating={isLikeUpdating}
          onToggleBookmark={toggleBookmark}
          onToggleLike={toggleLike}
          route={routeDetail}
        />
      ) : null}
      {!isLoading && !errorMessage && !routeDetail ? (
        <View>
          <Text>Route detail is not available.</Text>
        </View>
      ) : null}
    </ScrollView>
  );
}
