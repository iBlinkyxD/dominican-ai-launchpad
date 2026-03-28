import { useState } from "react";
import { Clock, ChevronDown, BookOpen, Loader2 } from "lucide-react";
import { AcademyPackageCourse } from "@/api/packages";
import { getCourseBySlug, AcademyCourseDetail } from "@/api/courses";

function formatDuration(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  if (hours > 0) return `${hours}h ${minutes}min`;
  return `${minutes}min`;
}

const levelStyles = {
  beginner: "bg-green-100 text-green-700",
  intermediate: "bg-yellow-100 text-yellow-700",
  advanced: "bg-red-100 text-red-700",
};

function CourseRow({ c }: { c: AcademyPackageCourse }) {
  const [expanded, setExpanded] = useState(false);
  const [detail, setDetail] = useState<AcademyCourseDetail | null>(null);
  const [loading, setLoading] = useState(false);

  const toggle = async () => {
    if (!expanded && !detail) {
      setLoading(true);
      try {
        const data = await getCourseBySlug(c.id);
        setDetail(data);
      } finally {
        setLoading(false);
      }
    }
    setExpanded((prev) => !prev);
  };

  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden">
      {/* Header row */}
      <div
        onClick={toggle}
        className="flex items-center gap-4 p-6 cursor-pointer hover:bg-gray-50 transition group"
      >
        {c.image && (
          <img
            src={c.image}
            className="w-16 h-16 rounded-lg object-cover hidden sm:block flex-shrink-0"
          />
        )}
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-gray-900 mb-1 group-hover:text-blue-600 transition">
            {c.title}
          </h3>
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
            <span className="flex items-center gap-1">
              <BookOpen className="w-4 h-4" />
              {c.total_lessons} lessons
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {formatDuration(c.total_duration_seconds)}
            </span>
            <span
              className={`text-xs font-semibold px-2 py-0.5 rounded-full capitalize ${levelStyles[c.level as keyof typeof levelStyles] || "bg-gray-100 text-gray-700"}`}
            >
              {c.level}
            </span>
          </div>
        </div>
        {loading ? (
          <Loader2 className="w-5 h-5 text-gray-400 animate-spin flex-shrink-0" />
        ) : (
          <ChevronDown
            className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform duration-200 ${expanded ? "rotate-180" : ""}`}
          />
        )}
      </div>

      {/* Lessons dropdown */}
      {expanded && detail && (
        <div className="border-t border-gray-100 divide-y divide-gray-100">
          {detail.modules.map((mod, idx) => (
            <div key={mod.id}>
              <div className="px-6 py-3 bg-gray-50 flex items-center gap-3">
                <div className="w-7 h-7 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 font-semibold text-xs flex-shrink-0">
                  {idx + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-gray-900 text-sm">{mod.title}</h4>
                  {mod.description && (
                    <p className="text-xs text-gray-500">{mod.description}</p>
                  )}
                </div>
                <span className="text-xs text-gray-400 flex-shrink-0">{mod.lessons.length} lessons</span>
              </div>
              <div className="divide-y divide-gray-100">
                {mod.lessons.map((lesson) => (
                  <div
                    key={lesson.id}
                    className="px-6 py-3 flex items-center gap-3 hover:bg-gray-50 transition"
                  >
                    <BookOpen className="w-4 h-4 text-gray-400 shrink-0" />
                    <span className="text-sm text-gray-700 flex-1">{lesson.title}</span>
                    {lesson.duration_seconds != null && lesson.duration_seconds > 0 && (
                      <span className="text-xs text-gray-400 flex-shrink-0">
                        {Math.floor(lesson.duration_seconds / 60)}min
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

interface PackageCourseListProps {
  courses: AcademyPackageCourse[];
}

export function PackageCourseList({ courses }: PackageCourseListProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-semibold text-gray-900">
          Courses in this Track
        </h2>
        <span className="text-gray-600 font-medium">{courses.length} Courses</span>
      </div>
      <div className="space-y-4">
        {courses.map((c) => (
          <CourseRow key={c.id} c={c} />
        ))}
      </div>
    </div>
  );
}
