import introAI from "@/assets/courses/intro-AI.jpeg";
import learnEnglishAI from "@/assets/courses/learn-English-AI.jpeg";
import AIinDR from "@/assets/courses/AI-in-DR.jpeg";
import { courseDetail } from "./detail";
import { instructors } from "./instructor";

export interface CourseList {
  slug: string;
  title: string;
  description: string;
  price: number;
  rating: number;
  students: number;
  lessons: number;
  duration: string;
  instructor: string;
  image: string;
  tags: string[];
  featured: boolean;
}

export const coursesList: CourseList[] = Object.values(courseDetail).map((course) => ({
  slug: course.slug,
  title: course.title,
  description: course.description,
  price: course.price,
  rating: course.rating,
  students: course.students,
  lessons: course.lessons,
  duration: course.duration,
  instructor: instructors[course.instructorId]?.name,
  image: course.image,
  tags: course.tags,
  featured: course.featured,
}))

// export const courses: Course[] = [
//   {
//     id: "introduction-to-ai",
//     title: "Introduction to AI",
//     description:
//       "Understand the basics, explore real-world applications, and unlock the power of AI for your future.",
//     price: 99,
//     rating: 4.8,
//     students: 0,
//     lessons: 42,
//     duration: "20 hours",
//     instructor: "Prof. Salomón / Solomon",
//     image: introAI,
//     tags: ["Foundations", "Intelligence", "Future"],
//     featured: true,
//   },
//   {
//     id: "learn-english-with-ai",
//     title: "Learn English with AI",
//     description:
//       "Practice, improve, and communicate confidently with AI-guided lessons and real conversations.",
//     price: 99,
//     rating: 4.9,
//     students: 32,
//     lessons: 56,
//     duration: "28 hours",
//     instructor: "Prof. Luis Dorismon",
//     image: learnEnglishAI,
//     tags: ["Language", "Practice", "Confidence"],
//     featured: true,
//   },
//   {
//     id: "ai-in-the-dominican-republic",
//     title: "AI in the Dominican Republic",
//     description:
//       "Discover how AI is transforming industries, solving challenges, and creating opportunities in the Dominican Republic.",
//     price: 99,
//     rating: 4.7,
//     students: 0,
//     lessons: 68,
//     duration: "35 hours",
//     instructor: "Prof. Salomón / Solomon",
//     image: AIinDR,
//     tags: ["Innovation", "Impact", "Solutions"],
//     featured: true,
//   },
// ];