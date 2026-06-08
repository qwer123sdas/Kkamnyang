import { Button, StyleSheet, Text, TextInput, View } from "react-native";

type CommentInputProps = {
  content: string;
  isDeleting: boolean;
  isSaving: boolean;
  onChangeContent: (content: string) => void;
  onClear: () => void;
  onDelete: () => void;
  onSave: () => void;
  selectedCommentId: number | null;
};

export function CommentInput({
  content,
  isDeleting,
  isSaving,
  onChangeContent,
  onClear,
  onDelete,
  onSave,
  selectedCommentId,
}: CommentInputProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.modeText}>
        {selectedCommentId ? "Edit selected comment" : "New comment"}
      </Text>
      <TextInput
        multiline
        onChangeText={onChangeContent}
        placeholder="Write a comment"
        style={styles.input}
        value={content}
      />
      <View style={styles.buttonRow}>
        <Button
          disabled={isSaving}
          onPress={onSave}
          title={isSaving ? "Saving" : "Save"}
        />
        <Button onPress={onClear} title="Clear" />
        <Button
          disabled={isDeleting || !selectedCommentId}
          onPress={onDelete}
          title={isDeleting ? "Deleting" : "Delete"}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonRow: {
    flexDirection: "row",
    gap: 8,
    marginTop: 8,
  },
  container: {
    padding: 16,
  },
  input: {
    borderColor: "#D1D5DB",
    borderWidth: 1,
    minHeight: 72,
    padding: 8,
  },
  modeText: {
    fontSize: 13,
    fontWeight: "600",
    marginBottom: 6,
  },
});
