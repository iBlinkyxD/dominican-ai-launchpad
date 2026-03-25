import { academyAPI } from "./axios";

export type ActivityType =
  | "lesson_completed"
  | "badge_earned"
  | "course_enrolled"
  | "package_enrolled"
  | "post_created"
  | "post_liked"
  | "post_commented"
  | "user_followed";

export interface Activity {
  id: string;
  type: ActivityType;
  title: string;
  description: string | null;
  xp_earned: number;
  metadata: Record<string, string> | null;
  created_at: string;
}

export const getMyActivities = async (limit = 20): Promise<Activity[]> => {
  const res = await academyAPI.get("/activities/me", { params: { limit } });
  return res.data;
};

export const getUserActivities = async (
  daiaUserId: string,
  limit = 20
): Promise<Activity[]> => {
  const res = await academyAPI.get(`/activities/user/${daiaUserId}`, {
    params: { limit },
  });
  return res.data;
};