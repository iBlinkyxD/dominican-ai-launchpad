import { useParams } from "react-router-dom";
import { useGetCourseBySlug, useGetPackageBySlug } from "../hooks/courses";
import { CourseBreadcrumb } from "../components/courseDetail/CourseBreadcrumb";
import { CourseHeroContent } from "../components/courseDetail/CourseHeroContent";
import { CourseStatsBar } from "../components/courseDetail/CourseStatsBar";
import { PackageCourseList } from "../components/courseDetail/PackageCourseList";
import { CourseModuleList } from "../components/courseDetail/CourseModuleList";

export function CourseDetail({ type }: { type: "course" | "package" }) {
  const { slug } = useParams<{ slug: string }>();

  const { course, loading: courseLoading } = useGetCourseBySlug(
    type === "course" ? slug! : "",
  );
  const { pkg, loading: pkgLoading } = useGetPackageBySlug(
    type === "package" ? slug! : "",
  );

  const loading = courseLoading || pkgLoading;
  const title = type === "package" ? pkg?.title : course?.title;
  const subtitle = type === "package" ? pkg?.short_description : course?.short_description;
  const description = type === "package" ? null : course?.description;
  const level = type === "package" ? pkg?.level : course?.level;
  const totalCourses = type === "package" ? pkg?.courses.length : course?.modules.length;
  const enrollmentCount = type === "package" ? undefined : course?.enrollment_count;
  const instructorName = type === "package" ? undefined : course?.instructor_name ?? undefined;
  const avgRating = type === "package" ? undefined : course?.avg_rating ?? undefined;
  const reviewCount = type === "package" ? undefined : course?.review_count;

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-gray-400">Loading...</div>
      </div>
    );

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-50 via-white to-purple-50 relative overflow-hidden">
        <div className="mx-auto px-8 sm:px-6 lg:px-16 py-12">
          <CourseBreadcrumb type={type} title={title} />
          <CourseHeroContent
            title={title}
            subtitle={subtitle}
            description={description}
            type={type}
            enrollmentCount={enrollmentCount}
            instructorName={instructorName}
          />
          <CourseStatsBar
            totalCourses={totalCourses}
            type={type}
            level={level}
            avgRating={avgRating}
            reviewCount={reviewCount}
          />
        </div>
      </div>

      {/* Content Section */}
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {type === "package" && pkg && (
          <PackageCourseList courses={pkg.courses} />
        )}
        {type === "course" && course && (
          <CourseModuleList modules={course.modules} />
        )}
      </div>
    </div>
  );
}
