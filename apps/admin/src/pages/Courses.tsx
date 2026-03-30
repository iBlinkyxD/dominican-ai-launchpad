import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sparkles, Plus, CheckCircle2 } from "lucide-react";
import { getAdminCourses, AdminCourse } from "@/api/courses";

const COURSE_COLORS = [
  "bg-purple-500", "bg-green-600", "bg-red-500", "bg-blue-600",
  "bg-orange-500", "bg-teal-600", "bg-pink-500", "bg-indigo-600",
];

function courseColor(slug: string) {
  let hash = 0;
  for (let i = 0; i < slug.length; i++) hash = slug.charCodeAt(i) + ((hash << 5) - hash);
  return COURSE_COLORS[Math.abs(hash) % COURSE_COLORS.length];
}

function StatusBadge({ published }: { published: boolean }) {
  return published ? (
    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-50 text-green-700 border border-green-200">
      Live
    </span>
  ) : (
    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-50 text-yellow-700 border border-yellow-200">
      Draft
    </span>
  );
}

function VideoBadge({ hasVideo }: { hasVideo: boolean }) {
  return hasVideo ? (
    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-50 text-green-700 border border-green-200">
      <CheckCircle2 className="w-3 h-3" /> Ready
    </span>
  ) : (
    <span className="text-gray-400 text-sm">—</span>
  );
}

function StatCard({
  label, value, sub, color,
}: { label: string; value: number | string; sub: string; color: string }) {
  return (
    <div className={`bg-white rounded-2xl p-5 border border-gray-100 shadow-sm border-t-2 ${color}`}>
      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">{label}</p>
      <p className="text-3xl font-bold text-gray-900">{value}</p>
      <p className="text-xs text-gray-400 mt-1">{sub}</p>
    </div>
  );
}

export const Courses = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState<AdminCourse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getAdminCourses()
      .then(setCourses)
      .catch(() => setError("Failed to load courses."))
      .finally(() => setLoading(false));
  }, []);

  const liveCount = courses.filter((c) => c.is_published).length;
  const draftCount = courses.filter((c) => !c.is_published).length;
  const totalModules = courses.reduce((sum, c) => sum + c.module_count, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Courses</h1>
          <p className="text-sm text-gray-400 mt-0.5">Create and manage AI-generated courses</p>
        </div>
        <button
          onClick={() => navigate("/academy/courses/new")}
          className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
        >
          <Plus className="w-4 h-4" /> New Course
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Total Courses"
          value={courses.length}
          sub={`${courses.filter((c) => c.has_video).length} with video`}
          color="border-t-red-400"
        />
        <StatCard
          label="Live"
          value={liveCount}
          sub="Active"
          color="border-t-green-400"
        />
        <StatCard
          label="Draft"
          value={draftCount}
          sub="Pending"
          color="border-t-yellow-400"
        />
        <StatCard
          label="Modules"
          value={totalModules}
          sub="Total"
          color="border-t-[#0B1E40]"
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="text-sm font-semibold text-gray-800">All Courses</h2>
        </div>

        {loading ? (
          <div className="p-12 text-center text-sm text-gray-400">Loading...</div>
        ) : error ? (
          <div className="p-12 text-center text-sm text-red-500">{error}</div>
        ) : courses.length === 0 ? (
          <div className="p-12 text-center text-sm text-gray-400">No courses yet.</div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide">Course</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide">Modules</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide">Video</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide">Status</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide">Created</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {courses.map((course) => (
                <tr key={course.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg ${courseColor(course.slug)} flex items-center justify-center shrink-0`}>
                        <span className="text-white text-sm font-bold">
                          {course.title.charAt(0)}
                        </span>
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">{course.title}</p>
                        {course.short_description && (
                          <p className="text-xs text-gray-400 truncate max-w-xs">{course.short_description}</p>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-sm font-semibold text-gray-700">{course.module_count}</td>
                  <td className="px-4 py-4"><VideoBadge hasVideo={course.has_video} /></td>
                  <td className="px-4 py-4"><StatusBadge published={course.is_published} /></td>
                  <td className="px-4 py-4 text-sm text-gray-400">
                    {new Date(course.created_at).toISOString().split("T")[0]}
                  </td>
                  <td className="px-4 py-4">
                    <a
                      href={`${import.meta.env.VITE_ACADEMY_URL}/courses/${course.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-medium text-gray-500 border border-gray-200 px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      View
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Pipeline Overview */}
      <div className="bg-gradient-to-br from-gray-100 to-gray-200/60 rounded-2xl p-6 border border-gray-200 flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">Pipeline Overview</p>
          <p className="text-3xl font-bold text-gray-900">{courses.length} Courses</p>
          <p className="text-sm font-medium text-orange-500 mt-1">
            {liveCount} live · {totalModules} modules
          </p>
        </div>
        <button className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors">
          <Sparkles className="w-4 h-4" /> Create with AI
        </button>
      </div>
    </div>
  );
};
