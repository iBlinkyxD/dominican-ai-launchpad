import { useEffect, useRef, useState } from "react";
import { RichTextEditor } from "@/components/tutoring/RichTextEditor";
import { RichTextContent } from "@/components/tutoring/RichTextContent";
import { ConfirmDialog, DialogConfig } from "@/components/ConfirmDialog";
import {
  ChevronDown, ChevronRight, ChevronLeft,
  BookOpen, User, AlertCircle, Plus, Trash2, Pencil, Check, X,
} from "lucide-react";
import { useAuth, useRole } from "@packages/auth";
import {
  getMyTutoringCourses, getTutoringCourse, getMySubmissions,
  gradeSubmission, getEnrolledStudentsInfo, getStudentCourseSubmissions,
  getMyEnrollment, getEnrollmentDetail, getCourseOverview,
  addWeek, updateWeek, deleteWeek, addItem, updateItem, deleteItem,
  TutoringCourse, TutoringWeek, TutoringItem, TutoringSubmission,
  StudentInfo, EnrollmentWithWeeks, StudentOverview,
} from "@/api/tutoring";
import {
  ItemStatus, emptyItem, formatDueDate, isDuePast,
  itemIcon, upcomingIcon, statusIcon, gradeColor, fmtGrade, gradePct,
} from "@/components/tutoring/types";
import { MiniCalendar } from "@/components/tutoring/MiniCalendar";
import { AddItemForm } from "@/components/tutoring/AddItemForm";
import { AssignmentDetail, SelectedItem } from "@/components/tutoring/AssignmentDetail";
import { OverviewCards } from "@/components/tutoring/OverviewCards";
import { StudentBanner } from "@/components/tutoring/StudentBanner";
import { PendingRequestsPanel } from "@/components/tutoring/PendingRequestsPanel";
import { getMyAssignments, PendingAssignment } from "@/api/waitlist";

export type { SelectedItem };

// ── Main page ─────────────────────────────────────────────────────────────────

export const VirtualTutoring = () => {
  const { user } = useAuth();
  const { hasAnyRole } = useRole("academy");
  const hasTutoringRole = hasAnyRole("student", "teacher");
  const [course, setCourse] = useState<TutoringCourse | null>(null);
  // enrollment holds the current student's (or selected student's) weeks + items
  const [enrollment, setEnrollment] = useState<EnrollmentWithWeeks | null>(null);
  const [submissions, setSubmissions] = useState<TutoringSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [notEnrolled, setNotEnrolled] = useState(false);
  const [openWeeks, setOpenWeeks] = useState<string[]>([]);
  const [panelOpen, setPanelOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<SelectedItem | null>(null);
  const [selectedCalendarDate, setSelectedCalendarDate] = useState<string | null>(null);

  // Teacher state
  const [editMode, setEditMode] = useState(false);
  const [enrolledStudents, setEnrolledStudents] = useState<StudentInfo[]>([]);
  const [allEnrollments, setAllEnrollments] = useState<EnrollmentWithWeeks[]>([]);
  const [allStudentSubmissions, setAllStudentSubmissions] = useState<Record<string, TutoringSubmission[]>>({});
  const [overview, setOverview] = useState<StudentOverview[]>([]);
  const [loadingOverview, setLoadingOverview] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<StudentInfo | null>(null);
  const [studentSubmissions, setStudentSubmissions] = useState<TutoringSubmission[]>([]);
  const pendingItemIdRef = useRef<string | null>(null);
  const [addingItemToWeek, setAddingItemToWeek] = useState<string | null>(null);
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [editingWeekId, setEditingWeekId] = useState<string | null>(null);
  const [editingWeekTitle, setEditingWeekTitle] = useState("");
  const [editingWeekDescription, setEditingWeekDescription] = useState("");
  const [addingWeek, setAddingWeek] = useState(false);
  const [newWeekTitle, setNewWeekTitle] = useState("");
  const [newWeekDescription, setNewWeekDescription] = useState("");
  const [dialog, setDialog] = useState<DialogConfig | null>(null);
  const [pendingAssignments, setPendingAssignments] = useState<PendingAssignment[]>([]);

  // Step 1: load course info only (user may still be null here)
  useEffect(() => {
    const load = async () => {
      try {
        const courses = await getMyTutoringCourses();
        if (courses.length === 0) { setNotEnrolled(true); setLoading(false); return; }
        const courseData = await getTutoringCourse(courses[0].id);
        setCourse(courseData);
      } catch { setNotEnrolled(true); setLoading(false); }
    };
    load();
  }, []);

  const isTeacher = !!(user && course && course.teacher_id === user.id);

  // Step 2: once course and user are both ready, load the right data per role
  useEffect(() => {
    if (!course || !user) return;
    const teacherCheck = course.teacher_id === user.id;
    if (teacherCheck) {
      // Teacher: no enrollment to load — just finish loading
      setLoading(false);
      return;
    }
    // Student: load own enrollment with weeks + submissions
    const load = async () => {
      try {
        const [enroll, subs] = await Promise.all([
          getMyEnrollment(course.id),
          getMySubmissions(course.id),
        ]);
        setEnrollment(enroll);
        setSubmissions(subs);
        if (enroll.weeks.length > 0) setOpenWeeks([enroll.weeks[0].id]);
      } catch { setNotEnrolled(true); }
      finally { setLoading(false); }
    };
    load();
  }, [course?.id, user?.id]);

  const loadPendingAssignments = () => {
    getMyAssignments().then(setPendingAssignments).catch(() => {});
  };

  // Load pending student requests for teacher
  useEffect(() => {
    if (!isTeacher) return;
    loadPendingAssignments();
  }, [isTeacher]); // eslint-disable-line react-hooks/exhaustive-deps

  // Load enrolled students list + overview + all enrollments + all submissions for teacher
  useEffect(() => {
    if (!isTeacher || !course) return;
    getEnrolledStudentsInfo(course.id).then(students => {
      setEnrolledStudents(students);
      Promise.all(students.map(s => getEnrollmentDetail(course.id, s.enrollment_id)))
        .then(setAllEnrollments)
        .catch(() => {});
      Promise.all(
        students.map(s =>
          getStudentCourseSubmissions(course.id, s.student_id).then(subs => ({ id: s.student_id, subs }))
        )
      ).then(results => {
        const map: Record<string, TutoringSubmission[]> = {};
        results.forEach(r => { map[r.id] = r.subs; });
        setAllStudentSubmissions(map);
      }).catch(() => {});
    }).catch(() => {});
    setLoadingOverview(true);
    getCourseOverview(course.id)
      .then(setOverview)
      .catch(() => {})
      .finally(() => setLoadingOverview(false));
  }, [isTeacher, course?.id]);

  // Load selected student's enrollment + submissions when teacher selects a student
  useEffect(() => {
    if (!isTeacher || !course || !selectedStudent) {
      setEnrollment(null);
      setStudentSubmissions([]);
      return;
    }
    Promise.all([
      getEnrollmentDetail(course.id, selectedStudent.enrollment_id),
      getStudentCourseSubmissions(course.id, selectedStudent.student_id),
    ]).then(([enroll, subs]) => {
      setEnrollment(enroll);
      setStudentSubmissions(subs);
      if (enroll.weeks.length > 0) setOpenWeeks([enroll.weeks[0].id]);
      // Auto-open a pending item if one was requested (e.g. from sidebar click)
      const pendingId = pendingItemIdRef.current;
      if (pendingId) {
        pendingItemIdRef.current = null;
        const found = enroll.weeks.flatMap(w => w.items.map(i => ({ week: w, item: i }))).find(({ item }) => item.id === pendingId);
        if (found) {
          const sub = subs.find(s => s.tutoring_item_id === found.item.id);
          const status: ItemStatus = found.item.is_locked ? "locked" : sub ? "completed" : "available";
          setSelectedItem({ week: found.week, item: found.item, status, submission: sub });
        }
      }
    }).catch(() => { setEnrollment(null); setStudentSubmissions([]); });
  }, [selectedStudent?.enrollment_id, course?.id, isTeacher]);

  // Helper: select a student AND queue a specific item to open once enrollment loads
  const selectStudentAndItem = (studentInfo: StudentInfo, itemId: string) => {
    pendingItemIdRef.current = itemId;
    setSelectedStudent(studentInfo);
    setPanelOpen(false);
  };

  const refreshTeacherData = () => {
    if (!course) return;
    setLoadingOverview(true);
    getCourseOverview(course.id)
      .then(setOverview)
      .catch(() => {})
      .finally(() => setLoadingOverview(false));
    getEnrolledStudentsInfo(course.id).then(students => {
      setEnrolledStudents(students);
      Promise.all(students.map(s => getEnrollmentDetail(course.id, s.enrollment_id)))
        .then(setAllEnrollments)
        .catch(() => {});
      Promise.all(
        students.map(s =>
          getStudentCourseSubmissions(course.id, s.student_id).then(subs => ({ id: s.student_id, subs }))
        )
      ).then(results => {
        const map: Record<string, TutoringSubmission[]> = {};
        results.forEach(r => { map[r.id] = r.subs; });
        setAllStudentSubmissions(map);
      }).catch(() => {});
    }).catch(() => {});
  };

  const handleToggleEdit = () => {
    if (editMode) {
      setEditingItemId(null);
      setEditingWeekId(null);
      setAddingItemToWeek(null);
      setAddingWeek(false);
      refreshTeacherData();
    }
    setEditMode(m => !m);
  };

  const toggleWeek = (id: string) =>
    setOpenWeeks(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);

  // When teacher has a student selected, use that student's submissions for status
  const activeSubs = isTeacher && selectedStudent ? studentSubmissions : submissions;

  const getStatus = (item: TutoringItem): ItemStatus => {
    if (item.is_locked) return "locked";
    if (activeSubs.some(s => s.tutoring_item_id === item.id)) return "completed";
    return "available";
  };
  const getSubmission = (item: TutoringItem) => activeSubs.find(s => s.tutoring_item_id === item.id);

  const handleSubmitted = (sub: TutoringSubmission) => {
    if (isTeacher && selectedStudent) {
      // Update the selected student's submission list so the item row reflects the new grade
      setStudentSubmissions(prev => [
        ...prev.filter(s => s.tutoring_item_id !== sub.tutoring_item_id),
        sub,
      ]);
      // Update the all-students map so the overview cards + sidebar remove the "needs grading" entry
      setAllStudentSubmissions(prev => {
        const existing = prev[selectedStudent.student_id] ?? [];
        return {
          ...prev,
          [selectedStudent.student_id]: [
            ...existing.filter(s => s.tutoring_item_id !== sub.tutoring_item_id),
            sub,
          ],
        };
      });
    } else {
      setSubmissions(prev => [
        ...prev.filter(s => s.tutoring_item_id !== sub.tutoring_item_id),
        sub,
      ]);
    }
    setSelectedItem(prev => prev ? { ...prev, status: "completed", submission: sub } : prev);
  };

  // ── Teacher actions ────────────────────────────────────────────────────────

  const updateEnrollmentWeeks = (fn: (weeks: TutoringWeek[]) => TutoringWeek[]) =>
    setEnrollment(e => e ? { ...e, weeks: fn(e.weeks) } : e);

  const handleAddWeek = async () => {
    if (!course || !enrollment || !newWeekTitle.trim()) return;
    const maxNum = Math.max(0, ...enrollment.weeks.map(w => w.number));
    const week = await addWeek(course.id, enrollment.id, {
      number: maxNum + 1, title: newWeekTitle.trim(),
      description: newWeekDescription.trim() || undefined,
      order: maxNum,
    });
    week.items = [];
    updateEnrollmentWeeks(weeks => [...weeks, week]);
    setNewWeekTitle(""); setNewWeekDescription(""); setAddingWeek(false);
    setOpenWeeks(prev => [...prev, week.id]);
  };

  const handleUpdateWeek = async (weekId: string) => {
    if (!course) return;
    const updated = await updateWeek(course.id, weekId, {
      title: editingWeekTitle,
      description: editingWeekDescription || null,
    });
    updateEnrollmentWeeks(weeks => weeks.map(w =>
      w.id === weekId ? { ...w, title: updated.title, description: updated.description } : w
    ));
    setEditingWeekId(null);
  };

  const handleDeleteWeek = (weekId: string) => {
    setDialog({
      title: "Delete Week",
      message: "This will permanently delete the week and all its assignments. This cannot be undone.",
      confirmText: "Delete",
      cancelText: "Cancel",
      variant: "danger",
      onConfirm: async () => {
        if (!course) return;
        await deleteWeek(course.id, weekId);
        updateEnrollmentWeeks(weeks => weeks.filter(w => w.id !== weekId));
      },
    });
  };

  const handleAddItem = async (weekId: string, data: typeof emptyItem) => {
    if (!course) return;
    const item = await addItem(course.id, weekId, {
      type: data.type, title: data.title,
      duration: data.duration || undefined, due_date: data.due_date || undefined,
      is_locked: data.is_locked, accept_late: data.accept_late,
      passing_score: data.passing_score, max_attempts: data.max_attempts,
      time_limit_minutes: data.time_limit_minutes ? Number(data.time_limit_minutes) : undefined,
      show_answers: data.show_answers,
      points_per_question: data.points_per_question,
      max_grade: data.max_grade ? Number(data.max_grade) : undefined,
      instructions: data.instructions || undefined,
      meeting_link: data.meeting_link || undefined,
      recording_link: data.recording_link || undefined,
      order: 0,
    });
    updateEnrollmentWeeks(weeks => weeks.map(w => w.id === weekId ? { ...w, items: [...w.items, item] } : w));
    setAddingItemToWeek(null);
  };

  const handleUpdateItem = async (weekId: string, itemId: string, data: typeof emptyItem) => {
    if (!course) return;
    const updated = await updateItem(course.id, itemId, {
      type: data.type, title: data.title,
      duration: data.duration || null, due_date: data.due_date || null,
      is_locked: data.is_locked, accept_late: data.accept_late,
      passing_score: data.passing_score, max_attempts: data.max_attempts,
      time_limit_minutes: data.time_limit_minutes ? Number(data.time_limit_minutes) : null,
      show_answers: data.show_answers,
      points_per_question: data.points_per_question,
      max_grade: data.max_grade ? Number(data.max_grade) : null,
      instructions: data.instructions || null,
      meeting_link: data.meeting_link || null,
      recording_link: data.recording_link || null,
    });
    updateEnrollmentWeeks(weeks => weeks.map(w => w.id === weekId ? { ...w, items: w.items.map(i => i.id === itemId ? updated : i) } : w));
    setEditingItemId(null);
  };

  const handleDeleteItem = (weekId: string, itemId: string) => {
    setDialog({
      title: "Delete Assignment",
      message: "This will permanently delete this assignment and any student submissions. This cannot be undone.",
      confirmText: "Delete",
      cancelText: "Cancel",
      variant: "danger",
      onConfirm: async () => {
        if (!course) return;
        await deleteItem(course.id, itemId);
        updateEnrollmentWeeks(weeks => weeks.map(w => w.id === weekId ? { ...w, items: w.items.filter(i => i.id !== itemId) } : w));
      },
    });
  };

  // ── Derived data ───────────────────────────────────────────────────────────

  if (loading) return <div className="flex items-center justify-center h-64 text-gray-400 text-sm">Loading your tutoring course…</div>;

  if (!hasTutoringRole) return (
    <div className="max-w-lg mx-auto py-24 text-center px-4">
      <BookOpen className="w-12 h-12 text-gray-200 mx-auto mb-4" />
      <h2 className="text-lg font-semibold text-gray-800 mb-2">Access restricted</h2>
      <p className="text-sm text-gray-500">This area is only available to enrolled tutoring students and teachers. Contact your administrator if you believe this is a mistake.</p>
    </div>
  );

  if (notEnrolled || !course) return (
    <div className="max-w-lg mx-auto py-24 text-center px-4">
      <BookOpen className="w-12 h-12 text-gray-200 mx-auto mb-4" />
      <h2 className="text-lg font-semibold text-gray-800 mb-2">Not enrolled in a tutoring course</h2>
      <p className="text-sm text-gray-500">You haven't been assigned to a tutoring course yet. Contact your administrator to get enrolled.</p>
    </div>
  );

  const allItems = (enrollment?.weeks ?? []).flatMap(w => w.items);
  const completedCount = allItems.filter(i => getStatus(i) === "completed").length;
  const progressPct = allItems.length > 0 ? Math.round((completedCount / allItems.length) * 100) : 0;

  // Teacher overview: aggregate items from all students' enrollments
  const overviewCalendarItems: Array<{ item: TutoringItem; week: TutoringWeek; studentName: string; studentInfo: StudentInfo | null }> =
    isTeacher && !selectedStudent
      ? allEnrollments.flatMap(enroll => {
          const student = enrolledStudents.find(s => s.enrollment_id === enroll.id) ?? null;
          return enroll.weeks.flatMap(w =>
            w.items.map(item => ({ item, week: w, studentName: student?.student_name ?? "Student", studentInfo: student }))
          );
        })
      : [];

  const calendarEvents: Record<string, "session" | "assignment"> = {};
  if (isTeacher && !selectedStudent) {
    overviewCalendarItems.forEach(({ item }) => {
      if (!item.due_date) return;
      const iso = item.due_date.slice(0, 10);
      if (iso) calendarEvents[iso] = item.type === "session" ? "session" : "assignment";
    });
  } else {
    allItems.forEach(item => {
      if (!item.due_date) return;
      if (!isTeacher && item.is_locked) return;
      const iso = item.due_date.match(/^\d{4}-\d{2}-\d{2}/) ? item.due_date.slice(0, 10) : null;
      if (iso) calendarEvents[iso] = item.type === "session" ? "session" : "assignment";
    });
  }

  const upcomingItems = (enrollment?.weeks ?? [])
    .flatMap(w => w.items.map(i => ({ week: w, item: i })))
    .filter(({ item: i }) => getStatus(i) === "available" && i.due_date && !isDuePast(i.due_date))
    .slice(0, 4);

  const teacherUpcomingItems = isTeacher && !selectedStudent
    ? overviewCalendarItems
        .filter(({ item }) => item.due_date && !isDuePast(item.due_date))
        .sort((a, b) => (a.item.due_date ?? "").localeCompare(b.item.due_date ?? ""))
        .slice(0, 6)
    : [];

  const itemsForDate = selectedCalendarDate && !(isTeacher && !selectedStudent)
    ? (enrollment?.weeks ?? []).flatMap(w => w.items.map(item => ({ week: w, item }))).filter(
        ({ item }) => item.due_date?.slice(0, 10) === selectedCalendarDate &&
          (isTeacher || !item.is_locked)
      )
    : [];

  const overviewItemsForDate = selectedCalendarDate && isTeacher && !selectedStudent
    ? overviewCalendarItems.filter(({ item }) => item.due_date?.slice(0, 10) === selectedCalendarDate)
    : [];

  // Lookup map: item id → item (used to filter by type for grading)
  const allItemsMap: Record<string, TutoringItem> = {};
  allEnrollments.forEach(e => e.weeks.forEach(w => w.items.forEach(item => { allItemsMap[item.id] = item; })));
  const isGradable = (itemId: string) => {
    const t = allItemsMap[itemId]?.type;
    return t !== "session" && t !== "notes";
  };

  // "Needs grading" — ungraded submissions per student, excluding sessions & notes
  const needsGradingByStudent: Record<string, number> = {};
  Object.entries(allStudentSubmissions).forEach(([studentId, subs]) => {
    needsGradingByStudent[studentId] = subs.filter(s => s.grade === null && isGradable(s.tutoring_item_id)).length;
  });

  // Flat list for the sidebar panel
  const needsGradingItems = enrolledStudents.flatMap(student => {
    const subs = (allStudentSubmissions[student.student_id] ?? []).filter(s => s.grade === null && isGradable(s.tutoring_item_id));
    const enroll = allEnrollments.find(e => e.id === student.enrollment_id);
    const enrollItems = enroll ? enroll.weeks.flatMap(w => w.items) : [];
    return subs.map(sub => ({
      studentName: student.student_name,
      studentInfo: student,
      itemId: sub.tutoring_item_id,
      itemTitle: enrollItems.find(i => i.id === sub.tutoring_item_id)?.title ?? "Assignment",
      submittedAt: sub.submitted_at,
    }));
  }).sort((a, b) => a.submittedAt.localeCompare(b.submittedAt));

  // Next upcoming (non-past, non-completed) item per student — used in OverviewCards
  const nextFutureByStudent: Record<string, { title: string; type: TutoringItem["type"]; due_date: string | null } | null> = {};
  enrolledStudents.forEach(student => {
    const enroll = allEnrollments.find(e => e.id === student.enrollment_id);
    if (!enroll) { nextFutureByStudent[student.student_id] = null; return; }
    const subs = allStudentSubmissions[student.student_id] ?? [];
    const item = enroll.weeks
      .flatMap(w => w.items)
      .filter(i =>
        !i.is_locked &&
        (!i.due_date || !isDuePast(i.due_date)) &&
        !subs.some(s => s.tutoring_item_id === i.id)
      )
      .sort((a, b) => {
        if (a.due_date && b.due_date) return a.due_date.localeCompare(b.due_date);
        if (a.due_date) return -1;
        if (b.due_date) return 1;
        return 0;
      })[0] ?? null;
    nextFutureByStudent[student.student_id] = item
      ? { title: item.title, type: item.type, due_date: item.due_date }
      : null;
  });

  const SidebarContent = () => (
    <>
      <MiniCalendar
        events={calendarEvents}
        selectedDate={selectedCalendarDate}
        onDayClick={iso => setSelectedCalendarDate(iso || null)}
      />

      {/* Items for selected date — student or selected-student mode */}
      {selectedCalendarDate && itemsForDate.length > 0 && (
        <div className="bg-white rounded-xl border border-[#0B1E40]/20 shadow-sm p-4">
          <p className="text-xs font-semibold text-[#0B1E40] uppercase tracking-wide mb-3">
            {new Date(selectedCalendarDate + "T00:00:00").toLocaleDateString("en-US", { month: "long", day: "numeric" })}
          </p>
          <div className="space-y-2">
            {itemsForDate.map(({ week, item }) => {
              const status = getStatus(item);
              const sub = getSubmission(item);
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    if (status !== "locked") {
                      setSelectedItem({ week, item, status, submission: sub });
                      setPanelOpen(false);
                    }
                  }}
                  disabled={status === "locked"}
                  className={`w-full flex items-center gap-3 p-2.5 rounded-lg text-left transition-colors
                    ${status === "locked" ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-50 cursor-pointer"}`}
                >
                  <div className="w-7 h-7 rounded-lg bg-gray-100 flex items-center justify-center shrink-0">
                    {upcomingIcon(item.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-gray-800 truncate">{item.title}</p>
                    <p className="text-xs text-gray-400">Week {week.number}: {week.title}</p>
                  </div>
                  {status !== "locked" && <ChevronRight className="w-3.5 h-3.5 text-gray-400 shrink-0" />}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Items for selected date — teacher overview mode (all students) */}
      {selectedCalendarDate && overviewItemsForDate.length > 0 && (
        <div className="bg-white rounded-xl border border-[#0B1E40]/20 shadow-sm p-4">
          <p className="text-xs font-semibold text-[#0B1E40] uppercase tracking-wide mb-3">
            {new Date(selectedCalendarDate + "T00:00:00").toLocaleDateString("en-US", { month: "long", day: "numeric" })}
          </p>
          <div className="space-y-2">
            {overviewItemsForDate.map(({ item, week, studentName, studentInfo }) => (
              <button
                key={`${item.id}-${studentName}`}
                onClick={() => studentInfo && selectStudentAndItem(studentInfo, item.id)}
                disabled={!studentInfo}
                className="w-full flex items-center gap-3 p-2.5 rounded-lg text-left hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                <div className="w-7 h-7 rounded-lg bg-gray-100 flex items-center justify-center shrink-0">
                  {upcomingIcon(item.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-gray-800 truncate">{item.title}</p>
                  <p className="text-xs text-gray-400">{studentName} · {week.title}</p>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-gray-300 shrink-0" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Needs Grading panel — teacher overview only */}
      {isTeacher && needsGradingItems.length > 0 && (
        <div className="bg-amber-50 rounded-xl border border-amber-200 shadow-sm p-4">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-4 h-4 rounded-full bg-amber-500 flex items-center justify-center shrink-0">
              <span className="text-white text-[9px] font-bold leading-none">{needsGradingItems.length}</span>
            </span>
            <h3 className="text-sm font-semibold text-amber-800">Needs Grading</h3>
          </div>
          <div className="space-y-2.5">
            {needsGradingItems.map((ng, i) => (
              <button
                key={i}
                onClick={() => selectStudentAndItem(ng.studentInfo, ng.itemId)}
                className="w-full flex items-start gap-2.5 text-left hover:bg-amber-100/60 rounded-lg p-1.5 -mx-1.5 transition-colors"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-amber-900 truncate">{ng.itemTitle}</p>
                  <p className="text-xs text-amber-700 mt-0.5">{ng.studentName} · {new Date(ng.submittedAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
        <div className="flex items-center gap-2 mb-3"><AlertCircle className="w-4 h-4 text-orange-500" /><h3 className="text-sm font-semibold text-gray-800">Upcoming</h3></div>
        {isTeacher && !selectedStudent ? (
          teacherUpcomingItems.length === 0
            ? <p className="text-xs text-gray-400">No upcoming items.</p>
            : (
              <div className="space-y-3">
                {teacherUpcomingItems.map(({ item, studentName, studentInfo }) => (
                  <button
                    key={`${item.id}-${studentName}`}
                    onClick={() => studentInfo && selectStudentAndItem(studentInfo, item.id)}
                    className="w-full flex items-start gap-3 text-left hover:bg-gray-50 rounded-lg p-1 -mx-1 transition-colors"
                  >
                    <div className="w-7 h-7 rounded-lg bg-gray-100 flex items-center justify-center shrink-0 mt-0.5">{upcomingIcon(item.type)}</div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-gray-800 leading-snug">{item.title}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{studentName} · {formatDueDate(item.due_date)}</p>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 text-gray-300 shrink-0 mt-1" />
                  </button>
                ))}
              </div>
            )
        ) : (
          upcomingItems.length === 0
            ? <p className="text-xs text-gray-400">No upcoming items.</p>
            : (
              <div className="space-y-3">
                {upcomingItems.map(({ week, item }) => (
                  <button
                    key={item.id}
                    onClick={() => { setSelectedItem({ week, item, status: getStatus(item), submission: getSubmission(item) }); setPanelOpen(false); }}
                    className="w-full flex items-start gap-3 text-left hover:bg-gray-50 rounded-lg p-1 -mx-1 transition-colors"
                  >
                    <div className="w-7 h-7 rounded-lg bg-gray-100 flex items-center justify-center shrink-0 mt-0.5">{upcomingIcon(item.type)}</div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-gray-800 leading-snug">{item.title}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{formatDueDate(item.due_date)}</p>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 text-gray-300 shrink-0 mt-1" />
                  </button>
                ))}
              </div>
            )
        )}
      </div>
    </>
  );

  return (
    <div className="mx-auto py-8 px-4 space-y-6">
      <ConfirmDialog config={dialog} onClose={() => setDialog(null)} />

      {/* Course Header */}
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
        <div className="relative h-36 overflow-hidden">
          {course.thumbnail_url
            ? <img src={course.thumbnail_url} alt={course.title} className="w-full h-full object-cover" />
            : <div className="w-full h-full bg-gradient-to-r from-[#0B1E40] to-[#1a3b6e]" />}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B1E40]/80 to-transparent" />
          <div className="absolute inset-0 flex items-center px-8">
            <div>
              <span className="text-xs font-semibold text-blue-300 uppercase tracking-widest">1 on 1 Virtual Tutoring</span>
              <h1 className="text-2xl font-bold text-white mt-1">{course.title}</h1>
            </div>
          </div>
        </div>

        <div className="px-8 py-5 flex flex-wrap gap-6 items-center justify-between">
          <div className="flex gap-6 text-sm text-gray-600">
            {course.instructor_name && <div className="flex items-center gap-1.5"><User className="w-4 h-4 text-gray-400" /><span>{course.instructor_name}</span></div>}
            {isTeacher && <div className="flex items-center gap-1.5"><AlertCircle className="w-4 h-4 text-gray-400" /><span>{course.enrollment_count} enrolled</span></div>}
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-3 min-w-[180px]">
              <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full transition-all" style={{ width: `${progressPct}%` }} />
              </div>
              <span className="text-sm font-semibold text-gray-700 whitespace-nowrap">{progressPct}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6 items-start">

        {/* Left */}
        <div>
          {selectedItem ? (
            <AssignmentDetail selected={selectedItem} courseId={course.id} isTeacher={isTeacher} onBack={() => setSelectedItem(null)} onSubmitted={handleSubmitted} />
          ) : (
            <div className="space-y-4">

              {/* Teacher: pending student requests */}
              {isTeacher && (
                <PendingRequestsPanel
                  assignments={pendingAssignments}
                  onRefresh={loadPendingAssignments}
                />
              )}

              {/* Teacher: student banner with dropdown */}
              {isTeacher && enrolledStudents.length > 0 && (
                <StudentBanner
                  students={enrolledStudents}
                  selected={selectedStudent}
                  editMode={editMode}
                  onSelect={setSelectedStudent}
                  onToggleEdit={handleToggleEdit}
                />
              )}

            {/* Teacher overview — shown when no student selected */}
            {isTeacher && !selectedStudent && (
              loadingOverview
                ? <div className="text-xs text-gray-400 text-center py-8">Loading overview…</div>
                : <OverviewCards
                    overview={overview}
                    needsGradingByStudent={needsGradingByStudent}
                    nextFutureByStudent={nextFutureByStudent}
                    onSelect={s => setSelectedStudent(s)}
                  />
            )}

            <div className="space-y-3">
              {(enrollment?.weeks ?? []).map(week => {
                const isOpen = openWeeks.includes(week.id);
                const done = week.items.filter(i => getStatus(i) === "completed").length;
                const allDone = done === week.items.length && week.items.length > 0;
                const editingThisItem = (itemId: string) => editingItemId === itemId;

                return (
                  <div key={week.id} className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                    {/* Week header */}
                    <div className="flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors">
                      <button onClick={() => toggleWeek(week.id)} className="flex items-center gap-4 flex-1 text-left">
                        <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${allDone ? "bg-green-100 text-green-700" : "bg-[#0B1E40]/10 text-[#0B1E40]"}`}>
                          {allDone ? <Check className="w-5 h-5 text-green-500" /> : week.number}
                        </div>
                        <div>
                          {editingWeekId === week.id ? (
                            <input
                              value={editingWeekTitle}
                              onChange={e => setEditingWeekTitle(e.target.value)}
                              onClick={e => e.stopPropagation()}
                              className="text-sm font-semibold border border-gray-300 rounded px-2 py-0.5 focus:outline-none focus:ring-2 focus:ring-[#0B1E40]/20"
                              autoFocus
                            />
                          ) : (
                            <p className="font-semibold text-gray-900 text-sm">Week {week.number}: {week.title}</p>
                          )}
                          <p className="text-xs text-gray-400 mt-0.5">{done}/{week.items.length} completed</p>
                        </div>
                      </button>

                      {isTeacher && editMode && (
                        <div className="flex items-center gap-1 ml-2" onClick={e => e.stopPropagation()}>
                          {editingWeekId === week.id ? (
                            <>
                              <button onClick={() => handleUpdateWeek(week.id)} className="p-1.5 hover:bg-green-100 rounded-lg text-green-600"><Check className="w-4 h-4" /></button>
                              <button onClick={() => setEditingWeekId(null)} className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-400"><X className="w-4 h-4" /></button>
                            </>
                          ) : (
                            <>
                              <button onClick={() => { setEditingWeekId(week.id); setEditingWeekTitle(week.title); setEditingWeekDescription(week.description ?? ""); }} className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-400"><Pencil className="w-3.5 h-3.5" /></button>
                              <button onClick={() => handleDeleteWeek(week.id)} className="p-1.5 hover:bg-red-50 rounded-lg text-red-400"><Trash2 className="w-3.5 h-3.5" /></button>
                            </>
                          )}
                        </div>
                      )}

                      <button onClick={() => toggleWeek(week.id)} className="ml-2">
                        {isOpen ? <ChevronDown className="w-4 h-4 text-gray-400" /> : <ChevronRight className="w-4 h-4 text-gray-400" />}
                      </button>
                    </div>

                    {isOpen && (
                      <div className="border-t border-gray-100">

                        {/* Week description */}
                        {editingWeekId === week.id ? (
                          <div className="px-6 pt-4 pb-2">
                            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-1">Week Description</label>
                            <RichTextEditor
                              value={editingWeekDescription}
                              onChange={setEditingWeekDescription}
                              placeholder="Optional overview for this week…"
                              minHeight={80}
                            />
                          </div>
                        ) : week.description ? (
                          <div className="mx-6 mt-4 mb-2 p-4 bg-blue-50/60 border border-blue-100 rounded-xl">
                            <RichTextContent html={week.description} />
                          </div>
                        ) : null}

                        {(() => {
                          const sortItems = (arr: TutoringItem[]) =>
                            [...arr].sort((a, b) => {
                              if (a.due_date && b.due_date) return a.due_date.localeCompare(b.due_date);
                              if (a.due_date) return -1;
                              if (b.due_date) return 1;
                              return a.order - b.order;
                            });

                          const visible = week.items.filter(i => isTeacher || !i.is_locked);
                          const groups = [
                            { label: "Sessions",                items: sortItems(visible.filter(i => i.type === "session")) },
                            { label: "Notes",                   items: sortItems(visible.filter(i => i.type === "notes")) },
                            { label: "Assignments & Quizzes",   items: sortItems(visible.filter(i => i.type === "assignment" || i.type === "quiz")) },
                          ].filter(g => g.items.length > 0);

                          const renderItem = (item: TutoringItem) => {
                            const status = getStatus(item);
                            const sub = getSubmission(item);

                            if (isTeacher && editingThisItem(item.id)) {
                              return (
                                <div key={item.id} className="px-6 py-3">
                                  <AddItemForm
                                    initial={{ type: item.type, title: item.title, duration: item.duration ?? "", due_date: item.due_date ?? "", is_locked: item.is_locked, accept_late: item.accept_late, passing_score: item.passing_score, max_attempts: item.max_attempts, time_limit_minutes: item.time_limit_minutes?.toString() ?? "", show_answers: item.show_answers, points_per_question: item.points_per_question, max_grade: item.max_grade?.toString() ?? "", instructions: item.instructions ?? "", meeting_link: item.meeting_link ?? "", recording_link: item.recording_link ?? "" }}
                                    onSave={data => handleUpdateItem(week.id, item.id, data)}
                                    onCancel={() => setEditingItemId(null)}
                                  />
                                </div>
                              );
                            }

                            return (
                              <div key={item.id}
                                onClick={() => status !== "locked" && setSelectedItem({ week, item, status, submission: sub })}
                                className={`flex items-center gap-4 px-6 py-3.5 border-b border-gray-50 transition-colors ${!isTeacher && status === "locked" ? "opacity-50 cursor-not-allowed" : !isTeacher ? "hover:bg-gray-50 cursor-pointer" : ""}`}
                              >
                                <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center shrink-0">{itemIcon(item.type, status)}</div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-medium text-gray-800 truncate">{item.title}</p>
                                  <div className="flex items-center gap-3 mt-0.5 flex-wrap">
                                    {item.duration && <span className="text-xs text-gray-400">{item.duration}</span>}
                                    {sub ? (
                                      <>
                                        <span className="text-xs text-green-600 font-medium">
                                          {item.type === "session" ? "Attended" : item.type === "notes" ? "Read" : "Submitted"}
                                        </span>
                                        {item.type !== "session" && item.type !== "notes" && item.due_date && new Date(sub.submitted_at) > new Date(item.due_date) && (
                                          <span className="text-xs text-red-500 font-medium">Late</span>
                                        )}
                                      </>
                                    ) : item.type === "session" ? (
                                      <>
                                        {formatDueDate(item.due_date) && <span className="text-xs font-medium text-orange-500">{formatDueDate(item.due_date)}</span>}
                                        <span className="text-xs text-gray-400 font-medium">Not Attended</span>
                                      </>
                                    ) : item.type === "notes" ? (
                                      <span className="text-xs text-gray-400 font-medium">Not Read</span>
                                    ) : (
                                      formatDueDate(item.due_date) && <span className={`text-xs font-medium ${isDuePast(item.due_date) ? "text-red-500" : "text-orange-500"}`}>{formatDueDate(item.due_date)}</span>
                                    )}
                                    {isTeacher && sub && sub.grade === null && item.type !== "session" && item.type !== "notes" && (
                                      <span className="text-xs font-semibold text-amber-600 bg-amber-50 border border-amber-200 px-1.5 py-0.5 rounded-full">Needs Grading</span>
                                    )}
                                    {item.is_locked && isTeacher && <span className="text-xs text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded">Hidden</span>}
                                  </div>
                                </div>
                                <div className="flex items-center gap-2 shrink-0">
                                  {!isTeacher && sub?.grade != null && (() => { const c = gradeColor(gradePct(sub.grade!, item.max_grade)); return <span className={`text-xs font-semibold ${c.text} ${c.bg} px-2 py-0.5 rounded-full`}>{fmtGrade(sub.grade!, item.max_grade)}</span>; })()}
                                  {!isTeacher && statusIcon(status)}
                                  {isTeacher && editMode && (
                                    <div className="flex items-center gap-1" onClick={e => e.stopPropagation()}>
                                      <button onClick={() => setEditingItemId(item.id)} className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-400"><Pencil className="w-3.5 h-3.5" /></button>
                                      <button onClick={() => handleDeleteItem(week.id, item.id)} className="p-1.5 hover:bg-red-50 rounded-lg text-red-400"><Trash2 className="w-3.5 h-3.5" /></button>
                                    </div>
                                  )}
                                </div>
                              </div>
                            );
                          };

                          return (
                            <>
                              {groups.map(({ label, items }) => (
                                <div key={label}>
                                  <div className="px-6 py-1.5 bg-gray-50 border-b border-gray-100">
                                    <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">{label}</span>
                                  </div>
                                  {items.map(renderItem)}
                                </div>
                              ))}
                            </>
                          );
                        })()}

                        {/* Add item form or button */}
                        {isTeacher && editMode && (
                          <div className="px-6 py-3">
                            {addingItemToWeek === week.id ? (
                              <AddItemForm
                                onSave={data => handleAddItem(week.id, data)}
                                onCancel={() => setAddingItemToWeek(null)}
                              />
                            ) : (
                              <button
                                onClick={() => setAddingItemToWeek(week.id)}
                                className="flex items-center gap-2 text-xs font-medium text-[#0B1E40] hover:underline py-1"
                              >
                                <Plus className="w-3.5 h-3.5" /> Add Assignment
                              </button>
                            )}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Empty state */}
              {(enrollment?.weeks ?? []).length === 0 && !isTeacher && (
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-12 text-center">
                  <BookOpen className="w-8 h-8 text-gray-200 mx-auto mb-3" />
                  <p className="text-sm text-gray-400">No weeks have been added yet. Check back soon.</p>
                </div>
              )}

              {/* Add week — teacher only */}
              {isTeacher && editMode && (
                <div className="bg-white rounded-xl border border-dashed border-gray-300 shadow-sm p-4">
                  {addingWeek ? (
                    <div className="space-y-2">
                      <input
                        value={newWeekTitle}
                        onChange={e => setNewWeekTitle(e.target.value)}
                        placeholder="Week title (e.g. Advanced Fluency)"
                        className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#0B1E40]/20"
                        autoFocus
                        onKeyDown={e => e.key === "Enter" && handleAddWeek()}
                      />
                      <RichTextEditor
                        value={newWeekDescription}
                        onChange={setNewWeekDescription}
                        placeholder="Short description for this week (optional)…"
                        minHeight={70}
                      />
                      <div className="flex gap-2">
                        <button onClick={handleAddWeek} disabled={!newWeekTitle.trim()} className="flex items-center gap-1.5 px-3 py-1.5 bg-[#0B1E40] text-white text-xs font-semibold rounded-lg hover:bg-[#0B1E40]/90 disabled:opacity-50"><Check className="w-3.5 h-3.5" /> Add Week</button>
                        <button onClick={() => { setAddingWeek(false); setNewWeekTitle(""); setNewWeekDescription(""); }} className="px-3 py-1.5 border border-gray-200 text-gray-500 text-xs font-semibold rounded-lg hover:bg-gray-50"><X className="w-3.5 h-3.5" /></button>
                      </div>
                    </div>
                  ) : (
                    <button onClick={() => setAddingWeek(true)} className="w-full flex items-center justify-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-800 transition-colors py-1">
                      <Plus className="w-4 h-4" /> Add Week
                    </button>
                  )}
                </div>
              )}
            </div>
            </div>
          )}
        </div>

        {/* Right — desktop sidebar */}
        <div className="hidden lg:flex flex-col space-y-4 sticky top-4"><SidebarContent /></div>
      </div>

      {/* Mobile toggle */}
      <button onClick={() => setPanelOpen(p => !p)} className="lg:hidden fixed right-0 top-[13.5%] -translate-y-1/2 z-50 bg-[#0B1E40] text-white w-8 h-14 rounded-l-2xl flex items-center justify-center shadow-lg">
        {panelOpen ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
      </button>
      {panelOpen && <div className="lg:hidden fixed inset-0 bg-black/30 z-40" onClick={() => setPanelOpen(false)} />}
      <div className={`lg:hidden fixed top-0 right-0 h-full w-72 bg-white z-50 shadow-2xl overflow-y-auto transition-transform duration-300 ${panelOpen ? "translate-x-0" : "translate-x-full"}`}>
        <div className="p-4 pt-6 space-y-4"><h2 className="text-sm font-semibold text-gray-700">Schedule</h2><SidebarContent /></div>
      </div>
    </div>
  );
};
