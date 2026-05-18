import { useEffect, useState } from "react";
import {
  ChevronLeft, Video, FileText, PenLine,
  AlertCircle, CheckCircle2, Clock, Pencil, PlayCircle, XCircle,
} from "lucide-react";
import {
  TutoringWeek, TutoringItem, TutoringSubmission,
  submitAssignment, gradeSubmission,
} from "@/api/tutoring";
import { ItemStatus, formatDueDate, isDuePast, gradeColor, sessionWindowStatus, fmtGrade, gradePct } from "@/components/tutoring/types";
import { RichTextEditor } from "@/components/tutoring/RichTextEditor";
import { RichTextContent } from "@/components/tutoring/RichTextContent";
import { QuizBuilder } from "@/components/tutoring/QuizBuilder";
import { QuizPlayer } from "@/components/tutoring/QuizPlayer";
import { getQuiz, QuizQuestion, QuizSubmitResult } from "@/api/tutoring";

// ── Quiz attempt history ──────────────────────────────────────────────────────

interface AttemptQR { question_id: string; correct: boolean; selected_option_id: string | null; correct_option_id: string | null; }
interface AttemptEntry { attempt: number; score: number; max_points?: number; date: string; question_results?: AttemptQR[]; }

const parseQuizHistory = (content: string | null): AttemptEntry[] => {
  if (!content) return [];
  try { return JSON.parse(content) as AttemptEntry[]; } catch { return []; }
};

const AttemptHistory = ({
  history, passingScore, quizQuestions, showAnswers,
}: {
  history: AttemptEntry[];
  passingScore: number;
  quizQuestions: QuizQuestion[];
  showAnswers: boolean;
}) => {
  const [expanded, setExpanded] = useState<number | null>(null);
  if (history.length === 0) return null;

  return (
    <div className="space-y-2">
      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Attempt History</p>
      {history.map(h => {
        // pass/fail: compare percentage (score/max_points vs passing threshold)
        const pct = h.max_points ? (h.score / h.max_points) * 100 : h.score;
        const passed = pct >= passingScore;
        const scoreLabel = h.max_points != null
          ? `${h.score} / ${h.max_points} pts`
          : `${h.score}%`;
        const isOpen = expanded === h.attempt;
        return (
          <div key={h.attempt} className={`rounded-lg border overflow-hidden ${passed ? "border-green-200" : "border-red-200"}`}>
            {/* Row — fixed grid so every column lines up */}
            <div className={`grid items-center px-4 py-3 text-xs ${showAnswers ? "grid-cols-5" : "grid-cols-4"} ${passed ? "bg-green-50" : "bg-red-50"}`}>
              <span className="font-medium text-gray-700">Attempt {h.attempt}</span>
              <span className={`font-bold text-center ${passed ? "text-green-600" : "text-red-500"}`}>{scoreLabel}</span>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold text-center justify-self-center ${passed ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"}`}>
                {passed ? "Passed" : "Failed"}
              </span>
              <span className="text-gray-400 text-center">{new Date(h.date).toLocaleDateString("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" })}</span>
              {showAnswers && (
                h.question_results && h.question_results.length > 0
                  ? <button onClick={() => setExpanded(isOpen ? null : h.attempt)} className="text-[#0B1E40] text-xs font-semibold hover:underline text-right">
                      {isOpen ? "Hide" : "View Answers"}
                    </button>
                  : <span />
              )}
            </div>

            {/* Expandable answer review */}
            {isOpen && h.question_results && (
              <div className="divide-y divide-gray-100 bg-white">
                {h.question_results.map((qr, i) => {
                  const q = quizQuestions.find(q => q.id === qr.question_id);
                  if (!q) return null;
                  return (
                    <div key={qr.question_id} className="px-4 py-3 space-y-1.5">
                      <div className="flex items-start gap-2">
                        {qr.correct
                          ? <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                          : <XCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />}
                        <p className="text-sm font-medium text-gray-800">{i + 1}. {q.question_text}</p>
                      </div>
                      <div className="ml-6 space-y-1">
                        {q.options.map(opt => {
                          const wasSelected = opt.id === qr.selected_option_id;
                          const isCorrect = opt.id === qr.correct_option_id;
                          return (
                            <div key={opt.id} className={`text-xs px-2.5 py-1 rounded flex items-center gap-1.5 ${
                              isCorrect ? "bg-green-100 text-green-800 font-medium"
                              : wasSelected ? "bg-red-100 text-red-700"
                              : "text-gray-500"
                            }`}>
                              {isCorrect && <CheckCircle2 className="w-3 h-3 shrink-0" />}
                              {wasSelected && !isCorrect && <XCircle className="w-3 h-3 shrink-0" />}
                              {opt.text}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

// ── Active attempt banner (with live timer) ───────────────────────────────────

function fmtTime(secs: number) {
  const m = Math.floor(secs / 60).toString().padStart(2, "0");
  const s = (secs % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

const ActiveAttemptBanner = ({
  storageKey, timeLimitMinutes, totalQuestions, onContinue, onStartOver,
}: {
  storageKey: string;
  timeLimitMinutes: number | null;
  totalQuestions: number;
  onContinue: () => void;
  onStartOver: () => void;
}) => {
  const [progress] = useState(() => {
    try { const s = localStorage.getItem(storageKey); return s ? JSON.parse(s) : null; } catch { return null; }
  });

  const [timeLeft, setTimeLeft] = useState<number | null>(() => {
    if (!timeLimitMinutes || !progress?.startedAt) return null;
    const elapsed = Math.floor((Date.now() - new Date(progress.startedAt).getTime()) / 1000);
    return Math.max(0, timeLimitMinutes * 60 - elapsed);
  });

  useEffect(() => {
    if (timeLeft === null || timeLeft <= 0) return;
    const id = setInterval(() => setTimeLeft(p => (p === null || p <= 1 ? 0 : p - 1)), 1000);
    return () => clearInterval(id);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const answeredCount = Object.keys(progress?.answers ?? {}).length;
  if (!progress || answeredCount === 0) return null;

  const expired = timeLeft !== null && timeLeft <= 0;

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 space-y-3">
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center shrink-0">
          <Clock className="w-4 h-4 text-blue-600" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-blue-900">Active Attempt In Progress</p>
          <p className="text-xs text-blue-700 mt-0.5">
            {answeredCount} of {totalQuestions} question{totalQuestions !== 1 ? "s" : ""} answered
            {progress?.startedAt && ` · Started ${new Date(progress.startedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" })}`}
          </p>
        </div>
        {/* Live timer */}
        {timeLeft !== null && (
          <span className={`text-sm font-bold tabular-nums shrink-0 ${expired ? "text-red-600" : timeLeft < 60 ? "text-orange-500" : "text-blue-700"}`}>
            {expired ? "Time's up" : fmtTime(timeLeft)}
          </span>
        )}
      </div>
      <div className="flex gap-2">
        <button
          onClick={onContinue}
          className="flex-1 px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2 transition-colors"
        >
          <PlayCircle className="w-4 h-4" />
          {expired ? "Submit Attempt" : "Continue Quiz"}
        </button>
        <button
          onClick={onStartOver}
          className="px-4 py-2 border border-blue-200 text-blue-700 text-sm font-semibold rounded-lg hover:bg-blue-100 transition-colors"
          title="Discard progress and start a fresh attempt"
        >
          Start Over
        </button>
      </div>
    </div>
  );
};

const _StartButton = ({ storageKey, hasSubmission, onStart }: { storageKey: string; hasSubmission: boolean; onStart: () => void }) => {
  const hasActiveAttempt = (() => {
    try { const s = localStorage.getItem(storageKey); const p = s ? JSON.parse(s) : null; return Object.keys(p?.answers ?? {}).length > 0; }
    catch { return false; }
  })();
  if (hasActiveAttempt) return null;
  return (
    <button onClick={onStart} className="px-5 py-2.5 bg-purple-600 text-white text-sm font-semibold rounded-lg hover:bg-purple-700 flex items-center gap-2">
      <FileText className="w-4 h-4" />
      {hasSubmission ? "Retake Quiz" : "Start Quiz"}
    </button>
  );
};

// ── Detail view ───────────────────────────────────────────────────────────────

export interface SelectedItem {
  week: TutoringWeek;
  item: TutoringItem;
  status: ItemStatus;
  submission?: TutoringSubmission;
}

export const AssignmentDetail = ({ selected, courseId, isTeacher, onBack, onSubmitted }: {
  selected: SelectedItem; courseId: string; isTeacher: boolean;
  onBack: () => void; onSubmitted: (sub: TutoringSubmission) => void;
}) => {
  const { week, item } = selected;
  const [submission, setSubmission] = useState<TutoringSubmission | undefined>(selected.submission);
  const [editing, setEditing] = useState(!submission);
  const [text, setText] = useState(submission?.content ?? "");
  const [saving, setSaving] = useState(false);

  const [teacherGrade, setTeacherGrade] = useState(submission?.grade?.toString() ?? "");
  const [teacherFeedback, setTeacherFeedback] = useState(submission?.feedback ?? "");
  const [grading, setGrading] = useState(false);

  // Quiz state
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[] | null>(null);
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizKey, setQuizKey] = useState(0);

  useEffect(() => {
    if (item.type !== "quiz") return;
    getQuiz(courseId, item.id).then(setQuizQuestions).catch(() => setQuizQuestions([]));
  }, [item.id, item.type, courseId]);

  const handleQuizComplete = (result: QuizSubmitResult) => {
    setSubmission(result.submission);
    onSubmitted(result.submission);
  };

  const handleRetake = () => {
    setQuizKey(k => k + 1); // remounts QuizPlayer → fresh shuffle + reset
  };

  const handleBackToDetail = () => {
    setQuizStarted(false);
  };

  const handleTeacherGrade = async () => {
    if (!submission) return;
    setGrading(true);
    try {
      const updated = await gradeSubmission(courseId, submission.id, Number(teacherGrade), teacherFeedback || undefined);
      setSubmission(updated);
      setTeacherGrade(updated.grade?.toString() ?? "");
      setTeacherFeedback(updated.feedback ?? "");
      onSubmitted(updated);
    } finally { setGrading(false); }
  };

  const isSubmitted = !!submission;
  const isGraded = submission?.grade != null;
  const canEdit = !isDuePast(item.due_date) && !isGraded;
  const canSubmitLate = item.accept_late;
  const canSubmit = !isDuePast(item.due_date) || canSubmitLate;
  const isLate = !!(submission && item.due_date && new Date(submission.submitted_at) > new Date(item.due_date));

  const handleMarkComplete = async () => {
    setSaving(true);
    try {
      const sub = await submitAssignment(courseId, item.id, "");
      setSubmission(sub);
      onSubmitted(sub);
    } finally { setSaving(false); }
  };

  const typeBadge: Record<string, string> = { session: "bg-blue-100 text-blue-700", assignment: "bg-orange-100 text-orange-700", quiz: "bg-purple-100 text-purple-700", notes: "bg-gray-100 text-gray-600" };
  const typeLabel: Record<string, string> = { session: "Live Session", assignment: "Assignment", quiz: "Quiz", notes: "Notes" };

  const handleSubmit = async () => {
    setSaving(true);
    try {
      const sub = await submitAssignment(courseId, item.id, text);
      setSubmission(sub);
      setEditing(false);
      onSubmitted(sub);
    } finally { setSaving(false); }
  };

  return (
    <div className="space-y-4">
      <button onClick={onBack} className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-800 transition-colors">
        <ChevronLeft className="w-4 h-4" /> Week {week.number}: {week.title}
      </button>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center gap-2 mb-3 flex-wrap">
            <span className={`text-xs font-semibold uppercase tracking-wide px-2.5 py-1 rounded-full ${typeBadge[item.type]}`}>{typeLabel[item.type]}</span>
            {isSubmitted
              ? <span className="text-xs font-semibold text-green-600 bg-green-50 px-2.5 py-1 rounded-full">
                  {item.type === "session" ? "Attended" : item.type === "notes" ? "Read" : "Submitted"}
                </span>
              : <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full">
                  {item.type === "session" ? "Not Attended" : item.type === "notes" ? "Not Read" : "Open"}
                </span>}
            {isLate && item.type !== "session" && item.type !== "notes" && (
              <span className="text-xs font-semibold text-red-600 bg-red-50 px-2.5 py-1 rounded-full">Late</span>
            )}
            {isDuePast(item.due_date) && !isSubmitted && item.type !== "session" && item.type !== "notes" && (
              <span className="text-xs font-semibold text-red-600 bg-red-50 px-2.5 py-1 rounded-full">Past Due</span>
            )}
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h2>
          <div className="flex flex-wrap gap-4 text-sm text-gray-500">
            {item.duration && <span className="flex items-center gap-1"><AlertCircle className="w-3.5 h-3.5" />{item.duration}</span>}
            {formatDueDate(item.due_date) && (
              <span className={`flex items-center gap-1 ${isDuePast(item.due_date) ? "text-red-500" : "text-orange-500"} font-medium`}>
                <AlertCircle className="w-3.5 h-3.5" />{formatDueDate(item.due_date)}
              </span>
            )}
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Instructions */}
          {item.instructions && (
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-2">{item.type === "notes" ? "Notes" : "Instructions"}</h3>
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                <RichTextContent html={item.instructions} />
              </div>
            </div>
          )}

          {/* Grade display */}
          {submission?.grade != null && (() => {
            const c = gradeColor(gradePct(submission.grade, item.max_grade));
            return (
              <div className={`flex items-center gap-4 p-4 ${c.bg} border ${c.border} rounded-lg`}>
                <CheckCircle2 className={`w-6 h-6 ${c.icon} shrink-0`} />
                <div>
                  <p className={`text-sm font-semibold ${c.text}`}>Grade: {fmtGrade(submission.grade, item.max_grade)}</p>
                  {submission.feedback && <p className={`text-xs mt-0.5 ${c.text} opacity-80`}>{submission.feedback}</p>}
                </div>
              </div>
            );
          })()}

          {/* Session buttons */}
          {item.type === "session" && (() => {
            const sessionWindow = sessionWindowStatus(item.due_date, item.duration);
            const isEnded = sessionWindow === "ended";
            return (
              <div className="flex flex-wrap gap-3 items-center">
                {/* Primary action: Watch Recording when over (replaces Join), Join when active/upcoming */}
                {isEnded ? (
                  item.recording_link && (
                    <button
                      onClick={() => globalThis.open(item.recording_link!, "_blank")}
                      className="px-5 py-2.5 bg-[#0B1E40] text-white text-sm font-semibold rounded-lg hover:bg-[#0B1E40]/90 flex items-center gap-2"
                    >
                      <PlayCircle className="w-4 h-4" /> Watch Recording
                    </button>
                  )
                ) : (
                  <>
                    <button
                      onClick={() => item.meeting_link && globalThis.open(item.meeting_link, "_blank")}
                      disabled={!item.meeting_link || sessionWindow !== "active"}
                      className="px-5 py-2.5 bg-[#0B1E40] text-white text-sm font-semibold rounded-lg hover:bg-[#0B1E40]/90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                      title={!item.meeting_link ? "No meeting link has been added yet" : sessionWindow !== "active" ? "Session is not currently active" : undefined}
                    >
                      <Video className="w-4 h-4" /> Join Live Session
                    </button>
                    {/* Show recording alongside join if teacher already uploaded one */}
                    {item.recording_link && (
                      <button
                        onClick={() => globalThis.open(item.recording_link!, "_blank")}
                        className="px-5 py-2.5 border border-gray-200 text-gray-700 text-sm font-semibold rounded-lg hover:bg-gray-50 flex items-center gap-2"
                      >
                        <PlayCircle className="w-4 h-4 text-gray-400" /> Watch Recording
                      </button>
                    )}
                  </>
                )}

                {/* Attendance status / Mark as Attended */}
                {!isTeacher && !isSubmitted && (
                  sessionWindow === "active" ? (
                    <button
                      onClick={handleMarkComplete}
                      disabled={saving}
                      className="px-5 py-2.5 border border-gray-200 text-gray-700 text-sm font-semibold rounded-lg hover:bg-gray-50 disabled:opacity-50 flex items-center gap-2"
                    >
                      <CheckCircle2 className="w-4 h-4 text-gray-400" />
                      {saving ? "Saving…" : "Mark as Attended"}
                    </button>
                  ) : sessionWindow === "before" ? (
                    <p className="text-xs text-gray-400 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Available once the session starts
                    </p>
                  ) : (
                    <p className="text-xs text-orange-500 flex items-center gap-1 font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Session ended — contact your teacher if you attended
                    </p>
                  )
                )}

                {!isTeacher && isSubmitted && (
                  <p className="text-xs text-green-600 flex items-center gap-1 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Attended
                  </p>
                )}
              </div>
            );
          })()}

          {/* Quiz section */}
          {item.type === "quiz" && (
            <div className="space-y-5">
              {/* Attempt history — teacher sees answers, student sees scores only */}
              <AttemptHistory
                history={parseQuizHistory(submission?.content ?? null)}
                passingScore={item.passing_score}
                quizQuestions={quizQuestions ?? []}
                showAnswers={isTeacher || item.show_answers}
              />

              {isTeacher ? (
                <QuizBuilder courseId={courseId} itemId={item.id} />
              ) : quizQuestions === null ? (
                <p className="text-xs text-gray-400">Loading quiz…</p>
              ) : quizQuestions.length === 0 ? (
                <p className="text-xs text-gray-400 italic">No questions have been added yet.</p>
              ) : quizStarted ? (
                <QuizPlayer
                  key={quizKey}
                  courseId={courseId}
                  item={item}
                  questions={quizQuestions}
                  attemptsUsed={submission?.attempt_count ?? 0}
                  onComplete={handleQuizComplete}
                  onBack={handleBackToDetail}
                  onRetake={handleRetake}
                />
              ) : (() => {
                const progressKey = `quiz-progress-${courseId}-${item.id}`;
                const clearSaved = () => { try { localStorage.removeItem(progressKey); } catch {} };
                const canAttempt = item.max_attempts === 0 || (submission?.attempt_count ?? 0) < item.max_attempts;
                return (
                <div className="space-y-4">
                  {/* Quiz stats */}
                  <div className="flex flex-wrap gap-4 text-xs text-gray-500">
                    <span>{quizQuestions.length} question{quizQuestions.length !== 1 ? "s" : ""}</span>
                    <span>Passing score: {item.passing_score}% {quizQuestions && quizQuestions.length > 0 && `(${Math.round((item.passing_score / 100) * quizQuestions.length * item.points_per_question * 10) / 10} / ${quizQuestions.length * item.points_per_question} pts)`}</span>
                    {item.time_limit_minutes && <span>Time limit: {item.time_limit_minutes} min</span>}
                    {item.max_attempts > 0 && (
                      <span>
                        Attempts: {submission?.attempt_count ?? 0} / {item.max_attempts}
                        {(submission?.attempt_count ?? 0) >= item.max_attempts && " (limit reached)"}
                      </span>
                    )}
                  </div>

                  {/* Active attempt banner with live timer */}
                  {canAttempt && (
                    <ActiveAttemptBanner
                      storageKey={progressKey}
                      timeLimitMinutes={item.time_limit_minutes}
                      totalQuestions={quizQuestions.length}
                      onContinue={() => setQuizStarted(true)}
                      onStartOver={() => { clearSaved(); setQuizStarted(true); }}
                    />
                  )}

                  {/* Regular start / retake — shown only when no active attempt detected by the banner */}
                  {canAttempt && (
                    <_StartButton
                      storageKey={progressKey}
                      hasSubmission={!!submission}
                      onStart={() => setQuizStarted(true)}
                    />
                  )}
                </div>
              );
              })()}
            </div>
          )}

          {/* Notes completion */}
          {item.type === "notes" && !isTeacher && (
            isSubmitted ? (
              <p className="text-xs text-green-600 flex items-center gap-1 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5" /> Marked as read
              </p>
            ) : (
              <button
                onClick={handleMarkComplete}
                disabled={saving}
                className="px-5 py-2.5 border border-gray-200 text-gray-700 text-sm font-semibold rounded-lg hover:bg-gray-50 disabled:opacity-50 flex items-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4 text-gray-400" />
                {saving ? "Saving…" : "Mark as Read"}
              </button>
            )
          )}

          {/* Assignment section */}
          {item.type === "assignment" && !isTeacher && (
            <div className="space-y-3">
              {/* Submitted content view */}
              {isSubmitted && !editing && (
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-sm font-semibold text-gray-700">Your Submission</h3>
                    {canEdit && (
                      <button onClick={() => setEditing(true)} className="text-xs font-medium text-[#0B1E40] hover:underline flex items-center gap-1">
                        <Pencil className="w-3.5 h-3.5" /> Edit
                      </button>
                    )}
                  </div>
                  <p className="text-xs text-gray-400 mb-2">
                    Submitted on {new Date(submission.submitted_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", hour: "numeric", minute: "2-digit" })}
                    {isLate && <span className="text-red-500 font-medium"> · Late</span>}
                  </p>
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                    {submission.content
                      ? <RichTextContent html={submission.content} />
                      : <span className="text-gray-400 italic text-sm">No content submitted.</span>}
                  </div>
                </div>
              )}

              {/* Graded — no editing allowed */}
              {isSubmitted && isGraded && !editing && (
                <p className="text-xs text-gray-400 italic">This submission has been graded and can no longer be edited.</p>
              )}

              {/* Submission closed — past due and late not accepted */}
              {!isSubmitted && !canSubmit && (
                <p className="text-sm text-red-500 font-medium">This assignment is past due and no longer accepting submissions.</p>
              )}

              {/* Edit / new submission form — only when allowed */}
              {(!isSubmitted || editing) && canSubmit && (
                <div className="space-y-3">
                  {isSubmitted && (
                    <p className="text-xs text-gray-500">Editing your previous submission.</p>
                  )}
                  <RichTextEditor
                    value={text}
                    onChange={setText}
                    placeholder="Type your submission here…"
                    minHeight={120}
                  />
                  <div className="flex gap-3">
                    <button onClick={handleSubmit} disabled={saving || !text.trim()}
                      className="px-5 py-2.5 bg-[#0B1E40] text-white text-sm font-semibold rounded-lg hover:bg-[#0B1E40]/90 disabled:opacity-50 flex items-center gap-2">
                      <PenLine className="w-4 h-4" />{saving ? "Submitting…" : isSubmitted ? "Update Submission" : "Submit Assignment"}
                    </button>
                    {editing && isSubmitted && (
                      <button onClick={() => { setEditing(false); setText(submission?.content ?? ""); }}
                        className="px-5 py-2.5 border border-gray-200 text-gray-600 text-sm font-semibold rounded-lg hover:bg-gray-50 flex items-center gap-2">
                        Cancel
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Teacher: grade the selected student's submission (assignments + quiz grade override) */}
          {(item.type === "assignment" || item.type === "quiz") && isTeacher && (
            <div className="border-t border-gray-100 pt-5 space-y-4">
              {submission ? (
                <>
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Submission</p>
                    <p className="text-xs text-gray-400 mb-2">
                      Submitted on {new Date(submission.submitted_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", hour: "numeric", minute: "2-digit" })}
                      {isLate && <span className="text-red-500 font-medium"> · Late</span>}
                    </p>
                    {item.type === "quiz" ? (
                      <p className="text-xs text-gray-500 italic bg-gray-50 rounded-lg p-3 border border-gray-100">
                        Score auto-calculated from quiz responses. Use the grade field below to override if needed.
                      </p>
                    ) : (
                      <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                        {submission.content
                          ? <RichTextContent html={submission.content} />
                          : <span className="italic text-gray-400 text-sm">No content submitted.</span>}
                      </div>
                    )}
                  </div>

                  <div className="space-y-3">
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                      {item.type === "quiz" ? "Grade Override" : item.max_grade ? `Grade (out of ${item.max_grade} pts)` : "Grade (%)"}
                    </p>
                    <div className="flex items-center gap-3">
                      <input
                        type="number" min="0" max={item.max_grade ?? 100}
                        step={item.max_grade ? 0.5 : 1}
                        value={teacherGrade}
                        onChange={e => setTeacherGrade(e.target.value)}
                        placeholder={item.max_grade ? `0–${item.max_grade}` : "0–100"}
                        className="w-28 text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#0B1E40]/20"
                      />
                      <span className="text-sm text-gray-400">{item.max_grade ? "pts" : "%"}</span>
                    </div>
                    <textarea rows={2} value={teacherFeedback}
                      onChange={e => setTeacherFeedback(e.target.value)}
                      placeholder="Feedback for the student…"
                      className="w-full text-sm border border-gray-200 rounded-lg p-3 resize-none focus:outline-none focus:ring-2 focus:ring-[#0B1E40]/20" />
                    <button onClick={handleTeacherGrade} disabled={grading || !teacherGrade}
                      className="px-4 py-2 bg-[#0B1E40] text-white text-xs font-semibold rounded-lg hover:bg-[#0B1E40]/90 disabled:opacity-50 flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      {grading ? "Saving…" : submission.grade != null ? "Update Grade" : "Save Grade"}
                    </button>
                  </div>
                </>
              ) : (
                <p className="text-xs text-gray-400 italic">This student hasn't submitted yet.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
