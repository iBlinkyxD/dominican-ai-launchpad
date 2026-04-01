import { useState } from "react";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { CourseHeader } from "@/components/LessonContent/CourseHeader";
import { CourseTabs } from "@/components/LessonContent/CourseTabs";
import { CourseSidebar } from "@/components/LessonContent/CourseSidebar";
import { CourseOverview } from "@/components/LessonContent/CourseOverview";
import { useGetCourseBySlug } from "@/hooks/courses";
import { Play } from "lucide-react";

export function CourseContent() {
  const { courseId, lessonId } = useParams<{ courseId: string; lessonId: string }>();
  const [activeTab, setActiveTab] = useState("overview");

  const { course, loading } = useGetCourseBySlug(courseId ?? "");

  const totalLessons = course?.modules.reduce((acc, m) => acc + m.lessons.length, 0) ?? 0;
  const totalDurationSeconds = course?.modules.reduce(
    (acc, m) => acc + m.lessons.reduce((s, l) => s + (l.duration_seconds ?? 0), 0),
    0,
  ) ?? 0;

  const activeLesson = course?.modules
    .flatMap((m) => m.lessons)
    .find((l) => l.id === lessonId);

  if (loading) {
    return (
      <div className="animate-pulse p-8 space-y-4">
        <div className="h-8 bg-gray-200 rounded w-1/2" />
        <div className="h-4 bg-gray-200 rounded w-1/4" />
        <div className="aspect-video bg-gray-200 rounded-2xl mt-6" />
      </div>
    );
  }

  return (
    <div>
      <CourseHeader
        title={course?.title}
        slug={courseId}
        totalLessons={totalLessons}
        totalDurationSeconds={totalDurationSeconds}
      />

      <div className="grid lg:grid-cols-3 gap-8 p-6">
        {/* LEFT */}
        <div className="lg:col-span-2">
          {/* Video / lesson placeholder */}
          <div className="relative aspect-video bg-gray-900 rounded-2xl overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&h=450&fit=crop"
              alt={activeLesson?.title ?? "Lesson"}
              className="w-full h-full object-cover opacity-80"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
              <button className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition transform">
                <Play className="h-8 w-8 text-purple-600 ml-1" fill="currentColor" />
              </button>
              {activeLesson && (
                <p className="text-white text-sm font-medium bg-black/40 px-4 py-1.5 rounded-full">
                  {activeLesson.title}
                </p>
              )}
            </div>
          </div>

          <div className="border rounded-2xl mt-4">
            <CourseTabs activeTab={activeTab} setActiveTab={setActiveTab} />
            <div className="p-6">
              {activeTab === "overview" && (
                <CourseOverview
                  description={course?.description ?? null}
                  shortDescription={course?.short_description ?? null}
                  lesson={activeLesson ?? null}
                />
              )}
              {activeTab === "author" && (
                <div className="text-sm text-gray-700">
                  {course?.instructor_name ? (
                    <p><span className="font-semibold">Instructor:</span> {course.instructor_name}</p>
                  ) : (
                    <p className="text-gray-400">No author information available.</p>
                  )}
                </div>
              )}
              {activeTab === "faq" && (
                course?.faq
                  ? <div className="prose prose-sm prose-gray max-w-none text-gray-700"><ReactMarkdown>{course.faq}</ReactMarkdown></div>
                  : <p className="text-gray-400 text-sm">No FAQ available for this course.</p>
              )}
              {(activeTab === "announcements" || activeTab === "reviews") && (
                <p className="text-gray-400 text-sm">No {activeTab} yet.</p>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <CourseSidebar
          modules={course?.modules ?? []}
          courseSlug={courseId ?? ""}
          activeLessonId={lessonId ?? ""}
          instructorName={course?.instructor_name ?? null}
          avgRating={course?.avg_rating ?? null}
          reviewCount={course?.review_count ?? 0}
        />
      </div>
    </div>
  );
}
