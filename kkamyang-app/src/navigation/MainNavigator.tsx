import { createNativeStackNavigator } from "@react-navigation/native-stack";

import BookmarkScreen from "../screens/bookmark/BookmarkScreen";
import ProfileScreen from "../screens/profile/ProfileScreen";
import RecordScreen from "../screens/record/RecordScreen";
import MyRoutesScreen from "../screens/route/MyRoutesScreen";
import RouteClusterScreen from "../screens/route/RouteClusterScreen";
import RouteDetailScreen from "../screens/route/RouteDetailScreen";
import RouteFeedScreen from "../screens/route/RouteFeedScreen";
import RouteHistoryScreen from "../screens/route/RouteHistoryScreen";

export type MainStackParamList = {
  RouteFeed: undefined;
  RouteDetail: undefined;
  RouteCluster: undefined;
  RouteHistory: undefined;
  MyRoutes: undefined;
  Record: undefined;
  Bookmark: undefined;
  Profile: undefined;
};

const Stack = createNativeStackNavigator<MainStackParamList>();

export default function MainNavigator() {
  return (
    <Stack.Navigator initialRouteName="RouteFeed">
      <Stack.Screen name="RouteFeed" component={RouteFeedScreen} />
      <Stack.Screen name="RouteDetail" component={RouteDetailScreen} />
      <Stack.Screen name="RouteCluster" component={RouteClusterScreen} />
      <Stack.Screen name="RouteHistory" component={RouteHistoryScreen} />
      <Stack.Screen name="MyRoutes" component={MyRoutesScreen} />
      <Stack.Screen name="Record" component={RecordScreen} />
      <Stack.Screen name="Bookmark" component={BookmarkScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
    </Stack.Navigator>
  );
}
