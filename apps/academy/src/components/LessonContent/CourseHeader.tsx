import { ChevronLeft, Clock, BookOpen } from "lucide-react";
import { useNavigate } from "react-router";

interface CourseHeaderProps {
  title: string | undefined;
  slug: string | undefined;
  totalLessons: number;
  totalDurationSeconds: number;
}

export const CourseHeader = ({
  title,
  slug,
  totalLessons,
  totalDurationSeconds,
}: CourseHeaderProps) => {
  const navigate = useNavigate();

  const hours = Math.floor(totalDurationSeconds / 3600);
  const minutes = Math.floor((totalDurationSeconds % 3600) / 60);
  const durationLabel = hours > 0 ? `${hours}h ${minutes}min` : `${minutes}min`;

  return (
    <div className="bg-white border-b border-gray-200">
      <div className="px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
          <button
            onClick={() => navigate("/courses")}
            className="hover:text-gray-900 flex items-center gap-1"
          >
            <ChevronLeft className="h-4 w-4" />
            Courses
          </button>
          <span>/</span>
          <span
            onClick={() => slug && navigate(`/courses/${slug}`)}
            className="text-gray-400 hover:text-gray-900 cursor-pointer"
          >
            {title}
          </span>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold text-gray-900 mb-2">{title}</h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <BookOpen className="h-4 w-4 text-purple-600" />
                <span>{totalLessons} lessons</span>
              </div>
              {totalDurationSeconds > 0 && (
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4 text-purple-600" />
                  <span>{durationLabel}</span>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition font-medium">
              Share
            </button>
            <button className="px-6 py-2 bg-blue-950 text-white rounded-lg hover:bg-blue-700 transition font-semibold shadow-md">
              Enroll Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
