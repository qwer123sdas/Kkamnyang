export type User = {
  user_id: string;
  login_id: string | null;
  email: string | null;
  nickname: string | null;
  profile_image_url: string | null;
};

export type LoginIdSetupResponse = {
  login_id: string;
};

export type ProfileSummary = {
  total_runs: number | null;
  total_distance_km: number | null;
  total_duration_sec: number | null;
  bookmark_count: number | null;
};
