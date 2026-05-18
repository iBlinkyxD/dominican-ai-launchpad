import { Video, FileText, PenLine, BookOpen, CheckCircle2, Circle, Lock } from "lucide-react";
import { TutoringItemType } from "@/api/tutoring";

// ── Types ─────────────────────────────────────────────────────────────────────

export type ItemStatus = "completed" | "available" | "locked";

// ── Constants ─────────────────────────────────────────────────────────────────

export const ITEM_TYPES: TutoringItemType[] = ["session", "assignment", "quiz", "notes"];

export const emptyItem = {
  type: "assignment" as TutoringItemType,
  title: "",
  duration: "",
  due_date: "",
  is_locked: false,
  accept_late: true,
  instructions: "",
  meeting_link: "",
  recording_link: "",
  passing_score: 70,
  max_attempts: 1,
  time_limit_minutes: "",
  show_answers: true,
  points_per_question: 1,
  max_grade: "",
};

export const ITEM_TYPE_ICON: Record<string, JSX.Element> = {
  session: <Video className="w-3 h-3" />,
  assignment: <PenLine className="w-3 h-3" />,
  quiz: <FileText className="w-3 h-3" />,
  notes: <BookOpen className="w-3 h-3" />,
};

// ── Grade display helpers ─────────────────────────────────────────────────────

/** Format a stored grade value for display. maxGrade converts points→"X/Y pts", null stays as "X%". */
export const fmtGrade = (grade: number, maxGrade: number | null): string =>
  maxGrade != null
    ? `${Number.isInteger(grade) ? grade : grade.toFixed(1)} / ${Number.isInteger(maxGrade) ? maxGrade : maxGrade.toFixed(1)} pts`
    : `${grade}%`;

/** Convert stored grade to percentage (0-100) for colour coding. */
export const gradePct = (grade: number, maxGrade: number | null): number =>
  maxGrade != null ? Math.round((grade / maxGrade) * 100) : grade;

// ── Grade colour ─────────────────────────────────────────────────────────────

export const gradeColor = (score: number) => {
  if (score >= 90) return { text: "text-green-700",  bg: "bg-green-50",  border: "border-green-200",  icon: "text-green-500"  };
  if (score >= 80) return { text: "text-blue-700",   bg: "bg-blue-50",   border: "border-blue-200",   icon: "text-blue-500"   };
  if (score >= 70) return { text: "text-yellow-700", bg: "bg-yellow-50", border: "border-yellow-200", icon: "text-yellow-500" };
  if (score >= 60) return { text: "text-orange-700", bg: "bg-orange-50", border: "border-orange-200", icon: "text-orange-500" };
  return             { text: "text-red-700",   bg: "bg-red-50",   border: "border-red-200",   icon: "text-red-500"   };
};

// ── Helpers ───────────────────────────────────────────────────────────────────

export const formatDueDate = (dateStr: string | null): string | null => {
  if (!dateStr) return null;
  if (dateStr.startsWith("Due")) return dateStr; // legacy format
  try {
    const hasTime = dateStr.includes("T");
    const d = new Date(hasTime ? dateStr : dateStr + "T00:00:00");
    const datePart = d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
    if (hasTime) {
      const timePart = d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
      return `Due ${datePart} at ${timePart}`;
    }
    return `Due ${datePart}`;
  } catch { return dateStr; }
};

export const isDuePast = (dateStr: string | null): boolean => {
  if (!dateStr) return false;
  try {
    const d = new Date(dateStr.includes("T") ? dateStr : dateStr + "T23:59:59");
    return d < new Date();
  } catch { return false; }
};

export const itemIcon = (type: TutoringItemType, status: ItemStatus) => {
  const color = status === "completed" ? "text-green-500" : status === "locked" ? "text-gray-300" : "text-blue-500";
  return { session: <Video className={`w-4 h-4 ${color}`} />, assignment: <PenLine className={`w-4 h-4 ${color}`} />, quiz: <FileText className={`w-4 h-4 ${color}`} />, notes: <BookOpen className={`w-4 h-4 ${color}`} /> }[type];
};

export const upcomingIcon = (type: TutoringItemType) =>
  ({ session: <Video className="w-3.5 h-3.5 text-blue-500" />, assignment: <PenLine className="w-3.5 h-3.5 text-orange-500" />, quiz: <FileText className="w-3.5 h-3.5 text-purple-500" />, notes: <BookOpen className="w-3.5 h-3.5 text-gray-400" /> }[type]);

export const statusIcon = (status: ItemStatus) =>
  status === "completed" ? <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
  : status === "locked" ? <Lock className="w-4 h-4 text-gray-300 shrink-0" />
  : <Circle className="w-4 h-4 text-blue-400 shrink-0" />;

export const calcDuration = (start: string, end: string): string => {
  if (!start || !end) return "";
  const [sh, sm] = start.split(":").map(Number);
  const [eh, em] = end.split(":").map(Number);
  const total = (eh * 60 + em) - (sh * 60 + sm);
  if (total <= 0) return "";
  const hrs = Math.floor(total / 60);
  const mins = total % 60;
  if (hrs === 0) return `${mins} min`;
  if (mins === 0) return `${hrs} hr${hrs > 1 ? "s" : ""}`;
  return `${hrs} hr ${mins} min`;
};

// Returns "before" | "active" | "ended" for a session item.
// If no time is set (date-only) the whole session day counts as active.
export const sessionWindowStatus = (dueDate: string | null, duration: string | null): "before" | "active" | "ended" => {
  if (!dueDate) return "before";
  const hasTime = dueDate.includes("T") && dueDate.split("T")[1].length >= 5;
  if (!hasTime) {
    // Date only — active all day on that date
    const day = new Date(dueDate + "T00:00:00");
    const now = new Date();
    const endOfDay = new Date(dueDate + "T23:59:59");
    if (now < day) return "before";
    if (now > endOfDay) return "ended";
    return "active";
  }
  const start = new Date(dueDate);
  const now = new Date();
  if (now < start) return "before";
  const startTimePart = dueDate.split("T")[1].slice(0, 5);
  const endTimeStr = calcEndTime(startTimePart, duration ?? "");
  if (endTimeStr) {
    const end = new Date(`${dueDate.split("T")[0]}T${endTimeStr}`);
    if (now > end) return "ended";
  }
  return "active";
};

export const calcEndTime = (start: string, duration: string): string => {
  if (!start || !duration) return "";
  const hrMatch = duration.match(/(\d+)\s*hr/);
  const minMatch = duration.match(/(\d+)\s*min/);
  const addMins = (hrMatch ? parseInt(hrMatch[1]) * 60 : 0) + (minMatch ? parseInt(minMatch[1]) : 0);
  const [sh, sm] = start.split(":").map(Number);
  const total = sh * 60 + sm + addMins;
  return `${String(Math.floor(total / 60) % 24).padStart(2, "0")}:${String(total % 60).padStart(2, "0")}`;
};
