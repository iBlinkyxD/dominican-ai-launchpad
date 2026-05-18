import { ChevronRight, CheckCircle2, AlertTriangle } from "lucide-react";
import { StudentInfo, StudentOverview } from "@/api/tutoring";
import { formatDueDate, ITEM_TYPE_ICON } from "@/components/tutoring/types";

// ── Student Overview Cards ────────────────────────────────────────────────────

export const OverviewCards = ({ overview, needsGradingByStudent, nextFutureByStudent, onSelect }: {
  overview: StudentOverview[];
  needsGradingByStudent: Record<string, number>;
  nextFutureByStudent: Record<string, { title: string; type: string; due_date: string | null } | null>;
  onSelect: (s: StudentInfo) => void;
}) => {
  if (overview.length === 0) return (
    <div className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-8 text-xs text-gray-400 text-center">
      No students enrolled yet.
    </div>
  );

  return (
    <div className="space-y-3">
      {overview.map(s => {
        const pct = s.total_count > 0 ? Math.round((s.completed_count / s.total_count) * 100) : 0;
        const allDone = s.completed_count === s.total_count && s.total_count > 0;
        const toGrade = needsGradingByStudent[s.student_id] ?? 0;
        const nextItem = nextFutureByStudent[s.student_id] ?? null;

        return (
          <button
            key={s.student_id}
            onClick={() => onSelect({ enrollment_id: s.enrollment_id, student_id: s.student_id, student_name: s.student_name, student_avatar: s.student_avatar })}
            className="w-full bg-white rounded-xl border border-gray-200 shadow-sm px-5 py-4 hover:shadow-md hover:border-[#0B1E40]/20 transition-all text-left"
          >
            <div className="flex items-center gap-4">
              {/* Avatar */}
              <div className="w-10 h-10 rounded-full overflow-hidden shrink-0">
                {s.student_avatar
                  ? <img src={s.student_avatar} alt={s.student_name} className="w-full h-full object-cover" />
                  : <div className="w-full h-full bg-[#0B1E40] flex items-center justify-center text-white text-sm font-bold">{s.student_name.charAt(0).toUpperCase()}</div>
                }
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                {/* Name + done count — single line, no badge here */}
                <div className="flex items-center justify-between mb-1.5">
                  <p className="text-sm font-semibold text-gray-900 truncate">{s.student_name}</p>
                  <span className={`text-xs font-semibold shrink-0 ml-2 ${allDone ? "text-green-600" : "text-gray-500"}`}>
                    {s.completed_count}/{s.total_count} done
                  </span>
                </div>

                {/* Progress bar */}
                <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden mb-2">
                  <div
                    className={`h-full rounded-full transition-all ${allDone ? "bg-green-500" : "bg-gradient-to-r from-blue-500 to-indigo-500"}`}
                    style={{ width: `${pct}%` }}
                  />
                </div>

                {/* Needs grading row — only when relevant */}
                {toGrade > 0 && (
                  <p className="text-xs text-amber-600 flex items-center gap-1 mb-1">
                    <AlertTriangle className="w-3 h-3 shrink-0" />
                    {toGrade} submission{toGrade > 1 ? "s" : ""} need grading
                  </p>
                )}

                {/* Next item */}
                {allDone ? (
                  <p className="text-xs text-green-600 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> All assignments complete
                  </p>
                ) : nextItem ? (
                  <p className="text-xs text-gray-400 flex items-center gap-1.5 truncate">
                    <span className="text-gray-400">{ITEM_TYPE_ICON[nextItem.type]}</span>
                    <span className="truncate">{nextItem.title}</span>
                    {nextItem.due_date && (
                      <span className="shrink-0 text-orange-500 font-medium">· {formatDueDate(nextItem.due_date)}</span>
                    )}
                  </p>
                ) : (
                  <p className="text-xs text-gray-400">No upcoming items</p>
                )}
              </div>

              <ChevronRight className="w-4 h-4 text-gray-300 shrink-0" />
            </div>
          </button>
        );
      })}
    </div>
  );
};
