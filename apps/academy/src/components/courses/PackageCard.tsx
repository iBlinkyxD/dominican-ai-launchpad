// components/PackageCard.tsx
import { useState, useEffect } from "react";
import { Award, Star, Clock, CheckCircle, Loader2 } from "lucide-react";
import { CourseCarousel } from "./CourseCarousel";
import { useNavigate } from "react-router-dom";
import { enrollPackage } from "../../api/packages";
import { getCourseBySlug } from "../../api/courses";

const levelStyles: Record<string, string> = {
  beginner: "bg-green-100 text-green-700",
  intermediate: "bg-yellow-100 text-yellow-700",
  advanced: "bg-red-100 text-red-700",
};

export const PackageCard = ({
  id,
  title,
  skills,
  level,
  totalDurationSeconds = 0,
  avgRating,
  reviewCount = 0,
  courses,
  isEnrolled = false,
}) => {
  const navigate = useNavigate();
  const [enrolled, setEnrolled] = useState(isEnrolled);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setEnrolled(isEnrolled);
  }, [isEnrolled]);

  const hours = Math.floor(totalDurationSeconds / 3600);
  const minutes = Math.floor((totalDurationSeconds % 3600) / 60);
  const durationLabel = hours > 0 ? `${hours}h ${minutes}min` : minutes > 0 ? `${minutes}min` : null;

  const handleEnroll = async () => {
    if (enrolled || loading) return;
    setLoading(true);
    try {
      await enrollPackage(id);
      setEnrolled(true);
    } finally {
      setLoading(false);
    }
  };

  const handleContinue = async () => {
    const firstCourseSlug = courses[0]?.id;
    if (!firstCourseSlug) return;
    setLoading(true);
    try {
      const detail = await getCourseBySlug(firstCourseSlug);
      const firstLesson = detail.modules[0]?.lessons[0];
      if (firstLesson) {
        navigate(`/courses/${firstCourseSlug}/lesson/${firstLesson.id}`);
      }
    } finally {
      setLoading(false);
    }
  };

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

          <div className="flex flex-wrap items-center gap-3 mb-6">
            {level && (
              <span
                className={`px-3 py-1 rounded-full text-sm font-semibold capitalize ${levelStyles[level.toLowerCase()] ?? "bg-gray-100 text-gray-700"}`}
              >
                {level}
              </span>
            )}
            {avgRating != null && (
              <span className="flex items-center gap-1 text-sm text-gray-700">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="font-semibold">{avgRating}</span>
                <span className="text-gray-400">({reviewCount.toLocaleString()})</span>
              </span>
            )}
            {durationLabel && (
              <span className="flex items-center gap-1 text-sm text-gray-600">
                <Clock className="w-4 h-4" />
                {durationLabel}
              </span>
            )}
          </div>

          <div className="flex gap-3">
            {enrolled ? (
              <button
                onClick={handleContinue}
                disabled={loading}
                className="px-6 py-3 rounded-lg bg-[#0B1E40] text-white hover:bg-[#162d5e] transition-colors flex items-center gap-2 disabled:opacity-60"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <><CheckCircle className="w-4 h-4" /> Continue</>}
              </button>
            ) : (
              <button
                onClick={handleEnroll}
                disabled={loading}
                className="px-6 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors flex items-center gap-2 disabled:opacity-60"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Enroll"}
              </button>
            )}
            <button
              onClick={() => navigate(`/courses/package/${id}`)}
              className="px-6 py-3 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
            >
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
