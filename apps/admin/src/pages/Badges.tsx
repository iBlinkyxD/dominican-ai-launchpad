import { useEffect, useRef, useState } from "react";
import { Pencil, Check, X, Upload } from "lucide-react";
import { getBadges, updateBadge, uploadBadgeIcon, getAdminCourses, type BadgeItem, type AdminCourse } from "@/api/courses";

export const Badges = () => {
  const [badges, setBadges]   = useState<BadgeItem[]>([]);
  const [courses, setCourses] = useState<AdminCourse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState<string | null>(null);

  // Inline edit state
  const [editingId, setEditingId]   = useState<string | null>(null);
  const [editName, setEditName]     = useState("");
  const [saving, setSaving]         = useState(false);
  const [uploadingId, setUploadingId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const activeUploadId = useRef<string | null>(null);

  useEffect(() => {
    Promise.all([getBadges(), getAdminCourses()])
      .then(([b, c]) => { setBadges(b); setCourses(c); })
      .catch(() => setError("Failed to load badges."))
      .finally(() => setLoading(false));
  }, []);

  function coursesForBadge(badgeId: string) {
    return courses.filter((c) => c.badge?.id === badgeId);
  }

  function startEdit(badge: BadgeItem) {
    setEditingId(badge.id);
    setEditName(badge.name);
  }

  function cancelEdit() {
    setEditingId(null);
    setEditName("");
  }

  async function saveEdit(id: string) {
    if (!editName.trim()) return;
    setSaving(true);
    try {
      const updated = await updateBadge(id, { name: editName.trim() });
      setBadges((prev) => prev.map((b) => b.id === id ? { ...b, name: updated.name } : b));
      setEditingId(null);
    } catch {
      // keep editing open on error
    } finally {
      setSaving(false);
    }
  }

  function triggerIconUpload(badgeId: string) {
    activeUploadId.current = badgeId;
    fileInputRef.current?.click();
  }

  async function handleIconFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    const id   = activeUploadId.current;
    if (!file || !id) return;
    e.target.value = "";
    setUploadingId(id);
    try {
      const updated = await uploadBadgeIcon(id, file);
      setBadges((prev) => prev.map((b) => b.id === id ? { ...b, icon_url: updated.icon_url } : b));
    } catch {
      // silently fail
    } finally {
      setUploadingId(null);
      activeUploadId.current = null;
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Badges</h1>
        <p className="text-sm text-gray-400 mt-0.5">Manage completion badges awarded to students</p>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="text-sm font-semibold text-gray-800">All Badges</h2>
        </div>

        {loading ? (
          <div className="p-12 text-center text-sm text-gray-400">Loading…</div>
        ) : error ? (
          <div className="p-12 text-center text-sm text-red-500">{error}</div>
        ) : badges.length === 0 ? (
          <div className="p-12 text-center text-sm text-gray-400">
            No badges found. Run <code className="bg-gray-100 px-1 rounded">python scripts/upload_badges.py</code> to seed them.
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide">Badge</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide">Name</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide">Assigned to</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {badges.map((badge) => {
                const assigned = coursesForBadge(badge.id);
                const isEditing  = editingId === badge.id;
                const isUploading = uploadingId === badge.id;

                return (
                  <tr key={badge.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors">

                    {/* Icon */}
                    <td className="px-6 py-4">
                      <div className="relative w-12 h-12 group">
                        {badge.icon_url ? (
                          <img
                            src={badge.icon_url}
                            alt={badge.name}
                            className="w-12 h-12 rounded-xl object-cover border border-gray-100"
                          />
                        ) : (
                          <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center text-xl">🏅</div>
                        )}
                        <button
                          onClick={() => triggerIconUpload(badge.id)}
                          disabled={isUploading}
                          className="absolute inset-0 rounded-xl bg-black/50 text-white opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity"
                        >
                          {isUploading
                            ? <span className="text-[10px]">…</span>
                            : <Upload className="w-4 h-4" />}
                        </button>
                      </div>
                    </td>

                    {/* Name (inline edit) */}
                    <td className="px-4 py-4">
                      {isEditing ? (
                        <div className="flex items-center gap-2">
                          <input
                            autoFocus
                            value={editName}
                            onChange={(e) => setEditName(e.target.value)}
                            onKeyDown={(e) => { if (e.key === "Enter") saveEdit(badge.id); if (e.key === "Escape") cancelEdit(); }}
                            className="border border-gray-300 rounded-lg px-2 py-1 text-sm text-gray-800 outline-none focus:border-[#0B1E40] w-48"
                          />
                          <button
                            onClick={() => saveEdit(badge.id)}
                            disabled={saving}
                            className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center hover:bg-green-600 transition-colors"
                          >
                            <Check className="w-3.5 h-3.5 text-white" />
                          </button>
                          <button
                            onClick={cancelEdit}
                            className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors"
                          >
                            <X className="w-3.5 h-3.5 text-gray-600" />
                          </button>
                        </div>
                      ) : (
                        <span className="text-sm font-medium text-gray-800">{badge.name}</span>
                      )}
                    </td>

                    {/* Assigned courses */}
                    <td className="px-4 py-4">
                      {assigned.length === 0 ? (
                        <span className="text-sm text-gray-400">—</span>
                      ) : (
                        <div className="flex flex-wrap gap-1">
                          {assigned.map((c) => (
                            <span key={c.id} className="text-xs bg-[#0B1E40]/10 text-[#0B1E40] px-2 py-0.5 rounded-full font-medium">
                              {c.code || c.title}
                            </span>
                          ))}
                        </div>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="px-4 py-4">
                      {!isEditing && (
                        <button
                          onClick={() => startEdit(badge)}
                          className="flex items-center gap-1 text-xs font-medium text-gray-500 border border-gray-200 px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          <Pencil className="w-3 h-3" /> Edit name
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      {/* Hidden file input for icon upload */}
      <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleIconFile} />
    </div>
  );
};
