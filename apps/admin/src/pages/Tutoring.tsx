import { useEffect, useRef, useState } from "react";
import {
  Plus, X, Upload, Users, BookOpen, ToggleLeft, ToggleRight,
  Video, FileText, PenLine, ChevronLeft, Trash2, Pencil, Check,
  Search, UserMinus, UserPlus, ChevronDown, ChevronRight, Lock,
} from "lucide-react";
import {
  getTutoringCourses, createTutoringCourse, updateTutoringCourse,
  uploadTutoringThumbnail, addWeek, updateWeek, deleteWeek,
  addItem, updateItem, deleteItem, enrollStudent, listStudents, unenrollStudent,
  TutoringCourse, TutoringWeek, TutoringItem, TutoringEnrollment,
} from "@/api/tutoring";
import { getUsers, assignRole, AdminUser } from "@/api/users";

type ItemType = "session" | "assignment" | "quiz" | "notes";
const ITEM_TYPES: ItemType[] = ["session", "assignment", "quiz", "notes"];

const ITEM_TYPE_COLORS: Record<ItemType, string> = {
  session: "bg-blue-100 text-blue-700",
  assignment: "bg-orange-100 text-orange-700",
  quiz: "bg-purple-100 text-purple-700",
  notes: "bg-gray-100 text-gray-600",
};

const itemIcon = (type: ItemType) => ({
  session: <Video className="w-3.5 h-3.5" />,
  assignment: <PenLine className="w-3.5 h-3.5" />,
  quiz: <FileText className="w-3.5 h-3.5" />,
  notes: <BookOpen className="w-3.5 h-3.5" />,
}[type]);

function StatCard({ label, value, color }: { label: string; value: number | string; color: string }) {
  return (
    <div className={`bg-white rounded-2xl p-5 border border-gray-100 shadow-sm border-t-2 ${color}`}>
      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">{label}</p>
      <p className="text-3xl font-bold text-gray-900">{value}</p>
    </div>
  );
}

const emptyForm = { title: "", description: "", price: 0, teacher_id: "", instructor_name: "", is_active: true };
const emptyItem = { type: "assignment" as ItemType, title: "", duration: "", due_date: "", is_locked: false, instructions: "", meeting_link: "" };

// ── Item Form ─────────────────────────────────────────────────────────────────

const ItemForm = ({ initial, onSave, onCancel }: {
  initial?: Partial<typeof emptyItem>;
  onSave: (data: typeof emptyItem) => Promise<void>;
  onCancel: () => void;
}) => {
  const [form, setForm] = useState({ ...emptyItem, ...initial });
  const [saving, setSaving] = useState(false);

  const handle = async () => {
    if (!form.title.trim()) return;
    setSaving(true);
    try { await onSave(form); } finally { setSaving(false); }
  };

  return (
    <div className="border border-blue-200 bg-blue-50/30 rounded-xl p-4 space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Type</label>
          <select value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value as ItemType }))}
            className="mt-1 w-full text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-[#0B1E40]/20">
            {ITEM_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
        <div>
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Duration</label>
          <input value={form.duration} onChange={e => setForm(f => ({ ...f, duration: e.target.value }))}
            placeholder="e.g. 1 hr" className="mt-1 w-full text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-[#0B1E40]/20" />
        </div>
      </div>
      <div>
        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Title *</label>
        <input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
          placeholder="Item title" className="mt-1 w-full text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-[#0B1E40]/20" />
      </div>
      <div>
        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Due Date</label>
        <input type="date" value={form.due_date} onChange={e => setForm(f => ({ ...f, due_date: e.target.value }))}
          className="mt-1 w-full text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-[#0B1E40]/20" />
      </div>
      {form.type === "session" && (
        <div>
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Meeting Link</label>
          <input value={form.meeting_link} onChange={e => setForm(f => ({ ...f, meeting_link: e.target.value }))}
            placeholder="https://zoom.us/j/..." className="mt-1 w-full text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-[#0B1E40]/20" />
        </div>
      )}
      <div>
        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Instructions</label>
        <textarea value={form.instructions} onChange={e => setForm(f => ({ ...f, instructions: e.target.value }))}
          rows={3} placeholder="Describe what students need to do…"
          className="mt-1 w-full text-sm border border-gray-200 rounded-lg px-3 py-2 resize-none bg-white focus:outline-none focus:ring-2 focus:ring-[#0B1E40]/20" />
      </div>
      <label className="flex items-center gap-2 text-xs text-gray-600 cursor-pointer"
        title="Locked items are visible but inaccessible to students until unlocked.">
        <input type="checkbox" checked={form.is_locked} onChange={e => setForm(f => ({ ...f, is_locked: e.target.checked }))} />
        Locked
      </label>
      <div className="flex gap-2">
        <button onClick={handle} disabled={saving || !form.title.trim()}
          className="flex items-center gap-1.5 px-4 py-2 bg-[#0B1E40] text-white text-xs font-semibold rounded-lg disabled:opacity-50 transition-colors">
          <Check className="w-3.5 h-3.5" />{saving ? "Saving…" : "Save"}
        </button>
        <button onClick={onCancel} className="flex items-center gap-1.5 px-4 py-2 border border-gray-200 text-gray-600 text-xs font-semibold rounded-lg hover:bg-gray-50">
          <X className="w-3.5 h-3.5" />Cancel
        </button>
      </div>
    </div>
  );
};

// ── Manage View ───────────────────────────────────────────────────────────────

const ManageView = ({ course, allUsers, onBack }: {
  course: TutoringCourse;
  allUsers: AdminUser[];
  onBack: () => void;
}) => {
  const [weeks, setWeeks] = useState<TutoringWeek[]>(course.weeks ?? []);
  const [enrollments, setEnrollments] = useState<TutoringEnrollment[]>([]);
  const [loadingStudents, setLoadingStudents] = useState(true);
  const [studentSearch, setStudentSearch] = useState("");
  const [openWeeks, setOpenWeeks] = useState<string[]>(weeks.map(w => w.id));

  // Week editing
  const [addingWeek, setAddingWeek] = useState(false);
  const [newWeekTitle, setNewWeekTitle] = useState("");
  const [editingWeekId, setEditingWeekId] = useState<string | null>(null);
  const [editingWeekTitle, setEditingWeekTitle] = useState("");

  // Item editing
  const [addingItemToWeek, setAddingItemToWeek] = useState<string | null>(null);
  const [editingItem, setEditingItem] = useState<{ weekId: string; item: TutoringItem } | null>(null);

  useEffect(() => {
    listStudents(course.id)
      .then(setEnrollments)
      .finally(() => setLoadingStudents(false));
  }, [course.id]);

  const toggleWeek = (id: string) =>
    setOpenWeeks(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);

  // ── Week handlers ──────────────────────────────────────────────────────────

  const handleAddWeek = async () => {
    if (!newWeekTitle.trim()) return;
    const maxNum = Math.max(0, ...weeks.map(w => w.number));
    const week = await addWeek(course.id, { number: maxNum + 1, title: newWeekTitle.trim(), order: maxNum });
    week.items = week.items ?? [];
    setWeeks(prev => [...prev, week]);
    setOpenWeeks(prev => [...prev, week.id]);
    setNewWeekTitle(""); setAddingWeek(false);
  };

  const handleUpdateWeek = async (weekId: string) => {
    const updated = await updateWeek(course.id, weekId, { title: editingWeekTitle });
    setWeeks(prev => prev.map(w => w.id === weekId ? { ...w, title: updated.title } : w));
    setEditingWeekId(null);
  };

  const handleDeleteWeek = async (weekId: string) => {
    if (!window.confirm("Delete this week and all its items?")) return;
    await deleteWeek(course.id, weekId);
    setWeeks(prev => prev.filter(w => w.id !== weekId));
  };

  // ── Item handlers ──────────────────────────────────────────────────────────

  const handleAddItem = async (weekId: string, data: typeof emptyItem) => {
    const item = await addItem(course.id, weekId, {
      type: data.type, title: data.title,
      duration: data.duration || null, due_date: data.due_date || null,
      is_locked: data.is_locked, instructions: data.instructions || null,
      meeting_link: data.meeting_link || null, order: 0,
      recording_link: null, accept_late: true,
      passing_score: 70, max_attempts: 1,
      time_limit_minutes: null, show_answers: true,
    });
    setWeeks(prev => prev.map(w => w.id === weekId ? { ...w, items: [...w.items, item] } : w));
    setAddingItemToWeek(null);
  };

  const handleUpdateItem = async (weekId: string, itemId: string, data: typeof emptyItem) => {
    const updated = await updateItem(course.id, itemId, {
      type: data.type, title: data.title,
      duration: data.duration || null, due_date: data.due_date || null,
      is_locked: data.is_locked, instructions: data.instructions || null,
      meeting_link: data.meeting_link || null,
      recording_link: null, accept_late: true,
      passing_score: 70, max_attempts: 1,
      time_limit_minutes: null, show_answers: true,
    });
    setWeeks(prev => prev.map(w => w.id === weekId ? { ...w, items: w.items.map(i => i.id === itemId ? updated : i) } : w));
    setEditingItem(null);
  };

  const handleDeleteItem = async (weekId: string, itemId: string) => {
    if (!window.confirm("Delete this item?")) return;
    await deleteItem(course.id, itemId);
    setWeeks(prev => prev.map(w => w.id === weekId ? { ...w, items: w.items.filter(i => i.id !== itemId) } : w));
  };

  // ── Student handlers ───────────────────────────────────────────────────────

  const handleEnroll = async (userId: string) => {
    const enrollment = await enrollStudent(course.id, userId);
    setEnrollments(prev => [...prev, enrollment]);
    // Assign academy/student role (idempotent — backend ignores if already exists)
    assignRole(userId, "academy", "student").catch(() => {});
  };

  const handleUnenroll = async (studentId: string) => {
    if (!window.confirm("Remove this student from the course?")) return;
    await unenrollStudent(course.id, studentId);
    setEnrollments(prev => prev.filter(e => e.student_id !== studentId));
  };

  const enrolledIds = new Set(enrollments.map(e => e.student_id));
  const filteredUsers = allUsers.filter(u =>
    !enrolledIds.has(u.id) &&
    !u.roles.some(r => r.context === "academy" && r.role === "teacher") &&
    (studentSearch === "" ||
      `${u.first_name} ${u.last_name} ${u.email}`.toLowerCase().includes(studentSearch.toLowerCase()))
  );

  const formatDueDate = (d: string | null) => {
    if (!d) return null;
    try { return new Date(d + "T00:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric" }); }
    catch { return d; }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button onClick={onBack} className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 transition-colors">
          <ChevronLeft className="w-4 h-4" /> All Courses
        </button>
        <div className="h-4 w-px bg-gray-200" />
        <h1 className="text-xl font-bold text-gray-900 truncate">{course.title}</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6 items-start">

        {/* Left — Weeks & Content */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-gray-700">Weeks & Content</h2>
            <span className="text-xs text-gray-400">{weeks.length} weeks · {weeks.reduce((a, w) => a + w.items.length, 0)} items</span>
          </div>

          {weeks.map(week => {
            const isOpen = openWeeks.includes(week.id);
            return (
              <div key={week.id} className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                {/* Week header */}
                <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-100">
                  <button onClick={() => toggleWeek(week.id)} className="flex items-center gap-3 flex-1 text-left">
                    <div className="w-7 h-7 rounded-full bg-[#0B1E40]/10 text-[#0B1E40] flex items-center justify-center text-xs font-bold shrink-0">
                      {week.number}
                    </div>
                    {editingWeekId === week.id ? (
                      <input
                        value={editingWeekTitle}
                        onChange={e => setEditingWeekTitle(e.target.value)}
                        onClick={e => e.stopPropagation()}
                        onKeyDown={e => e.key === "Enter" && handleUpdateWeek(week.id)}
                        className="text-sm font-semibold border border-gray-300 rounded px-2 py-0.5 focus:outline-none focus:ring-2 focus:ring-[#0B1E40]/20 flex-1"
                        autoFocus
                      />
                    ) : (
                      <span className="text-sm font-semibold text-gray-900">Week {week.number}: {week.title}</span>
                    )}
                  </button>

                  <div className="flex items-center gap-1 shrink-0">
                    {editingWeekId === week.id ? (
                      <>
                        <button onClick={() => handleUpdateWeek(week.id)} className="p-1.5 hover:bg-green-100 rounded text-green-600"><Check className="w-3.5 h-3.5" /></button>
                        <button onClick={() => setEditingWeekId(null)} className="p-1.5 hover:bg-gray-100 rounded text-gray-400"><X className="w-3.5 h-3.5" /></button>
                      </>
                    ) : (
                      <>
                        <button onClick={() => { setEditingWeekId(week.id); setEditingWeekTitle(week.title); }} className="p-1.5 hover:bg-gray-100 rounded text-gray-400" title="Edit week title"><Pencil className="w-3.5 h-3.5" /></button>
                        <button onClick={() => handleDeleteWeek(week.id)} className="p-1.5 hover:bg-red-50 rounded text-red-400" title="Delete week"><Trash2 className="w-3.5 h-3.5" /></button>
                      </>
                    )}
                    <button onClick={() => toggleWeek(week.id)} className="p-1.5 hover:bg-gray-100 rounded text-gray-400">
                      {isOpen ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                {isOpen && (
                  <div className="divide-y divide-gray-50">
                    {week.items.map(item => {
                      if (editingItem?.item.id === item.id) {
                        return (
                          <div key={item.id} className="p-4">
                            <ItemForm
                              initial={{ type: item.type as ItemType, title: item.title, duration: item.duration ?? "", due_date: item.due_date ?? "", is_locked: item.is_locked, instructions: item.instructions ?? "", meeting_link: (item as any).meeting_link ?? "" }}
                              onSave={data => handleUpdateItem(week.id, item.id, data)}
                              onCancel={() => setEditingItem(null)}
                            />
                          </div>
                        );
                      }
                      return (
                        <div key={item.id} className="flex items-center gap-3 px-4 py-3">
                          <span className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium shrink-0 ${ITEM_TYPE_COLORS[item.type as ItemType]}`}>
                            {itemIcon(item.type as ItemType)}{item.type}
                          </span>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-800 truncate">{item.title}</p>
                            <div className="flex items-center gap-2 mt-0.5">
                              {item.duration && <span className="text-xs text-gray-400">{item.duration}</span>}
                              {item.due_date && <span className="text-xs text-orange-500">{formatDueDate(item.due_date)}</span>}
                              {item.is_locked && <span className="flex items-center gap-0.5 text-xs text-gray-400"><Lock className="w-3 h-3" />Locked</span>}
                            </div>
                          </div>
                          <div className="flex items-center gap-1 shrink-0">
                            <button onClick={() => setEditingItem({ weekId: week.id, item })} className="p-1.5 hover:bg-gray-100 rounded text-gray-400"><Pencil className="w-3.5 h-3.5" /></button>
                            <button onClick={() => handleDeleteItem(week.id, item.id)} className="p-1.5 hover:bg-red-50 rounded text-red-400"><Trash2 className="w-3.5 h-3.5" /></button>
                          </div>
                        </div>
                      );
                    })}

                    {/* Add item */}
                    <div className="p-4">
                      {addingItemToWeek === week.id ? (
                        <ItemForm
                          onSave={data => handleAddItem(week.id, data)}
                          onCancel={() => setAddingItemToWeek(null)}
                        />
                      ) : (
                        <button onClick={() => setAddingItemToWeek(week.id)} className="flex items-center gap-1.5 text-xs font-medium text-[#0B1E40] hover:underline">
                          <Plus className="w-3.5 h-3.5" /> Add Item
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          {/* Add Week */}
          <div className="bg-white rounded-xl border border-dashed border-gray-300 shadow-sm p-4">
            {addingWeek ? (
              <div className="flex items-center gap-3">
                <input
                  value={newWeekTitle}
                  onChange={e => setNewWeekTitle(e.target.value)}
                  placeholder="Week title (e.g. Advanced Fluency)"
                  className="flex-1 text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#0B1E40]/20"
                  autoFocus
                  onKeyDown={e => e.key === "Enter" && handleAddWeek()}
                />
                <button onClick={handleAddWeek} disabled={!newWeekTitle.trim()} className="p-2 bg-[#0B1E40] text-white rounded-lg disabled:opacity-50"><Check className="w-4 h-4" /></button>
                <button onClick={() => { setAddingWeek(false); setNewWeekTitle(""); }} className="p-2 border border-gray-200 text-gray-500 rounded-lg hover:bg-gray-50"><X className="w-4 h-4" /></button>
              </div>
            ) : (
              <button onClick={() => setAddingWeek(true)} className="w-full flex items-center justify-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-800 py-1">
                <Plus className="w-4 h-4" /> Add Week
              </button>
            )}
          </div>
        </div>

        {/* Right — Students */}
        <div className="space-y-4 sticky top-4">

          {/* Enrolled students */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
              <h2 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <Users className="w-4 h-4 text-gray-400" /> Enrolled Students
              </h2>
              <span className="text-xs text-gray-400">{enrollments.length}</span>
            </div>
            <div className="divide-y divide-gray-50 max-h-56 overflow-y-auto">
              {loadingStudents ? (
                <p className="text-xs text-gray-400 p-4">Loading…</p>
              ) : enrollments.length === 0 ? (
                <p className="text-xs text-gray-400 p-4">No students enrolled yet.</p>
              ) : enrollments.map(e => {
                const user = allUsers.find(u => u.id === e.student_id);
                return (
                  <div key={e.id} className="flex items-center gap-3 px-4 py-2.5">
                    <div className="w-7 h-7 rounded-full bg-[#0B1E40] flex items-center justify-center text-white text-xs font-bold shrink-0">
                      {user?.first_name?.charAt(0).toUpperCase() ?? "?"}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-gray-800 truncate">
                        {user ? `${user.first_name} ${user.last_name}` : e.student_id.slice(0, 8) + "…"}
                      </p>
                      {user?.daia_member_id != null && (
                        <p className="text-xs text-gray-400 font-mono">#{String(user.daia_member_id).padStart(8, "0")}</p>
                      )}
                    </div>
                    <button onClick={() => handleUnenroll(e.student_id)} className="p-1.5 hover:bg-red-50 rounded text-red-400" title="Remove student">
                      <UserMinus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Add student */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="px-4 py-3 border-b border-gray-100">
              <h2 className="text-sm font-semibold text-gray-700 flex items-center gap-2 mb-2">
                <UserPlus className="w-4 h-4 text-gray-400" /> Add Student
              </h2>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                <input
                  value={studentSearch}
                  onChange={e => setStudentSearch(e.target.value)}
                  placeholder="Search by name or email…"
                  className="w-full pl-8 pr-3 py-2 text-xs border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0B1E40]/20"
                />
              </div>
            </div>
            <div className="divide-y divide-gray-50 max-h-64 overflow-y-auto">
              {filteredUsers.length === 0 ? (
                <p className="text-xs text-gray-400 p-4">{studentSearch ? "No users found." : "All users are already enrolled."}</p>
              ) : filteredUsers.slice(0, 20).map(u => (
                <div key={u.id} className="flex items-center gap-3 px-4 py-2.5">
                  <div className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 text-xs font-bold shrink-0">
                    {u.first_name?.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-gray-800 truncate">{u.first_name} {u.last_name}</p>
                    <p className="text-xs text-gray-400 truncate">{u.email}</p>
                  </div>
                  <button onClick={() => handleEnroll(u.id)} className="p-1.5 hover:bg-green-50 rounded text-green-600" title="Enroll student">
                    <UserPlus className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

// ── Main Tutoring Page ────────────────────────────────────────────────────────

export const Tutoring = () => {
  const [courses, setCourses] = useState<TutoringCourse[]>([]);
  const [allUsers, setAllUsers] = useState<AdminUser[]>([]);
  const [teachers, setTeachers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [managingCourse, setManagingCourse] = useState<TutoringCourse | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    Promise.all([getTutoringCourses(), getUsers()])
      .then(([c, u]) => {
        setCourses(c);
        setAllUsers(u);
        setTeachers(u.filter(u => u.roles.some(r => r.role === "teacher" && r.context === "academy")));
      })
      .catch(() => setError("Failed to load data"))
      .finally(() => setLoading(false));
  }, []);

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setThumbnailFile(file);
    setThumbnailPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async () => {
    if (!form.title.trim()) return;
    setSaving(true);
    try {
      const payload = { title: form.title, description: form.description || undefined, price: form.price, teacher_id: form.teacher_id || undefined, instructor_name: form.instructor_name || undefined, is_active: form.is_active };
      let course: TutoringCourse;
      if (editingId) {
        course = await updateTutoringCourse(editingId, payload);
        setCourses(prev => prev.map(c => c.id === editingId ? { ...course, weeks: c.weeks } : c));
      } else {
        course = await createTutoringCourse(payload);
        course.weeks = [];
        setCourses(prev => [course, ...prev]);
      }
      if (thumbnailFile) {
        const url = await uploadTutoringThumbnail(course.id, thumbnailFile);
        setCourses(prev => prev.map(c => c.id === course.id ? { ...c, thumbnail_url: url } : c));
      }
      setShowForm(false); setForm(emptyForm); setThumbnailFile(null); setThumbnailPreview(null); setEditingId(null);
    } catch { setError("Failed to save course"); }
    finally { setSaving(false); }
  };

  const openEdit = (course: TutoringCourse) => {
    setForm({ title: course.title, description: course.description ?? "", price: course.price, teacher_id: course.teacher_id ?? "", instructor_name: course.instructor_name ?? "", is_active: course.is_active });
    setThumbnailPreview(course.thumbnail_url);
    setEditingId(course.id);
    setShowForm(true);
  };

  // If managing a course, show manage view
  if (managingCourse) {
    return (
      <ManageView
        course={managingCourse}
        allUsers={allUsers}
        onBack={() => setManagingCourse(null)}
      />
    );
  }

  const totalStudents = courses.reduce((a, c) => a + c.enrollment_count, 0);

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Virtual Tutoring</h1>
          <p className="text-sm text-gray-500 mt-1">Create and manage 1-on-1 tutoring courses.</p>
        </div>
        <button onClick={() => { setShowForm(true); setEditingId(null); setForm(emptyForm); setThumbnailPreview(null); }}
          className="flex items-center gap-2 px-4 py-2 bg-[#0B1E40] text-white text-sm font-semibold rounded-lg hover:bg-[#0B1E40]/90 transition-colors">
          <Plus className="w-4 h-4" /> New Course
        </button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Courses" value={courses.length} color="border-blue-500" />
        <StatCard label="Active" value={courses.filter(c => c.is_active).length} color="border-green-500" />
        <StatCard label="Total Students" value={totalStudents} color="border-orange-500" />
        <StatCard label="Teachers" value={teachers.length} color="border-purple-500" />
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-lg flex items-center justify-between">
          {error}<button onClick={() => setError(null)}><X className="w-4 h-4" /></button>
        </div>
      )}

      <div className="flex gap-6 items-start">
        {/* Course list */}
        <div className="flex-1 space-y-4">
          {loading ? <p className="text-gray-400 text-sm text-center py-12">Loading…</p>
          : courses.length === 0 ? (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-12 text-center">
              <BookOpen className="w-10 h-10 text-gray-200 mx-auto mb-3" />
              <p className="text-gray-400 text-sm">No tutoring courses yet.</p>
            </div>
          ) : courses.map(course => (
            <div key={course.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="flex items-stretch">
                <div className="w-36 shrink-0 bg-gray-100 relative overflow-hidden">
                  {course.thumbnail_url
                    ? <img src={course.thumbnail_url} alt={course.title} className="w-full h-full object-cover" />
                    : <div className="w-full h-full flex items-center justify-center"><BookOpen className="w-8 h-8 text-gray-300" /></div>}
                  <span className={`absolute top-2 left-2 px-2 py-0.5 rounded-full text-xs font-semibold ${course.is_active ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                    {course.is_active ? "Active" : "Inactive"}
                  </span>
                </div>
                <div className="flex-1 p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-semibold text-gray-900">{course.title}</h3>
                      {course.instructor_name && <p className="text-xs text-gray-400 mt-0.5">{course.instructor_name}</p>}
                      {course.description && <p className="text-sm text-gray-500 mt-2 line-clamp-2">{course.description}</p>}
                    </div>
                    <span className="text-lg font-bold text-gray-900 shrink-0">${course.price}</span>
                  </div>
                  <div className="mt-3 flex items-center gap-4 text-xs text-gray-400">
                    <span>{course.weeks?.length ?? 0} weeks</span>
                    <span>·</span>
                    <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" />{course.enrollment_count} students</span>
                  </div>
                  <div className="mt-4 flex items-center justify-end gap-2">
                    <button onClick={() => openEdit(course)} className="text-xs font-medium text-gray-500 hover:text-gray-800 px-3 py-1.5 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">Edit</button>
                    <button onClick={() => setManagingCourse(course)} className="text-xs font-medium text-white bg-[#0B1E40] px-3 py-1.5 rounded-lg hover:bg-[#0B1E40]/90 transition-colors flex items-center gap-1">
                      Manage <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Create / Edit form panel */}
        {showForm && (
          <div className="w-80 shrink-0 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden sticky top-4">
            <div className="p-4 border-b border-gray-100 flex items-center justify-between">
              <h2 className="text-sm font-semibold text-gray-900">{editingId ? "Edit Course" : "New Course"}</h2>
              <button onClick={() => setShowForm(false)}><X className="w-4 h-4 text-gray-400" /></button>
            </div>
            <div className="p-4 space-y-4">
              <div onClick={() => fileRef.current?.click()} className="w-full h-28 rounded-xl border-2 border-dashed border-gray-200 flex items-center justify-center cursor-pointer hover:border-gray-300 overflow-hidden">
                {thumbnailPreview
                  ? <img src={thumbnailPreview} alt="preview" className="w-full h-full object-cover" />
                  : <div className="flex flex-col items-center gap-1 text-gray-400"><Upload className="w-5 h-5" /><span className="text-xs">Upload thumbnail</span></div>}
              </div>
              <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleThumbnailChange} />
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Title *</label>
                <input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder="Course title" className="mt-1 w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#0B1E40]/20" />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Description</label>
                <textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} rows={3} className="mt-1 w-full text-sm border border-gray-200 rounded-lg px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-[#0B1E40]/20" />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Price (USD)</label>
                <input type="number" value={form.price} onChange={e => setForm(f => ({ ...f, price: parseFloat(e.target.value) || 0 }))} className="mt-1 w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#0B1E40]/20" />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Assign Teacher</label>
                <select value={form.teacher_id} onChange={e => { const t = teachers.find(t => t.id === e.target.value); setForm(f => ({ ...f, teacher_id: e.target.value, instructor_name: t ? `${t.first_name} ${t.last_name}` : f.instructor_name })); }} className="mt-1 w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#0B1E40]/20">
                  <option value="">— No teacher assigned —</option>
                  {teachers.map(t => <option key={t.id} value={t.id}>{t.first_name} {t.last_name}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Instructor Display Name</label>
                <input value={form.instructor_name} onChange={e => setForm(f => ({ ...f, instructor_name: e.target.value }))} placeholder="Prof. Luis Dorismon" className="mt-1 w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#0B1E40]/20" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Active</span>
                <button onClick={() => setForm(f => ({ ...f, is_active: !f.is_active }))}>
                  {form.is_active ? <ToggleRight className="w-7 h-7 text-green-500" /> : <ToggleLeft className="w-7 h-7 text-gray-300" />}
                </button>
              </div>
              <button onClick={handleSubmit} disabled={saving || !form.title.trim()} className="w-full py-2.5 bg-[#0B1E40] text-white text-sm font-semibold rounded-lg disabled:opacity-50">
                {saving ? "Saving…" : editingId ? "Save Changes" : "Create Course"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
