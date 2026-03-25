import { BookOpen } from "lucide-react";
import { ModuleRead } from "../../api/courses";

interface CourseModuleListProps {
  modules: ModuleRead[];
}

export function CourseModuleList({ modules }: CourseModuleListProps) {
  const totalLessons = modules.reduce((acc, m) => acc + m.lessons.length, 0);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-semibold text-gray-900">Course Content</h2>
        <span className="text-gray-600 font-medium">
          {modules.length} Modules · {totalLessons} Lessons
        </span>
      </div>
      <div className="space-y-4">
        {modules.map((mod, idx) => (
          <div
            key={mod.id}
            className="border border-gray-200 rounded-xl overflow-hidden"
          >
            <div className="p-4 bg-gray-50 flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 font-semibold text-sm">
                {idx + 1}
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">{mod.title}</h3>
                {mod.description && (
                  <p className="text-xs text-gray-500">{mod.description}</p>
                )}
              </div>
              <span className="ml-auto text-xs text-gray-400">
                {mod.lessons.length} lessons
              </span>
            </div>
            <div className="divide-y divide-gray-100">
              {mod.lessons.map((lesson) => (
                <div
                  key={lesson.id}
                  className="px-4 py-3 flex items-center gap-3 hover:bg-gray-50 transition"
                >
                  <BookOpen className="w-4 h-4 text-gray-400 shrink-0" />
                  <span className="text-sm text-gray-700 flex-1">
                    {lesson.title}
                  </span>
                  {lesson.duration_seconds && (
                    <span className="text-xs text-gray-400">
                      {Math.floor(lesson.duration_seconds / 60)}min
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
