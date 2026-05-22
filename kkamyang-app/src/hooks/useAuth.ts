import { useCallback, useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";

import { authService } from "../services/authService";
import type { User } from "../types/user";

type AuthState = {
  session: Session | null;
  user: User | null;
  isLoading: boolean;
  errorMessage: string | null;
};

const authState: AuthState = {
  session: null,
  user: null,
  isLoading: true,
  errorMessage: null,
};

const listeners = new Set<() => void>();
let authLoadPromise: Promise<void> | null = null;

function emitChange() {
  listeners.forEach((listener) => {
    listener();
  });
}

function setAuthState(nextState: Partial<AuthState>) {
  Object.assign(authState, nextState);
  emitChange();
}

async function loadAuthStateInternal() {
  setAuthState({ isLoading: true, errorMessage: null });

  try {
    const session = await authService.getSession();

    if (!session) {
      setAuthState({ session: null, user: null, isLoading: false });
      return;
    }

    setAuthState({ session, user: null, isLoading: false });

    try {
      const user = await authService.getCurrentUser(session.access_token);
      setAuthState({ session, user, isLoading: false });
    } catch (error) {
      setAuthState({
        session,
        user: null,
        isLoading: false,
        errorMessage:
          error instanceof Error ? error.message : "AUTH_PROFILE_ERROR",
      });
    }
  } catch (error) {
    setAuthState({
      session: null,
      user: null,
      isLoading: false,
      errorMessage: error instanceof Error ? error.message : "AUTH_ERROR",
    });
  }
}

async function loadAuthState() {
  if (!authLoadPromise) {
    authLoadPromise = loadAuthStateInternal().finally(() => {
      authLoadPromise = null;
    });
  }

  await authLoadPromise;
}

export function useAuth() {
  const [state, setState] = useState<AuthState>({ ...authState });

  useEffect(() => {
    const listener = () => {
      setState({ ...authState });
    };

    listeners.add(listener);

    if (authState.isLoading) {
      loadAuthState();
    }

    const subscription = authService.onAuthStateChange(() => {
      loadAuthState();
    });
    const callbackSubscription = authService.onOAuthCallback(() => {
      loadAuthState();
    });

    return () => {
      listeners.delete(listener);
      subscription.unsubscribe();
      callbackSubscription.unsubscribe();
    };
  }, []);

  const refresh = useCallback(async () => {
    await loadAuthState();
  }, []);

  const setLoginId = useCallback(
    async (loginId: string) => {
      if (!state.session) {
        throw new Error("AUTH_REQUIRED");
      }

      await authService.setLoginId(state.session.access_token, loginId);
      await loadAuthState();
    },
    [state.session],
  );

  const signInWithGoogle = useCallback(async () => {
    await authService.signInWithGoogle();
  }, []);

  return {
    ...state,
    isAuthenticated: Boolean(state.session),
    requiresLoginId: Boolean(state.session && !state.user?.login_id),
    refresh,
    signInWithGoogle,
    setLoginId,
  };
}
