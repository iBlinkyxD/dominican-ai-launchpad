import { useState } from "react";
import { ChevronDown, Users, CheckCircle2, Pencil } from "lucide-react";
import { StudentInfo } from "@/api/tutoring";

// ── Student Banner with dropdown ──────────────────────────────────────────────

export const StudentBanner = ({ students, selected, editMode, onSelect, onToggleEdit }: {
  students: StudentInfo[];
  selected: StudentInfo | null;
  editMode: boolean;
  onSelect: (s: StudentInfo | null) => void;
  onToggleEdit: () => void;
}) => {
  const [open, setOpen] = useState(false);

  const Avatar = ({ s, size = "w-8 h-8", textSize = "text-xs", inverted = false }: { s: StudentInfo; size?: string; textSize?: string; inverted?: boolean }) => (
    <div className={`${size} rounded-full overflow-hidden shrink-0`}>
      {s.student_avatar
        ? <img src={s.student_avatar} alt={s.student_name} className="w-full h-full object-cover" />
        : <div className={`w-full h-full flex items-center justify-center font-bold ${textSize} ${inverted ? "bg-white/20 text-white" : "bg-[#0B1E40] text-white"}`}>
            {s.student_name.charAt(0).toUpperCase()}
          </div>
      }
    </div>
  );

  return (
    <div className="relative">
      <div className={`flex items-center justify-between rounded-xl px-4 py-3 border transition-colors ${editMode ? "bg-[#0B1E40] border-[#0B1E40]" : "bg-[#0B1E40]/5 border-[#0B1E40]/15"}`}>

        {/* Left: dropdown trigger */}
        <button
          onClick={() => !editMode && setOpen(o => !o)}
          disabled={editMode}
          className="flex items-center gap-3 flex-1 text-left"
        >
          {selected ? (
            <>
              <Avatar s={selected} inverted={editMode} />
              <div>
                <p className={`text-sm font-semibold ${editMode ? "text-white" : "text-[#0B1E40]"}`}>{selected.student_name}</p>
                <p className={`text-xs ${editMode ? "text-white/60" : "text-gray-400"}`}>
                  {editMode ? "Editing this student's course" : "Viewing this student's progress"}
                </p>
              </div>
            </>
          ) : (
            <>
              <div className={`w-8 h-8 rounded-full border-2 border-dashed flex items-center justify-center ${editMode ? "border-white/30" : "border-gray-300"}`}>
                <Users className={`w-4 h-4 ${editMode ? "text-white/50" : "text-gray-400"}`} />
              </div>
              <p className={`text-sm font-medium ${editMode ? "text-white/70" : "text-gray-500"}`}>Select a student</p>
            </>
          )}
          {!editMode && <ChevronDown className={`w-4 h-4 ml-1 transition-transform ${open ? "rotate-180" : ""} ${editMode ? "text-white/50" : "text-gray-400"}`} />}
        </button>

        {/* Right: edit button */}
        {selected && (
          <button
            onClick={onToggleEdit}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ml-3 ${editMode ? "bg-white/20 text-white hover:bg-white/30" : "bg-[#0B1E40] text-white hover:bg-[#0B1E40]/90"}`}
          >
            <Pencil className="w-3.5 h-3.5" />
            {editMode ? "Done" : "Edit Course"}
          </button>
        )}
      </div>

      {/* Dropdown */}
      {open && !editMode && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg z-20 overflow-hidden">
          {/* Overview option */}
          <button
            onClick={() => { onSelect(null); setOpen(false); }}
            className={`w-full flex items-center gap-3 px-4 py-3 text-sm hover:bg-gray-50 transition-colors ${!selected ? "bg-blue-50 text-[#0B1E40] font-medium" : "text-gray-700"}`}
          >
            <div className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
              <Users className="w-3.5 h-3.5 text-gray-400" />
            </div>
            Overview
            {!selected && <CheckCircle2 className="w-4 h-4 text-[#0B1E40] ml-auto" />}
          </button>

          <div className="border-t border-gray-100" />

          {students.map(s => (
            <button
              key={s.student_id}
              onClick={() => { onSelect(s); setOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-3 text-sm hover:bg-gray-50 transition-colors ${selected?.student_id === s.student_id ? "bg-blue-50 text-[#0B1E40] font-medium" : "text-gray-700"}`}
            >
              <Avatar s={s} size="w-7 h-7" textSize="text-xs" />
              {s.student_name}
              {selected?.student_id === s.student_id && <CheckCircle2 className="w-4 h-4 text-[#0B1E40] ml-auto" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
