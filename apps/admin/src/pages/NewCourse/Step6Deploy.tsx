import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, Check, Rocket, AlertCircle } from "lucide-react";
import { PROCESSING_TASKS } from "./constants";
import type { CourseForm } from "./types";
import { createCourse, createModule, createLesson, updateLesson, uploadCourseThumbnail, publishCourse, getCourseDetail } from "@/api/courses";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .trim();
}

interface Props {
  form: CourseForm;
  thumbnailFile?: File | null;
  onBack: () => void;
  onDeployed: () => void;
}

export function Step6Deploy({ form, thumbnailFile, onBack, onDeployed }: Props) {
  const navigate = useNavigate();
  const [done,    setDone]    = useState<Set<number>>(new Set());
  const [error,   setError]   = useState<string | null>(null);
  const [started, setStarted] = useState(false);

  const allDone  = done.size === PROCESSING_TASKS.length;
  const progress = Math.round((done.size / PROCESSING_TASKS.length) * 100);

  useEffect(() => {
    if (started) return;
    setStarted(true);
    deploy();
  }, []);

  async function deploy() {
    try {
      if (form.courseSlug) {
        // ── Draft already saved — update lesson content then publish ──
        setDone((prev) => new Set([...prev, 0]));
        const course = await getCourseDetail(form.courseSlug);
        const sortedModules = course.modules
          .slice()
          .sort((a, b) => a.position - b.position)
          .map((m) => ({ ...m, lessons: m.lessons.slice().sort((a, b) => a.position - b.position) }));
        setDone((prev) => new Set([...prev, 1]));

        for (let mi = 0; mi < sortedModules.length; mi++) {
          for (let li = 0; li < sortedModules[mi].lessons.length; li++) {
            const lessonId = sortedModules[mi].lessons[li].id;
            const key = `${mi}-${li}`;
            await updateLesson(lessonId, {
              content:          form.lessonOverviews[key]   || undefined,
              narration_script: form.lessonNarrations[key]  || undefined,
              objectives:       form.lessonObjectives[key]  || undefined,
              vocabulary:       form.lessonVocabulary[key]  || undefined,
            });
          }
        }
        setDone((prev) => new Set([...prev, 2]));
        if (thumbnailFile) await uploadCourseThumbnail(form.courseSlug, thumbnailFile);
        await publishCourse(form.courseSlug);
        setDone((prev) => new Set([...prev, 3]));
      } else {
        // ── Full creation flow (no prior draft) ───────────────────────
        const slug = slugify(form.title || form.description) || `course-${Date.now()}`;
        const course = await createCourse({
          title:             form.title || form.description.slice(0, 80),
          slug,
          description:       form.description || undefined,
          short_description: form.shortDescription || undefined,
          faq:               form.faq || undefined,
          level:             form.level,
          instructor_name:   "DAIA Academy",
          code:              form.courseCode || undefined,
          is_published:      true,
        });
        setDone((prev) => new Set([...prev, 0]));

        const moduleIds: string[] = [];
        for (let mi = 0; mi < form.modules.length; mi++) {
          const mod = await createModule({
            course_id: course.id,
            title:     form.modules[mi].title,
            position:  mi,
          });
          moduleIds.push(mod.id);
        }
        setDone((prev) => new Set([...prev, 1]));

        const durationSeconds = form.avgLessonLength * 60;
        for (let mi = 0; mi < form.modules.length; mi++) {
          const lessons = form.modules[mi].lessons;
          for (let li = 0; li < lessons.length; li++) {
            const key = `${mi}-${li}`;
            await createLesson({
              module_id:        moduleIds[mi],
              title:            lessons[li],
              content:          form.lessonOverviews[key]   || undefined,
              narration_script: form.lessonNarrations[key]  || undefined,
              duration_seconds: durationSeconds,
              lesson_type:      "article",
              position:         li,
              objectives:       form.lessonObjectives[key]  || undefined,
              vocabulary:       form.lessonVocabulary[key]  || undefined,
            });
          }
        }
        setDone((prev) => new Set([...prev, 2]));
        if (thumbnailFile) await uploadCourseThumbnail(slug, thumbnailFile);
        setDone((prev) => new Set([...prev, 3]));
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Deployment failed. Please try again.";
      setError(msg);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 min-h-full">
      <div className="w-full max-w-md space-y-6">

        {/* Icon + heading */}
        <div className="text-center">
          <div className="w-16 h-16 bg-[#0B1E40] rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Rocket className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-xl font-bold text-gray-900">
            {error ? "Deployment failed" : allDone ? "Course is Live!" : "Deploying your course…"}
          </h2>
          <p className="text-sm text-gray-400 mt-1">
            {error
              ? "Something went wrong during deployment."
              : allDone
              ? "Your course has been published to the academy."
              : "This usually takes less than a minute."}
          </p>
        </div>

        {/* Error banner */}
        {error && (
          <div className="flex items-start gap-2 bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm text-red-600">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {/* Progress bar */}
        {!error && (
          <div>
            <div className="flex justify-between text-xs text-gray-400 mb-1.5">
              <span>{done.size} of {PROCESSING_TASKS.length} tasks</span>
              <span>{progress}%</span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#0B1E40] to-blue-500 rounded-full transition-all duration-700"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        {/* Task list */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm divide-y divide-gray-50">
          {PROCESSING_TASKS.map((task, i) => {
            const isDone   = done.has(i);
            const isActive = !isDone && !error && done.size === i;
            return (
              <div key={i} className="flex items-center gap-3 px-5 py-3.5">
                <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 transition-all ${
                  isDone   ? "bg-green-500"  :
                  isActive ? "bg-blue-100"   : "bg-gray-100"
                }`}>
                  {isDone
                    ? <Check className="w-3 h-3 text-white" />
                    : isActive
                    ? <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                    : <div className="w-2 h-2 rounded-full bg-gray-300" />}
                </div>
                <span className={`text-sm transition-colors ${
                  isDone   ? "text-gray-700"               :
                  isActive ? "text-blue-600 font-medium"   : "text-gray-400"
                }`}>
                  {task.label}
                </span>
                {isDone   && <Check className="w-3.5 h-3.5 text-green-500 ml-auto" />}
                {isActive && <span className="text-xs text-blue-400 ml-auto animate-pulse">Processing…</span>}
              </div>
            );
          })}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between">
          {(error || (!allDone && !started)) && (
            <button
              onClick={onBack}
              className="flex items-center gap-1.5 border border-gray-200 text-gray-500 text-sm font-medium px-5 py-2.5 rounded-xl hover:bg-gray-50 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" /> Back
            </button>
          )}
          {allDone && (
            <button
              onClick={() => { onDeployed(); navigate("/academy/courses"); }}
              className="flex items-center gap-2 w-full justify-center bg-green-500 hover:bg-green-600 text-white text-sm font-semibold px-6 py-3 rounded-xl transition-colors"
            >
              <Check className="w-4 h-4" /> View in Academy
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
