import type { Module } from "./types";

export const STEPS = [
  { number: 1, label: "Describe",  sub: "Your course idea" },
  { number: 2, label: "Configure", sub: "Set parameters" },
  { number: 3, label: "Outline",   sub: "Review structure" },
  { number: 4, label: "Video",     sub: "Create media" },
  { number: 5, label: "Deploy",    sub: "Go live" },
];

export const SUGGESTIONS = [
  "Agriculture in the DR",
  "English for Beginners",
  "Introduction to AI",
  "Dominican History",
];

export const SAMPLE_MODULES: Module[] = [
  { title: "Introduction & Foundations", lessons: ["Welcome to the Course", "Core Concepts Overview", "Tools & Setup"] },
  { title: "Core Principles",            lessons: ["Principle One", "Principle Two", "Practical Application"] },
  { title: "Intermediate Topics",        lessons: ["Going Deeper", "Common Challenges", "Case Studies"] },
  { title: "Advanced Techniques",        lessons: ["Advanced Methods", "Real-world Scenarios", "Expert Tips"] },
];

export const LEVEL_COLORS: Record<string, string> = {
  beginner: "bg-green-500",
  intermediate: "bg-yellow-400",
  advanced: "bg-red-500",
};

export const DURATIONS = ["2 weeks", "4 weeks", "6 weeks", "8 weeks", "10 weeks", "12 weeks"];

export const LESSON_OBJECTIVES = ["Master core concepts", "Apply to real scenarios", "Demonstrate understanding"];

export const PROCESSING_TASKS = [
  { label: "Creating course" },
  { label: "Building module structure" },
  { label: "Adding lesson content" },
  { label: "Publishing to academy" },
];

export const DEFAULT_FORM = {
  description: "",
  title: "",
  shortDescription: "",
  level: "beginner" as const,
  language: "english" as const,
  duration: "4 weeks",
  moduleCount: 4,
  avgLessonsPerModule: 3,
  avgLessonLength: 15,
  includeAssessments: false,
  includeProjects: false,
  courseCode: "",
  badgeName: "",
  audience: "",
  modules: SAMPLE_MODULES,
  lessonOverviews: {} as Record<string, string>,
  lessonNarrations: {} as Record<string, string>,
  lessonObjectives: {} as Record<string, string[]>,
  lessonVocabulary: {} as Record<string, { term: string; definition: string }[]>,
  faq: "",
  published: false,
};
