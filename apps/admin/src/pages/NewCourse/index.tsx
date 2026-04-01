import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { StepBar } from "./StepBar";
import { Step1Describe } from "./Step1Describe";
import { Step2Configure } from "./Step2Configure";
import { Step3Outline } from "./Step3Outline";
import { Step4Media } from "./Step4Media";
import { Step5Deploy } from "./Step5Deploy";
import { DEFAULT_FORM } from "./constants";
import type { CourseForm } from "./types";
import { getCourseDetail } from "@/api/courses";

export const NewCourse = () => {
  const location = useLocation();
  const editSlug = (location.state as { editSlug?: string } | null)?.editSlug;

  const [step, setStep] = useState(editSlug ? 3 : 1);
  const [form, setForm] = useState<CourseForm>(DEFAULT_FORM);
  const [loadingEdit, setLoadingEdit] = useState(!!editSlug);

  useEffect(() => {
    if (!editSlug) return;
    getCourseDetail(editSlug).then((course) => {
      const modules = course.modules
        .slice()
        .sort((a, b) => a.position - b.position)
        .map((m) => ({
          title: m.title,
          lessons: m.lessons.slice().sort((a, b) => a.position - b.position).map((l) => l.title),
        }));

      const lessonOverviews:   Record<string, string> = {};
      const lessonNarrations:  Record<string, string> = {};
      const lessonObjectives:  Record<string, string[]> = {};
      const lessonVocabulary:  Record<string, { term: string; definition: string }[]> = {};

      course.modules
        .slice()
        .sort((a, b) => a.position - b.position)
        .forEach((m, mi) => {
          m.lessons
            .slice()
            .sort((a, b) => a.position - b.position)
            .forEach((l, li) => {
              if (l.content)           lessonOverviews[`${mi}-${li}`]  = l.content;
              if (l.narration_script)  lessonNarrations[`${mi}-${li}`] = l.narration_script;
              if (l.objectives)        lessonObjectives[`${mi}-${li}`] = l.objectives;
              if (l.vocabulary)        lessonVocabulary[`${mi}-${li}`] = l.vocabulary;
            });
        });

      setForm({
        ...DEFAULT_FORM,
        title:            course.title,
        description:      course.description ?? "",
        shortDescription: course.short_description ?? "",
        level:            course.level as CourseForm["level"],
        faq:              course.faq ?? "",
        courseCode:       course.code ?? "",
        courseSlug:       course.slug,
        modules,
        lessonOverviews,
        lessonNarrations,
        lessonObjectives,
        lessonVocabulary,
      });
    }).finally(() => setLoadingEdit(false));
  }, [editSlug]);

  const minStep = editSlug ? 3 : 1;
  const next = () => setStep((s) => Math.min(5, s + 1));
  const back = () => setStep((s) => Math.max(minStep, s - 1));

  if (loadingEdit) {
    return (
      <div className="-m-4 md:-m-8 min-h-full flex items-center justify-center bg-gray-50">
        <p className="text-sm text-gray-400">Loading course…</p>
      </div>
    );
  }

  return (
    <div className="-m-4 md:-m-8 min-h-full flex flex-col bg-gray-50">
      <StepBar current={step} editMode={!!editSlug} />

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
