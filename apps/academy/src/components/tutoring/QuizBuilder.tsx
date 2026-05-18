import { useEffect, useState } from "react";
import { ConfirmDialog, DialogConfig } from "@/components/ConfirmDialog";
import { Plus, Trash2, Check, GripVertical } from "lucide-react";
import { getQuiz, updateQuiz, QuizQuestion, QuizQuestionDraft } from "@/api/tutoring";

// ── Local draft types ─────────────────────────────────────────────────────────

interface DraftOption {
  localId: string;
  text: string;
  is_correct: boolean;
}

interface DraftQuestion {
  localId: string;
  question_text: string;
  question_type: "multiple_choice" | "true_false";
  options: DraftOption[];
}

const uid = () => Math.random().toString(36).slice(2);

const emptyOption = (): DraftOption => ({ localId: uid(), text: "", is_correct: false });

const emptyQuestion = (): DraftQuestion => ({
  localId: uid(),
  question_text: "",
  question_type: "multiple_choice",
  options: [emptyOption(), emptyOption(), emptyOption(), emptyOption()],
});

const trueFalseOptions = (): DraftOption[] => [
  { localId: uid(), text: "True", is_correct: true },
  { localId: uid(), text: "False", is_correct: false },
];

function fromApi(questions: QuizQuestion[]): DraftQuestion[] {
  return questions.map(q => ({
    localId: q.id,
    question_text: q.question_text,
    question_type: q.question_type as DraftQuestion["question_type"],
    options: q.options.map(o => ({ localId: o.id, text: o.text, is_correct: o.is_correct })),
  }));
}

function toDraft(questions: DraftQuestion[]): QuizQuestionDraft[] {
  return questions.map((q, qi) => ({
    question_text: q.question_text,
    question_type: q.question_type,
    order: qi,
    options: q.options.map((o, oi) => ({ text: o.text, is_correct: o.is_correct, order: oi })),
  }));
}

// ── Component ─────────────────────────────────────────────────────────────────

export const QuizBuilder = ({ courseId, itemId }: { courseId: string; itemId: string }) => {
  const [questions, setQuestions] = useState<DraftQuestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [dialog, setDialog] = useState<DialogConfig | null>(null);

  useEffect(() => {
    getQuiz(courseId, itemId)
      .then(qs => setQuestions(qs.length ? fromApi(qs) : [emptyQuestion()]))
      .catch(() => setQuestions([emptyQuestion()]))
      .finally(() => setLoading(false));
  }, [courseId, itemId]);

  const setQ = (localId: string, update: Partial<DraftQuestion>) =>
    setQuestions(prev => prev.map(q => q.localId === localId ? { ...q, ...update } : q));

  const setOpt = (qId: string, oId: string, update: Partial<DraftOption>) =>
    setQ(qId, {
      options: questions.find(q => q.localId === qId)!.options.map(o =>
        o.localId === oId ? { ...o, ...update } : o
      ),
    });

  const markCorrect = (qId: string, oId: string) =>
    setQ(qId, {
      options: questions.find(q => q.localId === qId)!.options.map(o => ({
        ...o, is_correct: o.localId === oId,
      })),
    });

  const changeType = (qId: string, type: DraftQuestion["question_type"]) => {
    setQ(qId, {
      question_type: type,
      options: type === "true_false" ? trueFalseOptions()
        : [emptyOption(), emptyOption(), emptyOption(), emptyOption()],
    });
  };

  const handleSave = async () => {
    const valid = questions.every(q => q.question_text.trim() && q.options.some(o => o.is_correct) && q.options.every(o => o.text.trim()));
    if (!valid) {
      setDialog({
        title: "Incomplete Quiz",
        message: "Each question needs question text, all options filled in, and one correct answer marked.",
        confirmText: "OK",
        variant: "info",
        onConfirm: () => {},
      });
      return;
    }
    setSaving(true);
    try {
      const saved_qs = await updateQuiz(courseId, itemId, toDraft(questions));
      setQuestions(fromApi(saved_qs));
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } finally { setSaving(false); }
  };

  if (loading) return <p className="text-xs text-gray-400 py-4">Loading quiz…</p>;

  return (
    <div className="space-y-4 pt-4 border-t border-gray-100">
      <ConfirmDialog config={dialog} onClose={() => setDialog(null)} />
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-gray-700">Quiz Questions</h3>
        <div className="flex gap-2">
          <button
            onClick={() => setQuestions(prev => [...prev, emptyQuestion()])}
            className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 text-gray-600 text-xs font-semibold rounded-lg hover:bg-gray-50"
          >
            <Plus className="w-3.5 h-3.5" /> Add Question
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
              saved ? "bg-green-500 text-white" : "bg-[#0B1E40] text-white hover:bg-[#0B1E40]/90"
            } disabled:opacity-50`}
          >
            <Check className="w-3.5 h-3.5" />
            {saving ? "Saving…" : saved ? "Saved!" : "Save Quiz"}
          </button>
        </div>
      </div>

      {questions.length === 0 && (
        <p className="text-xs text-gray-400 text-center py-6">No questions yet. Click "Add Question" to start.</p>
      )}

      {questions.map((q, qi) => (
        <div key={q.localId} className="border border-gray-200 rounded-xl p-4 space-y-3 bg-gray-50/40">
          {/* Question header */}
          <div className="flex items-start gap-3">
            <div className="flex items-center gap-1 text-gray-400 pt-2 shrink-0">
              <GripVertical className="w-4 h-4" />
              <span className="text-xs font-semibold text-gray-500 w-5">{qi + 1}.</span>
            </div>
            <div className="flex-1 space-y-2">
              <input
                value={q.question_text}
                onChange={e => setQ(q.localId, { question_text: e.target.value })}
                placeholder="Question text…"
                className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-[#0B1E40]/20"
              />
              <div className="flex gap-2">
                {(["multiple_choice", "true_false"] as const).map(t => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => changeType(q.localId, t)}
                    className={`text-xs px-2.5 py-1 rounded-full border font-medium transition-colors ${
                      q.question_type === t
                        ? "bg-[#0B1E40] text-white border-[#0B1E40]"
                        : "border-gray-200 text-gray-500 hover:bg-gray-100"
                    }`}
                  >
                    {t === "multiple_choice" ? "Multiple Choice" : "True / False"}
                  </button>
                ))}
              </div>
            </div>
            <button
              onClick={() => setQuestions(prev => prev.filter(x => x.localId !== q.localId))}
              className="p-1.5 hover:bg-red-50 rounded-lg text-red-400 shrink-0"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Options */}
          <div className="ml-9 space-y-2">
            {q.options.map((opt, oi) => (
              <div key={opt.localId} className="flex items-center gap-2">
                <input
                  type="radio"
                  name={`correct-${q.localId}`}
                  checked={opt.is_correct}
                  onChange={() => markCorrect(q.localId, opt.localId)}
                  className="accent-[#0B1E40] shrink-0"
                  title="Mark as correct answer"
                />
                <input
                  value={opt.text}
                  onChange={e => setOpt(q.localId, opt.localId, { text: e.target.value })}
                  placeholder={`Option ${oi + 1}`}
                  disabled={q.question_type === "true_false"}
                  className="flex-1 text-sm border border-gray-200 rounded-lg px-3 py-1.5 bg-white focus:outline-none focus:ring-2 focus:ring-[#0B1E40]/20 disabled:bg-gray-100 disabled:text-gray-500"
                />
                {q.question_type === "multiple_choice" && q.options.length > 2 && (
                  <button
                    onClick={() => setQ(q.localId, { options: q.options.filter(o => o.localId !== opt.localId) })}
                    className="p-1 hover:bg-red-50 rounded text-red-400 shrink-0"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                )}
              </div>
            ))}
            {q.question_type === "multiple_choice" && q.options.length < 5 && (
              <button
                onClick={() => setQ(q.localId, { options: [...q.options, emptyOption()] })}
                className="text-xs text-[#0B1E40] hover:underline flex items-center gap-1 ml-6"
              >
                <Plus className="w-3 h-3" /> Add option
              </button>
            )}
            <p className="text-[11px] text-gray-400 ml-6">Select the radio button next to the correct answer.</p>
          </div>
        </div>
      ))}
    </div>
  );
};
