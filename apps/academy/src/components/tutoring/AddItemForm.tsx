import { useState } from "react";
import { Check, X } from "lucide-react";
import { TutoringItemType } from "@/api/tutoring";
import { emptyItem, ITEM_TYPES, calcDuration, calcEndTime } from "@/components/tutoring/types";
import { RichTextEditor } from "@/components/tutoring/RichTextEditor";

// ── Add Item Form ─────────────────────────────────────────────────────────────

export const AddItemForm = ({ onSave, onCancel, initial }: {
  onSave: (data: typeof emptyItem) => Promise<void>;
  onCancel: () => void;
  initial?: Partial<typeof emptyItem>;
}) => {
  const rawDate = initial?.due_date ?? "";
  const initDate = rawDate.split("T")[0] ?? "";
  const initStart = rawDate.includes("T") ? rawDate.split("T")[1].slice(0, 5) : "";
  const initEnd = calcEndTime(initStart, initial?.duration ?? "");

  const [form, setForm] = useState({ ...emptyItem, ...initial });
  const [dueDate, setDueDate] = useState(initDate);
  const [dueTime, setDueTime] = useState(initStart || (initial?.type !== "notes" ? "23:59" : ""));
  const [startTime, setStartTime] = useState(initStart);
  const [endTime, setEndTime] = useState(initEnd);
  const [saving, setSaving] = useState(false);

  const handleStartEnd = (start: string, end: string) => {
    setStartTime(start);
    setEndTime(end);
    const dur = calcDuration(start, end);
    setForm(f => ({ ...f, duration: dur }));
  };

  const handleSave = async () => {
    if (!form.title.trim()) return;
    setSaving(true);
    const isSession = form.type === "session";
    const combined = isSession
      ? (dueDate ? (startTime ? `${dueDate}T${startTime}` : dueDate) : "")
      : (dueDate ? (dueTime ? `${dueDate}T${dueTime}` : form.type !== "notes" ? `${dueDate}T23:59` : dueDate) : "");
    try { await onSave({ ...form, due_date: combined }); } finally { setSaving(false); }
  };

  return (
    <div className="border border-blue-200 bg-blue-50/40 rounded-xl p-4 space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Type</label>
          <select value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value as TutoringItemType }))}
            className="mt-1 w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#0B1E40]/20 bg-white">
            {ITEM_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
        <div>
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Duration</label>
          <input value={form.duration} onChange={e => setForm(f => ({ ...f, duration: e.target.value }))}
            placeholder="e.g. 1 hr"
            className="mt-1 w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#0B1E40]/20 bg-white" />
        </div>
      </div>
      <div>
        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Title *</label>
        <input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
          placeholder="Assignment title"
          className="mt-1 w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#0B1E40]/20 bg-white" />
      </div>
      {form.type === "session" ? (
        <div className="space-y-2">
          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Session Date</label>
            <input type="date" value={dueDate} onChange={e => setDueDate(e.target.value)}
              className="mt-1 w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#0B1E40]/20 bg-white" />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Start Time</label>
              <input type="time" value={startTime}
                onChange={e => handleStartEnd(e.target.value, endTime)}
                className="mt-1 w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#0B1E40]/20 bg-white" />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">End Time</label>
              <input type="time" value={endTime}
                onChange={e => handleStartEnd(startTime, e.target.value)}
                className="mt-1 w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#0B1E40]/20 bg-white" />
            </div>
          </div>
          {form.duration && (
            <p className="text-xs text-[#0B1E40] font-medium">Duration: {form.duration}</p>
          )}
        </div>
      ) : (
        <div>
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Due Date & Time</label>
          <div className="grid grid-cols-2 gap-2 mt-1">
            <input type="date" value={dueDate} onChange={e => setDueDate(e.target.value)}
              className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#0B1E40]/20 bg-white" />
            <input type="time" value={dueTime} onChange={e => setDueTime(e.target.value)}
              className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#0B1E40]/20 bg-white" />
          </div>
        </div>
      )}
      <div>
        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-1">Instructions</label>
        <RichTextEditor
          value={form.instructions}
          onChange={v => setForm(f => ({ ...f, instructions: v }))}
          placeholder="Describe what students need to do…"
          minHeight={90}
        />
      </div>
      {form.type === "session" && (
        <div className="space-y-2">
          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Meeting Link</label>
            <input
              value={form.meeting_link}
              onChange={e => setForm(f => ({ ...f, meeting_link: e.target.value }))}
              placeholder="https://zoom.us/j/..."
              className="mt-1 w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#0B1E40]/20 bg-white"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Recording Link</label>
            <input
              value={form.recording_link}
              onChange={e => setForm(f => ({ ...f, recording_link: e.target.value }))}
              placeholder="https://… (add after session)"
              className="mt-1 w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#0B1E40]/20 bg-white"
            />
          </div>
        </div>
      )}
      <div className="flex flex-wrap items-center gap-4">
        <label
          className="flex items-center gap-2 text-xs text-gray-600 cursor-pointer"
          title="Hidden assignments are not visible to students at all — they won't appear in the week list or calendar. Uncheck to release the assignment to students."
        >
          <input type="checkbox" checked={form.is_locked} onChange={e => setForm(f => ({ ...f, is_locked: e.target.checked }))} />
          Hide Assignment
        </label>
        {(form.type === "assignment" || form.type === "quiz") && (
          <label
            className="flex items-center gap-2 text-xs text-gray-600 cursor-pointer"
            title="When checked, students cannot submit after the due date."
          >
            <input type="checkbox" checked={!form.accept_late} onChange={e => setForm(f => ({ ...f, accept_late: !e.target.checked }))} />
            Block Late Submissions
          </label>
        )}
      </div>

      {/* Assignment-specific settings */}
      {(form.type === "assignment" || form.type === "quiz") && (
        <div>
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
            {form.type === "quiz" ? "Passing Score (%)" : "Max Grade (pts)"}
          </label>
          {form.type === "quiz" ? (
            <input
              type="number" min="0" max="100"
              value={form.passing_score}
              onChange={e => setForm(f => ({ ...f, passing_score: Number(e.target.value) }))}
              className="mt-1 w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#0B1E40]/20 bg-white"
            />
          ) : (
            <input
              type="number" min="1"
              value={form.max_grade}
              onChange={e => setForm(f => ({ ...f, max_grade: e.target.value }))}
              placeholder="e.g. 10 (leave empty for % grading)"
              className="mt-1 w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#0B1E40]/20 bg-white"
            />
          )}
        </div>
      )}

      {/* Quiz-specific settings */}
      {form.type === "quiz" && (
        <div className="space-y-3">
        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Pts / Question</label>
            <select
              value={form.points_per_question}
              onChange={e => setForm(f => ({ ...f, points_per_question: Number(e.target.value) }))}
              className="mt-1 w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#0B1E40]/20 bg-white"
            >
              <option value={0.5}>0.5 pts</option>
              <option value={1}>1 pt</option>
              <option value={2}>2 pts</option>
              <option value={5}>5 pts</option>
            </select>
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Max Attempts</label>
            <input
              type="number" min="0"
              value={form.max_attempts}
              onChange={e => setForm(f => ({ ...f, max_attempts: Number(e.target.value) }))}
              placeholder="0 = unlimited"
              className="mt-1 w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#0B1E40]/20 bg-white"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Time Limit (min)</label>
            <input
              type="number" min="1"
              value={form.time_limit_minutes}
              onChange={e => setForm(f => ({ ...f, time_limit_minutes: e.target.value }))}
              placeholder="No limit"
              className="mt-1 w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#0B1E40]/20 bg-white"
            />
          </div>
        </div>
        <label className="flex items-center gap-2 text-xs text-gray-600 cursor-pointer" title="When enabled, students can see which answers were correct after completing the quiz.">
          <input type="checkbox" checked={form.show_answers} onChange={e => setForm(f => ({ ...f, show_answers: e.target.checked }))} />
          Show correct answers to students after completion
        </label>
        </div>
      )}

      <div className="flex gap-2">
        <button onClick={handleSave} disabled={saving || !form.title.trim()}
          className="flex items-center gap-1.5 px-4 py-2 bg-[#0B1E40] text-white text-xs font-semibold rounded-lg hover:bg-[#0B1E40]/90 disabled:opacity-50 transition-colors">
          <Check className="w-3.5 h-3.5" />{saving ? "Saving…" : "Save"}
        </button>
        <button onClick={onCancel} className="flex items-center gap-1.5 px-4 py-2 border border-gray-200 text-gray-600 text-xs font-semibold rounded-lg hover:bg-gray-50 transition-colors">
          <X className="w-3.5 h-3.5" />Cancel
        </button>
      </div>
    </div>
  );
};
