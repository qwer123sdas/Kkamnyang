export const ACTIVITY_TYPES = {
  RUN: "RUN",
} as const;

export type ActivityType = (typeof ACTIVITY_TYPES)[keyof typeof ACTIVITY_TYPES];
