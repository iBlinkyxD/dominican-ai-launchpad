import api from "./axios";

export interface PackageItem {
  id: string;
  title: string;
  image: string | null;
  courseNumber: string;
}

export interface AcademyPackage {
  id: string;
  title: string;
  short_description: string | null;
  level: string;
  total_duration_seconds: number;
  avg_rating: number | null;
  review_count: number;
  courses: PackageItem[];
}

export interface AcademyPackageCourse {
  id: string;
  title: string;
  image: string | null;
  level: string;
  total_lessons: number;
  total_duration_seconds: number;
  courseNumber: string;
}

export interface AcademyPackageDetail {
  id: string;
  title: string;
  short_description: string | null;
  level: string;
  courses: AcademyPackageCourse[];
}

export const getPackages = async (): Promise<AcademyPackage[]> => {
  try {
    const res = await api.get("/packages/");
    return res.data;
  } catch (err: any) {
    throw new Error(err.response?.data?.detail || "Failed to fetch packages");
  }
};

export const enrollPackage = async (slug: string): Promise<void> => {
  try {
    await api.post(`/packages/${slug}/enroll`);
  } catch (err: any) {
    throw new Error(err.response?.data?.detail || "Failed to enroll in package");
  }
};

export const getEnrolledPackages = async (): Promise<AcademyPackage[]> => {
  try {
    const res = await api.get("/packages/enrolled");
    return res.data;
  } catch (err: any) {
    throw new Error(err.response?.data?.detail || "Failed to fetch enrolled packages");
  }
};

export const getPackageBySlug = async (slug: string): Promise<AcademyPackageDetail> => {
  try {
    const res = await api.get(`/packages/${slug}`);
    return res.data;
  } catch (err: any) {
    throw new Error(err.response?.data?.detail || "Package not found");
  }
};