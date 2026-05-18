import { useState } from "react";
import { CheckCircle2, XCircle, ChevronDown, Loader2, Clock, Target, Calendar } from "lucide-react";
import { PendingAssignment, respondToAssignment } from "@/api/waitlist";

interface Props {
  assignments: PendingAssignment[];
  onRefresh: () => void;
}

const AssignmentCard = ({
  a,
  onResponded,
}: {
  a: PendingAssignment;
  onResponded: () => void;
}) => {
  const [expanded,  setExpanded]  = useState(false);
  const [loading,   setLoading]   = useState<"accept" | "decline" | null>(null);
  const [done,      setDone]      = useState<"accepted" | "declined" | null>(null);
  const [error,     setError]     = useState<string | null>(null);

  const respond = async (action: "accept" | "decline") => {
    setLoading(action);
    setError(null);
    try {
      await respondToAssignment(a.id, action);
      setDone(action === "accept" ? "accepted" : "declined");
      setTimeout(onResponded, 1200);
    } catch (err: unknown) {
      const msg = (err as { response?: { data?: { detail?: string } } })?.response?.data?.detail;
      setError(msg ?? "Something went wrong. Please try again.");
    } finally {
      setLoading(null);
    }
  };

  if (done) {
    return (
      <div className={`rounded-xl border p-4 flex items-center gap-3 ${
        done === "accepted"
          ? "bg-green-50 border-green-200"
          : "bg-gray-50 border-gray-200"
      }`}>
        {done === "accepted"
          ? <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
          : <XCircle className="w-5 h-5 text-gray-400 shrink-0" />}
        <div>
          <p className="text-sm font-semibold text-gray-800">
            {a.first_name} {a.last_name}
          </p>
          <p className="text-xs text-gray-500">
            {done === "accepted" ? "Accepted — student notified and charged." : "Declined — admin will reassign."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-amber-200 bg-amber-50/60">
      {/* Header row */}
      <div className="flex items-center justify-between p-4">
        <div>
          <p className="text-sm font-semibold text-[#0B1E40]">
            {a.first_name} {a.last_name}
          </p>
          <p className="text-xs text-gray-500">{a.email}</p>
        </div>
        <button
          onClick={() => setExpanded(p => !p)}
          className="text-gray-400 hover:text-gray-600 transition-colors"
        >
          <ChevronDown className={`w-4 h-4 transition-transform ${expanded ? "rotate-180" : ""}`} />
        </button>
      </div>

      {/* Expanded details */}
      {expanded && (
        <div className="px-4 pb-4 space-y-3 border-t border-amber-200 pt-3">
          {a.goal && (
            <div className="flex items-start gap-2">
              <Target className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-0.5">Goal</p>
                <p className="text-sm text-gray-700 leading-relaxed">{a.goal}</p>
              </div>
            </div>
          )}
          {a.availability && (
            <div className="flex items-start gap-2">
              <Calendar className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-0.5">Availability</p>
                <p className="text-sm text-gray-700">{a.availability}</p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Action row */}
      <div className="flex gap-2 px-4 pb-4">
        <button
          onClick={() => respond("decline")}
          disabled={!!loading}
          className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg border border-gray-300 text-gray-600 text-xs font-semibold hover:bg-gray-100 disabled:opacity-50 transition-colors"
        >
          {loading === "decline"
            ? <Loader2 className="w-3.5 h-3.5 animate-spin" />
            : <XCircle className="w-3.5 h-3.5" />}
          Decline
        </button>
        <button
          onClick={() => respond("accept")}
          disabled={!!loading}
          className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white text-xs font-semibold disabled:opacity-50 transition-colors"
        >
          {loading === "accept"
            ? <Loader2 className="w-3.5 h-3.5 animate-spin" />
            : <CheckCircle2 className="w-3.5 h-3.5" />}
          Accept Student
        </button>
      </div>

      {error && (
        <p className="text-xs text-red-600 px-4 pb-3">{error}</p>
      )}
    </div>
  );
};

export const PendingRequestsPanel = ({ assignments, onRefresh }: Props) => {
  if (assignments.length === 0) return null;

  return (
    <div className="rounded-2xl border border-amber-300 bg-white shadow-sm overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-2.5 px-5 py-4 bg-amber-50 border-b border-amber-200">
        <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
          <Clock className="w-4 h-4 text-amber-600" />
        </div>
        <div>
          <p className="text-sm font-semibold text-[#0B1E40]">
            Pending Student Request{assignments.length > 1 ? "s" : ""}
          </p>
          <p className="text-xs text-gray-500">
            {assignments.length} student{assignments.length > 1 ? "s" : ""} waiting for your approval
          </p>
        </div>
      </div>

      {/* Cards */}
      <div className="p-4 space-y-3">
        {assignments.map(a => (
          <AssignmentCard key={a.id} a={a} onResponded={onRefresh} />
        ))}
      </div>
    </div>
  );
};
