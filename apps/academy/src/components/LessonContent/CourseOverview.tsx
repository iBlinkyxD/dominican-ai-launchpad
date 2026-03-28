import ReactMarkdown from "react-markdown";
import { LessonRead } from "@/api/courses";

interface CourseOverviewProps {
  description: string | null;
  shortDescription: string | null;
  lesson?: LessonRead | null;
}

export const CourseOverview = ({ description, shortDescription, lesson }: CourseOverviewProps) => {
  const hasContent = description || shortDescription;

  return (
    <div className="space-y-6">
      {/* Learning objectives */}
      {lesson?.objectives && lesson.objectives.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Learning Objectives</h3>
          <ul className="space-y-2">
            {lesson.objectives.map((obj, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                <span className="mt-1 w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0" />
                {obj}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Lesson written content (Markdown) */}
      {lesson?.content && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Lesson Content</h3>
          <div className="prose prose-sm prose-gray max-w-none text-gray-700 text-sm [&>p]:text-justify [&>p]:leading-relaxed [&>p]:mb-4">
            <ReactMarkdown>{lesson.content}</ReactMarkdown>
          </div>
        </div>
      )}

      {/* Vocabulary table */}
      {lesson?.vocabulary && lesson.vocabulary.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Key Vocabulary</h3>
          <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-left px-4 py-2.5 font-semibold text-gray-700 w-1/3">Term</th>
                  <th className="text-left px-4 py-2.5 font-semibold text-gray-700">Definition</th>
                </tr>
              </thead>
              <tbody>
                {lesson.vocabulary.map((entry, i) => (
                  <tr key={i} className="border-b border-gray-100 last:border-b-0">
                    <td className="px-4 py-2.5 font-medium text-gray-900">
                      {entry.term}
                      {entry.term_es && (
                        <span className="block text-xs text-gray-400 font-normal">{entry.term_es}</span>
                      )}
                    </td>
                    <td className="px-4 py-2.5 text-gray-600">{entry.definition}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
