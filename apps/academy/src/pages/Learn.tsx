import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../mockData";
import { Course } from "../../types";
import { CourseCard } from "../components/CourseCard";
import { Settings, ChevronDown, HelpCircle } from "lucide-react";

export const Learn = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.getCourses().then(setCourses);
  }, []);

  return (
    <div className="relative min-h-[80vh]">
      {/* Header */}
      <div className="flex justify-between mb-8">
        <h2 className="text-2xl font-bold">Courses</h2>

        <div className="flex gap-3">
          <button className="bg-[#0B1E40] text-white px-5 py-2 rounded-lg">
            Create
          </button>

          <button className="p-2 hover:bg-gray-100 rounded-lg">
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-8 space-y-6">
        <div className="flex gap-3 flex-wrap">
          <button className="bg-gray-200 px-4 py-2 rounded text-xs flex gap-2 items-center">
            Showing... <ChevronDown className="w-3 h-3" />
          </button>

          <button className="bg-gray-200 px-4 py-2 rounded text-xs flex gap-2 items-center">
            Sorted by Host Order <ChevronDown className="w-3 h-3" />
          </button>
        </div>

        <div className="flex gap-2 overflow-x-auto">
          <button className="px-5 py-2 bg-[#0B1E40] text-white rounded-lg">
            All
          </button>
          <button className="px-5 py-2 text-gray-600">Yours</button>
          <button className="px-5 py-2 bg-gray-200">Near You</button>
          <button className="px-5 py-2 text-gray-600">Inactive</button>
        </div>
      </div>

      {/* Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <CourseCard
            key={course.id}
            course={course}
            onClick={() => navigate(`/learn/${course.id}`)}
          />
        ))}
      </div>

      {/* Floating Help */}
      <div className="fixed bottom-6 right-8">
        <button className="bg-black text-white px-5 py-2 rounded-full flex gap-3 items-center">
          <HelpCircle className="w-5 h-5" />
          Need Help?
        </button>
      </div>
    </div>
  );
};