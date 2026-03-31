export interface Module {
  title: string;
  lessons: string[];
}

export interface CourseForm {
  description: string;
  title: string;
  shortDescription: string;
  level: "beginner" | "intermediate" | "advanced";
  language: "english" | "spanish" | "bilingual";
  duration: string;
  moduleCount: number;
  avgLessonsPerModule: number;
  avgLessonLength: number;
  includeAssessments: boolean;
  includeProjects: boolean;
  courseCode: string;
  badgeName: string;
  audience: string;
  modules: Module[];
  lessonOverviews: Record<string, string>;
  faq: string;
  published: boolean;
}

export type StepProps = {
  form: CourseForm;
  setForm: (f: CourseForm) => void;
  onNext: () => void;
  onBack: () => void;
};
