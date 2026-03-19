import {
  Star,
  Clock,
  Calendar,
  Award,
  BookOpen,
  ChevronRight,
  Users,
  ChevronLeft,
} from "lucide-react";
import { useNavigate } from "react-router";
import { useLocation } from "react-router-dom";
import daiaLogo from "../assets/DAIA-logo.png";
import heroimage from "../assets/temp.png";

export function CertificateDetailPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { title, skills2 } = location.state || {};
  const instructors = [
    {
      name: "Dr. Maria Santos",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    },
    {
      name: "Prof. Carlos Rodriguez",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    },
    {
      name: "Dr. Ana Martinez",
      image:
        "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=100&h=100&fit=crop",
    },
  ];

  const packageCourses = [
    {
      id: "intro-data-analytics",
      title: "Introduction to Data Analytics",
      rating: 4.7,
      reviews: 2845,
      duration: "12 hours",
      level: "Beginner",
    },
    {
      id: "data-analysis-spreadsheets",
      title: "Data Analysis with Spreadsheets and SQL",
      rating: 4.6,
      reviews: 1923,
      duration: "18 hours",
      level: "Beginner",
    },
    {
      id: "python-data-analytics",
      title: "Python Data Analytics",
      rating: 4.8,
      reviews: 3102,
      duration: "24 hours",
      level: "Intermediate",
    },
    {
      id: "statistics-foundations",
      title: "Statistics Foundations",
      rating: 4.5,
      reviews: 1654,
      duration: "16 hours",
      level: "Beginner",
    },
    {
      id: "intro-data-management",
      title: "Introduction to Data Management",
      rating: 4.7,
      reviews: 1432,
      duration: "14 hours",
      level: "Beginner",
    },
    {
      id: "data-visualization",
      title: "Data Visualization Techniques",
      rating: 4.8,
      reviews: 2234,
      duration: "20 hours",
      level: "Intermediate",
    },
    {
      id: "advanced-sql",
      title: "Advanced SQL for Data Analysis",
      rating: 4.6,
      reviews: 1876,
      duration: "22 hours",
      level: "Intermediate",
    },
    {
      id: "capstone-project",
      title: "Data Analytics Capstone Project",
      rating: 4.9,
      reviews: 987,
      duration: "30 hours",
      level: "Advanced",
    },
  ];

  const skills = [
    "Data Visualization",
    "Python Programming",
    "SQL",
    "Data Analysis",
    "Statistical Analysis",
    "Pandas",
    "Data Cleansing",
    "Spreadsheet Analysis",
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-50 via-white to-purple-50 relative overflow-hidden">
        <div className="mx-auto px-8 sm:px-6 lg:px-16 py-12">
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
            <button
              onClick={() => navigate("/hub")}
              className="hover:text-gray-900 flex items-center gap-1"
            >
              <ChevronLeft className="h-4 w-4" />
              Courses
            </button>
            <span>/</span>
            <span className="text-gray-400">Packages</span>
            <span>/</span>
            <span className="text-gray-900 font-medium">{title}</span>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              {/* Logo */}
              <div className="mb-4">
                <img src={daiaLogo} className="w-auto h-12" />
              </div>

              {/* Title */}
              <h1 className="text-4xl sm:text-5xl font-semibold text-gray-900 mb-4">
                {title}
              </h1>

              {/* Description */}
              <p className="text-lg text-gray-700 mb-3">
                Prepare for a career as a data analyst.
              </p>
              <p className="text-base text-gray-600 mb-6">
                Build job-ready skills – and must-have AI skills – for an
                in-demand career. Earn a credential from DAIA. No prior
                experience required.
              </p>

              {/* Instructors */}
              <div className="flex items-center gap-3 mb-8">
                <div className="flex -space-x-2">
                  {instructors.map((instructor, idx) => (
                    <img
                      key={idx}
                      src={instructor.image}
                      alt={instructor.name}
                      className="w-10 h-10 rounded-full border-2 border-white"
                    />
                  ))}
                </div>
                <div className="text-sm">
                  <span className="font-semibold text-gray-900">
                    Instructors:{" "}
                  </span>
                  <button className="text-blue-600 hover:underline font-medium">
                    DAIA Skills Network Team
                  </button>
                  <span className="text-gray-600"> +11 more</span>
                </div>
                <button className="ml-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold hover:bg-blue-200 transition">
                  + New AI skills
                </button>
              </div>

              {/* CTA Button */}
              <div className="mb-6">
                <button className="px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold text-lg shadow-lg hover:shadow-xl">
                  Enroll for free
                </button>
              </div>

              {/* Enrollment Info */}
              <div className="text-sm text-gray-700 mb-2">
                <span className="font-semibold">512,056</span> already enrolled
              </div>
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

            <div className="hidden lg:flex justify-end items-center mx-auto">
              <img
                src={heroimage}
                alt="Data Analytics Illustration"
                className="max-w-[520px] w-full h-auto object-contain"
              />
            </div>
          </div>

          {/* Stats Cards */}
          <div className="mt-12 bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Course Series */}
              <div>
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  8 course series
                </div>
                <p className="text-sm text-gray-600">
                  Earn a career credential that demonstrates your expertise
                </p>
              </div>

              {/* Rating */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-3xl font-bold text-gray-900">4.7</span>
                  <Star className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                </div>
                <p className="text-sm text-gray-600">
                  from 86,342 reviews of courses in this program
                </p>
              </div>

              {/* Level */}
              <div>
                <div className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-2">
                  Beginner level
                  <span className="text-sm font-normal text-gray-500">ⓘ</span>
                </div>
                <p className="text-sm text-gray-600">Recommended experience</p>
              </div>

              {/* Schedule */}
              <div>
                <div className="text-2xl font-bold text-gray-900 mb-2">
                  Flexible schedule
                </div>
                <p className="text-sm text-gray-600">
                  5 months at 10 hours a week. Learn at your own pace
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* What You'll Learn Section */}
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            What you'll learn
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex gap-3">
              <div className="text-blue-600 mt-1">✓</div>
              <p className="text-gray-700">
                Gain the job-ready skills for an entry-level data analyst role
                through a professional certificate from DAIA
              </p>
            </div>
            <div className="flex gap-3">
              <div className="text-blue-600 mt-1">✓</div>
              <p className="text-gray-700">
                Learn to visualize and present data findings in dashboards,
                presentations and commonly used visualization platforms
              </p>
            </div>
            <div className="flex gap-3">
              <div className="text-blue-600 mt-1">✓</div>
              <p className="text-gray-700">
                Develop working knowledge of Python, SQL, Excel spreadsheets,
                Cognos, and Jupyter Notebooks for data analysis
              </p>
            </div>
            <div className="flex gap-3">
              <div className="text-blue-600 mt-1">✓</div>
              <p className="text-gray-700">
                Acquire and apply new skills in SQL databases, data
                visualization, statistical analysis, and predictive modeling
              </p>
            </div>
          </div>
        </div>

        {/* Skills You'll Gain */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Skills you'll gain
          </h2>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, idx) => (
              <span
                key={idx}
                className="px-4 py-2 bg-gray-100 text-gray-800 rounded-lg text-sm font-medium hover:bg-gray-200 transition"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Courses in This Certificate */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-semibold text-gray-900">
              Courses in this Professional Certificate
            </h2>
            <span className="text-gray-600 font-medium">8 Courses</span>
          </div>

          <div className="space-y-4">
            {packageCourses.map((course, idx) => (
              <div
                key={course.id}
                className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition cursor-pointer group"
                onClick={() => navigate(`/course/${course.id}`)}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 font-semibold text-lg">
                    {idx + 1}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition">
                      {course.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-semibold text-gray-900">
                          {course.rating}
                        </span>
                        <span>({course.reviews.toLocaleString()} reviews)</span>
                      </div>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {course.duration}
                      </span>
                      <span className="px-3 py-1 bg-gray-100 rounded-full text-xs font-semibold">
                        {course.level}
                      </span>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition my-auto" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
