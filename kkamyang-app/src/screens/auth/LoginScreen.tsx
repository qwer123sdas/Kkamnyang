import { Button, Text, View } from "react-native";

import { useAuth } from "../../hooks/useAuth";

export default function LoginScreen() {
  const { errorMessage, isSigningIn, signInWithGoogle } = useAuth();

  return (
    <View>
      <Text>Login Screen</Text>
      {errorMessage ? <Text>{errorMessage}</Text> : null}
      <Button
        disabled={isSigningIn}
        onPress={signInWithGoogle}
        title={isSigningIn ? "Opening Google Login" : "Continue with Google"}
      />
    </View>
  );
}
