// components/CourseListItem.tsx
import { BookOpen, Clock, Star, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const CourseListItem = ({ course }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/courses/${course.id}`)}
      className="flex flex-col lg:flex-row bg-white rounded-xl shadow-md border overflow-hidden cursor-pointer group"
    >
      {/* Image */}
      <div className="w-full lg:w-[340px] p-3 my-auto">
        <img
          src={course.image}
          className="w-full h-52 object-cover rounded-lg"
        />
      </div>

      {/* Content */}
      <div className="p-5 flex-1 relative">
        <img src={course.badge} className="absolute top-4 right-4 w-12" />

        <span className="text-xs text-purple-600">{course.category}</span>

        <h3 className="text-lg font-bold">{course.title}</h3>

        <p className="text-sm text-gray-600 mb-3 w-3/4">by {course.description}</p>

        <p className="text-sm text-gray-600 mb-3">by {course.instructor}</p>

        <div className="flex gap-4 text-xs text-gray-500">
          <BookOpen /> {course.lessons}
          <Clock /> {course.duration}
        </div>

        <div className="flex justify-between mt-4">
          <div className="flex items-center gap-1">
            <Star className="fill-yellow-400 text-yellow-400" />
            {course.rating}
          </div>

          <div className="flex items-center text-purple-600">
            View <ChevronRight />
          </div>
        </div>
      </div>
    </div>
  );
};
