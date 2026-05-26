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

function getCodeFromUrl(url: string) {
  const parsedUrl = Linking.parse(url);
  const code = parsedUrl.queryParams?.code;

  return Array.isArray(code) ? code[0] : code;
}

const oauthCallbackListeners = new Set<() => void>();
const exchangedOAuthCodes = new Set<string>();
let oauthCallbackSubscription: { remove: () => void } | null = null;
let hasCheckedInitialOAuthUrl = false;
let processingOAuthCode: string | null = null;

function emitOAuthCallback() {
  oauthCallbackListeners.forEach((listener) => {
    listener();
  });
}

export const authService = {
  async getSession() {
    if (!supabase) {
      console.log("[Auth] getSession skipped supabase not configured");
      return null;
    }

    const { data, error } = await supabase.auth.getSession();

    if (error) {
      console.log("[Auth] getSession error", error.message);
      throw error;
    }

    console.log("[Auth] getSession session exists", Boolean(data.session));
    console.log("[Auth] getSession user exists", Boolean(data.session?.user));

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

  onOAuthCallback(callback: () => void) {
    if (!supabase) {
      return {
        unsubscribe() {},
      };
    }

    oauthCallbackListeners.add(callback);

    const handleUrl = async (url: string | null) => {
      if (!url || !url.includes("auth/callback")) {
        return;
      }

      console.log("[Auth] callback received");

      try {
        const client = getSupabase();
        const code = getCodeFromUrl(url);

        console.log("[Auth] code exists", Boolean(code));

        if (!code) {
          return;
        }

        if (processingOAuthCode === code || exchangedOAuthCodes.has(code)) {
          console.log("[Auth] callback skipped duplicate");
          return;
        }

        processingOAuthCode = code;

        const { error } = await client.auth.exchangeCodeForSession(code);

        if (error) {
          console.log("[Auth] exchangeCodeForSession error", error.message);
          throw error;
        }

        console.log("[Auth] exchangeCodeForSession success");

        exchangedOAuthCodes.add(code);

        const { data, error: sessionError } = await client.auth.getSession();

        if (sessionError) {
          console.log("[Auth] callback getSession error", sessionError.message);
          throw sessionError;
        }

        console.log("[Auth] callback session exists", Boolean(data.session));
        console.log("[Auth] callback access token exists", Boolean(data.session?.access_token));
        console.log("[Auth] callback refresh token exists", Boolean(data.session?.refresh_token));
        console.log("[Auth] callback user exists", Boolean(data.session?.user));

        emitOAuthCallback();
      } catch (error) {
        console.log(
          "[Auth] error",
          error instanceof Error ? error.message : "AUTH_CALLBACK_ERROR",
        );
      } finally {
        processingOAuthCode = null;
      }
    };

    if (!oauthCallbackSubscription) {
      oauthCallbackSubscription = Linking.addEventListener("url", ({ url }) => {
        void handleUrl(url);
      });
    }

    if (!hasCheckedInitialOAuthUrl) {
      hasCheckedInitialOAuthUrl = true;
      void Linking.getInitialURL().then(handleUrl).catch((error: unknown) => {
        console.log(
          "[Auth] error",
          error instanceof Error ? error.message : "AUTH_INITIAL_URL_ERROR",
        );
      });
    }

    return {
      unsubscribe() {
        oauthCallbackListeners.delete(callback);

        if (oauthCallbackListeners.size === 0) {
          oauthCallbackSubscription?.remove();
          oauthCallbackSubscription = null;
        }
      },
    };
  },

  async signInWithGoogle() {
    const client = getSupabase();
    const redirectTo = Linking.createURL("auth/callback");

    console.log("[Auth] login start");
    console.log("[Auth] redirectTo", redirectTo);
    console.log("[Auth] supabase configured", Boolean(supabase));

    const { data, error } = await client.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo,
        skipBrowserRedirect: true,
      },
    });

    if (error) {
      console.log("[Auth] signInWithOAuth error", error.message);
      throw error;
    }

    console.log("[Auth] signInWithOAuth result url exists", Boolean(data.url));
    console.log("[Auth] signInWithOAuth result provider", data.provider ?? "unknown");

    if (data.url) {
      await Linking.openURL(data.url);
    }
  },

  async getCurrentUser(accessToken: string): Promise<User> {
    try {
      console.log("[Auth] users/me request start");
      console.log("[Auth] users/me access token exists", Boolean(accessToken));

      const user = await userService.getMe(accessToken);

      console.log("[Auth] users/me response user exists", Boolean(user));
      console.log("[Auth] users/me response login_id", user.login_id ? "not-null" : "null");

      return user;
    } catch (error) {
      console.log(
        "[Auth] error",
        error instanceof Error ? error.message : "AUTH_PROFILE_ERROR",
      );
      throw error;
    }
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
