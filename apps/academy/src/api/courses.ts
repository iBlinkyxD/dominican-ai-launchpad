import { academyAPI } from "./axios";

export interface AcademyCourse {
  id: string;
  title: string;
  slug: string;
  code: string | null;
  description: string | null;
  thumbnail_url: string | null;
  badge_url: string | null;
  level: "beginner" | "intermediate" | "advanced";
  instructor_id: string | null;
  instructor_name: string | null;
  is_published: boolean;
  total_lessons: number;
  total_duration_seconds: number;
  enrollment_count: number;
  avg_rating: number | null;
  review_count: number;
  created_at: string;
  updated_at: string;
}

export type LessonType = "video" | "article" | "quiz" | "assignment";

export interface VocabularyEntry {
  term: string;
  definition: string;
  term_es?: string;
}

export interface LessonRead {
  id: string;
  title: string;
  duration_seconds: number | null;
  position: number;
  content?: string | null;
  video_url?: string | null;
  lesson_type?: LessonType | null;
  objectives?: string[] | null;
  vocabulary?: VocabularyEntry[] | null;
}

export interface ModuleRead {
  id: string;
  title: string;
  description: string | null;
  position: number;
  lessons: LessonRead[];
}

export interface AcademyCourseDetail extends AcademyCourse {
  short_description: string | null;
  faq: string | null;
  modules: ModuleRead[];
}

export const getCourses = async (): Promise<AcademyCourse[]> => {
  try {
    const res = await academyAPI.get("/courses/");
    return res.data;
  } catch (err: any) {
    throw new Error(err.response?.data?.detail || "Failed to fetch courses");
  }
};

export const getCourseBySlug = async (slug: string): Promise<AcademyCourseDetail> => {
  try {
    const res = await academyAPI.get(`/courses/${slug}`);
    return res.data;
  } catch (err: any) {
    throw new Error(err.response?.data?.detail || "Course not found");
  }
};

export const submitRating = async (slug: string, score: number): Promise<void> => {
  try {
    await academyAPI.post(`/courses/${slug}/rate`, { score });
  } catch (err: any) {
    throw new Error(err.response?.data?.detail || "Failed to submit rating");
  }
};

export const getEnrolledCourses = async (): Promise<AcademyCourse[]> => {
  try {
    const res = await academyAPI.get("/courses/enrolled");
    return res.data;
  } catch (err: any) {
    if (err.response?.status === 401 || err.response?.status === 403) return [];
    throw new Error(err.response?.data?.detail || "Failed to fetch enrolled courses");
  }
};

export const enrollCourse = async (courseId: string): Promise<void> => {
  try {
    await academyAPI.post(`/courses/${courseId}/enroll`);
  } catch (err: any) {
    throw new Error(err.response?.data?.detail || "Failed to enroll");
  }
};