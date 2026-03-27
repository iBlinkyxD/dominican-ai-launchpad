import { academyAPI } from "./axios";

export interface Notification {
  id: string;
  type: string;
  title: string;
  body: string | null;
  resource_id: string | null;
  resource_type: string | null;
  is_read: boolean;
  created_at: string;
}

export const getNotifications = async (): Promise<Notification[]> => {
  const res = await academyAPI.get("/notifications/");
  return res.data;
};

export const markNotificationRead = async (id: string): Promise<void> => {
  await academyAPI.patch(`/notifications/${id}/read`);
};

export const markAllNotificationsRead = async (): Promise<void> => {
  await academyAPI.patch("/notifications/read-all");
};
