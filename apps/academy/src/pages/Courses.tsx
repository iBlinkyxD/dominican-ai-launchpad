import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../mockData";
import { Course } from "../../types";
import { PackageCard } from "../components/courses/PackageCard";
import { AdditionalCourses } from "../components/courses/AdditionalCourses";
import {
  Settings,
  ChevronDown,
  HelpCircle,
  Award,
  Star,
  Clock,
  ChevronLeft,
  ChevronRight,
  BookOpen,
} from "lucide-react";
import eng101 from "../assets/badges/eng101.jpeg";
import ai101 from "../assets/badges/ai-101.jpeg";
import dr101 from "../assets/badges/dr101.jpeg";

export const Courses = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    api.getCourses().then(setCourses);
  }, []);

  const packageCourses = [
    {
      id: "intro-data-analytics",
      title: "Introduction to Data Analytics",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop",
      courseNumber: "Course 1 of 8",
    },
    {
      id: "data-analysis-spreadsheets",
      title: "Data Analysis with Spreadsheets and SQL",
      image:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop",
      courseNumber: "Course 2 of 8",
    },
    {
      id: "python-data-analytics",
      title: "Python Data Analytics",
      image:
        "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=250&fit=crop",
      courseNumber: "Course 3 of 8",
    },
    {
      id: "statistics-foundations",
      title: "Statistics Foundations",
      image:
        "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=400&h=250&fit=crop",
      courseNumber: "Course 4 of 8",
    },
    {
      id: "intro-data-management",
      title: "Introduction to Data Management",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop",
      courseNumber: "Course 5 of 8",
    },
    {
      id: "data-visualization",
      title: "Data Visualization Techniques",
      image:
        "https://images.unsplash.com/photo-1543286386-713bdd548da4?w=400&h=250&fit=crop",
      courseNumber: "Course 6 of 8",
    },
    {
      id: "advanced-sql",
      title: "Advanced SQL for Data Analysis",
      image:
        "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=400&h=250&fit=crop",
      courseNumber: "Course 7 of 8",
    },
    {
      id: "capstone-project",
      title: "Data Analytics Capstone Project",
      image:
        "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=250&fit=crop",
      courseNumber: "Course 8 of 8",
    },
  ];

  const additionalCourses = [
    {
      id: "web-dev-fundamentals",
      title: "Web Development Fundamentals",
      category: "EN-001",
      lessons: 42,
      duration: "5h 30min",
      rating: 4.6,
      reviews: 189,
      level: "Beginner",
      image:
        "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=250&fit=crop",
      instructor: "Michael Chen",
      badge: eng101,
      description:
        "Learn the core building blocks of the web including HTML, CSS, and JavaScript to create responsive and modern websites.",
    },
    {
      id: "machine-learning-basics",
      title: "Machine Learning Basics",
      category: "EN-101",
      lessons: 56,
      duration: "8h 45min",
      rating: 4.8,
      reviews: 312,
      level: "Intermediate",
      image:
        "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=250&fit=crop",
      instructor: "Dr. Emily Rodriguez",
      badge: eng101,
      description:
        "Understand key machine learning concepts, algorithms, and how to build predictive models using real-world datasets.",
    },
    {
      id: "digital-marketing-mastery",
      title: "Digital Marketing Mastery",
      category: "EN-102",
      lessons: 38,
      duration: "6h 15min",
      rating: 4.5,
      reviews: 245,
      level: "Beginner",
      image:
        "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=250&fit=crop",
      instructor: "Sarah Mitchell",
      badge: eng101,
      description:
        "Master SEO, social media, and paid advertising strategies to grow brands and drive measurable online results.",
    },
    {
      id: "ui-ux-design-principles",
      title: "UI/UX Design Principles",
      category: "EN-103",
      lessons: 45,
      duration: "7h 20min",
      rating: 4.7,
      reviews: 276,
      level: "Intermediate",
      image:
        "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=250&fit=crop",
      instructor: "Alex Thompson",
      badge: eng101,
      description:
        "Learn user-centered design, wireframing, and prototyping to create intuitive and engaging digital experiences.",
    },
    {
      id: "cloud-computing-aws",
      title: "Cloud Computing with AWS",
      category: "EN-104",
      lessons: 52,
      duration: "9h 10min",
      rating: 4.9,
      reviews: 398,
      level: "Advanced",
      image:
        "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=250&fit=crop",
      instructor: "David Kumar",
      badge: eng101,
      description:
        "Deploy scalable applications using AWS services, and understand cloud architecture, security, and best practices.",
    },
    {
      id: "cyber-security-essentials",
      title: "Cyber Security Essentials",
      category: "EN-105",
      lessons: 48,
      duration: "7h 45min",
      rating: 4.8,
      reviews: 334,
      level: "Intermediate",
      image:
        "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&h=250&fit=crop",
      instructor: "Jennifer Lee",
      badge: eng101,
      description:
        "Learn how to protect systems, networks, and data from cyber threats with practical security tools and techniques.",
    },
  ];

  const skillsDescription =
    "Gain expertise in data visualization, spreadsheet analysis, SQL databases, Python programming, statistical methods, and exploratory data analysis. Learn to collect.";

  return (
    <div className="relative min-h-[80vh] px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-6 flex flex-col-reverse xl:flex-row xl:justify-between gap-4">
        {/* LEFT SIDE */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Official Certifications
          </h2>
          <p className="text-gray-600">
            Explore other popular courses to expand your skills
          </p>
        </div>

        <div className="flex gap-2 overflow-x-auto my-auto">
          <button className="px-5 py-2 bg-[#0B1E40] text-white rounded-lg">
            All
          </button>
          <button className="px-5 py-2 text-gray-600">Enrolled</button>
          <button className="px-5 py-2 text-gray-600">Certifications</button>
          <button className="px-5 py-2 text-gray-600">Courses</button>
        </div>
      </div>

      {/* Packages */}
      <PackageCard
        id="daia-certified-ai-impact-practicioner"
        title="DAIA Certified AI Impact Practitioner"
        skills={skillsDescription}
        courses={packageCourses}
      />
      <PackageCard
        id="daia-certified-english-communication-professional"
        title="DAIA Certified English Communication Professional"
        skills={skillsDescription}
        courses={packageCourses}
      />

      {/* Additional */}
      <AdditionalCourses courses={additionalCourses} />

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
