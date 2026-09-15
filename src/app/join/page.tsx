"use client";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import Link from "next/link";
import { clubs as demoClubs, type Club } from "@/lib/types";
import { createSupabaseBrowserClient } from "@/lib/supabase-browser";
import { SCHOOL_YEAR, TERM_END, TERM_START } from "@/lib/school";

export default function JoinPage() {
  const [availableClubs, setAvailableClubs] = useState<Club[]>(demoClubs);
  const [selected, setSelected] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [busy, setBusy] = useState(false);
  const [selectionMessage, setSelectionMessage] = useState("");

  useEffect(() => {
    const initial = new URLSearchParams(window.location.search).get("club");
    if (initial) setSelected([initial]);
    const supabase = createSupabaseBrowserClient();
    if (supabase) supabase.from("clubs").select("*").order("name").then(({ data }) => {
      if (data?.length) setAvailableClubs(data.map((club, index) => ({ ...club, color: demoClubs[index % demoClubs.length].color, icon: demoClubs[index % demoClubs.length].icon, members: 0 })));
    });
  }, []);

  const toggle = (id: string) => {
    setSelectionMessage("");
    setSelected((items) => {
      if (items.includes(id)) return items.filter((item) => item !== id);
      if (items.length >= 2) { setSelectionMessage("You can select up to two clubs for this school year."); return items; }
      return [...items, id];
    });
  };
  const selectedNames = useMemo(() => availableClubs.filter((club) => selected.includes(club.id)).map((club) => club.name), [availableClubs, selected]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setBusy(true);
    const form = new FormData(event.currentTarget); const supabase = createSupabaseBrowserClient();
    if (supabase) {
      const { data: student, error: studentError } = await supabase.from("students").insert({ name: form.get("name"), class_year: form.get("class_year"), contact: form.get("contact") || null }).select("id").single();
      if (!studentError && student) await supabase.from("registrations").insert(selected.map((clubId) => ({ student_id: student.id, club_id: clubId, school_year: SCHOOL_YEAR, date_registered: new Date().toISOString() })));
    } else await new Promise((resolve) => window.setTimeout(resolve, 550));
    setBusy(false); setSubmitted(true);
  }

  if (submitted) return <main className="min-h-[calc(100vh-76px)] bg-[#f0f6fb] px-5 py-20 sm:px-8"><div className="mx-auto max-w-xl rounded-[28px] bg-white p-8 text-center shadow-soft sm:p-14"><div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#e7f4e9] text-shamrock"><Check size={30} /></div><p className="mt-7 text-[11px] font-bold uppercase tracking-[.2em] text-shamrock">You&apos;re in</p><h1 className="mt-3 text-4xl font-bold tracking-tight text-blue-950">Welcome to the club.</h1><p className="serif mt-5 text-sm leading-7 text-slate-500">Your registration is on its way to the club leaders for the {SCHOOL_YEAR} school year.</p><div className="mt-8 rounded-2xl bg-slate-50 p-4 text-left text-sm font-semibold text-blue-950">{selectedNames.join(" + ")}</div><div className="mt-8 flex flex-wrap justify-center gap-5 text-sm font-bold"><Link href="/request-change" className="text-violet underline underline-offset-8">Request a club change</Link><Link href="/" className="text-blue-900 underline underline-offset-8">Back to all clubs</Link></div></div></main>;

  return <main className="min-h-[calc(100vh-76px)] bg-[#f0f6fb] px-5 py-12 sm:px-8 sm:py-20"><div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[.7fr_1.3fr] lg:gap-24"><div><Link href="/" className="inline-flex items-center gap-2 text-xs font-bold text-blue-900"><ArrowLeft size={14} /> Back to clubs</Link><p className="mt-12 text-[11px] font-bold uppercase tracking-[.2em] text-violet">Make a start</p><h1 className="mt-3 text-4xl font-bold tracking-tight text-blue-950 sm:text-5xl">Join the<br /><span className="text-violet">conversation.</span></h1><p className="serif mt-6 max-w-sm text-sm leading-7 text-slate-500">Tell us a little about yourself and choose up to two clubs to explore this school year.</p><div className="mt-10 flex items-center gap-3 text-xs font-semibold text-slate-500"><span className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-900 text-white">2</span> Club choices per student, per school year</div><Link href="/request-change" className="mt-5 inline-block text-xs font-bold text-violet underline underline-offset-4">Already registered? Request a change</Link></div><form onSubmit={submit} className="rounded-[26px] bg-white p-6 shadow-soft sm:p-9"><div className="grid gap-5 sm:grid-cols-2"><label className="text-xs font-bold text-blue-950 sm:col-span-2">Your full name<input required name="name" placeholder="e.g. Amina Wambui" className="outline-ring mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-normal text-slate-700 placeholder:text-slate-400 focus:border-blue-900 focus:bg-white" /></label><label className="text-xs font-bold text-blue-950">Class / year<select required name="class_year" defaultValue="" className="outline-ring mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-normal text-slate-700 focus:border-blue-900 focus:bg-white"><option value="" disabled>Select your class</option><option>Year 7</option><option>Year 8</option><option>Year 9</option><option>Year 10</option><option>Year 11</option><option>Year 12</option><option>Year 13</option></select></label><label className="text-xs font-bold text-blue-950">Email or phone <span className="font-normal text-slate-400">(optional)</span><input name="contact" placeholder="How can we reach you?" className="outline-ring mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-normal text-slate-700 placeholder:text-slate-400 focus:border-blue-900 focus:bg-white" /></label></div><div className="mt-8 border-t border-slate-100 pt-7"><div className="flex items-end justify-between"><div><p className="text-xs font-bold text-blue-950">Choose your clubs</p><p className="mt-1 text-[11px] text-slate-400">Choose one or two. Subscription clubs may have an extra fee.</p></div><span className="text-[11px] font-semibold text-violet">{selected.length} / 2 selected</span></div>{selectionMessage && <p className="mt-3 rounded-lg bg-[#fff8cf] px-3 py-2 text-[11px] font-bold text-[#8b6d00]">{selectionMessage}</p>}<div className="mt-4 grid max-h-[520px] gap-2 overflow-y-auto pr-1 sm:grid-cols-2">{availableClubs.map((club) => <button type="button" key={club.id} onClick={() => toggle(club.id)} className={`outline-ring flex items-start gap-3 rounded-xl border p-3.5 text-left transition ${selected.includes(club.id) ? "border-blue-900 bg-[#f0f6fb]" : "border-slate-100 bg-white hover:border-silver"}`}><span className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-sm ${selected.includes(club.id) ? "bg-blue-900 text-white" : "bg-slate-100 text-slate-400"}`}>{selected.includes(club.id) ? <Check size={15} /> : club.icon}</span><span><span className="block text-xs font-bold text-blue-950">{club.name}</span><span className="mt-1 block text-[10px] text-slate-400">{club.audience}{club.subscriptionRequired ? " · Subscription" : ""}</span></span></button>)}</div></div><button disabled={!selected.length || busy} className="mt-8 flex w-full items-center justify-center rounded-xl bg-blue-900 py-4 text-sm font-bold text-white transition hover:bg-blue-950 disabled:cursor-not-allowed disabled:opacity-40">{busy ? "Sending your registration..." : "Send my registration"}<ArrowRight size={16} className="ml-2" /></button><p className="mt-4 text-center text-[10px] leading-5 text-slate-400">Registration is open for the {SCHOOL_YEAR} school year ({TERM_START}–{TERM_END}).</p></form></div></main>;
}
