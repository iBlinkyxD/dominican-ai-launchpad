// components/CourseCarousel.tsx
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

export const CourseCarousel = ({ courses }) => {
  const scrollRef = useRef(null);
  const navigate = useNavigate();

  const scroll = (dir) => {
    scrollRef.current?.scrollBy({
      left: dir === "left" ? -400 : 400,
      behavior: "smooth",
    });
  };

  return (
    
    <div className="relative">
      <button
        onClick={() => scroll("left")}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition -ml-5"
      >
        <ChevronLeft className="h-5 w-5 text-gray-600" />
      </button>
      <button
        onClick={() => scroll("right")}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition -mr-5"
      >
        <ChevronRight className="h-5 w-5 text-gray-600" />
      </button>

      <div
        ref={scrollRef}
        className="flex gap-3 overflow-x-auto scrollbar-hide scroll-smooth"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {courses.map((course) => (
          <div
            key={course.id}
            className="flex-shrink-0 w-44 bg-white rounded-lg border border-gray-200 shadow-md hover:shadow-xl transition cursor-pointer group overflow-hidden"
            onClick={() => navigate(`/courses/${course.id}`)}
          >
            <div className="relative overflow-hidden">
              <img
                src={course.image ?? "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop"}
                alt={course.title}
                className="w-full h-28 object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-3">
              <h4 className="font-semibold text-gray-900 text-xs mb-1.5 line-clamp-2 group-hover:text-purple-600 transition">
                {course.title}
              </h4>
              <p className="text-xs text-gray-500">{course.courseNumber}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
