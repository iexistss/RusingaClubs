"use client";
import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Check, Plus, Save, ShieldCheck, Trash2 } from "lucide-react";
import { clubs as demoClubs, type Club } from "@/lib/types";
import { createSupabaseBrowserClient } from "@/lib/supabase-browser";
import { SCHOOL_YEAR } from "@/lib/school";

type Access = "checking" | "prefect" | "denied";
type ClubForm = Pick<Club, "name" | "description" | "meeting_day" | "meeting_time" | "leader_name" | "leader_contact">;
const emptyClub: ClubForm = { name: "", description: "", meeting_day: "Monday", meeting_time: "3:45 PM", leader_name: "", leader_contact: "" };

export default function ManageClubsPage() {
  const [access, setAccess] = useState<Access>("checking");
  const [clubList, setClubList] = useState<Club[]>(demoClubs);
  const [form, setForm] = useState<ClubForm>(emptyClub);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const supabase = createSupabaseBrowserClient();
    if (!supabase) { setAccess("prefect"); return; }
    const client = supabase;
    async function load() {
      const { data: { user } } = await client.auth.getUser();
      if (!user) { window.location.href = "/login"; return; }
      const { data: profile } = await client.from("profiles").select("role").eq("id", user.id).single();
      if (profile?.role !== "prefect") { setAccess("denied"); return; }
      const { data } = await client.from("clubs").select("*").order("name");
      if (data) setClubList(data.map((club, index) => ({ ...club, color: demoClubs[index % demoClubs.length].color, icon: demoClubs[index % demoClubs.length].icon, members: 0 })));
      setAccess("prefect");
    }
    load();
  }, []);

  async function saveLeader(club: Club) {
    const supabase = createSupabaseBrowserClient();
    if (supabase) await supabase.from("clubs").update({ leader_name: club.leader_name, leader_contact: club.leader_contact || null }).eq("id", club.id);
    setMessage(`${club.name} leader details saved.`); window.setTimeout(() => setMessage(""), 2400);
  }
  async function addClub(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const supabase = createSupabaseBrowserClient();
    if (supabase) {
      const { data } = await supabase.from("clubs").insert(form).select("*").single();
      if (data) setClubList((items) => [...items, { ...data, color: "blue", icon: "✦", members: 0 }]);
    } else setClubList((items) => [...items, { ...form, audience: "All years", id: `local-${Date.now()}`, color: "blue", icon: "✦", members: 0 }]);
    setForm(emptyClub); setMessage("Club added for the current school year."); window.setTimeout(() => setMessage(""), 2400);
  }
  async function removeClub(club: Club) {
    if (!window.confirm(`Remove ${club.name}? Existing registrations will be deleted.`)) return;
    const supabase = createSupabaseBrowserClient();
    if (supabase) await supabase.from("clubs").delete().eq("id", club.id);
    setClubList((items) => items.filter((item) => item.id !== club.id));
  }

  if (access === "checking") return <main className="flex min-h-[calc(100vh-76px)] items-center justify-center bg-[#f7fafc] text-sm text-slate-500">Checking prefect access...</main>;
  if (access === "denied") return <main className="flex min-h-[calc(100vh-76px)] items-center justify-center bg-[#f7fafc] px-5"><div className="max-w-md rounded-2xl bg-white p-8 text-center shadow-card"><ShieldCheck className="mx-auto text-orange" size={30} /><h1 className="mt-5 text-2xl font-bold text-blue-950">Prefect access required</h1><p className="mt-3 text-sm leading-6 text-slate-500">Only the Clubs Prefect can add clubs, remove clubs, or edit club leaders.</p><Link href="/admin" className="mt-6 inline-block text-sm font-bold text-blue-900 underline underline-offset-4">Back to dashboard</Link></div></main>;
  return <main className="min-h-[calc(100vh-76px)] bg-[#f7fafc] px-5 py-10 sm:px-8 lg:px-10"><div className="mx-auto max-w-6xl"><Link href="/admin" className="inline-flex items-center gap-2 text-xs font-bold text-blue-900"><ArrowLeft size={14} /> Back to overview</Link><div className="mt-9 flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><p className="text-[11px] font-bold uppercase tracking-[.2em] text-violet">Clubs Prefect / management</p><h1 className="mt-3 text-3xl font-bold tracking-tight text-blue-950">Keep clubs moving.</h1><p className="mt-2 text-sm text-slate-500">Manage club details and leaders for the {SCHOOL_YEAR} school year.</p></div><div className="flex items-center gap-2 rounded-full bg-[#e7f4e9] px-3 py-2 text-[11px] font-bold text-shamrock"><ShieldCheck size={14} /> Prefect controls active</div></div>{message && <div className="mt-6 flex items-center gap-2 rounded-xl bg-[#e7f4e9] px-4 py-3 text-xs font-bold text-shamrock"><Check size={15} /> {message}</div>}<div className="mt-8 grid gap-6 lg:grid-cols-[1.25fr_.75fr]"><section className="rounded-2xl border border-slate-100 bg-white p-6 shadow-card sm:p-7"><div className="flex items-center justify-between"><div><h2 className="font-bold text-blue-950">Club leaders</h2><p className="mt-1 text-xs text-slate-400">Update who runs each club.</p></div><span className="text-xs font-bold text-violet">{clubList.length} clubs</span></div><div className="mt-6 space-y-3">{clubList.map((club) => <div key={club.id} className="rounded-xl bg-slate-50 p-4"><div className="flex items-center justify-between gap-3"><p className="text-sm font-bold text-blue-950">{club.name}</p><button onClick={() => removeClub(club)} className="rounded-lg p-2 text-slate-400 transition hover:bg-[#fff0e5] hover:text-orange" aria-label={`Remove ${club.name}`}><Trash2 size={15} /></button></div><div className="mt-3 grid gap-2 sm:grid-cols-[1fr_1fr_auto]"><input value={club.leader_name} onChange={(event) => setClubList((items) => items.map((item) => item.id === club.id ? { ...item, leader_name: event.target.value } : item))} placeholder="Leader name" className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-blue-950 outline-none focus:border-blue-900" /><input value={club.leader_contact || ""} onChange={(event) => setClubList((items) => items.map((item) => item.id === club.id ? { ...item, leader_contact: event.target.value } : item))} placeholder="Contact" className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-blue-950 outline-none focus:border-blue-900" /><button onClick={() => saveLeader(club)} className="flex items-center justify-center gap-1.5 rounded-lg bg-blue-900 px-3 py-2 text-xs font-bold text-white transition hover:bg-blue-950"><Save size={13} /> Save</button></div></div>)}</div></section><section className="h-fit rounded-2xl border border-slate-100 bg-white p-6 shadow-card sm:p-7"><div><h2 className="font-bold text-blue-950">Add a club</h2><p className="mt-1 text-xs leading-5 text-slate-400">New clubs appear on the public registration page immediately.</p></div><form onSubmit={addClub} className="mt-6 space-y-3"><input required value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} placeholder="Club name" className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-xs outline-none focus:border-blue-900" /><textarea required value={form.description} onChange={(event) => setForm({ ...form, description: event.target.value })} placeholder="Short description" rows={3} className="w-full resize-none rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-xs outline-none focus:border-blue-900" /><div className="grid grid-cols-2 gap-2"><input required value={form.meeting_day} onChange={(event) => setForm({ ...form, meeting_day: event.target.value })} placeholder="Meeting day" className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-xs outline-none focus:border-blue-900" /><input required value={form.meeting_time} onChange={(event) => setForm({ ...form, meeting_time: event.target.value })} placeholder="Meeting time" className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-xs outline-none focus:border-blue-900" /></div><input value={form.leader_name} onChange={(event) => setForm({ ...form, leader_name: event.target.value })} placeholder="Leader name (optional)" className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-xs outline-none focus:border-blue-900" /><button className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-900 py-3.5 text-xs font-bold text-white transition hover:bg-blue-950"><Plus size={15} /> Add club</button></form></section></div></div></main>;
}
