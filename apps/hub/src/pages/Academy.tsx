import {
  GraduationCap,
  Award,
  BookOpen,
  ChevronRight,
  CheckCircle,
} from "lucide-react";
import daiaLogo from "@/assets/DAIA-logo.png";

const Academy = () => {
  // Mock user data - in real app, this would come from props or context
  const userData = {
    academyName: "Jaya Academy",
    role: "Global Learner",
    organization: "Dominican Artificial Intelligence Association",
    level: "Level 2 - Intermediate",
    progressPercentage: 42,
    coursesCompleted: 3,
    certificationsInProgress: 1,
    certificationsEarned: [
      {
        name: "AI Fundamentals",
        issuedDate: "Jan 2026",
        color: "from-blue-500 to-cyan-500",
      },
      {
        name: "Python Basics",
        issuedDate: "Dec 2025",
        color: "from-purple-500 to-pink-500",
      },
    ],
    userType: "in-progress" as "new" | "in-progress" | "completed",
  };

  const handleAcademy = async () => {
      window.location.href = `${import.meta.env.VITE_ACADEMY_URL}/`;
  };

  const getButtonText = () => {
    switch (userData.userType) {
      case "new":
        return "Start Free Mini-Course";
      case "in-progress":
        return "Continue Learning";
      case "completed":
        return "View Certification Paths";
      default:
        return "Continue Learning";
    }
  };

  const certificationPath = ["Intro", "101", "102", "103", "104", "105", "106"];
  const currentPosition = 2; // User is at 102

  return (
    <>
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r text-blue-950 bg-clip-text text-transparent">
          DAIA Academy
        </h1>
        <div className="flex items-center justify-center gap-3 text-gray-600 text-sm flex-wrap">
          <span className="px-3 py-1 bg-white rounded-full border border-gray-300 shadow-sm">
            Global Learner
          </span>
          <span>•</span>
          <span>Dominican Artificial Intelligence Association</span>
          <span>•</span>
          <span className="text-blue-600 font-medium">
            Level 2 - Intermediate
          </span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto">
        {/* CTA Section */}
        <div className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 rounded-3xl p-12 border border-gray-200 shadow-lg">
          <div className="text-center">
            <div className="mb-6">
              <GraduationCap className="h-20 w-20 mx-auto text-blue-950 mb-4" />
              <h2 className="text-4xl font-bold mb-4 text-gray-900">
                Ready to Begin Your Journey?
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Unlock your potential with our comprehensive courses designed
                for learners of all ages and skill levels.
              </p>
            </div>

            <button onClick={() => handleAcademy()} className="px-8 py-5 bg-gradient-to-r from-[#002D62] via-[#BD2D2F] to-[#002D62] rounded-2xl hover:opacity-90 transition shadow-lg hover:shadow-xl font-bold text-xl text-white flex items-center justify-center gap-3 group mx-auto">
              Start Your Free Mini Course
              <ChevronRight className="h-6 w-6 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Academy;
