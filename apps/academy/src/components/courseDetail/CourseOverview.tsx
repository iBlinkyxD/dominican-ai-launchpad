import { Check } from "lucide-react";

export const CourseOverview = () => {
  const learningPoints = [
    "Setting up the environment",
    "Advanced HTML Practices",
    "Build a portfolio website",
    "Responsive Designs",
    "Understand HTML Programming",
    "Code HTML",
    "Start building beautiful websites",
  ];

  return (
    <div className="space-y-6">
      {/* About Course */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-3">About Course</h3>
        <p className="text-gray-600 mb-3 text-[14px]">
          Unlock the power of Figma, the leading collaborative design tool, with
          our comprehensive online course. Whether you're a novice or looking to
          enhance your skills, this course will guide you through Figma's robust
          features and workflows.
        </p>
        <p className="text-gray-600 text-[14px]">
          Perfect for UI/UX designers, product managers, and anyone interested
          in modern design tools. Join us to elevate your design skills and
          boost your productivity with Figma!
        </p>
      </div>

      {/* What You'll Learn */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          What You'll Learn
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {learningPoints.map((point, index) => (
            <div key={index} className="flex items-start gap-2">
              <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
              <span className="text-gray-700 text-[14px]">{point}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
