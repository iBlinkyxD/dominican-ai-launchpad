import { useState } from "react";
import { PackageCard } from "@/components/courses/PackageCard";
import { AdditionalCourses } from "@/components/courses/AdditionalCourses";
import { HelpCircle, ChevronDown, ChevronUp } from "lucide-react";
import { useGetCourses, useGetPackages, useGetEnrolled } from "@/hooks/courses";
import { AcademyCourse } from "@/api/courses";
type Tab = "enrolled" | "certifications" | "courses";

const toListCourse = (course: AcademyCourse) => ({
  id: course.slug,
  title: course.title,
  category: course.code || course.level.toUpperCase(),
  lessons: course.total_lessons,
  duration:
    course.total_duration_seconds > 0
      ? `${Math.floor(course.total_duration_seconds / 3600)}h ${Math.floor((course.total_duration_seconds % 3600) / 60)}min`
      : "—",
  rating: course.avg_rating ?? 0,
  reviews: course.review_count,
  level: course.level.charAt(0).toUpperCase() + course.level.slice(1),
  image:
    course.thumbnail_url ||
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop",
  instructor: course.instructor_name || "DAIA Academy",
  badge_url: course.badge_url,
  description: course.description || "",
});

const INITIAL_PACKAGES_SHOWN = 2;

const TABS: { key: Tab; label: string }[] = [
  { key: "enrolled", label: "Enrolled" },
  { key: "certifications", label: "Certifications" },
  { key: "courses", label: "Courses" },
];

export const Courses = () => {
  const [activeTab, setActiveTab] = useState<Tab>("enrolled");
  const [showAllPackages, setShowAllPackages] = useState(false);

  const { courses: allCourses, loading: coursesLoading, error: coursesError } = useGetCourses();
  const { packages: allPackages, loading: packagesLoading } = useGetPackages();
  const { courses: enrolledCourses, packages: enrolledPackages, loading: enrolledLoading, error: enrolledError } = useGetEnrolled();

  const enrolledPackageIds = new Set(enrolledPackages.map((p) => p.id));
  const enrolledCourseIds = new Set(enrolledCourses.map((c) => c.slug));

  const isEnrolledTab = activeTab === "enrolled";
  const loading = isEnrolledTab ? enrolledLoading : (coursesLoading || packagesLoading);
  const error = isEnrolledTab ? enrolledError : coursesError;

  // Pick data source based on tab
  const packages =
    activeTab === "certifications"
      ? allPackages
      : activeTab === "enrolled"
      ? enrolledPackages
      : [];

  const courses =
    activeTab === "courses"
      ? allCourses
      : activeTab === "enrolled"
      ? enrolledCourses
      : [];

  const listCourses = courses.map(toListCourse);

  const visiblePackages = showAllPackages
    ? packages
    : packages.slice(0, INITIAL_PACKAGES_SHOWN);

  const headerTitle =
    activeTab === "enrolled" ? "My Enrolled Content" :
    activeTab === "certifications" ? "Official Certifications" :
    "Individual Courses";

  const headerSub =
    activeTab === "enrolled" ? "Packages and courses you are enrolled in" :
    "Explore other popular courses to expand your skills";

  const isEmpty = !loading && !error && packages.length === 0 && courses.length === 0;

  return (
    <div className="relative min-h-[80vh] px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-6 flex flex-col-reverse xl:flex-row xl:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{headerTitle}</h2>
          <p className="text-gray-600">{headerSub}</p>
        </div>

        <div className="flex gap-2 overflow-x-auto my-auto">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => { setActiveTab(tab.key); setShowAllPackages(false); }}
              className={`px-5 py-2 rounded-lg whitespace-nowrap transition-colors ${
                activeTab === tab.key
                  ? "bg-[#0B1E40] text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Loading */}
      {loading && (
        <div className="space-y-6">
          {[1, 2].map((i) => (
            <div key={i} className="bg-white rounded-2xl shadow-lg border p-8 animate-pulse">
              <div className="h-6 bg-gray-200 rounded w-1/3 mb-4" />
              <div className="h-10 bg-gray-200 rounded w-2/3 mb-4" />
              <div className="h-4 bg-gray-200 rounded w-full mb-2" />
              <div className="h-4 bg-gray-200 rounded w-3/4" />
            </div>
          ))}
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl p-4 mb-6 text-sm">
          Failed to load courses: {error}
        </div>
      )}

      {!loading && !error && (
        <>
          {/* Packages */}
          {visiblePackages.map((pkg) => (
            <PackageCard
              key={pkg.id}
              id={pkg.id}
              title={pkg.title}
              skills={pkg.short_description || ""}
              level={pkg.level}
              totalDurationSeconds={pkg.total_duration_seconds}
              avgRating={pkg.avg_rating}
              reviewCount={pkg.review_count}
              courses={pkg.courses}
              isEnrolled={enrolledPackageIds.has(pkg.id)}
            />
          ))}

          {/* View more / less toggle */}
          {packages.length > INITIAL_PACKAGES_SHOWN && (
            <div className="flex justify-center mb-10">
              <button
                onClick={() => setShowAllPackages(!showAllPackages)}
                className="flex items-center gap-2 px-6 py-2.5 border border-gray-300 rounded-full text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
              >
                {showAllPackages ? (
                  <>Show less <ChevronUp className="w-4 h-4" /></>
                ) : (
                  <>
                    View {packages.length - INITIAL_PACKAGES_SHOWN} more{" "}
                    {packages.length - INITIAL_PACKAGES_SHOWN === 1 ? "track" : "tracks"}
                    <ChevronDown className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          )}

          {/* Individual courses */}
          {listCourses.length > 0 && (
            <AdditionalCourses courses={listCourses} enrolledIds={enrolledCourseIds} />
          )}

          {/* Empty state */}
          {isEmpty && (
            <p className="text-gray-400 text-sm text-center py-20">
              {activeTab === "enrolled"
                ? "You are not enrolled in any courses yet."
                : "No courses available yet."}
            </p>
          )}
        </>
      )}

      {/* Floating Help */}
      <div className="fixed bottom-6 right-8">
        <button className="bg-black text-white px-5 py-2 rounded-full flex gap-3 items-center">
          <HelpCircle className="w-5 h-5" />
          Need Help?
        </button>
      </div>
    </div>
  );
};
