// components/CourseListItem.tsx
import { useState } from "react";
import { BookOpen, Clock, Star, ChevronRight, Play, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getCourseBySlug } from "../../api/courses";
import toast from "react-hot-toast";
import ai101 from "../../assets/badges/ai101.jpeg";
import com101 from "../../assets/badges/com101.jpeg";
import dbs101 from "../../assets/badges/dbs101.jpeg";
import dr101 from "../../assets/badges/dr101.jpeg";
import eng101 from "../../assets/badges/eng101.jpeg";
import esp101 from "../../assets/badges/esp101.jpeg";
import sci101 from "../../assets/badges/sci101.jpeg";

const badgeImages: Record<string, string> = {
  ai101, com101, dbs101, dr101, eng101, esp101, sci101,
};

export const CourseListItem = ({ course, isEnrolled = false }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const navigateToFirstLesson = async () => {
    setLoading(true);
    try {
      const detail = await getCourseBySlug(course.id);
      const firstLesson = detail.modules[0]?.lessons[0];
      if (firstLesson) {
        navigate(`/courses/${course.id}/lesson/${firstLesson.id}`);
      } else {
        toast.error("No lessons found for this course.");
      }
    } catch {
      toast.error("Failed to load course. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleContinue = async (e: React.MouseEvent) => {
    e.stopPropagation();
    await navigateToFirstLesson();
  };

  const handleView = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/courses/${course.id}`);
  };

  return (
    <div
      onClick={() => isEnrolled ? navigateToFirstLesson() : navigate(`/courses/${course.id}`)}
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
        {course.badge_url && badgeImages[course.badge_url] && (
          <img src={badgeImages[course.badge_url]} className="absolute top-4 right-4 w-12" />
        )}

        <span className="text-xs text-purple-600">{course.category}</span>

        <h3 className="text-lg font-bold">{course.title}</h3>

        <p className="text-sm text-gray-600 mb-3 w-3/4">by {course.description}</p>

        <p className="text-sm text-gray-600 mb-3">by {course.instructor}</p>

        <div className="flex gap-4 text-xs text-gray-500">
          <span className="flex items-center gap-2"><BookOpen className="w-4 h-4" /> {course.lessons}</span>
          <span className="flex items-center gap-2"><Clock className="w-4 h-4" /> {course.duration}</span>
        </div>

        <div className="flex justify-between mt-4">
          <div className="flex items-center gap-1">
            <Star className="fill-yellow-400 text-yellow-400" />
            {course.rating}
          </div>

          {isEnrolled ? (
            <button
              onClick={handleContinue}
              disabled={loading}
              className="flex items-center gap-1.5 px-4 py-1.5 bg-[#0B1E40] text-white rounded-lg text-sm font-medium hover:bg-[#162d5e] transition disabled:opacity-60"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <><Play className="w-3.5 h-3.5" fill="currentColor" /> Continue</>
              )}
            </button>
          ) : (
            <button
              onClick={handleView}
              className="flex items-center text-purple-600 hover:text-purple-800 transition"
            >
              View <ChevronRight />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
