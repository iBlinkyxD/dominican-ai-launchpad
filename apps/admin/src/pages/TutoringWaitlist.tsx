import { useEffect, useState } from "react";
import { Clock, CheckCircle2, RefreshCw, XCircle, UserCheck, Loader2, ChevronDown } from "lucide-react";
import { getWaitlist, assignProfessor, getTeachers, WaitlistRecord, WaitlistStatus, Teacher } from "@/api/waitlist";

// ── Status badge ──────────────────────────────────────────────────────────────

const STATUS_CONFIG: Record<WaitlistStatus, { label: string; color: string; icon: React.ReactNode }> = {
  pending:      { label: "Pending",      color: "bg-amber-100 text-amber-700 border-amber-200",    icon: <Clock className="w-3 h-3" /> },
  assigned:     { label: "Assigned",     color: "bg-blue-100 text-blue-700 border-blue-200",       icon: <UserCheck className="w-3 h-3" /> },
  active:       { label: "Active",       color: "bg-green-100 text-green-700 border-green-200",    icon: <CheckCircle2 className="w-3 h-3" /> },
  reassigning:  { label: "Reassigning",  color: "bg-orange-100 text-orange-700 border-orange-200", icon: <RefreshCw className="w-3 h-3" /> },
  cancelled:    { label: "Cancelled",    color: "bg-gray-100 text-gray-500 border-gray-200",       icon: <XCircle className="w-3 h-3" /> },
};

const StatusBadge = ({ status }: { status: WaitlistStatus }) => {
  const cfg = STATUS_CONFIG[status];
  return (
    <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full border ${cfg.color}`}>
      {cfg.icon}{cfg.label}
    </span>
  );
};

// ── Assign panel (inline) ─────────────────────────────────────────────────────

const AssignPanel = ({ record, onAssigned }: { record: WaitlistRecord; onAssigned: () => void }) => {
  const [open,      setOpen]      = useState(false);
  const [teachers,  setTeachers]  = useState<Teacher[]>([]);
  const [selected,  setSelected]  = useState<Teacher | null>(null);
  const [loading,   setLoading]   = useState(false);
  const [fetching,  setFetching]  = useState(false);
  const [error,     setError]     = useState<string | null>(null);

  const handleOpen = async () => {
    setOpen(true);
    if (teachers.length > 0) return;
    setFetching(true);
    try {
      const data = await getTeachers();
      setTeachers(data);
    } catch {
      setError("Failed to load teachers.");
    } finally {
      setFetching(false);
    }
  };

  const handleAssign = async () => {
    if (!selected) return;
    setLoading(true);
    setError(null);
    try {
      await assignProfessor(record.id, {
        professor_user_id: selected.id,
        professor_email:   selected.email,
        professor_name:    `${selected.first_name} ${selected.last_name}`,
      });
      setOpen(false);
      onAssigned();
    } catch {
      setError("Failed to assign. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!open) {
    return (
      <button
        onClick={handleOpen}
        className="flex items-center gap-1.5 text-xs font-semibold text-[#0B1E40] border border-[#0B1E40]/30 rounded-lg px-3 py-1.5 hover:bg-[#0B1E40]/5 transition-colors"
      >
        <UserCheck className="w-3.5 h-3.5" /> Assign Professor
      </button>
    );
  }

  return (
    <div className="mt-3 p-4 bg-blue-50 border border-blue-200 rounded-xl space-y-3">
      <p className="text-xs font-semibold text-blue-800">Select a professor</p>

      {fetching ? (
        <div className="flex items-center gap-2 text-xs text-blue-600">
          <Loader2 className="w-3.5 h-3.5 animate-spin" /> Loading teachers…
        </div>
      ) : teachers.length === 0 ? (
        <p className="text-xs text-gray-500">
          No teachers found. Assign the <strong>academy / teacher</strong> role to a user first.
        </p>
      ) : (
        <select
          value={selected?.id ?? ""}
          onChange={e => setSelected(teachers.find(t => t.id === e.target.value) ?? null)}
          className="w-full border border-blue-200 rounded-lg px-3 py-2 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          <option value="">— Choose a teacher —</option>
          {teachers.map(t => (
            <option key={t.id} value={t.id}>
              {t.first_name} {t.last_name} ({t.email})
            </option>
          ))}
        </select>
      )}

      {error && <p className="text-xs text-red-600">{error}</p>}

      <div className="flex gap-2">
        <button
          onClick={() => setOpen(false)}
          className="flex-1 text-xs font-semibold py-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={handleAssign}
          disabled={loading || !selected}
          className="flex-1 text-xs font-semibold py-2 rounded-lg bg-[#0B1E40] text-white hover:bg-[#0B1E40]/90 disabled:opacity-50 transition-colors flex items-center justify-center gap-1"
        >
          {loading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <UserCheck className="w-3.5 h-3.5" />}
          {loading ? "Sending…" : "Assign & Notify"}
        </button>
      </div>
    </div>
  );
};

// ── Row card ──────────────────────────────────────────────────────────────────

const WaitlistRow = ({ record, onRefresh }: { record: WaitlistRecord; onRefresh: () => void }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-sm transition-shadow">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <p className="font-semibold text-[#0B1E40] text-sm">
              {record.first_name} {record.last_name}
            </p>
            <StatusBadge status={record.status} />
          </div>
          <p className="text-xs text-muted-foreground">{record.email}</p>
          <p className="text-xs text-gray-400 mt-0.5">
            Joined {new Date(record.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
          </p>
        </div>

        <button
          onClick={() => setExpanded(p => !p)}
          className="text-gray-400 hover:text-gray-600 shrink-0"
        >
          <ChevronDown className={`w-4 h-4 transition-transform ${expanded ? "rotate-180" : ""}`} />
        </button>
      </div>

      {expanded && (
        <div className="mt-4 pt-4 border-t border-gray-100 space-y-3">
          {record.goal && (
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Learning goal</p>
              <p className="text-sm text-gray-700 leading-relaxed">{record.goal}</p>
            </div>
          )}
          {record.availability && (
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Availability</p>
              <p className="text-sm text-gray-700">{record.availability}</p>
            </div>
          )}
          {(record.status === "pending" || record.status === "reassigning") && (
            <AssignPanel record={record} onAssigned={onRefresh} />
          )}
          {record.status === "assigned" && (
            <div className="text-xs bg-blue-50 border border-blue-100 rounded-lg px-3 py-2.5 space-y-0.5">
              <p className="text-blue-700 font-semibold">Awaiting professor acceptance</p>
              {record.professor_name && (
                <p className="text-blue-500">
                  Assigned to <span className="font-medium">{record.professor_name}</span>
                </p>
              )}
            </div>
          )}
          {record.status === "active" && record.professor_name && (
            <div className="text-xs bg-green-50 border border-green-200 rounded-lg px-3 py-2.5 flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                <span className="text-green-700 font-bold text-[10px]">
                  {record.professor_name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                </span>
              </div>
              <div>
                <p className="text-green-700 font-semibold">Teacher assigned</p>
                <p className="text-green-600">{record.professor_name}</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// ── Page ──────────────────────────────────────────────────────────────────────

const STATUS_FILTERS: { label: string; value: WaitlistStatus | "all" }[] = [
  { label: "All",          value: "all" },
  { label: "Pending",      value: "pending" },
  { label: "Assigned",     value: "assigned" },
  { label: "Active",       value: "active" },
  { label: "Reassigning",  value: "reassigning" },
];

export const TutoringWaitlist = () => {
  const [records,  setRecords]  = useState<WaitlistRecord[]>([]);
  const [filter,   setFilter]   = useState<WaitlistStatus | "all">("all");
  const [loading,  setLoading]  = useState(true);
  const [error,    setError]    = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getWaitlist(filter === "all" ? undefined : filter);
      setRecords(data);
    } catch {
      setError("Failed to load waitlist.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, [filter]); // eslint-disable-line react-hooks/exhaustive-deps

  const counts = records.reduce((acc, r) => {
    acc[r.status] = (acc[r.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#0B1E40]">Tutoring Waitlist</h1>
          <p className="text-sm text-muted-foreground mt-0.5">{records.length} total · {counts.pending || 0} pending</p>
        </div>
        <button onClick={load} className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-[#0B1E40] transition-colors">
          <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} /> Refresh
        </button>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {(["pending", "assigned", "active", "reassigning"] as WaitlistStatus[]).map(s => {
          const cfg = STATUS_CONFIG[s];
          return (
            <div key={s} className={`rounded-xl border p-3 ${cfg.color}`}>
              <p className="text-lg font-bold">{counts[s] || 0}</p>
              <p className="text-xs font-semibold capitalize">{cfg.label}</p>
            </div>
          );
        })}
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 flex-wrap">
        {STATUS_FILTERS.map(f => (
          <button
            key={f.value}
            onClick={() => setFilter(f.value)}
            className={`text-xs font-semibold px-3 py-1.5 rounded-full border transition-colors ${
              filter === f.value
                ? "bg-[#0B1E40] text-white border-[#0B1E40]"
                : "border-gray-200 text-gray-600 hover:border-[#0B1E40]/40"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Records */}
      {loading ? (
        <div className="flex items-center justify-center py-16 gap-2 text-muted-foreground">
          <Loader2 className="w-5 h-5 animate-spin" /> Loading…
        </div>
      ) : error ? (
        <p className="text-center text-red-500 py-8">{error}</p>
      ) : records.length === 0 ? (
        <div className="text-center py-16 text-muted-foreground">
          <Clock className="w-8 h-8 mx-auto mb-3 opacity-30" />
          <p className="text-sm">No waitlist entries yet.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {records.map(r => <WaitlistRow key={r.id} record={r} onRefresh={load} />)}
        </div>
      )}
    </div>
  );
};
