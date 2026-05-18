import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

// ── Mini Calendar ─────────────────────────────────────────────────────────────

const DAY_NAMES = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

// events keyed by ISO date string "YYYY-MM-DD"
export const MiniCalendar = ({ events, selectedDate, onDayClick }: {
  events: Record<string, "session" | "assignment">;
  selectedDate: string | null;
  onDayClick: (iso: string) => void;
}) => {
  const today = new Date();
  const [view, setView] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
  const year = view.getFullYear(); const month = view.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const isCurrent = today.getFullYear() === year && today.getMonth() === month;
  const cells: (number | null)[] = [...Array(firstDay).fill(null), ...Array.from({ length: daysInMonth }, (_, i) => i + 1)];

  const isoKey = (day: number) =>
    `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
      <div className="flex items-center justify-between mb-3">
        <button onClick={() => setView(new Date(year, month - 1, 1))} className="p-1 hover:bg-gray-100 rounded-lg"><ChevronLeft className="w-4 h-4 text-gray-500" /></button>
        <span className="text-sm font-semibold text-gray-800">{MONTH_NAMES[month]} {year}</span>
        <button onClick={() => setView(new Date(year, month + 1, 1))} className="p-1 hover:bg-gray-100 rounded-lg"><ChevronRight className="w-4 h-4 text-gray-500" /></button>
      </div>
      <div className="grid grid-cols-7 mb-1">{DAY_NAMES.map(d => <div key={d} className="text-center text-xs font-medium text-gray-400 py-1">{d}</div>)}</div>
      <div className="grid grid-cols-7 gap-y-1">
        {cells.map((day, i) => {
          if (!day) return <div key={i} />;
          const iso = isoKey(day);
          const isToday = isCurrent && day === today.getDate();
          const isSelected = selectedDate === iso;
          const event = events[iso];
          return (
            <div key={i} className="flex flex-col items-center">
              <button
                onClick={() => event && onDayClick(isSelected ? "" : iso)}
                className={`w-7 h-7 flex items-center justify-center rounded-full text-xs font-medium transition-colors
                  ${isToday ? "bg-[#0B1E40] text-white"
                  : isSelected ? "bg-[#0B1E40]/10 text-[#0B1E40] ring-2 ring-[#0B1E40]/30"
                  : event ? "hover:bg-gray-100 cursor-pointer text-gray-700"
                  : "text-gray-400 cursor-default"}`}
              >
                {day}
              </button>
              {event && (
                <div className={`w-1.5 h-1.5 rounded-full mt-0.5 ${event === "session" ? "bg-blue-500" : "bg-orange-400"}`} />
              )}
            </div>
          );
        })}
      </div>
      <div className="flex items-center gap-4 mt-3 pt-3 border-t border-gray-100">
        <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-blue-500" /><span className="text-xs text-gray-500">Session</span></div>
        <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-orange-400" /><span className="text-xs text-gray-500">Assignment</span></div>
      </div>
    </div>
  );
};
