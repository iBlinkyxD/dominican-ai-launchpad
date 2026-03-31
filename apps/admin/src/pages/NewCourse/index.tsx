import { useState } from "react";
import { StepBar } from "./StepBar";
import { Step1Describe } from "./Step1Describe";
import { Step2Configure } from "./Step2Configure";
import { Step3Outline } from "./Step3Outline";
import { Step4Media } from "./Step4Media";
import { Step5Deploy } from "./Step5Deploy";
import { DEFAULT_FORM } from "./constants";
import type { CourseForm } from "./types";

export const NewCourse = () => {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<CourseForm>(DEFAULT_FORM);

  const next = () => setStep((s) => Math.min(5, s + 1));
  const back = () => setStep((s) => Math.max(1, s - 1));

  return (
    <div className="-m-4 md:-m-8 min-h-full flex flex-col bg-gray-50">
      <StepBar current={step} />

      {/* Step content */}
      <div className="flex-1 overflow-y-auto h-full">
        {step === 1 && <Step1Describe form={form} setForm={setForm} onNext={next} />}
        {step === 2 && <Step2Configure form={form} setForm={setForm} onNext={next} onBack={back} />}
        {step === 3 && <Step3Outline form={form} setForm={setForm} onNext={next} onBack={back} />}
        {step === 4 && <Step4Media form={form} setForm={setForm} onNext={next} onBack={back} />}
        {step === 5 && <Step5Deploy form={form} onBack={back} />}
      </div>
    </div>
  );
};
