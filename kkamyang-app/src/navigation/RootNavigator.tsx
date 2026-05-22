import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { useAuth } from "../hooks/useAuth";
import LoginIdSetupScreen from "../screens/auth/LoginIdSetupScreen";
import AuthNavigator from "./AuthNavigator";
import MainNavigator from "./MainNavigator";

export type RootStackParamList = {
  Auth: undefined;
  LoginIdSetup: undefined;
  Main: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  const { isAuthenticated, isLoading, requiresLoginId } = useAuth();

  if (isLoading) {
    return null;
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!isAuthenticated ? (
        <Stack.Screen name="Auth" component={AuthNavigator} />
      ) : requiresLoginId ? (
        <Stack.Screen name="LoginIdSetup" component={LoginIdSetupScreen} />
      ) : (
        <Stack.Screen name="Main" component={MainNavigator} />
      )}
    </Stack.Navigator>
  );
}
