"use client";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, CalendarDays, Check, Download, FileText, Users, X } from "lucide-react";
import { useParams } from "next/navigation";
import { clubs, type Club } from "@/lib/types";
import { createSupabaseBrowserClient } from "@/lib/supabase-browser";
import { SCHOOL_YEAR } from "@/lib/school";

type RegisteredStudent = { id: string; name: string; class_year: string };
const demoStudents: RegisteredStudent[] = ["Amara Njeri", "Brian Otieno", "Chao Wambui", "Dylan Kamau", "Fatima Achieng", "Grace Mwangi", "Hassan Kimani", "Imani Wekesa"].map((name, index) => ({ id: `demo-${index}`, name, class_year: `Year ${7 + index % 6}` }));

function fridayForWeek(date = new Date()) {
  const result = new Date(date); const daysFromFriday = (result.getDay() + 2) % 7; result.setDate(result.getDate() - daysFromFriday); return result.toISOString().slice(0, 10);
}
function formatSession(date: string) { return new Date(`${date}T12:00:00`).toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric", year: "numeric" }); }

export default function AttendancePage() {
  const { clubId } = useParams<{ clubId: string }>();
  const fallbackClub = clubs.find((item) => item.id === clubId) || clubs[0];
  const [club, setClub] = useState<Club>(fallbackClub); const [students, setStudents] = useState<RegisteredStudent[]>(demoStudents); const [present, setPresent] = useState<string[]>(demoStudents.slice(0, 6).map((student) => student.id)); const [sessionDate, setSessionDate] = useState(fridayForWeek()); const [saved, setSaved] = useState(false); const [loading, setLoading] = useState(true);
  const absent = students.length - present.length; const percentage = students.length ? Math.round((present.length / students.length) * 100) : 0;

  useEffect(() => {
    const supabase = createSupabaseBrowserClient();
    if (!supabase) { setLoading(false); return; }
    const client = supabase;
    async function loadAttendance() {
      const [{ data: clubData }, { data: registrations }, { data: attendance }] = await Promise.all([
        client.from("clubs").select("*").eq("id", clubId).single(),
        client.from("registrations").select("student_id, student:students(id,name,class_year)").eq("club_id", clubId).eq("school_year", SCHOOL_YEAR),
        client.from("attendance").select("student_id, present").eq("club_id", clubId).eq("session_date", sessionDate)
      ]);
      if (clubData) setClub({ ...clubData, color: fallbackClub.color, icon: fallbackClub.icon, members: registrations?.length || 0 });
      if (registrations?.length) setStudents(registrations.map((item) => { const student = (Array.isArray(item.student) ? item.student[0] : item.student) as unknown as RegisteredStudent; return { id: item.student_id, name: student.name, class_year: student.class_year }; }));
      if (attendance?.length) setPresent(attendance.filter((item) => item.present).map((item) => item.student_id)); else if (registrations?.length) setPresent([]);
      setLoading(false);
    }
    loadAttendance();
  }, [clubId, sessionDate, fallbackClub.color, fallbackClub.icon]);

  const toggle = (id: string) => setPresent((items) => items.includes(id) ? items.filter((item) => item !== id) : [...items, id]);
  async function saveAttendance() {
    const supabase = createSupabaseBrowserClient();
    if (supabase) await supabase.from("attendance").upsert(students.map((student) => ({ club_id: clubId, student_id: student.id, session_date: sessionDate, present: present.includes(student.id) })), { onConflict: "club_id,student_id,session_date" });
    setSaved(true); window.setTimeout(() => setSaved(false), 2200);
  }
  function exportAttendance() { const rows = [["Student", "Class", "Club", "Session date", "Present"], ...students.map((student) => [student.name, student.class_year, club.name, sessionDate, present.includes(student.id) ? "Yes" : "No"]), ["Attendance rate", "", "", "", `${percentage}%`]]; const csv = rows.map((row) => row.map((cell) => `"${cell.replaceAll('"', '""')}"`).join(",")).join("\n"); const url = URL.createObjectURL(new Blob([csv], { type: "text/csv" })); const a = document.createElement("a"); a.href = url; a.download = `${club.name.toLowerCase().replaceAll(" ", "-")}-${sessionDate}.csv`; a.click(); URL.revokeObjectURL(url); }

  return <main className="min-h-[calc(100vh-76px)] bg-[#f7fafc] px-5 py-10 sm:px-8 lg:px-10"><div className="mx-auto max-w-5xl"><Link href="/admin" className="inline-flex items-center gap-2 text-xs font-bold text-blue-900"><ArrowLeft size={14} /> Back to overview</Link><div className="mt-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><div><p className="text-[11px] font-bold uppercase tracking-[.2em] text-violet">Weekly roll call / {club.name}</p><h1 className="mt-3 text-3xl font-bold tracking-tight text-blue-950 sm:text-4xl">Friday attendance</h1><p className="mt-2 text-sm text-slate-500">One quick roll call for the last lesson of the week.</p></div><div className="flex flex-wrap gap-2"><Link href="/admin/reports" className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-xs font-bold text-violet transition hover:border-violet"><FileText size={15} /> Weekly report</Link><button onClick={exportAttendance} className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-xs font-bold text-blue-900 transition hover:border-silver"><Download size={15} /> CSV</button></div></div><div className="mt-8 grid gap-4 sm:grid-cols-3"><div className="rounded-2xl bg-blue-900 p-5 text-white shadow-card"><div className="flex items-center justify-between text-white/60"><span className="text-[11px] font-semibold">Present</span><Check size={17} className="text-bumblebee" /></div><p className="mt-4 text-4xl font-bold">{present.length}</p><p className="mt-1 text-[11px] text-white/50">Students in the room</p></div><div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-card"><div className="flex items-center justify-between text-slate-400"><span className="text-[11px] font-semibold">Absent</span><X size={17} /></div><p className="mt-4 text-4xl font-bold text-blue-950">{absent}</p><p className="mt-1 text-[11px] text-slate-400">Follow up if needed</p></div><div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-card"><div className="flex items-center justify-between text-slate-400"><span className="text-[11px] font-semibold">Attendance rate</span><Users size={17} className="text-shamrock" /></div><p className="mt-4 text-4xl font-bold text-blue-950">{percentage}<span className="text-xl text-slate-300">%</span></p><div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-100"><div className="h-full rounded-full bg-shamrock transition-all" style={{ width: `${percentage}%` }} /></div></div></div><section className="mt-6 rounded-2xl border border-slate-100 bg-white p-5 shadow-card sm:p-7"><div className="flex flex-col justify-between gap-4 border-b border-slate-100 pb-6 sm:flex-row sm:items-center"><div className="flex items-center gap-3"><div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#f0f6fb] text-blue-900"><CalendarDays size={19} /></div><div><p className="text-xs font-bold text-blue-950">Friday session</p><p className="mt-1 text-[11px] text-slate-400">{formatSession(sessionDate)}</p></div></div><label className="flex items-center gap-2 text-[11px] font-bold text-slate-500">Session date<input type="date" value={sessionDate} onChange={(event) => setSessionDate(event.target.value)} className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-blue-950 outline-none focus:border-blue-900" /></label></div><div className="mt-5 flex flex-wrap items-center justify-between gap-3 rounded-xl bg-[#f0f6fb] p-3.5"><p className="text-xs font-semibold text-blue-950">Tap a name to switch their status.</p><button onClick={() => setPresent(students.map((student) => student.id))} className="rounded-lg bg-white px-3 py-2 text-[11px] font-bold text-blue-900 shadow-sm transition hover:bg-blue-900 hover:text-white">Mark everyone present</button></div>{loading ? <p className="py-12 text-center text-sm text-slate-400">Loading this club&apos;s register...</p> : <div className="mt-5 space-y-2">{students.map((student, index) => { const isPresent = present.includes(student.id); return <button key={student.id} onClick={() => toggle(student.id)} className="flex w-full items-center justify-between rounded-xl border border-transparent bg-slate-50 p-4 text-left transition hover:border-silver"><div className="flex items-center gap-3"><span className={`flex h-10 w-10 items-center justify-center rounded-full text-xs font-bold ${isPresent ? "bg-[#e7f4e9] text-shamrock" : "bg-slate-200 text-slate-500"}`}>{student.name.split(" ").map((part) => part[0]).join("")}</span><div><p className="text-sm font-semibold text-blue-950">{student.name}</p><p className="mt-0.5 text-[10px] text-slate-400">{student.class_year || `Year ${7 + index % 6}`}</p></div></div><span className={`flex items-center gap-1.5 rounded-full px-3 py-2 text-[10px] font-bold ${isPresent ? "bg-[#e7f4e9] text-shamrock" : "bg-slate-200 text-slate-500"}`}>{isPresent && <Check size={12} />}{isPresent ? "Present" : "Absent"}</span></button>; })}</div>}<button onClick={saveAttendance} className="mt-6 w-full rounded-xl bg-blue-900 py-4 text-sm font-bold text-white transition hover:bg-blue-950">{saved ? "Attendance saved for this Friday" : "Save Friday attendance"}</button></section></div></main>;
}
