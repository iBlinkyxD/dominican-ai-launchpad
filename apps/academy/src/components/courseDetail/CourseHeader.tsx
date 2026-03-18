import { ChevronLeft, Clock, BookOpen, Star } from "lucide-react";
import { useNavigate } from "react-router";

export const CourseHeader = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-white border-b border-gray-200">
      <div className="px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
          <button
            onClick={() => navigate("/hub")}
            className="hover:text-gray-900 flex items-center gap-1"
          >
            <ChevronLeft className="h-4 w-4" />
            Courses
          </button>
          <span>/</span>
          <span className="text-gray-400">UI UX Design</span>
          <span>/</span>
          <span className="text-gray-900 font-medium">The AI Mindset: Human + Machine Intelligence</span>
        </div>

        {/* Title */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold text-gray-900 mb-2">
              The AI Mindset: Human + Machine Intelligence
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <BookOpen className="h-4 w-4 text-purple-600" />
                <span>38 lessons</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4 text-purple-600" />
                <span>4h 30min</span>
              </div>
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="font-medium text-gray-900">4.5</span>
                <span>(126 reviews)</span>
              </div>
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
