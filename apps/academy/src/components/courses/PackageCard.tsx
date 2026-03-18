// components/PackageCard.tsx
import { Award, Star, Clock } from "lucide-react";
import { CourseCarousel } from "./CourseCarousel";

export const PackageCard = ({
  title,
  skills,
  courses,
  buttonText = "Continue",
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg border p-8 mb-10">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* LEFT */}
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-3">
            <Award className="text-purple-600" />
            <span className="text-sm font-semibold text-purple-600 uppercase">
              Professional Certificate
            </span>
          </div>

          <h1 className="text-3xl font-bold mb-4">{title}</h1>

          <p className="text-sm text-gray-600 mb-4">{skills}</p>

          <div className="flex gap-4 mb-6">
            <div className="flex items-center gap-1">
              <Star className="fill-yellow-400 text-yellow-400" />
              <span>4.7</span>
            </div>

            <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
              Beginner
            </span>

            <span className="flex items-center gap-1 text-sm text-gray-600">
              <Clock className="h-4 w-4" />5 months
            </span>
          </div>

          <div className="flex gap-3">
            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg">
              {buttonText}
            </button>
            <button className="px-6 py-3 border-2 border-blue-600 text-blue-600 rounded-lg">
              View details
            </button>
          </div>
        </div>

        {/* RIGHT */}
        <div className="lg:w-1/2 my-auto">
          <CourseCarousel courses={courses} />
        </div>
      </div>
    </div>
  );
};