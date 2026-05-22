import { supabase } from "../config/supabase";
import { apiClient } from "./apiClient";
import type { LoginIdSetupResponse, User } from "../types/user";
import { userService } from "./userService";

export const LOGIN_ID_PATTERN = /^[a-z0-9_]{4,30}$/;

export const authService = {
  async getSession() {
    const { data, error } = await supabase.auth.getSession();

    if (error) {
      throw error;
    }

    return data.session;
  },

  onAuthStateChange(callback: () => void) {
    const { data } = supabase.auth.onAuthStateChange(() => {
      callback();
    });

    return data.subscription;
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
