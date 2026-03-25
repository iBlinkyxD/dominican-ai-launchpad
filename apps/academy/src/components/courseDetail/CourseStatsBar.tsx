import { Star } from "lucide-react";

interface CourseStatsBarProps {
  totalCourses: number | undefined;
  type: "course" | "package";
  level: string | undefined;
  avgRating?: number;
  reviewCount?: number;
}

export function CourseStatsBar({ totalCourses, type, level, avgRating, reviewCount }: CourseStatsBarProps) {
  return (
    <div className="mt-12 bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <div>
          <div className="text-3xl font-bold text-gray-900 mb-2">
            {totalCourses} {type === "package" ? "courses" : "modules"}
          </div>
          <p className="text-sm text-gray-600">
            {type === "package"
              ? "Complete all courses to earn your certificate"
              : "Structured learning path"}
          </p>
        </div>
        <div>
          {avgRating != null ? (
            <>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-3xl font-bold text-gray-900">{avgRating}</span>
                <Star className="w-6 h-6 fill-yellow-400 text-yellow-400" />
              </div>
              <p className="text-sm text-gray-600">
                from {reviewCount?.toLocaleString()} reviews
              </p>
            </>
          ) : (
            <div className="text-sm text-gray-400">No ratings yet</div>
          )}
        </div>
        <div>
          <div className="text-2xl font-bold text-gray-900 mb-2 capitalize">
            {level} level
          </div>
          <p className="text-sm text-gray-600">Recommended experience</p>
        </div>
        <div>
          <div className="text-2xl font-bold text-gray-900 mb-2">
            Flexible schedule
          </div>
          <p className="text-sm text-gray-600">Learn at your own pace</p>
        </div>
      </div>
    </div>
  );
}
