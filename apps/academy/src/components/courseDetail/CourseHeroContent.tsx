import daiaLogo from "../../assets/DAIA-logo.png";
import heroimage from "../../assets/temp.png";

interface CourseHeroContentProps {
  title: string | undefined;
  subtitle: string | null | undefined;
  description: string | null | undefined;
  type: "course" | "package";
  enrollmentCount?: number;
  instructorName?: string;
  isEnrolled: boolean;
  isEnrolling: boolean;
  onEnroll: () => void;
  onContinue: () => void;
}

export function CourseHeroContent({
  title,
  subtitle,
  description,
  type,
  enrollmentCount,
  instructorName,
  isEnrolled,
  isEnrolling,
  onEnroll,
  onContinue,
}: CourseHeroContentProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      {/* Left */}
      <div>
        <div className="mb-4">
          <img src={daiaLogo} className="w-auto h-12" />
        </div>
        <h1 className="text-4xl sm:text-5xl font-semibold text-gray-900 mb-4">
          {title}
        </h1>
        {subtitle && (
          <p className="text-lg text-gray-700 mb-3">{subtitle}</p>
        )}
        {description && (
          <p className="text-base text-gray-600 mb-6">{description}</p>
        )}

        {/* Instructor */}
        {instructorName && (
          <div className="flex items-center gap-2 mb-8 text-sm">
            <span className="font-semibold text-gray-900">Instructor:</span>
            <span className="text-blue-600 font-medium">{instructorName}</span>
          </div>
        )}

        <div className="mb-6">
          {isEnrolled ? (
            <button
              onClick={onContinue}
              className="px-8 py-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-semibold text-lg shadow-lg"
            >
              Start Learning
            </button>
          ) : (
            <button
              onClick={onEnroll}
              disabled={isEnrolling}
              className="px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold text-lg shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isEnrolling ? "Enrolling..." : "Enroll for free"}
            </button>
          )}
        </div>

        {/* Enrollment Info */}
        {enrollmentCount !== undefined && (
          <div className="text-sm text-gray-700 mb-2">
            <span className="font-semibold">{enrollmentCount.toLocaleString()}</span> already enrolled
          </div>
        )}
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Included with</span>
          <div className="bg-blue-600 text-white px-3 py-1 rounded text-xs font-bold">
            DAIA PLUS
          </div>
          <button className="text-blue-600 hover:underline text-sm font-medium">
            Learn more
          </button>
        </div>
      </div>

      {/* Right — hero image */}
      <div className="hidden lg:flex justify-end items-center mx-auto">
        <img
          src={heroimage}
          alt="Hero"
          className="max-w-[520px] w-full h-auto object-contain"
        />
      </div>
    </div>
  );
}
