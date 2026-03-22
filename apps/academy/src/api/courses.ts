import api from "./axios";

export interface AcademyCourse {
  id: string;
  title: string;
  slug: string;
  code: string | null;
  description: string | null;
  thumbnail_url: string | null;
  level: "beginner" | "intermediate" | "advanced";
  instructor_id: string | null;
  is_published: boolean;
  total_lessons: number;
  total_duration_seconds: number;
  created_at: string;
  updated_at: string;
}
export const getCourses = async (): Promise<AcademyCourse[]> => {
  try {
    const res = await api.get("/courses");
    return res.data;
  } catch (err: any) {
    throw new Error(err.response?.data?.detail || "Failed to fetch courses");
  }
};

export const getCourseBySlug = async (slug: string): Promise<AcademyCourse> => {
  try {
    const res = await api.get(`/courses/${slug}`);
    return res.data;
  } catch (err: any) {
    throw new Error(err.response?.data?.detail || "Course not found");
  }
};

export const enrollCourse = async (courseId: string): Promise<void> => {
  try {
    await api.post(`/courses/${courseId}/enroll`);
  } catch (err: any) {
    throw new Error(err.response?.data?.detail || "Failed to enroll");
  }
};