import { useEffect, useState } from "react";
import { Search, X, Plus, Users as UsersIcon, ShieldCheck, GraduationCap, BookOpen, RefreshCw } from "lucide-react";
import { getUsers, assignRole, removeRole, syncUserToAcademy, AdminUser } from "@/api/users";

const CONTEXTS = ["academy", "hub", "landing"];
const ROLES = ["student", "teacher"];

const CONTEXT_COLORS: Record<string, string> = {
  academy: "bg-blue-100 text-blue-700",
  hub: "bg-purple-100 text-purple-700",
  admin: "bg-red-100 text-red-700",
  landing: "bg-gray-100 text-gray-700",
};

const ROLE_COLORS: Record<string, string> = {
  student: "bg-green-100 text-green-700",
  teacher: "bg-orange-100 text-orange-700",
  moderator: "bg-yellow-100 text-yellow-700",
  admin: "bg-red-100 text-red-700",
  super_admin: "bg-pink-100 text-pink-700",
};

function RoleBadge({ context, role, onRemove }: { context: string; role: string; onRemove?: () => void }) {
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${CONTEXT_COLORS[context] ?? "bg-gray-100 text-gray-700"}`}>
      <span className={`px-1.5 py-0 rounded-full text-xs font-semibold ${ROLE_COLORS[role] ?? "bg-gray-200 text-gray-600"}`}>
        {role}
      </span>
      <span className="opacity-70">{context}</span>
      {onRemove && (
        <button onClick={onRemove} className="ml-0.5 hover:opacity-70">
          <X className="w-3 h-3" />
        </button>
      )}
    </span>
  );
}

function StatCard({ label, value, icon: Icon, color }: { label: string; value: number; icon: React.ElementType; color: string }) {
  return (
    <div className={`bg-white rounded-2xl p-5 border border-gray-100 shadow-sm border-t-2 ${color}`}>
      <div className="flex items-center justify-between mb-3">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">{label}</p>
        <Icon className="w-4 h-4 text-gray-300" />
      </div>
      <p className="text-3xl font-bold text-gray-900">{value}</p>
    </div>
  );
}

interface RoleFormState { context: string; role: string }

export const Users = () => {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null);
  const [form, setForm] = useState<RoleFormState>({ context: "academy", role: "student" });
  const [saving, setSaving] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [syncMsg, setSyncMsg] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const load = (q?: string) => {
    setLoading(true);
    getUsers(q)
      .then(setUsers)
      .catch(() => setError("Failed to load users"))
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  useEffect(() => {
    const t = setTimeout(() => load(search || undefined), 300);
    return () => clearTimeout(t);
  }, [search]);

  const handleAssign = async () => {
    if (!selectedUser) return;
    setSaving(true);
    try {
      const newRole = await assignRole(selectedUser.id, form.context, form.role);
      setSelectedUser(prev => prev ? { ...prev, roles: [...prev.roles, newRole] } : prev);
      setUsers(prev => prev.map(u => u.id === selectedUser.id
        ? { ...u, roles: [...u.roles, newRole] }
        : u
      ));
    } catch {
      setError("Failed to assign role");
    } finally {
      setSaving(false);
    }
  };

  const handleSync = async () => {
    if (!selectedUser) return;
    setSyncing(true);
    setSyncMsg(null);
    try {
      const res = await syncUserToAcademy(selectedUser.id);
      setSyncMsg(res.message);
    } catch {
      setSyncMsg("Sync failed — Academy API may be unreachable.");
    } finally {
      setSyncing(false);
    }
  };

  const handleRemove = async (userId: string, context: string, role: string) => {
    try {
      await removeRole(userId, context, role);
      const update = (u: AdminUser) =>
        u.id === userId ? { ...u, roles: u.roles.filter(r => !(r.context === context && r.role === role)) } : u;
      setUsers(prev => prev.map(update));
      setSelectedUser(prev => prev?.id === userId ? update(prev) : prev);
    } catch {
      setError("Failed to remove role");
    }
  };

  const totalStudents = users.filter(u => u.roles.some(r => r.role === "student")).length;
  const totalTeachers = users.filter(u => u.roles.some(r => r.role === "teacher")).length;
  const totalAdmins = users.filter(u => u.is_admin || u.roles.some(r => r.role === "admin")).length;

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
        <p className="text-sm text-gray-500 mt-1">Assign and manage app-scoped roles for all users.</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Users" value={users.length} icon={UsersIcon} color="border-blue-500" />
        <StatCard label="Students" value={totalStudents} icon={BookOpen} color="border-green-500" />
        <StatCard label="Teachers" value={totalTeachers} icon={GraduationCap} color="border-orange-500" />
        <StatCard label="Admins" value={totalAdmins} icon={ShieldCheck} color="border-red-500" />
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-lg flex items-center justify-between">
          {error}
          <button onClick={() => setError(null)}><X className="w-4 h-4" /></button>
        </div>
      )}

      <div className="flex gap-6 items-start">
        {/* User table */}
        <div className="flex-1 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          {/* Search */}
          <div className="p-4 border-b border-gray-100">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search by name, email or username…"
                className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0B1E40]/20"
              />
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">User</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">DAIA ID</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Roles</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Status</th>
                  <th className="px-4 py-3" />
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {loading ? (
                  <tr><td colSpan={5} className="text-center py-12 text-gray-400">Loading…</td></tr>
                ) : users.length === 0 ? (
                  <tr><td colSpan={5} className="text-center py-12 text-gray-400">No users found</td></tr>
                ) : users.map(user => (
                  <tr
                    key={user.id}
                    onClick={() => setSelectedUser(user)}
                    className={`cursor-pointer transition-colors hover:bg-gray-50 ${selectedUser?.id === user.id ? "bg-blue-50" : ""}`}
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#0B1E40] flex items-center justify-center text-white text-xs font-bold shrink-0">
                          {user.first_name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{user.first_name} {user.last_name}</p>
                          <p className="text-xs text-gray-400">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 font-mono text-xs text-gray-500">
                      {user.daia_member_id != null ? `#${String(user.daia_member_id).padStart(8, "0")}` : "—"}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-1">
                        {user.is_admin && (
                          <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-700">super_admin</span>
                        )}
                        {user.roles.length === 0 && !user.is_admin && (
                          <span className="text-gray-300 text-xs">No roles</span>
                        )}
                        {user.roles.map((r, i) => (
                          <span key={i} className={`px-2 py-0.5 rounded-full text-xs font-medium ${ROLE_COLORS[r.role] ?? "bg-gray-100 text-gray-600"}`}>
                            {r.role} <span className="opacity-60">· {r.context}</span>
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      {user.is_verified
                        ? <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-green-50 text-green-700">Verified</span>
                        : <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-50 text-yellow-700">Pending</span>
                      }
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button
                        onClick={e => { e.stopPropagation(); setSelectedUser(user); }}
                        className="text-xs font-medium text-[#0B1E40] hover:underline"
                      >
                        Manage
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Role panel */}
        {selectedUser && (
          <div className="w-80 shrink-0 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden sticky top-4">
            {/* Panel header */}
            <div className="p-4 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#0B1E40] flex items-center justify-center text-white text-sm font-bold">
                  {selectedUser.first_name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">{selectedUser.first_name} {selectedUser.last_name}</p>
                  <p className="text-xs text-gray-400 font-mono">
                    {selectedUser.daia_member_id != null ? `#${String(selectedUser.daia_member_id).padStart(8, "0")}` : selectedUser.email}
                  </p>
                </div>
              </div>
              <button onClick={() => setSelectedUser(null)} className="p-1 hover:bg-gray-100 rounded-lg">
                <X className="w-4 h-4 text-gray-400" />
              </button>
            </div>

            {/* Current roles */}
            <div className="p-4 border-b border-gray-100">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Current Roles</p>
              {selectedUser.roles.length === 0 && !selectedUser.is_admin ? (
                <p className="text-xs text-gray-400">No roles assigned yet.</p>
              ) : (
                <div className="space-y-2">
                  {selectedUser.is_admin && (
                    <div className="flex items-center justify-between">
                      <RoleBadge context="system" role="super_admin" />
                      <span className="text-xs text-gray-300">built-in</span>
                    </div>
                  )}
                  {selectedUser.roles.map((r, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <RoleBadge context={r.context} role={r.role} />
                      <button
                        onClick={() => handleRemove(selectedUser.id, r.context, r.role)}
                        className="text-xs text-red-400 hover:text-red-600 hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Sync to Academy */}
            <div className="p-4 border-b border-gray-100">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Academy Sync</p>
              <button
                onClick={handleSync}
                disabled={syncing}
                className="w-full flex items-center justify-center gap-2 py-2 border border-gray-200 text-gray-700 text-sm font-semibold rounded-lg hover:bg-gray-50 disabled:opacity-50 transition-colors"
              >
                <RefreshCw className={`w-4 h-4 ${syncing ? "animate-spin" : ""}`} />
                {syncing ? "Syncing…" : "Sync to Academy"}
              </button>
              {syncMsg && (
                <p className={`text-xs mt-2 text-center ${syncMsg.includes("failed") ? "text-red-500" : "text-green-600"}`}>
                  {syncMsg}
                </p>
              )}
            </div>

            {/* Assign new role */}
            <div className="p-4">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Assign Role</p>
              <div className="space-y-2">
                <select
                  value={form.context}
                  onChange={e => setForm(f => ({ ...f, context: e.target.value }))}
                  className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#0B1E40]/20"
                >
                  {CONTEXTS.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
                <select
                  value={form.role}
                  onChange={e => setForm(f => ({ ...f, role: e.target.value }))}
                  className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#0B1E40]/20"
                >
                  {ROLES.map(r => <option key={r} value={r}>{r}</option>)}
                </select>
                <button
                  onClick={handleAssign}
                  disabled={saving}
                  className="w-full flex items-center justify-center gap-2 py-2 bg-[#0B1E40] text-white text-sm font-semibold rounded-lg hover:bg-[#0B1E40]/90 transition-colors disabled:opacity-50"
                >
                  <Plus className="w-4 h-4" />
                  {saving ? "Assigning…" : "Assign Role"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
