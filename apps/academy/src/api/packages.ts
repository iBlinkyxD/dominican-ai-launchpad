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
  courses: PackageItem[];
}

export const getPackages = async (): Promise<AcademyPackage[]> => {
  try {
    const res = await api.get("/packages/");
    return res.data;
  } catch (err: any) {
    throw new Error(err.response?.data?.detail || "Failed to fetch packages");
  }
};