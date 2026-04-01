import { useState } from "react";
import ReactMarkdown from "react-markdown";
import {
  ChevronLeft, ChevronDown, ChevronUp,
  BookOpen, Clock, Sparkles, Upload, SkipForward, Check, Play, Rocket, Eye, Pencil,
} from "lucide-react";
import type { CourseForm } from "./types";

type MediaAction = "generate" | "upload" | "skip" | null;

const TABS = [
  { value: "overview",      label: "Overview" },
  { value: "narration",     label: "Narration" },
  { value: "author",        label: "Author" },
  { value: "faq",           label: "FAQ" },
  { value: "announcements", label: "Announcements" },
  { value: "reviews",       label: "Reviews" },
];

interface Props {
  form: CourseForm;
  setForm: (f: CourseForm) => void;
  onNext: () => void;
  onBack: () => void;
}

export function Step4Media({ form, setForm, onNext, onBack }: Props) {
  const [mediaAction, setMediaAction]   = useState<MediaAction>("skip");
  const [activeTab, setActiveTab]       = useState("overview");
  const [expanded, setExpanded]         = useState<Record<number, boolean>>({ 0: true });

  // Active lesson key: "mi-li"
  const [activeLessonKey, setActiveLessonKey] = useState("0-0");

  // Per-lesson overviews, narrations, and FAQ are persisted in form so they survive step navigation
  const [lessonOverviews,   setLessonOverviews]   = useState<Record<string, string>>(form.lessonOverviews);
  const [lessonNarrations,  setLessonNarrations]  = useState<Record<string, string>>(form.lessonNarrations);
  const [overviewMode, setOverviewMode] = useState<"preview" | "edit">("preview");
  const [faqMode,      setFaqMode]      = useState<"preview" | "edit">("preview");

  // Course-level editable fields
  const [authorName, setAuthorName] = useState("DAIA Academy");
  const [authorBio,  setAuthorBio]  = useState("");
  const [faqContent, setFaqContent] = useState(form.faq);

  const toggle = (i: number) => setExpanded((prev) => ({ ...prev, [i]: !prev[i] }));

  function selectLesson(mi: number, li: number) {
    setActiveLessonKey(`${mi}-${li}`);
    setActiveTab("overview");
  }

  function activeLessonTitle() {
    const [mi, li] = activeLessonKey.split("-").map(Number);
    return form.modules[mi]?.lessons[li] ?? "";
  }

  const totalLessons  = form.modules.reduce((s, m) => s + m.lessons.length, 0);
  const totalMinutes  = totalLessons * form.avgLessonLength;
  const hours         = Math.floor(totalMinutes / 60);
  const mins          = totalMinutes % 60;
  const durationLabel = hours > 0 ? `${hours}h ${mins}min` : `${mins}min`;
  const courseTitle   = form.title || form.description.slice(0, 50) || "Untitled Course";

  return (
    <div className="bg-white min-h-full">

      {/* ── Header ── */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
            <span className="flex items-center gap-1 text-gray-400 cursor-default">
              <ChevronLeft className="h-4 w-4" /> Courses
            </span>
            <span>/</span>
            <span className="text-gray-400">{courseTitle}</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-semibold text-gray-900 mb-2">{courseTitle}</h1>
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <BookOpen className="h-4 w-4 text-purple-600" />
                  <span>{totalLessons} lessons</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4 text-purple-600" />
                  <span>~{durationLabel}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={onBack}
                className="flex items-center gap-1.5 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition font-medium text-sm"
              >
                <ChevronLeft className="h-4 w-4" /> Back
              </button>
              <button
                onClick={onNext}
                className="flex items-center gap-2 px-5 py-2 bg-[#0B1E40] text-white rounded-lg hover:bg-[#0B1E40]/90 transition font-semibold text-sm shadow-md"
              >
                <Rocket className="h-4 w-4" /> Continue
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Body grid ── */}
      <div className="grid lg:grid-cols-3 gap-8 p-6">

        {/* LEFT */}
        <div className="lg:col-span-2">

          {/* Video / media selection box */}
          <div className="relative aspect-video bg-gray-900 rounded-2xl overflow-hidden flex flex-col items-center justify-center gap-6 px-6">
            <div className="absolute inset-0 bg-[#0B1E40] opacity-95" />
            <div className="relative z-10 flex flex-col items-center gap-6">
              <p className="text-blue-200 text-sm font-medium">
                Select how to handle the <span className="text-white font-semibold">intro video</span> for this course
              </p>
              <div className="flex items-center gap-4">
                {([
                  { key: "generate" as const, icon: <Sparkles className="w-6 h-6" />,    label: "Generate",     sub: "AI creates the video", active: "bg-purple-600 border-purple-500" },
                  { key: "upload"   as const, icon: <Upload    className="w-6 h-6" />,    label: "Upload",       sub: "Use your own file",    active: "bg-blue-600 border-blue-500"    },
                  { key: "skip"     as const, icon: <SkipForward className="w-6 h-6" />,  label: "Skip for now", sub: "Add later",            active: "bg-gray-500 border-gray-400"    },
                ]).map(({ key, icon, label, sub, active }) => (
                  <button
                    key={key}
                    onClick={() => setMediaAction(mediaAction === key ? null : key)}
                    className={`flex flex-col items-center justify-center gap-2 px-6 py-4 rounded-2xl border-2 transition-all w-36 h-32 text-white ${
                      mediaAction === key ? active : "bg-white/10 border-white/20 hover:bg-white/20"
                    }`}
                  >
                    {icon}
                    <span className="text-sm font-semibold">{label}</span>
                    <span className="text-[11px] opacity-70 text-center leading-tight">{sub}</span>
                  </button>
                ))}
              </div>
              {mediaAction ? (
                <div className="flex items-center gap-1.5 text-xs font-medium text-green-300">
                  <Check className="w-3.5 h-3.5" />
                  {mediaAction === "generate" && "AI will generate the intro video"}
                  {mediaAction === "upload"   && "File upload queued"}
                  {mediaAction === "skip"     && "Skipped — you can add media later"}
                </div>
              ) : (
                <p className="text-blue-300/50 text-xs">{activeLessonTitle()}</p>
              )}
            </div>
          </div>

          {/* Tabs */}
          <div className="border rounded-2xl mt-4">
            <div className="border-b">
              <div className="flex gap-6 px-6">
                {TABS.map((tab) => (
                  <button
                    key={tab.value}
                    onClick={() => setActiveTab(tab.value)}
                    className={`py-3 text-sm font-medium border-b-2 tracking-wide transition-colors ${
                      activeTab === tab.value
                        ? "border-blue-950 text-blue-950"
                        : "border-transparent text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-6">

              {/* Overview — per lesson, preview/edit */}
              {activeTab === "overview" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-0.5">Lesson overview</p>
                      <h3 className="text-base font-bold text-gray-900">{activeLessonTitle()}</h3>
                    </div>
                    <button
                      onClick={() => setOverviewMode(overviewMode === "preview" ? "edit" : "preview")}
                      className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 transition-colors"
                    >
                      {overviewMode === "preview"
                        ? <><Pencil className="w-3.5 h-3.5" /> Edit</>
                        : <><Eye className="w-3.5 h-3.5" /> Preview</>}
                    </button>
                  </div>

                  {overviewMode === "preview" ? (
                    <div className="space-y-5">
                      {/* Objectives */}
                      {form.lessonObjectives[activeLessonKey]?.length > 0 && (
                        <div>
                          <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">Learning Objectives</p>
                          <ul className="space-y-1.5">
                            {form.lessonObjectives[activeLessonKey].map((obj, i) => (
                              <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                                {obj}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Markdown content */}
                      {lessonOverviews[activeLessonKey] ? (
                        <div className="prose prose-sm prose-gray max-w-none text-gray-700">
                          <ReactMarkdown>{lessonOverviews[activeLessonKey]}</ReactMarkdown>
                        </div>
                      ) : (
                        <p className="text-sm text-gray-400 italic">No overview content yet.</p>
                      )}

                      {/* Vocabulary table */}
                      {form.lessonVocabulary[activeLessonKey]?.length > 0 && (
                        <div>
                          <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">Key Vocabulary</p>
                          <div className="overflow-x-auto rounded-lg border border-gray-200">
                            <table className="w-full text-sm">
                              <thead>
                                <tr className="bg-gray-50 border-b border-gray-200">
                                  <th className="text-left px-4 py-2.5 font-semibold text-gray-700 w-1/3">Term</th>
                                  <th className="text-left px-4 py-2.5 font-semibold text-gray-700">Definition</th>
                                </tr>
                              </thead>
                              <tbody>
                                {form.lessonVocabulary[activeLessonKey].map((entry, i) => (
                                  <tr key={i} className="border-b border-gray-100 last:border-b-0">
                                    <td className="px-4 py-2.5 font-medium text-gray-900">{entry.term}</td>
                                    <td className="px-4 py-2.5 text-gray-600">{entry.definition}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div>
                      <textarea
                        value={lessonOverviews[activeLessonKey] ?? ""}
                        onChange={(e) => {
                          const updated = { ...lessonOverviews, [activeLessonKey]: e.target.value };
                          setLessonOverviews(updated);
                          setForm({ ...form, lessonOverviews: updated });
                        }}
                        placeholder={`Write markdown content for "${activeLessonTitle()}"…`}
                        rows={15}
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 outline-none focus:border-gray-400 resize-none transition-colors font-mono"
                      />
                      <p className="text-[10px] text-gray-400 mt-1">Markdown supported — use ## headers, - lists, **bold**.</p>
                    </div>
                  )}
                </div>
              )}

              {/* Narration — per lesson, editable */}
              {activeTab === "narration" && (
                <div className="space-y-4">
                  <div>
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-1">
                      Narration script
                    </p>
                    <h3 className="text-base font-bold text-gray-900 mb-3">{activeLessonTitle()}</h3>
                    <textarea
                      value={lessonNarrations[activeLessonKey] ?? ""}
                      onChange={(e) => {
                        const updated = { ...lessonNarrations, [activeLessonKey]: e.target.value };
                        setLessonNarrations(updated);
                        setForm({ ...form, lessonNarrations: updated });
                      }}
                      placeholder={`Spoken narration script for "${activeLessonTitle()}"…`}
                      rows={15}
                      className="w-full border text-justify border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 outline-none focus:border-gray-400 resize-none transition-colors"
                    />
                    <p className="text-[10px] text-gray-400 mt-1">
                      Narration is calibrated to {form.avgLessonLength} min at 130 words/min. Click a lesson in the sidebar to edit individually.
                    </p>
                  </div>
                </div>
              )}

              {/* Author — editable */}
              {activeTab === "author" && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">
                      Author name
                    </label>
                    <input
                      value={authorName}
                      onChange={(e) => setAuthorName(e.target.value)}
                      className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-700 outline-none focus:border-gray-400 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">
                      Bio
                    </label>
                    <textarea
                      value={authorBio}
                      onChange={(e) => setAuthorBio(e.target.value)}
                      placeholder="Tell students about the instructor…"
                      rows={4}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 outline-none focus:border-gray-400 resize-none transition-colors"
                    />
                  </div>
                </div>
              )}

              {/* FAQ */}
              {activeTab === "faq" && (
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Frequently asked questions</p>
                    <button
                      onClick={() => setFaqMode(faqMode === "preview" ? "edit" : "preview")}
                      className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 transition-colors"
                    >
                      {faqMode === "preview"
                        ? <><Pencil className="w-3.5 h-3.5" /> Edit</>
                        : <><Eye className="w-3.5 h-3.5" /> Preview</>}
                    </button>
                  </div>
                  {faqMode === "preview" ? (
                    <div className="prose prose-sm max-w-none text-gray-700">
                      <ReactMarkdown>{faqContent || "_No FAQ yet._"}</ReactMarkdown>
                    </div>
                  ) : (
                    <textarea
                      value={faqContent}
                      onChange={(e) => {
                        setFaqContent(e.target.value);
                        setForm({ ...form, faq: e.target.value });
                      }}
                      placeholder={"Q: Who is this course for?\nA: …\n\nQ: What do I need to get started?\nA: …"}
                      rows={15}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 outline-none focus:border-gray-400 resize-none transition-colors font-mono"
                    />
                  )}
                </div>
              )}

              {["announcements", "reviews"].includes(activeTab) && (
                <p className="text-gray-400 text-sm">No {activeTab} yet.</p>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT — sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 sticky top-8">
            <div className="p-6 border-b border-gray-200">
              <h3 className="font-semibold text-gray-900">Course content</h3>
            </div>

            <div className="max-h-[calc(100vh-280px)] overflow-y-auto">
              {form.modules.map((mod, mi) => (
                <div key={mi} className="border-b border-gray-200 last:border-b-0">
                  <button
                    onClick={() => toggle(mi)}
                    className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition"
                  >
                    <span className="font-medium text-gray-900 text-sm text-left flex-1">
                      {String(mi + 1).padStart(2, "0")}: {mod.title}
                    </span>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-gray-500">{mod.lessons.length} lessons</span>
                      {expanded[mi]
                        ? <ChevronUp className="h-4 w-4 text-gray-400" />
                        : <ChevronDown className="h-4 w-4 text-gray-400" />}
                    </div>
                  </button>

                  {expanded[mi] && (
                    <div className="bg-gray-50 px-6 py-2">
                      {mod.lessons.map((lesson, li) => {
                        const key         = `${mi}-${li}`;
                        const isActive    = activeLessonKey === key;
                        const hasNote     = !!lessonOverviews[key];
                        const hasNarration = !!lessonNarrations[key];
                        return (
                          <button
                            key={li}
                            onClick={() => selectLesson(mi, li)}
                            className="w-full py-2.5 flex items-center justify-between text-left rounded px-2 -mx-2 hover:bg-gray-100 transition group"
                          >
                            <div className="flex items-center gap-2 min-w-0">
                              {isActive
                                ? <div className="w-3 h-3 rounded-full bg-purple-600 flex-shrink-0" />
                                : <Play className="h-3 w-3 text-gray-400 group-hover:text-purple-500 flex-shrink-0" />}
                              <span className={`text-sm truncate ${isActive ? "text-purple-600 font-medium" : "text-gray-700"}`}>
                                {lesson}
                              </span>
                              {hasNote && (
                                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0" title="Has overview" />
                              )}
                              {hasNarration && (
                                <span className="w-1.5 h-1.5 rounded-full bg-purple-400 shrink-0" title="Has narration" />
                              )}
                            </div>
                            <span className="text-xs text-gray-500 flex-shrink-0 ml-2">
                              {form.avgLessonLength}min
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Author preview */}
            <div className="p-6 border-t border-gray-200 bg-gray-50">
              <h4 className="font-semibold text-gray-900 mb-4">Author</h4>
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-lg flex-shrink-0">
                  {authorName.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h5 className="font-semibold text-gray-900 text-sm truncate">{authorName || "—"}</h5>
                    <div className="w-3 h-3 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <Check className="h-2 w-2 text-white" />
                    </div>
                  </div>
                  {authorBio && (
                    <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">{authorBio}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
