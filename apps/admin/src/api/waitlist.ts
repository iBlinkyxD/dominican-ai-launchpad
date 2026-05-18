import { daiaApi } from "./axios";

export interface Teacher {
  id:         string;
  first_name: string;
  last_name:  string;
  email:      string;
}

export type WaitlistStatus = "pending" | "assigned" | "active" | "reassigning" | "cancelled";

export interface WaitlistRecord {
  id:                string;
  first_name:        string;
  last_name:         string;
  email:             string;
  goal:              string | null;
  availability:      string | null;
  status:            WaitlistStatus;
  professor_user_id: string | null;
  professor_name:    string | null;
  created_at:        string;
}

export interface AssignProfessorPayload {
  professor_user_id: string;
  professor_email:   string;
  professor_name:    string;
}

export const getWaitlist = (status?: WaitlistStatus): Promise<WaitlistRecord[]> =>
  daiaApi.get("/waitlist/admin", { params: status ? { status } : {} }).then(r => r.data);

export const assignProfessor = (waitlistId: string, payload: AssignProfessorPayload): Promise<void> =>
  daiaApi.post(`/waitlist/admin/${waitlistId}/assign`, payload).then(r => r.data);

export const getTeachers = (): Promise<Teacher[]> =>
  daiaApi.get("/users/teachers").then(r => r.data);
