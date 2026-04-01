import { useRef, useState } from "react";
import { ChevronLeft, Check, Sparkles, Settings, ImagePlus, AlertCircle } from "lucide-react";
import type { CourseForm } from "./types";
import { LEVEL_COLORS, DURATIONS } from "./constants";
import { generateCourseOutline, generateNarrationScripts, createCourse, createModule, createLesson } from "@/api/courses";

interface StepperProps {
  value: number;
  min: number;
  max: number;
  onChange: (v: number) => void;
}

function Stepper({ value, min, max, onChange }: StepperProps) {
  return (
    <div className="flex items-center gap-0 border border-gray-200 rounded-xl overflow-hidden bg-white">
      <button
        onClick={() => onChange(Math.max(min, value - 1))}
        className="w-10 h-11 flex items-center justify-center text-gray-500 hover:bg-gray-50 font-bold text-lg border-r border-gray-200 transition-colors"
      >−</button>
      <div className="flex flex-col items-center justify-center px-4 flex-1">
        <span className="text-xl font-bold text-gray-900 leading-none">{value}</span>
      </div>
      <button
        onClick={() => onChange(Math.min(max, value + 1))}
        className="w-10 h-11 flex items-center justify-center text-gray-500 hover:bg-gray-50 font-bold text-lg border-l border-gray-200 transition-colors"
      >+</button>
    </div>
  );
}

const GENERATION_STEPS = [
  "Analyzing your course description…",
  "Designing module structure…",
  "Writing lesson overviews…",
  "Creating FAQ section…",
  "Writing narration scripts…",
  "Aligning narration with written content…",
  "Finalizing course content…",
];

interface Props {
  form: CourseForm;
  setForm: (f: CourseForm) => void;
  onNext: () => void;
  onBack: () => void;
}

export function Step2Configure({ form, setForm, onNext, onBack }: Props) {
  const totalLessons = form.moduleCount * form.avgLessonsPerModule;
  const totalHours   = Math.round((totalLessons * form.avgLessonLength) / 60);

  // ── AI cost estimation ────────────────────────────────────────────────────────
  // Call 1 — Written content: lesson_minutes × 150 words/min
  // 1.45x multiplier accounts for markdown syntax overhead (##, **, -, JSON keys)
  const writtenWordsPerLesson  = form.avgLessonLength * 150;
  const writtenTokensPerLesson = Math.ceil(writtenWordsPerLesson * 1.45);
  // ~100 extra tokens/lesson for objectives array + vocabulary array (when present)
  const OBJ_VOCAB_TOKENS       = 100;
  // ~700 system prompt + ~150 fixed user message + description length (4 chars ≈ 1 token)
  const C1_INPUT_TOKENS        = 700 + 150 + Math.ceil(form.description.length / 4);
  const C1_OUTPUT_TOKENS       = (form.moduleCount * form.avgLessonsPerModule * (writtenTokensPerLesson + OBJ_VOCAB_TOKENS))
                               + (form.moduleCount * 30) + 700;

  // Call 2 — Narration: lesson_minutes × 130 words/min (plain prose — 1.33x)
  // Input = written lesson overviews (reconstructed by backend from frontend data) + system prompt + user message overhead
  const narratWordsPerLesson  = form.avgLessonLength * 130;
  const narratTokensPerLesson = Math.ceil(narratWordsPerLesson * 1.33);
  const C2_INPUT_TOKENS       = C1_OUTPUT_TOKENS + 2_000;                  // written content as context
  const C2_OUTPUT_TOKENS      = (form.moduleCount * form.avgLessonsPerModule * narratTokensPerLesson)
                               + (form.moduleCount * 20) + 200;

  const EST_OUTPUT_TOKENS = C1_OUTPUT_TOKENS + C2_OUTPUT_TOKENS;           // passed to backend for buffer

  const estWords    = form.moduleCount * form.avgLessonsPerModule
                    * (writtenWordsPerLesson + narratWordsPerLesson);
  const estCost     = ((C1_INPUT_TOKENS + C2_INPUT_TOKENS) * 3 / 1_000_000)
                    + (EST_OUTPUT_TOKENS * 15 / 1_000_000);
  const estCostLow  = estCost * 0.80;
  const estCostHigh = estCost * 1.20;
  const costColor   = estCost < 0.10 ? "text-green-600" : estCost < 0.50 ? "text-yellow-600" : "text-red-500";
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [badgePreview, setBadgePreview] = useState<string | null>(null);

  const [isGenerating,  setIsGenerating]  = useState(false);
  const [genStep,       setGenStep]       = useState(0);
  const [genError,      setGenError]      = useState<string | null>(null);
  const [streamedWords, setStreamedWords] = useState(0);
  const phase1WordsRef = useRef(0);

  function handleBadgeUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) setBadgePreview(URL.createObjectURL(file));
  }

  function countWords(text: string) {
    return text.trim() ? text.trim().split(/\s+/).length : 0;
  }

  async function handleGenerate() {
    setIsGenerating(true);
    setGenError(null);
    setGenStep(0);
    setStreamedWords(0);

    try {
      // ── Call 1: Written content ──────────────────────────────────────────────
      setGenStep(0);
      const outline = await generateCourseOutline({
        description:             form.description,
        level:                   form.level,
        language:                form.language,
        duration:                form.duration,
        module_count:            form.moduleCount,
        avg_lessons_per_module:  form.avgLessonsPerModule,
        avg_lesson_length:       form.avgLessonLength,
        include_assessments:     form.includeAssessments,
        include_projects:        form.includeProjects,
        course_code:             form.courseCode || undefined,
        badge_name:              form.badgeName  || undefined,
        estimated_output_tokens: C1_OUTPUT_TOKENS,
      }, (accumulated) => {
        setStreamedWords(countWords(accumulated));
        // Move through phase 1 steps based on content appearing
        const w = countWords(accumulated);
        if (w > 50)  setGenStep(1);
        if (w > 200) setGenStep(2);
        if (w > 500) setGenStep(3);
      });

      setGenStep(4);

      // ── Call 2: Narration scripts ────────────────────────────────────────────
      const c1Words = countWords(JSON.stringify(outline));
      phase1WordsRef.current = c1Words;
      const narration = await generateNarrationScripts({
        course_title:            outline.title,
        short_description:       outline.short_description,
        avg_lesson_length:       form.avgLessonLength,
        language:                form.language,
        modules:                 outline.modules.map((m) => ({
          title:   m.title,
          lessons: m.lessons.map((l) => ({ name: l.name, overview: l.overview })),
        })),
        estimated_output_tokens: C2_OUTPUT_TOKENS,
      }, (accumulated) => {
        setStreamedWords(c1Words + countWords(accumulated));
        const w = countWords(accumulated);
        if (w > 100) setGenStep(5);
        if (w > 400) setGenStep(6);
      });

      // ── Map both responses into form state ───────────────────────────────────
      const newModules = outline.modules.map((m) => ({
        title:   m.title,
        lessons: m.lessons.map((l) => l.name),
      }));

      const newOverviews: Record<string, string> = {};
      const newNarrations: Record<string, string> = {};
      const newObjectives: Record<string, string[]> = {};
      const newVocabulary: Record<string, { term: string; definition: string }[]> = {};

      outline.modules.forEach((m, mi) => {
        m.lessons.forEach((l, li) => {
          newOverviews[`${mi}-${li}`] = l.overview;
          if (l.objectives?.length) newObjectives[`${mi}-${li}`] = l.objectives;
          if (l.vocabulary?.length) newVocabulary[`${mi}-${li}`] = l.vocabulary;
        });
      });

      narration.modules.forEach((m, mi) => {
        m.lessons.forEach((l, li) => {
          newNarrations[`${mi}-${li}`] = l.narration;
        });
      });

      // ── Auto-save as draft to backend ───────────────────────────────────────
      let draftSlug: string | undefined;
      try {
        const slug = outline.title
          .toLowerCase()
          .replace(/[^\w\s-]/g, "")
          .replace(/[\s_]+/g, "-")
          .replace(/^-+|-+$/g, "")
          .trim() || `course-${Date.now()}`;

        const draftCourse = await createCourse({
          title:             outline.title,
          slug,
          description:       form.description || undefined,
          short_description: outline.short_description || undefined,
          faq:               outline.faq || undefined,
          level:             form.level,
          instructor_name:   "DAIA Academy",
          code:              form.courseCode || undefined,
          is_published:      false,
        });
        draftSlug = slug;

        const durationSeconds = form.avgLessonLength * 60;
        for (let mi = 0; mi < newModules.length; mi++) {
          const mod = await createModule({ course_id: draftCourse.id, title: newModules[mi].title, position: mi });
          for (let li = 0; li < newModules[mi].lessons.length; li++) {
            await createLesson({
              module_id:         mod.id,
              title:             newModules[mi].lessons[li],
              content:           newOverviews[`${mi}-${li}`]   || undefined,
              narration_script:  newNarrations[`${mi}-${li}`]  || undefined,
              duration_seconds: durationSeconds,
              lesson_type:      "article",
              position:         li,
              objectives:       newObjectives[`${mi}-${li}`] || undefined,
              vocabulary:       newVocabulary[`${mi}-${li}`] || undefined,
            });
          }
        }
      } catch {
        // Draft save is best-effort — don't block the user from continuing
      }

      setForm({
        ...form,
        title:            outline.title,
        shortDescription: outline.short_description,
        modules:          newModules,
        lessonOverviews:  newOverviews,
        lessonNarrations: newNarrations,
        lessonObjectives: newObjectives,
        lessonVocabulary: newVocabulary,
        faq:              outline.faq,
        courseSlug:       draftSlug,
      });

      setGenStep(GENERATION_STEPS.length - 1);
      setTimeout(() => {
        setIsGenerating(false);
        onNext();
      }, 600);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Something went wrong. Please try again.";
      setGenError(msg);
      setIsGenerating(false);
    }
  }

  // ── Generating overlay ────────────────────────────────────────────────────────
  if (isGenerating) {
    const phase1Steps = GENERATION_STEPS.slice(0, 4);
    const phase2Steps = GENERATION_STEPS.slice(4);
    const isPhase2    = genStep >= 4;
    const progress    = Math.round(((genStep + 1) / GENERATION_STEPS.length) * 100);

    const totalLessonsGen   = form.moduleCount * form.avgLessonsPerModule;
    const estWrittenWords   = totalLessonsGen * form.avgLessonLength * 150;
    const estNarrationWords = totalLessonsGen * form.avgLessonLength * 130;

    return (
      <div className="flex items-start gap-8 px-8 py-10 min-h-full h-full bg-gray-50">

        {/* ── Left: phases ── */}
        <div className="flex-1 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-red-500 animate-pulse" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900 leading-tight">Claude is building your course</h2>
              <p className="text-xs text-gray-400">Two-pass generation — written content, then narration</p>
            </div>
          </div>

          {/* Phase 1 */}
          <div className={`bg-white rounded-2xl border shadow-sm p-5 space-y-3 transition-colors ${!isPhase2 ? "border-red-200" : "border-gray-200"}`}>
            <div className="flex items-center gap-2 mb-1">
              <div className={`w-2 h-2 rounded-full ${!isPhase2 ? "bg-red-500 animate-pulse" : "bg-green-500"}`} />
              <p className="text-xs font-bold uppercase tracking-widest text-gray-500">
                Phase 1 — Written Content
              </p>
              {!isPhase2 && <span className="ml-auto text-[10px] text-red-400 font-medium animate-pulse">Running…</span>}
              {isPhase2  && <span className="ml-auto text-[10px] text-green-500 font-medium">Complete</span>}
            </div>
            {phase1Steps.map((label, i) => {
              const done   = i < genStep;
              const active = i === genStep;
              return (
                <div key={i} className="flex items-center gap-2.5">
                  <div className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 transition-all ${
                    done   ? "bg-green-500" :
                    active ? "bg-red-200"   : "bg-gray-200"
                  }`}>
                    {done   ? <Check className="w-2.5 h-2.5 text-white" />
                    : active ? <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                    :          <div className="w-1.5 h-1.5 rounded-full bg-gray-400" />}
                  </div>
                  <span className={`text-sm transition-colors ${
                    done   ? "text-gray-400 line-through" :
                    active ? "text-gray-900 font-semibold" : "text-gray-300"
                  }`}>{label}</span>
                </div>
              );
            })}
          </div>

          {/* Phase 2 */}
          <div className={`bg-white rounded-2xl border shadow-sm p-5 space-y-3 transition-colors ${isPhase2 ? "border-blue-200" : "border-gray-200"}`}>
            <div className="flex items-center gap-2 mb-1">
              <div className={`w-2 h-2 rounded-full ${isPhase2 ? "bg-blue-500 animate-pulse" : "bg-gray-300"}`} />
              <p className="text-xs font-bold uppercase tracking-widest text-gray-500">
                Phase 2 — Narration Scripts
              </p>
              {isPhase2 && <span className="ml-auto text-[10px] text-blue-400 font-medium animate-pulse">Running…</span>}
              {!isPhase2 && <span className="ml-auto text-[10px] text-gray-400 font-medium">Waiting…</span>}
            </div>
            {phase2Steps.map((label, i) => {
              const gi     = i + 4;
              const done   = gi < genStep;
              const active = gi === genStep;
              return (
                <div key={i} className="flex items-center gap-2.5">
                  <div className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 transition-all ${
                    done   ? "bg-green-500" :
                    active ? "bg-blue-200"  : "bg-gray-200"
                  }`}>
                    {done   ? <Check className="w-2.5 h-2.5 text-white" />
                    : active ? <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                    :          <div className="w-1.5 h-1.5 rounded-full bg-gray-400" />}
                  </div>
                  <span className={`text-sm transition-colors ${
                    done   ? "text-gray-400 line-through" :
                    active ? "text-gray-900 font-semibold" : "text-gray-300"
                  }`}>{label}</span>
                </div>
              );
            })}
          </div>

          {/* Progress bar */}
          <div>
            <div className="flex justify-between text-xs text-gray-400 mb-1.5">
              <span>{genStep + 1} of {GENERATION_STEPS.length} steps</span>
              <span>{progress}%</span>
            </div>
            <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-700 ${isPhase2 ? "bg-gradient-to-r from-blue-400 to-blue-600" : "bg-gradient-to-r from-red-400 to-red-500"}`}
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>

        {/* ── Right: course summary ── */}
        <div className="w-72 shrink-0 space-y-4 sticky top-8">
          <div className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
            <div className="bg-[#0B1E40] px-5 py-4">
              <p className="text-xs font-bold uppercase tracking-widest text-blue-300 mb-0.5">Generating</p>
              <p className="text-white font-semibold text-sm leading-snug line-clamp-2">
                {form.description.slice(0, 80) || "Your course"}
              </p>
            </div>
            <div className="px-5 py-4 space-y-3">
              {[
                { label: "Modules",       value: String(form.moduleCount) },
                { label: "Lessons",       value: String(totalLessonsGen) },
                { label: "Lesson length", value: `${form.avgLessonLength} min` },
                { label: "Level",         value: form.level.charAt(0).toUpperCase() + form.level.slice(1) },
                { label: "Language",      value: form.language.charAt(0).toUpperCase() + form.language.slice(1) },
              ].map(({ label, value }) => (
                <div key={label} className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">{label}</span>
                  <span className="font-semibold text-gray-900">{value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white shadow-sm px-5 py-4 space-y-3">
            <p className="text-xs font-bold uppercase tracking-widest text-gray-400">Content being generated</p>
            {[
              { label: "Written words",   value: !isPhase2 ? streamedWords.toLocaleString() : phase1WordsRef.current.toLocaleString(), color: "text-red-500",  active: !isPhase2 },
              { label: "Narration words", value: isPhase2 ? Math.max(0, streamedWords - phase1WordsRef.current).toLocaleString() : `~${estNarrationWords.toLocaleString()}`, color: "text-blue-500", active: isPhase2 },
              { label: "Total words",     value: streamedWords > 0 ? streamedWords.toLocaleString() : `~${(estWrittenWords + estNarrationWords).toLocaleString()}`, color: "text-gray-700", active: false },
            ].map(({ label, value, color, active }) => (
              <div key={label} className="flex items-center justify-between text-sm">
                <span className={`flex items-center gap-1.5 ${active ? "text-gray-900 font-medium" : "text-gray-400"}`}>
                  {active && <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />}
                  {label}
                </span>
                <span className={`font-semibold ${active ? color : "text-gray-400"}`}>{value}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    );
  }

  // ── Normal form ───────────────────────────────────────────────────────────────
  const c1Words = form.moduleCount * form.avgLessonsPerModule * writtenWordsPerLesson;
  const c1Cost  = (C1_INPUT_TOKENS * 3 / 1_000_000) + (C1_OUTPUT_TOKENS * 15 / 1_000_000);
  const c2Words = form.moduleCount * form.avgLessonsPerModule * narratWordsPerLesson;
  const c2Cost  = (C2_INPUT_TOKENS * 3 / 1_000_000) + (C2_OUTPUT_TOKENS * 15 / 1_000_000);

  return (
    <div className="flex gap-6 px-6 py-8 min-h-full h-full items-start bg-gray-50">

      {/* ── Left: form card ── */}
      <div className="w-[75%] min-w-0">

        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 space-y-6">

          {/* Topic */}
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1 mb-1">
              <Sparkles className="w-3 h-3 text-red-400" /> Topic
            </p>
            <p className="text-sm font-semibold text-gray-800">{form.description || "—"}</p>
          </div>

          <div className="border-t border-gray-100" />

          {/* Level + Duration */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Difficulty Level</label>
              <div className="relative">
                <select
                  value={form.level}
                  onChange={(e) => setForm({ ...form, level: e.target.value as CourseForm["level"] })}
                  className="w-full appearance-none border border-gray-200 rounded-xl pl-8 pr-10 py-2.5 text-sm text-gray-700 bg-white outline-none focus:border-gray-400 transition-colors"
                >
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
                <span className={`absolute left-3 top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full ${LEVEL_COLORS[form.level]}`} />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">▾</span>
              </div>
            </div>
            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Course Duration</label>
              <div className="relative">
                <select
                  value={form.duration}
                  onChange={(e) => setForm({ ...form, duration: e.target.value })}
                  className="w-full appearance-none border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-700 bg-white outline-none focus:border-gray-400 pr-8 transition-colors"
                >
                  {DURATIONS.map((d) => <option key={d} value={d}>{d}</option>)}
                </select>
                <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">▾</span>
              </div>
            </div>
          </div>

          {/* Language */}
          <div>
            <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Language</label>
            <div className="relative">
              <select
                value={form.language}
                onChange={(e) => setForm({ ...form, language: e.target.value as CourseForm["language"] })}
                className="w-full appearance-none border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-700 bg-white outline-none focus:border-gray-400 pr-8 transition-colors"
              >
                <option value="english">English</option>
                <option value="spanish">Spanish</option>
                <option value="bilingual">Bilingual (EN + ES)</option>
              </select>
              <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">▾</span>
            </div>
          </div>

          {/* Modules + Avg Lessons */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Number of Modules</label>
              <Stepper value={form.moduleCount} min={2} max={20} onChange={(v) => setForm({ ...form, moduleCount: v })} />
              <p className="text-[10px] text-gray-400 mt-1 text-center">2–20 modules</p>
            </div>
            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Avg Lessons / Module</label>
              <Stepper value={form.avgLessonsPerModule} min={1} max={10} onChange={(v) => setForm({ ...form, avgLessonsPerModule: v })} />
              <p className="text-[10px] text-gray-400 mt-1 text-center">1–10 per module</p>
            </div>
          </div>

          {/* Lesson Length slider */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Average Lesson Length</label>
              <span className="text-sm font-bold text-blue-600">{form.avgLessonLength} min</span>
            </div>
            <input
              type="range" min={5} max={60} step={5}
              value={form.avgLessonLength}
              onChange={(e) => setForm({ ...form, avgLessonLength: Number(e.target.value) })}
              className="w-full accent-blue-600"
            />
            <div className="flex justify-between text-[10px] text-gray-400 mt-1">
              <span>5 min</span><span>60 min</span>
            </div>
          </div>

          {/* Toggles */}
          <div className="grid grid-cols-2 gap-3">
            {[
              { key: "includeAssessments" as const, label: "Include Assessments", sub: "Quizzes after each module" },
              { key: "includeProjects"    as const, label: "Include Projects",    sub: "Hands-on capstone work" },
            ].map(({ key, label, sub }) => (
              <button
                key={key}
                onClick={() => setForm({ ...form, [key]: !form[key] })}
                className={`text-left p-4 rounded-xl border-2 transition-all ${form[key] ? "border-green-400 bg-green-50" : "border-gray-200 bg-white"}`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-bold text-gray-800">{label}</span>
                  <div className={`w-5 h-5 rounded-md flex items-center justify-center transition-colors ${form[key] ? "bg-green-500" : "bg-gray-200"}`}>
                    {form[key] && <Check className="w-3 h-3 text-white" />}
                  </div>
                </div>
                <p className="text-xs text-gray-400">{sub}</p>
              </button>
            ))}
          </div>

          {/* Completion Badge */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Completion Badge</label>
              <span className="text-[10px] font-semibold text-orange-500">🏅 Badge awarded upon completion</span>
            </div>
            <div className="flex gap-4">
              <div
                onClick={() => fileInputRef.current?.click()}
                className="w-24 h-24 shrink-0 border-2 border-dashed border-gray-200 rounded-xl flex flex-col items-center justify-center gap-1 cursor-pointer hover:border-gray-300 transition-colors bg-gray-50 overflow-hidden"
              >
                {badgePreview
                  ? <img src={badgePreview} alt="badge" className="w-full h-full object-cover" />
                  : <>
                      <ImagePlus className="w-6 h-6 text-gray-300" />
                      <span className="text-[9px] text-gray-400 text-center leading-tight px-1">Click to upload badge image</span>
                    </>}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleBadgeUpload}
                />
              </div>
              <div className="flex-1 space-y-3">
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Course Code</label>
                  <input
                    value={form.courseCode}
                    onChange={(e) => setForm({ ...form, courseCode: e.target.value })}
                    placeholder="e.g. AG-101"
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 outline-none focus:border-gray-400 bg-white transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Badge Name</label>
                  <input
                    value={form.badgeName}
                    onChange={(e) => setForm({ ...form, badgeName: e.target.value })}
                    placeholder="e.g. Agriculture Foundations"
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 outline-none focus:border-gray-400 bg-white transition-colors"
                  />
                </div>
              </div>
            </div>
            <div className="mt-3 bg-gray-50 rounded-xl p-3 space-y-1">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Auto-populated on Badge</p>
              {[
                ["Student name", "filled on completion"],
                ["Date completed", "auto-generated"],
                ["Course code", form.courseCode || "—"],
              ].map(([key, val]) => (
                <p key={key} className="text-xs text-gray-500">
                  • {key} — <span className="italic text-gray-400">{val}</span>
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Right: summary + estimate + actions ── */}
      <div className="w-[25%] shrink-0 sticky top-8 flex flex-col gap-3 text-xs">

        {/* Course summary */}
        <div className="bg-white rounded-xl border border-gray-200 px-4 py-3">
          <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-3">Course Summary</p>
          <div className="space-y-2.5">
            {[
              ["Modules",       String(form.moduleCount)],
              ["Total lessons", `~${totalLessons}`],
              ["Lesson avg",    `${form.avgLessonLength} min`],
              ["Total time",    `~${totalHours}h`],
              ["Badge",         form.courseCode || form.badgeName ? "🏅 Yes" : "—"],
            ].map(([label, val]) => (
              <div key={label} className="flex items-center justify-between">
                <span className="text-gray-400">{label}</span>
                <span className="font-bold text-gray-800">{val}</span>
              </div>
            ))}
          </div>
        </div>

        {/* AI cost estimate */}
        <div className="bg-white rounded-xl border border-gray-200 px-4 py-3">
          <div className="flex items-center gap-1.5 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-red-400 shrink-0" />
            <span className="font-bold uppercase tracking-widest text-[9px] text-gray-400">Estimated Generation</span>
          </div>

          {/* Words breakdown */}
          <div className="grid grid-cols-3 gap-1 mb-3">
            {[
              { label: "Written",   value: c1Words,              color: "text-red-500",  sub: `${form.avgLessonLength}m × 150 wpm` },
              { label: "Narration", value: c2Words,              color: "text-blue-500", sub: `${form.avgLessonLength}m × 130 wpm` },
              { label: "Total",     value: c1Words + c2Words,    color: costColor,       sub: "all content" },
            ].map(({ label, value, color, sub }) => (
              <div key={label} className="bg-gray-50 rounded-lg px-2 py-2 text-center">
                <p className="text-[8px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">{label}</p>
                <p className={`text-sm font-bold ${color}`}>~{value.toLocaleString()}</p>
                <p className="text-[8px] text-gray-400">words</p>
                <p className="text-[8px] text-gray-300 mt-0.5">{sub}</p>
              </div>
            ))}
          </div>

          {/* Token + cost table */}
          <div className="grid grid-cols-4 gap-1 mb-1">
            <div />
            {["In tok", "Out tok", "Cost"].map((h) => (
              <p key={h} className="text-[8px] font-bold text-gray-400 uppercase tracking-widest text-right">{h}</p>
            ))}
          </div>

          {/* Call 1 */}
          <div className="grid grid-cols-4 gap-1 py-1.5 border-t border-gray-100 items-center">
            <div>
              <p className="text-[9px] font-bold text-red-400 uppercase tracking-widest">Call 1</p>
              <p className="text-[8px] text-gray-300">Written</p>
            </div>
            <p className="text-[10px] text-gray-400 text-right">{C1_INPUT_TOKENS.toLocaleString()}</p>
            <p className="text-[10px] font-semibold text-gray-700 text-right">~{C1_OUTPUT_TOKENS.toLocaleString()}</p>
            <p className="text-[10px] font-semibold text-gray-700 text-right">${c1Cost.toFixed(3)}</p>
          </div>

          {/* Call 2 */}
          <div className="grid grid-cols-4 gap-1 py-1.5 border-t border-gray-100 items-center">
            <div>
              <p className="text-[9px] font-bold text-blue-400 uppercase tracking-widest">Call 2</p>
              <p className="text-[8px] text-gray-300">Narration</p>
            </div>
            <p className="text-[10px] text-gray-400 text-right">~{C2_INPUT_TOKENS.toLocaleString()}</p>
            <p className="text-[10px] font-semibold text-gray-700 text-right">~{C2_OUTPUT_TOKENS.toLocaleString()}</p>
            <p className="text-[10px] font-semibold text-gray-700 text-right">${c2Cost.toFixed(3)}</p>
          </div>

          {/* Total */}
          <div className="grid grid-cols-4 gap-1 py-1.5 border-t-2 border-gray-200 items-center">
            <p className="text-[9px] font-bold text-gray-700 uppercase tracking-widest">Total</p>
            <p className="text-[10px] text-gray-400 text-right">~{(C1_INPUT_TOKENS + C2_INPUT_TOKENS).toLocaleString()}</p>
            <p className={`text-[10px] font-bold text-right ${costColor}`}>~{EST_OUTPUT_TOKENS.toLocaleString()}</p>
            <p className={`text-[10px] font-bold text-right ${costColor}`}>
              ${estCostLow.toFixed(2)}–${estCostHigh.toFixed(2)}
            </p>
          </div>

          <p className="text-[8px] text-gray-300 mt-2 text-right">In: $3/M · Out: $15/M · Sonnet 4.6 · ±20%</p>
        </div>

        {/* Error */}
        {genError && (
          <div className="flex items-start gap-2 bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm text-red-600">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{genError}</span>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-2">
          <button onClick={onBack} className="flex items-center gap-1.5 border border-gray-200 text-gray-600 text-sm font-medium px-4 py-2.5 rounded-xl hover:bg-gray-50 transition-colors">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={handleGenerate}
            className="flex items-center gap-2 flex-1 justify-center bg-red-500 hover:bg-red-600 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors"
          >
            <Sparkles className="w-4 h-4" /> Generate with AI
          </button>
        </div>
      </div>

    </div>
  );
}
