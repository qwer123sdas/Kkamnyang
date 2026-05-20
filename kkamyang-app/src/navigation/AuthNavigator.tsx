import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginIdSetupScreen from "../screens/auth/LoginIdSetupScreen";
import LoginScreen from "../screens/auth/LoginScreen";

export type AuthStackParamList = {
  Login: undefined;
  LoginIdSetup: undefined;
};

const Stack = createNativeStackNavigator<AuthStackParamList>();

export default function AuthNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="LoginIdSetup" component={LoginIdSetupScreen} />
    </Stack.Navigator>
  );
}
