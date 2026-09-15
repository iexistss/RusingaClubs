"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowLeft, CalendarDays, Check, ChevronDown, Download } from "lucide-react";
import { useParams } from "next/navigation";
import { clubs } from "@/lib/types";
import { createSupabaseBrowserClient } from "@/lib/supabase-browser";

const demoStudents = ["Amara Njeri", "Brian Otieno", "Chao Wambui", "Dylan Kamau", "Fatima Achieng", "Grace Mwangi", "Hassan Kimani", "Imani Wekesa"];

export default function AttendancePage() {
  const { clubId } = useParams<{ clubId: string }>();
  const club = clubs.find((item) => item.id === clubId) || clubs[0];
  const [students, setStudents] = useState(demoStudents);
  const [present, setPresent] = useState<string[]>(demoStudents.slice(0, 6));
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const supabase = createSupabaseBrowserClient();
    if (!supabase) return;
    const client = supabase;
    async function loadAttendance() {
      const [{ data: registrations }, { data: attendance }] = await Promise.all([
        client.from("registrations").select("student:students(name)").eq("club_id", clubId),
        client.from("attendance").select("student:students(name), present").eq("club_id", clubId).eq("session_date", new Date().toISOString().slice(0, 10))
      ]);
      if (registrations?.length) setStudents(registrations.map((item) => (item.student as unknown as { name: string }[])[0]?.name).filter(Boolean));
      if (attendance?.length) setPresent(attendance.filter((item) => item.present).map((item) => (item.student as unknown as { name: string }[])[0]?.name).filter(Boolean));
    }
    loadAttendance();
  }, [clubId]);

  const toggle = (name: string) => setPresent((items) => items.includes(name) ? items.filter((item) => item !== name) : [...items, name]);
  async function saveAttendance() {
    const supabase = createSupabaseBrowserClient();
    if (supabase) {
      const { data: registered } = await supabase.from("registrations").select("student_id, student:students(name)").eq("club_id", clubId);
      if (registered?.length) await supabase.from("attendance").upsert(registered.map((item) => ({ club_id: clubId, student_id: item.student_id, session_date: new Date().toISOString().slice(0, 10), present: present.includes((item.student as unknown as { name: string }[])[0]?.name) })), { onConflict: "club_id,student_id,session_date" });
    }
    setSaved(true); window.setTimeout(() => setSaved(false), 1800);
  }
  function exportAttendance() { const rows = [["Student", "Club", "Session date", "Present"], ...students.map((student) => [student, club.name, new Date().toLocaleDateString(), present.includes(student) ? "Yes" : "No"])]; const csv = rows.map((row) => row.join(",")).join("\n"); const url = URL.createObjectURL(new Blob([csv], { type: "text/csv" })); const a = document.createElement("a"); a.href = url; a.download = `${club.id}-attendance.csv`; a.click(); URL.revokeObjectURL(url); }

  return <main className="min-h-[calc(100vh-76px)] bg-[#f7fafc] px-5 py-10 sm:px-8 lg:px-10"><div className="mx-auto max-w-4xl"><Link href="/admin" className="inline-flex items-center gap-2 text-xs font-bold text-blue-900"><ArrowLeft size={14} /> Back to overview</Link><div className="mt-9 flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><div><p className="text-[11px] font-bold uppercase tracking-[.2em] text-violet">Attendance / {club.name}</p><h1 className="mt-3 text-3xl font-bold tracking-tight text-blue-950">Today&apos;s session</h1><p className="mt-2 text-sm text-slate-500">{present.length} of {students.length} students marked present.</p></div><button onClick={exportAttendance} className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-xs font-bold text-blue-900 transition hover:border-silver"><Download size={15} /> Export attendance</button></div><div className="mt-8 rounded-2xl border border-slate-100 bg-white p-5 shadow-card sm:p-7"><div className="flex flex-col gap-4 border-b border-slate-100 pb-6 sm:flex-row sm:items-center sm:justify-between"><div className="flex items-center gap-3"><div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#f0f6fb] text-blue-900"><CalendarDays size={18} /></div><div><p className="text-xs font-bold text-blue-950">Session date</p><p className="mt-1 text-[11px] text-slate-400">{new Date().toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric" })}</p></div></div><button className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-500">Change date <ChevronDown size={13} /></button></div><div className="mt-6 space-y-2">{students.map((student, index) => { const isPresent = present.includes(student); return <button key={student} onClick={() => toggle(student)} className="flex w-full items-center justify-between rounded-xl border border-transparent bg-slate-50 p-4 text-left transition hover:border-silver"><div className="flex items-center gap-3"><span className={`flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold ${isPresent ? "bg-[#e7f4e9] text-shamrock" : "bg-slate-200 text-slate-500"}`}>{student.split(" ").map((part) => part[0]).join("")}</span><div><p className="text-sm font-semibold text-blue-950">{student}</p><p className="mt-0.5 text-[10px] text-slate-400">Year {7 + index % 6}</p></div></div><span className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[10px] font-bold ${isPresent ? "bg-[#e7f4e9] text-shamrock" : "bg-slate-200 text-slate-500"}`}>{isPresent && <Check size={12} />}{isPresent ? "Present" : "Absent"}</span></button>; })}</div><button onClick={saveAttendance} className="mt-6 w-full rounded-xl bg-blue-900 py-3.5 text-sm font-bold text-white transition hover:bg-blue-950">{saved ? "Attendance saved" : "Save attendance"}</button></div></div></main>;
}
