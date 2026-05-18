import { academyApi } from "./axios";

export interface TutoringItem {
  id: string;
  tutoring_week_id: string;
  type: "session" | "assignment" | "quiz" | "notes";
  title: string;
  duration: string | null;
  due_date: string | null;
  is_locked: boolean;
  order: number;
  instructions: string | null;
  meeting_link: string | null;
  recording_link: string | null;
  accept_late: boolean;
  passing_score: number;
  max_attempts: number;
  time_limit_minutes: number | null;
  show_answers: boolean;
  points_per_question?: number;
  max_grade?: number | null;
}

export interface TutoringWeek {
  id: string;
  tutoring_course_id: string;
  number: number;
  title: string;
  description: string | null;
  order: number;
  items: TutoringItem[];
}

export interface TutoringCourse {
  id: string;
  title: string;
  description: string | null;
  price: number;
  teacher_id: string | null;
  instructor_name: string | null;
  thumbnail_url: string | null;
  is_active: boolean;
  created_at: string;
  weeks: TutoringWeek[];
  enrollment_count: number;
}

export interface TutoringEnrollment {
  id: string;
  tutoring_course_id: string;
  student_id: string;
  enrolled_at: string;
}

// Courses
export const getTutoringCourses = async (): Promise<TutoringCourse[]> => {
  const res = await academyApi.get("/tutoring/admin/all");
  return res.data;
};

export const createTutoringCourse = async (data: {
  title: string;
  description?: string;
  price: number;
  teacher_id?: string;
  instructor_name?: string;
  is_active?: boolean;
}): Promise<TutoringCourse> => {
  const res = await academyApi.post("/tutoring/", data);
  return res.data;
};

export const updateTutoringCourse = async (
  id: string,
  data: Partial<TutoringCourse>
): Promise<TutoringCourse> => {
  const res = await academyApi.patch(`/tutoring/${id}`, data);
  return res.data;
};

export const uploadTutoringThumbnail = async (
  id: string,
  file: File
): Promise<string> => {
  const form = new FormData();
  form.append("file", file);
  const res = await academyApi.post(`/tutoring/${id}/thumbnail`, form, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data.thumbnail_url;
};

// Weeks
export const addWeek = async (
  courseId: string,
  data: { number: number; title: string; order: number }
): Promise<TutoringWeek> => {
  const res = await academyApi.post(`/tutoring/${courseId}/weeks`, data);
  return res.data;
};

export const updateWeek = async (
  courseId: string,
  weekId: string,
  data: Partial<TutoringWeek>
): Promise<TutoringWeek> => {
  const res = await academyApi.patch(`/tutoring/${courseId}/weeks/${weekId}`, data);
  return res.data;
};

export const deleteWeek = async (courseId: string, weekId: string): Promise<void> => {
  await academyApi.delete(`/tutoring/${courseId}/weeks/${weekId}`);
};

// Items
export const addItem = async (
  courseId: string,
  weekId: string,
  data: Omit<TutoringItem, "id" | "tutoring_week_id">
): Promise<TutoringItem> => {
  const res = await academyApi.post(`/tutoring/${courseId}/weeks/${weekId}/items`, data);
  return res.data;
};

export const updateItem = async (
  courseId: string,
  itemId: string,
  data: Partial<TutoringItem>
): Promise<TutoringItem> => {
  const res = await academyApi.patch(`/tutoring/${courseId}/items/${itemId}`, data);
  return res.data;
};

export const deleteItem = async (courseId: string, itemId: string): Promise<void> => {
  await academyApi.delete(`/tutoring/${courseId}/items/${itemId}`);
};

// Enrollments
export const enrollStudent = async (
  courseId: string,
  studentId: string
): Promise<TutoringEnrollment> => {
  const res = await academyApi.post(`/tutoring/${courseId}/enroll`, { student_id: studentId });
  return res.data;
};

export const listStudents = async (courseId: string): Promise<TutoringEnrollment[]> => {
  const res = await academyApi.get(`/tutoring/${courseId}/students`);
  return res.data;
};

export const unenrollStudent = async (courseId: string, studentId: string): Promise<void> => {
  await academyApi.delete(`/tutoring/${courseId}/students/${studentId}`);
};
