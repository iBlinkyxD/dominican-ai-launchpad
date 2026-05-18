import { daiaAPI } from "./axios";

export interface PendingAssignment {
  id:           string;
  first_name:   string;
  last_name:    string;
  email:        string;
  goal:         string | null;
  availability: string | null;
  created_at:   string;
}

export const getMyAssignments = (): Promise<PendingAssignment[]> =>
  daiaAPI.get("/waitlist/my-assignments").then(r => r.data);

export const respondToAssignment = (
  id: string,
  action: "accept" | "decline",
): Promise<{ message: string }> =>
  daiaAPI.post(`/waitlist/my-assignments/${id}/respond?action=${action}`).then(r => r.data);
