import { Button, StyleSheet, Text, View } from "react-native";

type AsyncStateMessageProps = {
  message: string;
  onRetry?: () => void;
  retryLabel?: string;
};

export function AsyncStateMessage({
  message,
  onRetry,
  retryLabel = "Retry",
}: AsyncStateMessageProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.message}>{message}</Text>
      {onRetry ? <Button onPress={onRetry} title={retryLabel} /> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    gap: 8,
    padding: 16,
  },
  message: {
    color: "#374151",
    textAlign: "center",
  },
});
