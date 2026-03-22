import { useState } from "react";
import { PackageCard } from "../components/courses/PackageCard";
import { AdditionalCourses } from "../components/courses/AdditionalCourses";
import { HelpCircle, ChevronDown, ChevronUp } from "lucide-react";
import { useGetCourses, useGetPackages } from "../hooks/courses";
import { AcademyCourse } from "../api/courses";
import eng101 from "../assets/badges/eng101.jpeg";

const toListCourse = (course: AcademyCourse) => ({
  id: course.slug,
  title: course.title,
  category: course.code || course.level.toUpperCase(),
  lessons: course.total_lessons,
  duration:
    course.total_duration_seconds > 0
      ? `${Math.floor(course.total_duration_seconds / 3600)}h ${Math.floor((course.total_duration_seconds % 3600) / 60)}min`
      : "—",
  rating: 0,
  reviews: 0,
  level: course.level.charAt(0).toUpperCase() + course.level.slice(1),
  image:
    course.thumbnail_url ||
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop",
  instructor: "DAIA Academy",
  badge: eng101,
  description: course.description || "",
});

const INITIAL_PACKAGES_SHOWN = 2;

export const Courses = () => {
  const { courses, loading: coursesLoading, error } = useGetCourses();
  const { packages, loading: packagesLoading } = useGetPackages();
  const [showAllPackages, setShowAllPackages] = useState(false);

  const loading = coursesLoading || packagesLoading;

  // All courses go to the individual list
  const listCourses = courses.map(toListCourse);

  // Show only 2 packages initially
  const visiblePackages = showAllPackages
    ? packages
    : packages.slice(0, INITIAL_PACKAGES_SHOWN);

  return (
    <div className="relative min-h-[80vh] px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-6 flex flex-col-reverse xl:flex-row xl:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Official Certifications
          </h2>
          <p className="text-gray-600">
            Explore other popular courses to expand your skills
          </p>
        </div>

        <div className="flex gap-2 overflow-x-auto my-auto">
          <button className="px-5 py-2 bg-[#0B1E40] text-white rounded-lg">All</button>
          <button className="px-5 py-2 text-gray-600">Enrolled</button>
          <button className="px-5 py-2 text-gray-600">Certifications</button>
          <button className="px-5 py-2 text-gray-600">Courses</button>
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
              courses={pkg.courses}
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
                  <>
                    Show less <ChevronUp className="w-4 h-4" />
                  </>
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
            <AdditionalCourses courses={listCourses} />
          )}

          {courses.length === 0 && (
            <p className="text-gray-400 text-sm text-center py-20">
              No courses available yet.
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