import { useCallback, useState } from "react";
import {
  Button,
  FlatList,
  Pressable,
  RefreshControl,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { RouteCard } from "../../components/route/RouteCard";
import { useFeedQaComments } from "../../hooks/useFeedQaComments";
import { useRouteFeed } from "../../hooks/useRouteFeed";
import type { MainStackParamList } from "../../navigation/MainNavigator";
import type { RouteComment, RouteFeedItem } from "../../types/route";

export default function RouteFeedScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<MainStackParamList>>();
  const [isFeedQaActionsVisible, setIsFeedQaActionsVisible] = useState(false);
  const [isFeedQaBookmarked, setIsFeedQaBookmarked] = useState(false);
  const [isFeedQaLiked, setIsFeedQaLiked] = useState(false);
  const feedQaComments = useFeedQaComments();
  const {
    errorMessage,
    isLoading,
    isRefreshing,
    items,
    loadMore,
    refresh,
  } = useRouteFeed();

  const handleFeedQaRefresh = useCallback(async () => {
    await refresh();
    setIsFeedQaActionsVisible(true);
  }, [refresh]);

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
      <Button onPress={handleFeedQaRefresh} title="Feed QA Refresh" />
      <FeedQaRouteActions
        isBookmarked={isFeedQaBookmarked}
        isLiked={isFeedQaLiked}
        isVisible={isFeedQaActionsVisible}
        onOpenComments={feedQaComments.open}
        onToggleBookmark={() => setIsFeedQaBookmarked((current) => !current)}
        onToggleLike={() => setIsFeedQaLiked((current) => !current)}
        route={items[0] ?? null}
      />
      <FeedQaCommentEditor
        comments={feedQaComments.comments}
        content={feedQaComments.content}
        errorMessage={feedQaComments.errorMessage}
        isDeleting={feedQaComments.isDeleting}
        isLoading={feedQaComments.isLoading}
        isSaving={feedQaComments.isSaving}
        isVisible={feedQaComments.isVisible}
        onChangeContent={feedQaComments.setContent}
        onDelete={(routeId) => void feedQaComments.deleteSelected(routeId)}
        onSave={(routeId) => void feedQaComments.save(routeId)}
        onSelectComment={feedQaComments.selectComment}
        route={items[0] ?? null}
        selectedCommentId={feedQaComments.selectedCommentId}
      />
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

type FeedQaRouteActionsProps = {
  isBookmarked: boolean;
  isLiked: boolean;
  isVisible: boolean;
  onOpenComments: (routeId: number) => void;
  onToggleBookmark: () => void;
  onToggleLike: () => void;
  route: RouteFeedItem | null;
};

function FeedQaRouteActions({
  isBookmarked,
  isLiked,
  isVisible,
  onOpenComments,
  onToggleBookmark,
  onToggleLike,
  route,
}: FeedQaRouteActionsProps) {
  if (!isVisible) {
    return (
      <View style={styles.qaActionPanel}>
        <Text>Feed QA Actions</Text>
        <Text>Press Feed QA Refresh to show action buttons.</Text>
      </View>
    );
  }

  if (!route) {
    return (
      <View style={styles.qaActionPanel}>
        <Text>Feed QA Actions</Text>
        <Text>No Feed route is available for action buttons.</Text>
      </View>
    );
  }

  return (
    <View style={styles.qaActionPanel}>
      <Text>Feed QA Actions</Text>
      <Pressable
        accessibilityRole="button"
        onPress={() => void onOpenComments(route.route_id)}
        style={[styles.actionButton, styles.detailButton]}
      >
        <Text style={styles.actionButtonTextActive}>Open Route Detail / Comments</Text>
      </Pressable>
      <View style={styles.actionRow}>
        <Pressable
          accessibilityRole="button"
          onPress={onToggleLike}
          style={[
            styles.actionButton,
            isLiked ? styles.likeButtonActive : styles.actionButtonInactive,
          ]}
        >
          <Text
            style={[
              styles.actionButtonText,
              isLiked ? styles.actionButtonTextActive : null,
            ]}
          >
            {isLiked ? `Liked ${route.like_count + 1}` : `Like ${route.like_count}`}
          </Text>
        </Pressable>
        <Pressable
          accessibilityRole="button"
          onPress={onToggleBookmark}
          style={[
            styles.actionButton,
            isBookmarked ? styles.bookmarkButtonActive : styles.actionButtonInactive,
          ]}
        >
          <Text
            style={[
              styles.actionButtonText,
              isBookmarked ? styles.actionButtonTextActive : null,
            ]}
          >
            {isBookmarked
              ? `Bookmarked ${route.bookmark_count + 1}`
              : `Bookmark ${route.bookmark_count}`}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

type FeedQaCommentEditorProps = {
  comments: RouteComment[];
  content: string;
  errorMessage: string | null;
  isDeleting: boolean;
  isLoading: boolean;
  isSaving: boolean;
  isVisible: boolean;
  onChangeContent: (content: string) => void;
  onDelete: (routeId: number) => void;
  onSave: (routeId: number) => void;
  onSelectComment: (comment: RouteComment) => void;
  route: RouteFeedItem | null;
  selectedCommentId: number | null;
};

function FeedQaCommentEditor({
  comments,
  content,
  errorMessage,
  isDeleting,
  isLoading,
  isSaving,
  isVisible,
  onChangeContent,
  onDelete,
  onSave,
  onSelectComment,
  route,
  selectedCommentId,
}: FeedQaCommentEditorProps) {
  if (!isVisible || !route) {
    return null;
  }

  return (
    <View style={styles.commentPanel}>
      <View style={styles.commentEditorRow}>
        <TextInput
          multiline
          onChangeText={onChangeContent}
          placeholder="Write a comment"
          style={styles.commentInput}
          value={content}
        />
        <View style={styles.commentButtonColumn}>
          <Button
            disabled={isSaving}
            onPress={() => onSave(route.route_id)}
            title={isSaving ? "Saving" : "Save"}
          />
          <Button
            disabled={isDeleting}
            onPress={() => onDelete(route.route_id)}
            title={isDeleting ? "Deleting" : "Delete"}
          />
        </View>
      </View>
      {errorMessage ? <Text style={styles.commentError}>{errorMessage}</Text> : null}
      {isLoading ? <Text>Loading comments</Text> : null}
      {comments.length === 0 && !isLoading ? <Text>No comments</Text> : null}
      {comments.map((comment) => {
        const isSelected = comment.comment_id === selectedCommentId;

        return (
          <Pressable
            accessibilityRole="button"
            key={comment.comment_id}
            onPress={() => onSelectComment(comment)}
            style={[
              styles.commentRow,
              isSelected ? styles.commentRowSelected : null,
            ]}
          >
            <Text style={styles.commentAuthor}>
              {comment.user.nickname || comment.user.login_id}
            </Text>
            <Text>{comment.content}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  actionButton: {
    alignItems: "center",
    borderRadius: 8,
    borderWidth: 1,
    flex: 1,
    justifyContent: "center",
    minHeight: 44,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  actionButtonInactive: {
    backgroundColor: "#FFFFFF",
    borderColor: "#D1D5DB",
  },
  actionButtonText: {
    color: "#111827",
    fontSize: 15,
    fontWeight: "600",
  },
  actionButtonTextActive: {
    color: "#FFFFFF",
  },
  actionRow: {
    flexDirection: "row",
    gap: 8,
    marginTop: 8,
  },
  bookmarkButtonActive: {
    backgroundColor: "#2563EB",
    borderColor: "#2563EB",
  },
  commentAuthor: {
    fontSize: 12,
    fontWeight: "600",
    marginBottom: 4,
  },
  commentButtonColumn: {
    gap: 8,
    width: 96,
  },
  commentEditorRow: {
    alignItems: "stretch",
    flexDirection: "row",
    gap: 8,
  },
  commentError: {
    color: "#DC2626",
    marginTop: 8,
  },
  commentInput: {
    borderColor: "#D1D5DB",
    borderRadius: 8,
    borderWidth: 1,
    flex: 1,
    minHeight: 84,
    paddingHorizontal: 10,
    paddingVertical: 8,
    textAlignVertical: "top",
  },
  commentPanel: {
    borderColor: "#E5E7EB",
    borderTopWidth: 1,
    padding: 12,
  },
  commentRow: {
    borderColor: "#E5E7EB",
    borderRadius: 8,
    borderWidth: 1,
    marginTop: 8,
    padding: 10,
  },
  commentRowSelected: {
    backgroundColor: "#EFF6FF",
    borderColor: "#2563EB",
  },
  detailButton: {
    backgroundColor: "#111827",
    borderColor: "#111827",
    marginTop: 8,
  },
  likeButtonActive: {
    backgroundColor: "#DC2626",
    borderColor: "#DC2626",
  },
  qaActionPanel: {
    borderColor: "#E5E7EB",
    borderTopWidth: 1,
    padding: 12,
  },
});
