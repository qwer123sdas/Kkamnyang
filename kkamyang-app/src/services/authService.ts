import * as Linking from "expo-linking";

import { supabase } from "../config/supabase";
import { apiClient } from "./apiClient";
import type { LoginIdSetupResponse, User } from "../types/user";
import { userService } from "./userService";

export const LOGIN_ID_PATTERN = /^[a-z0-9_]{4,30}$/;

function getSupabase() {
  if (!supabase) {
    throw new Error("SUPABASE_NOT_CONFIGURED");
  }

  return supabase;
}

export const authService = {
  async getSession() {
    if (!supabase) {
      return null;
    }

    const { data, error } = await supabase.auth.getSession();

    if (error) {
      throw error;
    }

    return data.session;
  },

  onAuthStateChange(callback: () => void) {
    if (!supabase) {
      return {
        unsubscribe() {},
      };
    }

    const { data } = supabase.auth.onAuthStateChange(() => {
      callback();
    });

    return data.subscription;
  },

  async signInWithGoogle() {
    const client = getSupabase();
    const { data, error } = await client.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: Linking.createURL("auth/callback"),
        skipBrowserRedirect: true,
      },
    });

    if (error) {
      throw error;
    }

    if (data.url) {
      await Linking.openURL(data.url);
    }
  },

  async getCurrentUser(accessToken: string): Promise<User> {
    return userService.getMe(accessToken);
  },

  async setLoginId(accessToken: string, loginId: string) {
    if (!LOGIN_ID_PATTERN.test(loginId)) {
      throw new Error("INVALID_LOGIN_ID");
    }

    return apiClient.post<LoginIdSetupResponse, { login_id: string }>(
      "/users/me/login-id",
      { login_id: loginId },
      accessToken,
    );
  },
};
