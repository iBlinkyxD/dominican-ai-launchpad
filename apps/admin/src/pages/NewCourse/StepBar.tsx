import { Check } from "lucide-react";
import { STEPS } from "./constants";

export function StepBar({ current, editMode = false }: { current: number; editMode?: boolean }) {
  const steps = editMode ? STEPS.filter((s) => s.number >= 3) : STEPS;

  return (
    <div className="w-full px-6 py-5 border-b border-gray-100 bg-white">
      <div className="flex items-start w-full max-w-4xl mx-auto">
      {steps.map((step, i) => (
        <div key={step.number} className={`flex items-center min-w-0 ${i < steps.length - 1 ? "flex-1" : "shrink-0"}`}>
          <div className="flex flex-col items-center min-w-0 shrink-0">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                step.number < current
                  ? "bg-green-500 text-white"
                  : step.number === current
                  ? "bg-red-500 text-white"
                  : "bg-gray-100 text-gray-400"
              }`}
            >
              {step.number < current ? <Check className="w-4 h-4" /> : step.number}
            </div>
            <p className={`text-xs font-semibold mt-1 whitespace-nowrap ${step.number === current ? "text-gray-900" : "text-gray-400"}`}>
              {step.label}
            </p>
            <p className="text-[10px] text-gray-400 whitespace-nowrap hidden sm:block">{step.sub}</p>
          </div>
          {i < steps.length - 1 && (
            <div className={`flex-1 h-px mx-2 mt-[-14px] transition-all ${step.number < current ? "bg-green-300" : "bg-gray-200"}`} />
          )}
        </div>
      ))}
      </div>
    </div>
  );
}
