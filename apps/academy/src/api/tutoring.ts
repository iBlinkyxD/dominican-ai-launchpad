import { academyAPI } from "./axios";

export type TutoringItemType = "session" | "assignment" | "quiz" | "notes";

export interface TutoringItem {
  id: string;
  tutoring_week_id: string;
  type: TutoringItemType;
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
  points_per_question: number;
  max_grade: number | null;
}

export interface QuizOption {
  id: string;
  text: string;
  is_correct: boolean;
  order: number;
}

export interface QuizQuestion {
  id: string;
  question_text: string;
  question_type: "multiple_choice" | "true_false";
  order: number;
  options: QuizOption[];
}

export interface QuizQuestionResult {
  question_id: string;
  correct: boolean;
  selected_option_id: string | null;
  correct_option_id: string | null;
}

export interface QuizSubmitResult {
  score: number;
  max_points: number;
  passed: boolean;
  passing_score: number;
  attempts_used: number;
  max_attempts: number;
  question_results: QuizQuestionResult[];
  submission: TutoringSubmission;
}

export interface TutoringWeek {
  id: string;
  enrollment_id: string;
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
  enrollment_count: number;
}

export interface EnrollmentWithWeeks {
  id: string;
  tutoring_course_id: string;
  student_id: string;
  enrolled_at: string;
  weeks: TutoringWeek[];
}

export interface TutoringSubmission {
  id: string;
  tutoring_item_id: string;
  student_id: string;
  content: string | null;
  file_url: string | null;
  grade: number | null;
  feedback: string | null;
  submitted_at: string;
  graded_at: string | null;
  attempt_count: number;
}

export const getMyTutoringCourses = async (): Promise<TutoringCourse[]> => {
  const res = await academyAPI.get("/tutoring/mine");
  return res.data;
};

export const getTutoringCourse = async (id: string): Promise<TutoringCourse> => {
  const res = await academyAPI.get(`/tutoring/${id}`);
  return res.data;
};

export const getMyEnrollment = async (courseId: string): Promise<EnrollmentWithWeeks> => {
  const res = await academyAPI.get(`/tutoring/${courseId}/my-enrollment`);
  return res.data;
};

export const getEnrollmentDetail = async (
  courseId: string,
  enrollmentId: string,
): Promise<EnrollmentWithWeeks> => {
  const res = await academyAPI.get(`/tutoring/${courseId}/enrollments/${enrollmentId}`);
  return res.data;
};

export const getMySubmissions = async (courseId: string): Promise<TutoringSubmission[]> => {
  const res = await academyAPI.get(`/tutoring/${courseId}/my-submissions`);
  return res.data;
};

export const submitAssignment = async (
  courseId: string,
  itemId: string,
  content: string,
): Promise<TutoringSubmission> => {
  const res = await academyAPI.post(`/tutoring/${courseId}/items/${itemId}/submit`, { content });
  return res.data;
};

export interface StudentSubmission {
  student_id: string;
  student_name: string;
  student_avatar: string | null;
  submission: TutoringSubmission | null;
}

export interface StudentInfo {
  enrollment_id: string;
  student_id: string;
  student_name: string;
  student_avatar: string | null;
}

export interface StudentOverview {
  enrollment_id: string;
  student_id: string;
  student_name: string;
  student_avatar: string | null;
  completed_count: number;
  total_count: number;
  next_item: { title: string; type: TutoringItemType; due_date: string | null } | null;
}

export const getCourseOverview = async (courseId: string): Promise<StudentOverview[]> => {
  const res = await academyAPI.get(`/tutoring/${courseId}/overview`);
  return res.data;
};

export const getEnrolledStudentsInfo = async (courseId: string): Promise<StudentInfo[]> => {
  const res = await academyAPI.get(`/tutoring/${courseId}/students/info`);
  return res.data;
};

export const getStudentCourseSubmissions = async (
  courseId: string,
  studentId: string,
): Promise<TutoringSubmission[]> => {
  const res = await academyAPI.get(`/tutoring/${courseId}/students/${studentId}/submissions`);
  return res.data;
};

export const getItemSubmissions = async (courseId: string, itemId: string): Promise<StudentSubmission[]> => {
  const res = await academyAPI.get(`/tutoring/${courseId}/items/${itemId}/submissions`);
  return res.data;
};

export const gradeSubmission = async (
  courseId: string,
  submissionId: string,
  grade: number,
  feedback?: string,
): Promise<TutoringSubmission> => {
  const res = await academyAPI.patch(`/tutoring/${courseId}/submissions/${submissionId}/grade`, { grade, feedback });
  return res.data;
};

// ── Teacher routes ────────────────────────────────────────────────────────────

export const addWeek = async (
  courseId: string,
  enrollmentId: string,
  data: { number: number; title: string; description?: string; order: number }
): Promise<TutoringWeek> => {
  const res = await academyAPI.post(`/tutoring/${courseId}/weeks`, { ...data, enrollment_id: enrollmentId });
  return res.data;
};

export const updateWeek = async (
  courseId: string,
  weekId: string,
  data: { title?: string; number?: number; description?: string | null }
): Promise<TutoringWeek> => {
  const res = await academyAPI.patch(`/tutoring/${courseId}/weeks/${weekId}`, data);
  return res.data;
};

export const deleteWeek = async (courseId: string, weekId: string): Promise<void> => {
  await academyAPI.delete(`/tutoring/${courseId}/weeks/${weekId}`);
};

export const addItem = async (
  courseId: string,
  weekId: string,
  data: {
    type: TutoringItemType;
    title: string;
    duration?: string;
    due_date?: string;
    is_locked?: boolean;
    order?: number;
    instructions?: string;
    meeting_link?: string;
    recording_link?: string;
    accept_late?: boolean;
    passing_score?: number;
    max_attempts?: number;
    time_limit_minutes?: number;
    show_answers?: boolean;
    points_per_question?: number;
    max_grade?: number;
  }
): Promise<TutoringItem> => {
  const res = await academyAPI.post(`/tutoring/${courseId}/weeks/${weekId}/items`, data);
  return res.data;
};

export const updateItem = async (
  courseId: string,
  itemId: string,
  data: Partial<TutoringItem>
): Promise<TutoringItem> => {
  const res = await academyAPI.patch(`/tutoring/${courseId}/items/${itemId}`, data);
  return res.data;
};

export const deleteItem = async (courseId: string, itemId: string): Promise<void> => {
  await academyAPI.delete(`/tutoring/${courseId}/items/${itemId}`);
};

// ── Quiz ─────────────────────────────────────────────────────────────────────

export interface QuizQuestionDraft {
  question_text: string;
  question_type: "multiple_choice" | "true_false";
  order: number;
  options: { text: string; is_correct: boolean; order: number }[];
}

export const getQuiz = async (courseId: string, itemId: string): Promise<QuizQuestion[]> => {
  const res = await academyAPI.get(`/tutoring/${courseId}/items/${itemId}/quiz`);
  return res.data;
};

export const updateQuiz = async (
  courseId: string,
  itemId: string,
  questions: QuizQuestionDraft[],
): Promise<QuizQuestion[]> => {
  const res = await academyAPI.put(`/tutoring/${courseId}/items/${itemId}/quiz`, { questions });
  return res.data;
};

export const submitQuiz = async (
  courseId: string,
  itemId: string,
  answers: Record<string, string>,
): Promise<QuizSubmitResult> => {
  const res = await academyAPI.post(`/tutoring/${courseId}/items/${itemId}/quiz/submit`, { answers });
  return res.data;
};
