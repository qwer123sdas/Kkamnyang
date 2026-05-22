import { Button, StyleSheet, Text, View } from "react-native";

import type { RouteComment } from "../../types/route";

type CommentListProps = {
  comments: RouteComment[];
  hasNext: boolean;
  isLoading: boolean;
  onLoadMore: () => void;
};

export function CommentList({
  comments,
  hasNext,
  isLoading,
  onLoadMore,
}: CommentListProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Comments</Text>
      {comments.length === 0 ? <Text>No comments</Text> : null}
      {comments.map((comment) => {
        const author =
          comment.user.nickname || comment.user.login_id || "Unknown";

        return (
          <View key={comment.comment_id} style={styles.comment}>
            <Text>{comment.content}</Text>
            <Text>By {author}</Text>
            <Text>{comment.created_at}</Text>
          </View>
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
    borderTopColor: "#E5E7EB",
    borderTopWidth: 1,
    paddingVertical: 8,
  },
  container: {
    padding: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
  },
});
