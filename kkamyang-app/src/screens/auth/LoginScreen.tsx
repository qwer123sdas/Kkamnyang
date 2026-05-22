import { Button, Text, View } from "react-native";

import { useAuth } from "../../hooks/useAuth";

export default function LoginScreen() {
  const { errorMessage, signInWithGoogle } = useAuth();

  return (
    <View>
      <Text>Login Screen</Text>
      {errorMessage ? <Text>{errorMessage}</Text> : null}
      <Button onPress={signInWithGoogle} title="Continue with Google" />
    </View>
  );
}
