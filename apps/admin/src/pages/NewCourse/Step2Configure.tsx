import { useRef, useState } from "react";
import { ChevronLeft, Check, Sparkles, Settings, ImagePlus } from "lucide-react";
import type { CourseForm } from "./types";
import { LEVEL_COLORS, DURATIONS } from "./constants";

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

interface Props {
  form: CourseForm;
  setForm: (f: CourseForm) => void;
  onNext: () => void;
  onBack: () => void;
}

export function Step2Configure({ form, setForm, onNext, onBack }: Props) {
  const totalLessons = form.moduleCount * form.avgLessonsPerModule;
  const totalHours = Math.round((totalLessons * form.avgLessonLength) / 60);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [badgePreview, setBadgePreview] = useState<string | null>(null);

  function handleBadgeUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) setBadgePreview(URL.createObjectURL(file));
  }

  return (
    <div className="flex flex-col items-center py-8 px-4">
      <div className="w-14 h-14 bg-gray-100 rounded-2xl flex items-center justify-center mb-5">
        <Settings className="w-7 h-7 text-gray-500" />
      </div>
      <h2 className="text-2xl font-bold text-gray-900 mb-1">Configure Your Course</h2>
      <p className="text-sm text-red-400 mb-7">Set the framework, intensity, and structure</p>

      <div className="w-full max-w-xl bg-white rounded-2xl border border-gray-200 shadow-sm p-6 space-y-6">

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
            <p className="text-[10px] text-gray-400 mt-1 text-center">Organic ≤1–2 per module</p>
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
            { key: "includeProjects" as const,    label: "Include Projects",    sub: "Hands-on capstone work" },
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

      {/* Summary bar */}
      <div className="w-full max-w-xl mt-4 bg-white rounded-xl border border-gray-200 px-5 py-3 flex items-center gap-6 text-xs">
        {[
          ["MODULES", form.moduleCount],
          ["TOTAL LESSONS", `~${totalLessons}`],
          ["LESSON AVG", `${form.avgLessonLength}m`],
          ["TOTAL TIME", `~${totalHours}h`],
          ["BADGE", form.courseCode || form.badgeName ? "🏅 Badge" : "—"],
        ].map(([label, val]) => (
          <div key={label as string}>
            <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">{label}</p>
            <p className="font-bold text-gray-800 mt-0.5">{val}</p>
          </div>
        ))}
      </div>

      {/* Actions */}
      <div className="w-full max-w-xl mt-4 flex gap-3">
        <button onClick={onBack} className="flex items-center gap-1.5 border border-gray-200 text-gray-600 text-sm font-medium px-5 py-2.5 rounded-xl hover:bg-gray-50 transition-colors">
          <ChevronLeft className="w-4 h-4" /> Back
        </button>
        <button onClick={onNext} className="flex items-center gap-2 flex-1 justify-center bg-red-500 hover:bg-red-600 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors">
          <Sparkles className="w-4 h-4" /> Generate Outline
        </button>
      </div>
    </div>
  );
}
