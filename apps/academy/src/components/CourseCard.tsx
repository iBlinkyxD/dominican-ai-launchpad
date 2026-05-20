import React from "react";
import { AcademyCourse as Course } from "@/api/courses";
import { Crown } from "lucide-react";

interface Props {
  course: Course;
  onClick: () => void;
}

export const CourseCard: React.FC<Props> = ({ course, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden cursor-pointer hover:shadow-md transition-shadow flex flex-col h-full group"
    >
      <div className="relative h-44 overflow-hidden bg-gray-100">
        <img
          src={course.thumbnail}
          alt={course.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>

      <div className="p-5 flex-1 flex flex-col">
        <div className="flex items-start gap-4 mb-3">
          <div className="mt-0.5 relative shrink-0">
            <svg width="42" height="42" viewBox="0 0 100 100">
              <path
                d="M50 0 L93.3 25 V75 L50 100 L6.7 75 V25 Z"
                fill="white"
                stroke="#E2E8F0"
                strokeWidth="2"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center pt-1">
              <div className="text-[10px] font-bold text-[#0B1E40] text-center leading-none">
                <div className="opacity-50 text-[8px] uppercase">DAIA</div>
                <div>{course.code?.split("-")[0]}</div>
              </div>
            </div>
          </div>

          <div>
            <div className="text-xs font-bold text-gray-500 uppercase mb-1">
              {course.code}
            </div>
            <h3 className="font-bold text-gray-900 text-[17px]">
              {course.title}
            </h3>
          </div>
        </div>

        <p className="text-sm text-gray-600 line-clamp-2 mb-6">
          {course.description}
        </p>

        <div className="mt-auto pt-4 border-t flex items-center gap-2 text-gray-500">
          <Crown className="w-4 h-4 fill-gray-400" />
          <span className="text-xs font-semibold">Host</span>
        </div>
      </div>
    </div>
  );
};