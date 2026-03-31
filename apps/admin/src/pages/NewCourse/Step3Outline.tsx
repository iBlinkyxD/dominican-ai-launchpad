import { useRef, useState } from "react";
import { ChevronLeft, Check, Plus, Trash2, GripVertical } from "lucide-react";
import type { CourseForm, Module } from "./types";

interface Props {
  form: CourseForm;
  setForm: (f: CourseForm) => void;
  onNext: () => void;
  onBack: () => void;
}

export function Step3Outline({ form, setForm, onNext, onBack }: Props) {
  const totalLessons = form.modules.reduce((s, m) => s + m.lessons.length, 0);

  // ── Drag state ──────────────────────────────────────────────────
  const dragModule     = useRef<number | null>(null);
  const dragOverModule = useRef<number | null>(null);

  const dragLesson     = useRef<{ mi: number; li: number } | null>(null);
  const dragOverLesson = useRef<{ mi: number; li: number } | null>(null);

  const [draggingModule, setDraggingModule] = useState<number | null>(null);
  const [draggingLesson, setDraggingLesson] = useState<{ mi: number; li: number } | null>(null);

  // ── Module drag handlers ────────────────────────────────────────
  function onModuleDragStart(mi: number) {
    dragModule.current = mi;
    setDraggingModule(mi);
  }

  function onModuleDragOver(e: React.DragEvent, mi: number) {
    e.preventDefault();
    dragOverModule.current = mi;
  }

  function onModuleDrop() {
    const from = dragModule.current;
    const to   = dragOverModule.current;
    if (from === null || to === null || from === to) { reset(); return; }
    const modules = [...form.modules];
    const [moved] = modules.splice(from, 1);
    modules.splice(to, 0, moved);
    setForm({ ...form, modules });
    reset();
  }

  // ── Lesson drag handlers ────────────────────────────────────────
  function onLessonDragStart(e: React.DragEvent, mi: number, li: number) {
    e.stopPropagation();
    dragLesson.current = { mi, li };
    setDraggingLesson({ mi, li });
  }

  function onLessonDragOver(e: React.DragEvent, mi: number, li: number) {
    e.preventDefault();
    e.stopPropagation();
    dragOverLesson.current = { mi, li };
  }

  function onLessonDrop(e: React.DragEvent) {
    e.stopPropagation();
    const from = dragLesson.current;
    const to   = dragOverLesson.current;
    if (!from || !to) { reset(); return; }
    if (from.mi === to.mi && from.li === to.li) { reset(); return; }

    const modules = form.modules.map((m) => ({ ...m, lessons: [...m.lessons] }));

    if (from.mi === to.mi) {
      // Reorder within same module
      const lessons = modules[from.mi].lessons;
      const [moved] = lessons.splice(from.li, 1);
      lessons.splice(to.li, 0, moved);
    } else {
      // Move across modules
      const [moved] = modules[from.mi].lessons.splice(from.li, 1);
      modules[to.mi].lessons.splice(to.li, 0, moved);
    }

    setForm({ ...form, modules });
    reset();
  }

  function reset() {
    dragModule.current     = null;
    dragOverModule.current = null;
    dragLesson.current     = null;
    dragOverLesson.current = null;
    setDraggingModule(null);
    setDraggingLesson(null);
  }

  // ── Edit helpers ────────────────────────────────────────────────
  function updateModuleTitle(mi: number, title: string) {
    setForm({ ...form, modules: form.modules.map((m, i) => i === mi ? { ...m, title } : m) });
  }

  function updateLesson(mi: number, li: number, value: string) {
    setForm({ ...form, modules: form.modules.map((m, i) =>
      i === mi ? { ...m, lessons: m.lessons.map((l, j) => j === li ? value : l) } : m
    )});
  }

  function addLesson(mi: number) {
    setForm({ ...form, modules: form.modules.map((m, i) =>
      i === mi ? { ...m, lessons: [...m.lessons, "New Lesson"] } : m
    )});
  }

  function removeLesson(mi: number, li: number) {
    setForm({ ...form, modules: form.modules.map((m, i) =>
      i === mi ? { ...m, lessons: m.lessons.filter((_, j) => j !== li) } : m
    )});
  }

  function addModule() {
    setForm({ ...form, modules: [...form.modules, { title: "New Module", lessons: ["New Lesson"] } as Module] });
  }

  function removeModule(mi: number) {
    setForm({ ...form, modules: form.modules.filter((_, i) => i !== mi) });
  }

  // ── Render ──────────────────────────────────────────────────────
  return (
    <div className="flex flex-col items-center py-8 px-4 min-h-full">
      <div className="w-full max-w-2xl space-y-4">

        {/* Header summary card */}
        <div className="bg-[#0B1E40] rounded-2xl p-6 text-white">
          <h2 className="text-lg font-bold mb-1">{form.title || form.description.slice(0, 60) || "Untitled Course"}</h2>
          {form.shortDescription && (
            <p className="text-sm text-blue-100 mb-3 leading-relaxed">{form.shortDescription}</p>
          )}
          <p className="text-sm text-blue-200 mb-5">
            A {form.level}-level course spanning {form.duration} with {form.modules.length} modules and {totalLessons} lessons (~{form.avgLessonLength} min each).
          </p>
          <div className="flex items-center gap-6">
            {[
              ["LEVEL",      form.level.charAt(0).toUpperCase() + form.level.slice(1)],
              ["DURATION",   form.duration],
              ["MODULES",    String(form.modules.length)],
              ["LESSONS",    String(totalLessons)],
              ["AVG LENGTH", `${form.avgLessonLength}m`],
            ].map(([label, val]) => (
              <div key={label}>
                <p className="text-[10px] font-semibold text-blue-300 uppercase tracking-widest">{label}</p>
                <p className="text-sm font-bold mt-0.5">{val}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Module cards */}
        {form.modules.map((mod, mi) => (
          <div
            key={mi}
            draggable
            onDragStart={() => onModuleDragStart(mi)}
            onDragOver={(e) => onModuleDragOver(e, mi)}
            onDrop={onModuleDrop}
            onDragEnd={reset}
            className={`bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden border-l-4 border-l-[#0B1E40] transition-opacity ${
              draggingModule === mi ? "opacity-40" : "opacity-100"
            }`}
          >
            {/* Module header */}
            <div className="flex items-center px-5 py-3 border-b border-gray-100 gap-3">
              <GripVertical className="w-4 h-4 text-gray-300 cursor-grab active:cursor-grabbing shrink-0" />
              <div className="w-8 h-8 rounded-lg bg-[#0B1E40] flex items-center justify-center text-white text-sm font-bold shrink-0">
                {mi + 1}
              </div>
              <input
                value={mod.title}
                onChange={(e) => updateModuleTitle(mi, e.target.value)}
                onMouseDown={(e) => e.stopPropagation()}
                className="flex-1 text-sm font-bold text-gray-900 bg-transparent outline-none border-b border-transparent focus:border-gray-300 transition-colors py-0.5 min-w-0"
              />
              <span className="text-xs text-gray-400 shrink-0">{mod.lessons.length} lessons</span>
              <button
                onClick={() => removeModule(mi)}
                className="text-gray-300 hover:text-red-400 transition-colors shrink-0"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            {/* Lessons */}
            <div className="divide-y divide-gray-50">
              {mod.lessons.map((lesson, li) => (
                <div
                  key={li}
                  draggable
                  onDragStart={(e) => onLessonDragStart(e, mi, li)}
                  onDragOver={(e) => onLessonDragOver(e, mi, li)}
                  onDrop={onLessonDrop}
                  onDragEnd={reset}
                  className={`flex items-center px-5 py-2.5 gap-3 group transition-opacity ${
                    draggingLesson?.mi === mi && draggingLesson?.li === li ? "opacity-40" : "opacity-100"
                  }`}
                >
                  <GripVertical className="w-3.5 h-3.5 text-gray-200 cursor-grab active:cursor-grabbing shrink-0" />
                  <span className="text-xs text-gray-400 w-4 shrink-0 text-right">{li + 1}</span>
                  <input
                    value={lesson}
                    onChange={(e) => updateLesson(mi, li, e.target.value)}
                    onMouseDown={(e) => e.stopPropagation()}
                    className="flex-1 text-sm text-gray-800 bg-transparent outline-none border-b border-transparent focus:border-gray-300 transition-colors py-0.5 min-w-0"
                  />
                  <span className="text-xs text-gray-400 shrink-0">{form.avgLessonLength} min</span>
                  <button
                    onClick={() => removeLesson(mi, li)}
                    className="text-gray-200 hover:text-red-400 transition-colors shrink-0 opacity-0 group-hover:opacity-100"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>

            {/* Add lesson */}
            <button
              onClick={() => addLesson(mi)}
              className="w-full flex items-center gap-2 px-5 py-2.5 text-xs text-blue-500 hover:bg-blue-50 transition-colors border-t border-gray-50"
            >
              <Plus className="w-3.5 h-3.5" /> Add lesson
            </button>
          </div>
        ))}

        {/* Add module */}
        <button
          onClick={addModule}
          className="w-full flex items-center justify-center gap-2 py-3 border-2 border-dashed border-gray-200 rounded-2xl text-sm text-gray-400 hover:border-gray-300 hover:text-gray-600 transition-colors"
        >
          <Plus className="w-4 h-4" /> Add module
        </button>

        {/* Actions */}
        <div className="flex items-center justify-between pt-2">
          <button onClick={onBack} className="flex items-center gap-1.5 border border-gray-200 text-gray-600 text-sm font-medium px-5 py-2.5 rounded-xl hover:bg-gray-50 transition-colors">
            <ChevronLeft className="w-4 h-4" /> Reconfigure
          </button>
          <button onClick={onNext} className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white text-sm font-semibold px-6 py-2.5 rounded-xl transition-colors">
            <Check className="w-4 h-4" /> Approve & Generate Content
          </button>
        </div>

      </div>
    </div>
  );
}
