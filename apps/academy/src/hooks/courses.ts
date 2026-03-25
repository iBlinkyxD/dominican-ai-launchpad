import { useState, useEffect } from "react";
import { getCourses, getEnrolledCourses, AcademyCourse } from "../api/courses";
import { getPackages, getEnrolledPackages, AcademyPackage } from "../api/packages";
import { getCourseBySlug, AcademyCourseDetail } from "../api/courses";
import { getPackageBySlug, AcademyPackageDetail } from "../api/packages";


export const useGetPackages = () => {
  const [packages, setPackages] = useState<AcademyPackage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await getPackages();
        setPackages(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  return { packages, loading, error };
};

export const useGetCourses = () => {
  const [courses, setCourses] = useState<AcademyCourse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await getCourses();
        setCourses(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  return { courses, loading, error };
};

export const useGetEnrolled = () => {
  const [courses, setCourses] = useState<AcademyCourse[]>([]);
  const [packages, setPackages] = useState<AcademyPackage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        const [c, p] = await Promise.all([getEnrolledCourses(), getEnrolledPackages()]);
        setCourses(c);
        setPackages(p);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  return { courses, packages, loading, error };
};

export const useGetCourseBySlug = (slug: string) => {
  const [course, setCourse] = useState<AcademyCourseDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) {
      setLoading(false);  // ← add this so empty slug resolves immediately
      return;
    }
    const fetch = async () => {
      try {
        const data = await getCourseBySlug(slug);
        setCourse(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [slug]);

  return { course, loading, error };
};

export const useGetPackageBySlug = (slug: string) => {
  const [pkg, setPkg] = useState<AcademyPackageDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) {
      setLoading(false);
      return;
    }
    const fetch = async () => {
      try {
        const data = await getPackageBySlug(slug);
        setPkg(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [slug]);

  return { pkg, loading, error };
};