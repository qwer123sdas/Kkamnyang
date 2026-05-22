import { useState } from "react";
import { Button, Text, TextInput, View } from "react-native";

import { useAuth } from "../../hooks/useAuth";
import { LOGIN_ID_PATTERN } from "../../services/authService";

export default function LoginIdSetupScreen() {
  const { setLoginId } = useAuth();
  const [loginId, setLoginIdValue] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isValidLoginId = LOGIN_ID_PATTERN.test(loginId);

  const handleSubmit = async () => {
    if (!isValidLoginId) {
      setMessage("INVALID_LOGIN_ID");
      return;
    }

    setIsSubmitting(true);
    setMessage(null);

    try {
      await setLoginId(loginId);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "VALIDATION_ERROR");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View>
      <Text>Login ID Setup Screen</Text>
      <TextInput
        autoCapitalize="none"
        autoCorrect={false}
        onChangeText={setLoginIdValue}
        value={loginId}
      />
      {message ? <Text>{message}</Text> : null}
      <Button
        disabled={!isValidLoginId || isSubmitting}
        onPress={handleSubmit}
        title="Set Login ID"
      />
    </View>
  );
}
