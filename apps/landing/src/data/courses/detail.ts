import introAI from "@/assets/courses/intro-AI.jpeg";
import learnEnglishAI from "@/assets/courses/learn-English-AI.jpeg";
import VirtualTutoring from "@/assets/courses/1on1_Virtual_Tutoring.jpeg";

export interface CourseDetail {
  slug: string;

  /** base translation key inside "courses" namespace */
  i18nKey: string;

  price: number;
  rating: number;
  reviews: number;
  students: number;
  lessons: number;

  instructorId: string;
  image: string;
  videoThumbnail: string;
  featured: boolean;

  trustedBy: string[];
}

export const courseDetail: Record<string, CourseDetail> = {
  "introduction-to-ai": {
    slug: "introduction-to-ai",
    i18nKey: "introAI",

    price: 99,
    rating: 4.8,
    reviews: 342,
    students: 0,
    lessons: 42,

    instructorId: "salomon",
    image: introAI,
    videoThumbnail:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=450&fit=crop",

    featured: true,
    trustedBy: ["TechCorp", "DataFlow", "AI Labs", "CloudTech"],
  },

  "learn-english-with-ai": {
    slug: "learn-english-with-ai",
    i18nKey: "learnEnglishAI",

    price: 99,
    rating: 4.9,
    reviews: 289,
    students: 32,
    lessons: 56,

    instructorId: "luis",
    image: learnEnglishAI,
    videoThumbnail:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=450&fit=crop",

    featured: true,
    trustedBy: ["Analytics Co", "DataDriven", "InsightHub", "MetricsPro"],
  },

  "1on1-virtual-tutoring": {
    slug: "1on1-virtual-tutoring",
    i18nKey: "1on1VirtualTutoring",

    price: 200,
    rating: 4.7,
    reviews: 456,
    students: 0,
    lessons: 0,

    instructorId: "arianna",
    image: VirtualTutoring,
    videoThumbnail:
      "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800&h=450&fit=crop",

    featured: true,
    trustedBy: ["WebFlow", "CodeCraft", "DevHub", "TechStart"],
  },
};
