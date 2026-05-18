import { useEffect, useRef, useState } from "react";
import { ConfirmDialog, DialogConfig } from "@/components/ConfirmDialog";
import { CheckCircle2, XCircle, Clock, ChevronLeft, ChevronRight } from "lucide-react";
import { QuizQuestion, QuizSubmitResult, TutoringItem, submitQuiz } from "@/api/tutoring";
import { gradeColor, gradePct } from "@/components/tutoring/types";

// ── Helpers ───────────────────────────────────────────────────────────────────

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function fmtTime(secs: number) {
  const m = Math.floor(secs / 60).toString().padStart(2, "0");
  const s = (secs % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

interface QuizProgress {
  shuffleOrder: string[];
  answers: Record<string, string>;
  currentQuestion: number;
  startedAt: string;
}

// ── Component ─────────────────────────────────────────────────────────────────

export const QuizPlayer = ({
  courseId, item, questions, attemptsUsed,
  onComplete, onBack, onRetake,
}: {
  courseId: string;
  item: TutoringItem;
  questions: QuizQuestion[];
  attemptsUsed: number;
  onComplete: (result: QuizSubmitResult) => void;
  onBack: () => void;
  onRetake: () => void;
}) => {
  const storageKey = `quiz-progress-${courseId}-${item.id}`;

  const loadProgress = (): QuizProgress | null => {
    try { const s = localStorage.getItem(storageKey); return s ? JSON.parse(s) : null; }
    catch { return null; }
  };
  const saveProgress = (p: QuizProgress) => {
    try { localStorage.setItem(storageKey, JSON.stringify(p)); } catch {}
  };
  const clearProgress = () => {
    try { localStorage.removeItem(storageKey); } catch {}
  };

  // ── State — all initialised from saved progress if available ─────────────────

  const [shuffled] = useState<QuizQuestion[]>(() => {
    const saved = loadProgress();
    if (saved?.shuffleOrder?.length) {
      const qMap = Object.fromEntries(questions.map(q => [q.id, q]));
      const ordered = saved.shuffleOrder.map(id => qMap[id]).filter(Boolean) as QuizQuestion[];
      if (ordered.length === questions.length) return ordered;
    }
    return shuffle(questions);
  });

  const [current, setCurrent] = useState(() => loadProgress()?.currentQuestion ?? 0);
  const [answers, setAnswers] = useState<Record<string, string>>(() => loadProgress()?.answers ?? {});

  const [timeLeft, setTimeLeft] = useState<number | null>(() => {
    if (!item.time_limit_minutes) return null;
    const total = item.time_limit_minutes * 60;
    const saved = loadProgress();
    if (saved?.startedAt) {
      const elapsed = Math.floor((Date.now() - new Date(saved.startedAt).getTime()) / 1000);
      return Math.max(0, total - elapsed);
    }
    return total;
  });

  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<QuizSubmitResult | null>(null);
  const [dialog, setDialog] = useState<DialogConfig | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  // Ref always holds latest answers so the timer callback avoids stale closures
  const answersRef = useRef(answers);

  // ── Persist answers ref ───────────────────────────────────────────────────────

  useEffect(() => { answersRef.current = answers; }, [answers]);

  // ── Initialise localStorage on first start ────────────────────────────────────

  useEffect(() => {
    const saved = loadProgress();
    if (!saved) {
      saveProgress({
        shuffleOrder: shuffled.map(q => q.id),
        answers: {},
        currentQuestion: 0,
        startedAt: new Date().toISOString(),
      });
    }
    // If the timer already expired while away, submit immediately
    if (item.time_limit_minutes && timeLeft !== null && timeLeft <= 0) {
      doSubmit();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Countdown timer ───────────────────────────────────────────────────────────

  useEffect(() => {
    if (timeLeft === null || timeLeft <= 0) return;
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev === null || prev <= 1) {
          clearInterval(timerRef.current!);
          doSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current!);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Persist helpers ───────────────────────────────────────────────────────────

  const persistAnswer = (questionId: string, optionId: string) => {
    const newAnswers = { ...answersRef.current, [questionId]: optionId };
    setAnswers(newAnswers);
    const saved = loadProgress();
    if (saved) saveProgress({ ...saved, answers: newAnswers });
  };

  const persistQuestion = (index: number) => {
    setCurrent(index);
    const saved = loadProgress();
    if (saved) saveProgress({ ...saved, currentQuestion: index });
  };

  // ── Submit ────────────────────────────────────────────────────────────────────

  const doSubmit = async () => {
    setSubmitting(true);
    clearInterval(timerRef.current!);
    // Read from ref to avoid stale closure (timer callback path)
    const currentAnswers = answersRef.current;
    try {
      const res = await submitQuiz(courseId, item.id, currentAnswers);
      clearProgress();
      setResult(res);
      onComplete(res);
    } finally { setSubmitting(false); }
  };

  const handleSubmit = (auto = false) => {
    if (submitting) return;
    if (!auto && Object.keys(answersRef.current).length < shuffled.length) {
      const unanswered = shuffled.length - Object.keys(answersRef.current).length;
      setDialog({
        title: "Unanswered Questions",
        message: `You have ${unanswered} unanswered question${unanswered > 1 ? "s" : ""}. Submit anyway?`,
        confirmText: "Submit",
        cancelText: "Go Back",
        onConfirm: doSubmit,
      });
      return;
    }
    doSubmit();
  };

  // ── Back / Retake — clear saved progress ─────────────────────────────────────

  const handleBack = () => { clearProgress(); onBack(); };
  const handleRetake = () => { clearProgress(); onRetake(); };

  // ── Derived ───────────────────────────────────────────────────────────────────

  const q = shuffled[current];
  const totalAttempts = item.max_attempts;
  const attemptsLeft = totalAttempts === 0 ? null : totalAttempts - attemptsUsed;

  // ── Results screen ────────────────────────────────────────────────────────────

  if (result) {
    const pct = gradePct(result.score, result.max_points);
    const c = gradeColor(pct);
    const passingPts = Math.round((result.passing_score / 100) * result.max_points * 10) / 10;
    const retakesLeft = item.max_attempts === 0 || result.attempts_used < item.max_attempts;
    return (
      <div className="space-y-5">
        <div className={`rounded-xl p-6 border ${c.bg} ${c.border} text-center`}>
          <p className={`text-4xl font-bold ${c.text} mb-1`}>{result.score} / {result.max_points} pts</p>
          <p className={`text-sm font-semibold ${c.text}`}>
            {result.passed ? "🎉 Passed!" : "Not passed"} · Passing: {passingPts} / {result.max_points} pts
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Attempt {result.attempts_used}{totalAttempts > 0 ? ` of ${totalAttempts}` : ""}
          </p>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-gray-700">
              {retakesLeft ? "Your Answers" : "Answer Review"}
            </h3>
            {retakesLeft && (
              <p className="text-xs text-gray-400">Correct answers shown after your last attempt.</p>
            )}
          </div>
          {shuffled.map((q, i) => {
            const qr = result.question_results.find(r => r.question_id === q.id);
            const correct = qr?.correct ?? false;
            const selectedId = qr?.selected_option_id;
            const correctId = qr?.correct_option_id;
            return (
              <div key={q.id} className={`rounded-lg border p-3 ${
                retakesLeft ? "border-gray-200 bg-gray-50/40"
                : correct ? "border-green-200 bg-green-50/40"
                : "border-red-200 bg-red-50/40"
              }`}>
                <div className="flex items-start gap-2 mb-2">
                  {!retakesLeft && (correct
                    ? <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                    : <XCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />)}
                  <p className="text-sm font-medium text-gray-800">{i + 1}. {q.question_text}</p>
                </div>
                <div className="ml-6 space-y-1">
                  {q.options.map(opt => {
                    const wasSelected = opt.id === selectedId;
                    const isCorrect = opt.id === correctId;
                    const rowClass = retakesLeft
                      ? wasSelected ? "bg-blue-100 text-blue-800 font-medium" : "text-gray-500"
                      : isCorrect ? "bg-green-100 text-green-800 font-medium"
                        : wasSelected && !isCorrect ? "bg-red-100 text-red-700"
                        : "text-gray-500";
                    return (
                      <div key={opt.id} className={`text-xs px-2.5 py-1 rounded flex items-center gap-2 ${rowClass}`}>
                        {!retakesLeft && isCorrect && <CheckCircle2 className="w-3 h-3 shrink-0" />}
                        {!retakesLeft && wasSelected && !isCorrect && <XCircle className="w-3 h-3 shrink-0" />}
                        {retakesLeft && wasSelected && <span className="w-3 h-3 shrink-0 text-blue-500">•</span>}
                        {opt.text}
                        {!retakesLeft && isCorrect && " ✓"}
                        {retakesLeft && wasSelected && " (your choice)"}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex flex-wrap gap-3 pt-2">
          <button onClick={handleBack} className="flex-1 px-4 py-2.5 border border-gray-200 text-gray-700 text-sm font-semibold rounded-lg hover:bg-gray-50 transition-colors">
            Return to Quiz Detail
          </button>
          {(item.max_attempts === 0 || result.attempts_used < item.max_attempts) && (
            <button onClick={handleRetake} className="flex-1 px-4 py-2.5 bg-purple-600 text-white text-sm font-semibold rounded-lg hover:bg-purple-700 transition-colors">
              Retake Quiz
            </button>
          )}
        </div>
      </div>
    );
  }

  // ── Quiz player ───────────────────────────────────────────────────────────────

  const progress = ((current + 1) / shuffled.length) * 100;
  const answered = answers[q.id];
  const isLast = current === shuffled.length - 1;

  return (
    <div className="space-y-5">
      <ConfirmDialog config={dialog} onClose={() => setDialog(null)} />

      {/* Header bar */}
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-500">Question {current + 1} of {shuffled.length}</span>
        <div className="flex items-center gap-3">
          {attemptsLeft !== null && (
            <span className="text-xs text-gray-400">{attemptsLeft} attempt{attemptsLeft !== 1 ? "s" : ""} left</span>
          )}
          {timeLeft !== null && (
            <span className={`flex items-center gap-1 text-sm font-semibold tabular-nums ${timeLeft < 60 ? "text-red-500" : "text-gray-700"}`}>
              <Clock className="w-3.5 h-3.5" />{fmtTime(timeLeft)}
            </span>
          )}
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <div className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full transition-all" style={{ width: `${progress}%` }} />
      </div>

      {/* Resume banner */}
      {Object.keys(answers).length > 0 && (
        <p className="text-xs text-blue-600 bg-blue-50 border border-blue-100 rounded-lg px-3 py-2">
          Progress restored — {Object.keys(answers).length} of {shuffled.length} answered.
        </p>
      )}

      {/* Question */}
      <div>
        <p className="text-base font-semibold text-gray-900 mb-4">{q.question_text}</p>
        <div className="space-y-2">
          {q.options.map(opt => (
            <button
              key={opt.id}
              type="button"
              onClick={() => persistAnswer(q.id, opt.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border text-left text-sm font-medium transition-colors ${
                answered === opt.id
                  ? "bg-[#0B1E40] border-[#0B1E40] text-white"
                  : "border-gray-200 text-gray-700 hover:border-[#0B1E40]/40 hover:bg-blue-50/40"
              }`}
            >
              <span className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs font-bold shrink-0 ${
                answered === opt.id ? "border-white text-white" : "border-gray-300 text-gray-400"
              }`}>
                {String.fromCharCode(65 + q.options.indexOf(opt))}
              </span>
              {opt.text}
            </button>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between pt-2">
        <button
          onClick={() => persistQuestion(Math.max(0, current - 1))}
          disabled={current === 0}
          className="flex items-center gap-1.5 px-4 py-2 border border-gray-200 text-gray-600 text-sm font-semibold rounded-lg hover:bg-gray-50 disabled:opacity-40"
        >
          <ChevronLeft className="w-4 h-4" /> Back
        </button>

        {isLast ? (
          <button
            onClick={() => handleSubmit()}
            disabled={submitting}
            className="flex items-center gap-1.5 px-5 py-2 bg-[#0B1E40] text-white text-sm font-semibold rounded-lg hover:bg-[#0B1E40]/90 disabled:opacity-50"
          >
            {submitting ? "Submitting…" : "Submit Quiz"}
          </button>
        ) : (
          <button
            onClick={() => persistQuestion(Math.min(shuffled.length - 1, current + 1))}
            className="flex items-center gap-1.5 px-4 py-2 bg-[#0B1E40] text-white text-sm font-semibold rounded-lg hover:bg-[#0B1E40]/90"
          >
            Next <ChevronRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};
