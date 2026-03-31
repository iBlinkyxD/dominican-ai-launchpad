import { ChevronRight, Sparkles } from "lucide-react";
import type { CourseForm } from "./types";
import { SUGGESTIONS } from "./constants";

interface Props {
  form: CourseForm;
  setForm: (f: CourseForm) => void;
  onNext: () => void;
}

export function Step1Describe({ form, setForm, onNext }: Props) {
  return (
    <div className="flex flex-col items-center justify-center py-10 px-4 min-h-full">
      <div className="w-14 h-14 bg-red-50 rounded-2xl flex items-center justify-center mb-6">
        <Sparkles className="w-7 h-7 text-red-500" />
      </div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">What course would you like to create?</h2>
      <p className="text-sm text-gray-400 mb-8">Describe your idea — you'll configure the details next</p>

      <div className="w-full max-w-2xl">
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
          <textarea
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            placeholder="e.g. I'd like to build a course on agriculture in the Dominican Republic..."
            className="w-full px-5 pt-5 pb-2 text-sm text-gray-700 placeholder-gray-300 resize-none outline-none min-h-[160px]"
          />
          <div className="flex items-center justify-between px-5 py-3 border-t border-gray-100">
            <span className="text-xs text-gray-400">{form.description.length} chars</span>
            <button
              disabled={form.description.trim().length < 10}
              onClick={onNext}
              className="flex items-center gap-1.5 bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed enabled:bg-[#0B1E40] enabled:hover:bg-[#0B1E40]/90 text-white text-sm font-medium px-4 py-2 rounded-lg transition-all"
            >
              Next: Configure <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mt-5 justify-center">
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              onClick={() => setForm({ ...form, description: `I'd like to build a course on ${s}.` })}
              className="text-xs text-gray-500 border border-gray-200 bg-white px-3 py-1.5 rounded-full hover:border-gray-400 hover:text-gray-700 transition-colors"
            >
              {s}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
