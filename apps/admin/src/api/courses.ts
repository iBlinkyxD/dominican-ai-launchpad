import { academyApi } from "./axios";

// ── Admin course list ──────────────────────────────────────────────────────────

export interface AdminCourse {
  id: string;
  title: string;
  slug: string;
  code: string | null;
  short_description: string | null;
  thumbnail_url: string | null;
  badge_url: string | null;
  is_published: boolean;
  module_count: number;
  total_lessons: number;
  has_video: boolean;
  enrollment_count: number;
  created_at: string;
}

export const getAdminCourses = async (): Promise<AdminCourse[]> => {
  const res = await academyApi.get("/courses/admin/all");
  return res.data;
};

// ── AI course generation ───────────────────────────────────────────────────────

export interface GenerateCourseRequest {
  description: string;
  level: string;
  language: string;
  duration: string;
  module_count: number;
  avg_lessons_per_module: number;
  avg_lesson_length: number;
  include_assessments: boolean;
  include_projects: boolean;
  course_code?: string;
  badge_name?: string;
}

export interface LessonOutline {
  name: string;
  overview: string;
}

export interface ModuleOutline {
  title: string;
  lessons: LessonOutline[];
}

export interface GenerateCourseResponse {
  title: string;
  short_description: string;
  modules: ModuleOutline[];
  faq: string;
}

export const generateCourseOutline = async (
  req: GenerateCourseRequest,
): Promise<GenerateCourseResponse> => {
  const res = await academyApi.post("/courses/ai-generate", req);
  return res.data;
};

// ── Course / module / lesson creation ─────────────────────────────────────────

export interface CreateCoursePayload {
  title: string;
  slug: string;
  description?: string;
  short_description?: string;
  level: string;
  instructor_name?: string;
  code?: string;
  is_published: boolean;
}

export interface CreateModulePayload {
  course_id: string;
  title: string;
  position: number;
}

export interface CreateLessonPayload {
  module_id: string;
  title: string;
  content?: string;
  duration_seconds?: number;
  lesson_type: string;
  position: number;
}

export const createCourse = async (payload: CreateCoursePayload): Promise<{ id: string }> => {
  const res = await academyApi.post("/courses/", payload);
  return res.data;
};

export const createModule = async (payload: CreateModulePayload): Promise<{ id: string }> => {
  const res = await academyApi.post("/modules/", payload);
  return res.data;
};

export const createLesson = async (payload: CreateLessonPayload): Promise<{ id: string }> => {
  const res = await academyApi.post("/lessons/", payload);
  return res.data;
};
