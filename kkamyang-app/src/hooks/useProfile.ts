import { useCallback, useEffect, useState } from "react";

import { userService } from "../services/userService";
import type { ProfileSummary, User } from "../types/user";
import { useAuth } from "./useAuth";

const PROFILE_SUMMARY_PLACEHOLDER: ProfileSummary = {
  total_runs: null,
  total_distance_km: null,
  total_duration_sec: null,
  bookmark_count: null,
};

export function useProfile() {
  const { session } = useAuth();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [summary] = useState<ProfileSummary>(PROFILE_SUMMARY_PLACEHOLDER);
  const [user, setUser] = useState<User | null>(null);

  const load = useCallback(async () => {
    if (!session) {
      setUser(null);
      setErrorMessage("AUTH_REQUIRED");
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);

    try {
      const profile = await userService.getMe(session.access_token);
      setUser(profile);
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "PROFILE_LOAD_FAILED",
      );
    } finally {
      setIsLoading(false);
    }
  }, [session]);

  useEffect(() => {
    void load();
  }, [load]);

  return {
    errorMessage,
    isLoading,
    refresh: load,
    summary,
    user,
  };
}
