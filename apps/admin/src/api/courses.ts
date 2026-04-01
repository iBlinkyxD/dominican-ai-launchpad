import { academyApi } from "./axios";

// ── Admin course list ──────────────────────────────────────────────────────────

export interface AdminCourse {
  id: string;
  title: string;
  slug: string;
  code: string | null;
  short_description: string | null;
  thumbnail_url: string | null;
  badge_url: string | null;
  is_published: boolean;
  module_count: number;
  total_lessons: number;
  has_video: boolean;
  enrollment_count: number;
  created_at: string;
}

export const getAdminCourses = async (): Promise<AdminCourse[]> => {
  const res = await academyApi.get("/courses/admin/all");
  return res.data;
};

// ── AI course generation ───────────────────────────────────────────────────────

export interface GenerateCourseRequest {
  description: string;
  level: string;
  language: string;
  duration: string;
  module_count: number;
  avg_lessons_per_module: number;
  avg_lesson_length: number;
  include_assessments: boolean;
  include_projects: boolean;
  course_code?: string;
  badge_name?: string;
  estimated_output_tokens?: number;
}

export interface LessonOutline {
  name: string;
  overview: string;
  objectives?: string[];
  vocabulary?: { term: string; definition: string }[];
}

export interface ModuleOutline {
  title: string;
  lessons: LessonOutline[];
}

export interface GenerateCourseResponse {
  title: string;
  short_description: string;
  modules: ModuleOutline[];
  faq: string;
}

async function streamSSE(
  path: string,
  body: object,
  onChunk: (accumulated: string) => void,
): Promise<string> {
  const baseUrl = import.meta.env.VITE_DAIA_ACADEMY_API as string;
  const res = await fetch(`${baseUrl}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`Request failed (${res.status})`);
  if (!res.body) throw new Error("No response body");

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let accumulated = "";
  let buffer = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split("\n");
    buffer = lines.pop() ?? "";
    for (const line of lines) {
      if (!line.startsWith("data: ")) continue;
      const data = line.slice(6).trim();
      if (data === "[DONE]") continue;
      if (data.startsWith("[ERROR] ")) throw new Error(data.slice(8));
      try {
        accumulated += JSON.parse(data);
        onChunk(accumulated);
      } catch { /* ignore malformed chunk */ }
    }
  }
  // Strip markdown fences if Claude wraps output despite instruction
  let result = accumulated.trim();
  if (result.startsWith("```")) {
    result = result.split("```")[1] ?? result;
    if (result.startsWith("json")) result = result.slice(4);
    result = result.trim();
  }
  return result;
}

export const generateCourseOutline = async (
  req: GenerateCourseRequest,
  onChunk?: (accumulated: string) => void,
): Promise<GenerateCourseResponse> => {
  const raw = await streamSSE("/courses/ai-generate", req, onChunk ?? (() => {}));
  try {
    return JSON.parse(raw);
  } catch {
    throw new Error("Generation was cut off before completing. Try reducing the number of lessons or lesson length, then regenerate.");
  }
};

// ── AI narration generation ────────────────────────────────────────────────────

export interface GenerateNarrationRequest {
  course_title: string;
  short_description: string;
  avg_lesson_length: number;
  language: string;
  modules: Array<{
    title: string;
    lessons: Array<{ name: string; overview: string }>;
  }>;
  estimated_output_tokens?: number;
}

export interface NarrationLesson {
  name: string;
  narration: string;
}

export interface NarrationModule {
  title: string;
  lessons: NarrationLesson[];
}

export interface GenerateNarrationResponse {
  modules: NarrationModule[];
}

export const generateNarrationScripts = async (
  req: GenerateNarrationRequest,
  onChunk?: (accumulated: string) => void,
): Promise<GenerateNarrationResponse> => {
  const raw = await streamSSE("/courses/ai-narrate", req, onChunk ?? (() => {}));
  try {
    return JSON.parse(raw);
  } catch {
    throw new Error("Narration generation was cut off before completing. Try reducing the number of lessons or lesson length, then regenerate.");
  }
};

// ── Course / module / lesson creation ─────────────────────────────────────────

export interface CreateCoursePayload {
  title: string;
  slug: string;
  description?: string;
  short_description?: string;
  faq?: string;
  level: string;
  instructor_name?: string;
  code?: string;
  is_published: boolean;
}

export interface CreateModulePayload {
  course_id: string;
  title: string;
  position: number;
}

export interface CreateLessonPayload {
  module_id: string;
  title: string;
  content?: string;
  narration_script?: string;
  duration_seconds?: number;
  lesson_type: string;
  position: number;
  objectives?: string[];
  vocabulary?: { term: string; definition: string }[];
}

export interface CourseDetailLesson {
  id: string;
  title: string;
  position: number;
  content: string | null;
  narration_script: string | null;
  objectives: string[] | null;
  vocabulary: { term: string; definition: string }[] | null;
}

export interface CourseDetailModule {
  id: string;
  title: string;
  position: number;
  lessons: CourseDetailLesson[];
}

export interface CourseDetail {
  id: string;
  title: string;
  slug: string;
  code: string | null;
  description: string | null;
  short_description: string | null;
  faq: string | null;
  level: string;
  is_published: boolean;
  modules: CourseDetailModule[];
}

export const getCourseDetail = async (slug: string): Promise<CourseDetail> => {
  const res = await academyApi.get(`/courses/admin/${slug}`);
  return res.data;
};

export const createCourse = async (payload: CreateCoursePayload): Promise<{ id: string }> => {
  const res = await academyApi.post("/courses/", payload);
  return res.data;
};

export const createModule = async (payload: CreateModulePayload): Promise<{ id: string }> => {
  const res = await academyApi.post("/modules/", payload);
  return res.data;
};

export const createLesson = async (payload: CreateLessonPayload): Promise<{ id: string }> => {
  const res = await academyApi.post("/lessons/", payload);
  return res.data;
};

export interface UpdateLessonPayload {
  content?: string;
  narration_script?: string;
  objectives?: string[];
  vocabulary?: { term: string; definition: string }[];
}

export const updateLesson = async (lessonId: string, payload: UpdateLessonPayload): Promise<void> => {
  await academyApi.patch(`/lessons/${lessonId}`, payload);
};

export const publishCourse = async (slug: string): Promise<void> => {
  await academyApi.patch(`/courses/${slug}/publish`);
};
