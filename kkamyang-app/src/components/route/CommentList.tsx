import { Button, Pressable, StyleSheet, Text, View } from "react-native";

import type { RouteComment } from "../../types/route";

type CommentListProps = {
  comments: RouteComment[];
  hasNext: boolean;
  isLoading: boolean;
  onLoadMore: () => void;
  onSelectComment: (comment: RouteComment) => void;
  selectedCommentId: number | null;
};

export function CommentList({
  comments,
  hasNext,
  isLoading,
  onLoadMore,
  onSelectComment,
  selectedCommentId,
}: CommentListProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Comments</Text>
      {comments.length === 0 ? <Text>No comments</Text> : null}
      {comments.map((comment) => {
        const author =
          comment.user.nickname || comment.user.login_id || "Unknown";
        const isSelected = comment.comment_id === selectedCommentId;

        return (
          <Pressable
            accessibilityRole="button"
            key={comment.comment_id}
            onPress={() => onSelectComment(comment)}
            style={[styles.comment, isSelected ? styles.commentSelected : null]}
          >
            <Text>{comment.content}</Text>
            <Text>By {author}</Text>
            <Text>{comment.created_at}</Text>
          </Pressable>
        );
      })}
      {hasNext ? (
        <Button
          disabled={isLoading}
          onPress={onLoadMore}
          title={isLoading ? "Loading comments" : "Load more comments"}
        />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  comment: {
    borderColor: "#E5E7EB",
    borderRadius: 8,
    borderWidth: 1,
    borderTopColor: "#E5E7EB",
    borderTopWidth: 1,
    marginTop: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  commentSelected: {
    backgroundColor: "#EFF6FF",
    borderColor: "#2563EB",
  },
  container: {
    padding: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
  },
});
