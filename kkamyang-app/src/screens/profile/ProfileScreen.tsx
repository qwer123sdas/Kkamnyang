import { Button, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { ProfileSummary } from "../../components/profile/ProfileSummary";
import { useProfile } from "../../hooks/useProfile";
import type { MainStackParamList } from "../../navigation/MainNavigator";

export default function ProfileScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<MainStackParamList>>();
  const { errorMessage, isLoading, summary, user } = useProfile();

  return (
    <View>
      <Text>Profile Screen</Text>
      {isLoading ? <Text>Loading profile</Text> : null}
      {errorMessage ? <Text>{errorMessage}</Text> : null}
      {user ? <ProfileSummary summary={summary} user={user} /> : null}
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
