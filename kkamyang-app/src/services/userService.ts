import type { User } from "../types/user";
import { apiClient } from "./apiClient";

export const userService = {
  async getMe(accessToken: string): Promise<User> {
    return apiClient.get<User>("/users/me", accessToken);
  },
};
