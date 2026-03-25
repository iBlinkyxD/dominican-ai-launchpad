import { useState } from "react";
import { ChevronDown, ChevronUp, Play, Check, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ModuleRead } from "../../api/courses";

interface CourseSidebarProps {
  modules: ModuleRead[];
  courseSlug: string;
  activeLessonId: string;
  instructorName: string | null;
  avgRating: number | null;
  reviewCount: number;
}

function formatDuration(seconds: number | null): string {
  if (!seconds) return "";
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  if (h > 0) return `${h}h ${m}min`;
  return `${m}min`;
}

export const CourseSidebar = ({
  modules,
  courseSlug,
  activeLessonId,
  instructorName,
  avgRating,
  reviewCount,
}: CourseSidebarProps) => {
  const navigate = useNavigate();

  const [expanded, setExpanded] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    modules.forEach((mod) => {
      initial[mod.id] = mod.lessons.some((l) => l.id === activeLessonId) || mod.position === 1;
    });
    return initial;
  });

  const toggle = (modId: string) =>
    setExpanded((prev) => ({ ...prev, [modId]: !prev[modId] }));

  return (
    <div className="lg:col-span-1">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 sticky top-8">
        <div className="p-6 border-b border-gray-200">
          <h3 className="font-semibold text-gray-900">Course content</h3>
        </div>

        <div className="max-h-[calc(100vh-280px)] overflow-y-auto">
          {modules.map((mod, idx) => (
            <div key={mod.id} className="border-b border-gray-200 last:border-b-0">
              <button
                onClick={() => toggle(mod.id)}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition"
              >
                <span className="font-medium text-gray-900 text-sm text-left flex-1">
                  {String(idx + 1).padStart(2, "0")}: {mod.title}
                </span>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-gray-500">{mod.lessons.length} lessons</span>
                  {expanded[mod.id] ? (
                    <ChevronUp className="h-4 w-4 text-gray-400" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-gray-400" />
                  )}
                </div>
              </button>

              {expanded[mod.id] && (
                <div className="bg-gray-50 px-6 py-2">
                  {mod.lessons.map((lesson) => {
                    const isActive = lesson.id === activeLessonId;
                    return (
                      <button
                        key={lesson.id}
                        onClick={() => navigate(`/courses/${courseSlug}/lesson/${lesson.id}`)}
                        className="w-full py-2.5 flex items-center justify-between text-left group rounded px-2 -mx-2 transition"
                      >
                        <div className="flex items-center gap-2">
                          {isActive ? (
                            <div className="w-3 h-3 rounded-full bg-purple-600 flex-shrink-0" />
                          ) : (
                            <Play className="h-3 w-3 text-gray-400 group-hover:text-purple-600 flex-shrink-0" />
                          )}
                          <span className={`text-sm ${isActive ? "text-purple-600 font-medium" : "text-gray-700 group-hover:text-purple-600"}`}>
                            {lesson.title}
                          </span>
                        </div>
                        {lesson.duration_seconds != null && lesson.duration_seconds > 0 && (
                          <span className="text-xs text-gray-500 flex-shrink-0 ml-2">
                            {formatDuration(lesson.duration_seconds)}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
        </div>

        {instructorName && (
          <div className="p-6 border-t border-gray-200 bg-gray-50">
            <h4 className="font-semibold text-gray-900 mb-4">Author</h4>
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-lg flex-shrink-0">
                {instructorName.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h5 className="font-semibold text-gray-900 text-sm truncate">{instructorName}</h5>
                  <div className="w-3 h-3 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <Check className="h-2 w-2 text-white" />
                  </div>
                </div>
                {avgRating != null && (
                  <div className="flex items-center gap-1 mt-1">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    <span className="text-xs font-medium text-gray-900">{avgRating}</span>
                    <span className="text-xs text-gray-500 ml-1">({reviewCount} reviews)</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
