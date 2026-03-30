import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, Check, Rocket } from "lucide-react";
import { PROCESSING_TASKS } from "./constants";

interface Props {
  onBack: () => void;
}

export function Step5Deploy({ onBack }: Props) {
  const navigate = useNavigate();
  const [done, setDone] = useState<Set<number>>(new Set());

  useEffect(() => {
    PROCESSING_TASKS.forEach(({ delay }, i) => {
      setTimeout(() => {
        setDone((prev) => new Set([...prev, i]));
      }, 800 + delay * 900);
    });
  }, []);

  const allDone = done.size === PROCESSING_TASKS.length;
  const progress = Math.round((done.size / PROCESSING_TASKS.length) * 100);

  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 min-h-[60vh]">
      <div className="w-full max-w-md space-y-6">

        {/* Icon + heading */}
        <div className="text-center">
          <div className="w-16 h-16 bg-[#0B1E40] rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Rocket className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-xl font-bold text-gray-900">
            {allDone ? "Course is Live!" : "Deploying your course…"}
          </h2>
          <p className="text-sm text-gray-400 mt-1">
            {allDone ? "Your course has been published to the academy." : "This usually takes less than a minute."}
          </p>
        </div>

        {/* Progress bar */}
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

        {/* Task list */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm divide-y divide-gray-50">
          {PROCESSING_TASKS.map((task, i) => {
            const isDone = done.has(i);
            const isActive = !isDone && done.size === i;
            return (
              <div key={i} className="flex items-center gap-3 px-5 py-3.5">
                <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 transition-all ${
                  isDone ? "bg-green-500" : isActive ? "bg-blue-100" : "bg-gray-100"
                }`}>
                  {isDone
                    ? <Check className="w-3 h-3 text-white" />
                    : isActive
                    ? <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                    : <div className="w-2 h-2 rounded-full bg-gray-300" />}
                </div>
                <span className={`text-sm transition-colors ${isDone ? "text-gray-700" : isActive ? "text-blue-600 font-medium" : "text-gray-400"}`}>
                  {task.label}
                </span>
                {isDone && <Check className="w-3.5 h-3.5 text-green-500 ml-auto" />}
                {isActive && <span className="text-xs text-blue-400 ml-auto animate-pulse">Processing…</span>}
              </div>
            );
          })}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between">
          {!allDone && (
            <button onClick={onBack} className="flex items-center gap-1.5 border border-gray-200 text-gray-500 text-sm font-medium px-5 py-2.5 rounded-xl hover:bg-gray-50 transition-colors">
              <ChevronLeft className="w-4 h-4" /> Cancel
            </button>
          )}
          {allDone && (
            <button
              onClick={() => navigate("/academy/courses")}
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
