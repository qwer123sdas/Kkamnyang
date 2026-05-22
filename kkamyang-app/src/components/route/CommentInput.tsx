import { useState } from "react";
import { Button, StyleSheet, TextInput, View } from "react-native";

type CommentInputProps = {
  isCreating: boolean;
  onSubmit: (content: string) => Promise<boolean>;
};

export function CommentInput({ isCreating, onSubmit }: CommentInputProps) {
  const [content, setContent] = useState("");

  async function handleSubmit() {
    const created = await onSubmit(content);

    if (created) {
      setContent("");
    }
  }

  return (
    <View style={styles.container}>
      <TextInput
        multiline
        onChangeText={setContent}
        placeholder="Write a comment"
        style={styles.input}
        value={content}
      />
      <Button
        disabled={isCreating}
        onPress={handleSubmit}
        title={isCreating ? "Posting" : "Post Comment"}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  input: {
    borderColor: "#D1D5DB",
    borderWidth: 1,
    minHeight: 72,
    padding: 8,
  },
});
