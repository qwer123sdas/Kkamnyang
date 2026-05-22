import { ACTIVITY_TYPES } from "../constants/activity";
import type {
  Activity,
  ActivityFinishRequest,
  ActivityFinishResponse,
  ActivityStartRequest,
} from "../types/activity";
import { apiClient } from "./apiClient";

export const activityService = {
  async start(accessToken: string): Promise<Activity> {
    const body: ActivityStartRequest = {
      activity_type: ACTIVITY_TYPES.RUN,
    };

    return apiClient.post<Activity, ActivityStartRequest>(
      "/activities/start",
      body,
      accessToken,
    );
  },

  async finish(
    activityId: number,
    body: ActivityFinishRequest,
    accessToken: string,
  ): Promise<ActivityFinishResponse> {
    return apiClient.post<ActivityFinishResponse, ActivityFinishRequest>(
      `/activities/${activityId}/finish`,
      body,
      accessToken,
    );
  },
};
