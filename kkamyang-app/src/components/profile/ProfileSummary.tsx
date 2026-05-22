import { StyleSheet, Text, View } from "react-native";

import type { ProfileSummary as ProfileSummaryType, User } from "../../types/user";

type ProfileSummaryProps = {
  summary: ProfileSummaryType;
  user: User;
};

function formatValue(value: number | null, suffix = "") {
  return value === null ? "-" : `${value}${suffix}`;
}

export function ProfileSummary({ summary, user }: ProfileSummaryProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{user.nickname || "Profile"}</Text>
      <Text>Login ID: {user.login_id || "-"}</Text>
      <Text>Email: {user.email || "-"}</Text>
      <Text>Profile Image: {user.profile_image_url || "-"}</Text>
      <Text>Total Runs: {formatValue(summary.total_runs)}</Text>
      <Text>Total Distance: {formatValue(summary.total_distance_km, "km")}</Text>
      <Text>
        Total Duration: {formatValue(summary.total_duration_sec, "s")}
      </Text>
      <Text>Bookmarks: {formatValue(summary.bookmark_count)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
  },
});
