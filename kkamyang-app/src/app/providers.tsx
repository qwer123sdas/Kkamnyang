import { NavigationContainer } from "@react-navigation/native";
import type { PropsWithChildren } from "react";

export default function Providers({ children }: PropsWithChildren) {
  return <NavigationContainer>{children}</NavigationContainer>;
}
