import { academyApi } from "./axios";

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
