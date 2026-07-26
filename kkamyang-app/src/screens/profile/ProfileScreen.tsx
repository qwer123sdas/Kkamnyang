import { Button, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { ProfileSummary } from "../../components/profile/ProfileSummary";
import { AsyncStateMessage } from "../../components/common/AsyncStateMessage";
import { useProfile } from "../../hooks/useProfile";
import type { MainStackParamList } from "../../navigation/MainNavigator";

export default function ProfileScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<MainStackParamList>>();
  const { errorMessage, isLoading, refresh, summary, user } = useProfile();

  return (
    <View>
      <Text>Profile Screen</Text>
      {isLoading ? <AsyncStateMessage message="Loading profile" /> : null}
      {errorMessage ? (
        <AsyncStateMessage message={errorMessage} onRetry={() => void refresh()} />
      ) : null}
      {user ? <ProfileSummary summary={summary} user={user} /> : null}
      {!isLoading && !errorMessage && !user ? (
        <AsyncStateMessage message="Profile is not available" />
      ) : null}
      <Button
        onPress={() => navigation.navigate("MyRoutes")}
        title="My Routes"
      />
      <Button
        onPress={() => navigation.navigate("Bookmark")}
        title="Bookmarks"
      />
    </View>
  );
}
