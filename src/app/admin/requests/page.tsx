"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Check, Clock3, X } from "lucide-react";
import { createSupabaseBrowserClient } from "@/lib/supabase-browser";

type ClubRequest = { id: string; student_name: string; class_year: string; contact: string | null; reason: string; status: "pending" | "approved" | "declined"; requested_at: string; current_club: { name: string } | null; requested_club: { name: string } | null };

export default function RequestsPage() {
  const [requests, setRequests] = useState<ClubRequest[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const supabase = createSupabaseBrowserClient();
    if (!supabase) { setLoading(false); return; }
    supabase.from("club_change_requests").select("*, current_club:clubs!current_club_id(name), requested_club:clubs!requested_club_id(name)").order("requested_at", { ascending: false }).then(({ data }) => { setRequests((data || []) as ClubRequest[]); setLoading(false); });
  }, []);
  async function setStatus(request: ClubRequest, status: "approved" | "declined") {
    const supabase = createSupabaseBrowserClient();
    if (supabase) { const { data: { user } } = await supabase.auth.getUser(); await supabase.from("club_change_requests").update({ status, reviewed_at: new Date().toISOString(), reviewed_by: user?.id || null }).eq("id", request.id); }
    setRequests((items) => items.map((item) => item.id === request.id ? { ...item, status } : item));
  }
  return <main className="min-h-[calc(100vh-76px)] bg-[#f7fafc] px-5 py-10 sm:px-8 lg:px-10"><div className="mx-auto max-w-5xl"><Link href="/admin" className="inline-flex items-center gap-2 text-xs font-bold text-blue-900"><ArrowLeft size={14} /> Back to overview</Link><div className="mt-9"><p className="text-[11px] font-bold uppercase tracking-[.2em] text-violet">Admin / change requests</p><h1 className="mt-3 text-3xl font-bold tracking-tight text-blue-950">Club change requests</h1><p className="mt-2 text-sm text-slate-500">Review student requests for the current school year.</p></div>{loading ? <div className="mt-8 rounded-2xl bg-white p-8 text-center text-sm text-slate-400 shadow-card">Loading requests...</div> : !requests.length ? <div className="mt-8 rounded-2xl border border-dashed border-silver bg-white p-12 text-center shadow-card"><Clock3 className="mx-auto text-silver" size={28} /><p className="mt-4 text-sm font-bold text-blue-950">No change requests yet</p><p className="mt-2 text-xs text-slate-400">New student requests will appear here.</p></div> : <div className="mt-8 space-y-3">{requests.map((request) => <article key={request.id} className="rounded-2xl border border-slate-100 bg-white p-5 shadow-card sm:p-6"><div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start"><div><div className="flex flex-wrap items-center gap-2"><h2 className="font-bold text-blue-950">{request.student_name}</h2><span className="rounded-full bg-slate-100 px-2 py-1 text-[10px] font-semibold text-slate-500">{request.class_year}</span><span className={`rounded-full px-2 py-1 text-[10px] font-bold capitalize ${request.status === "pending" ? "bg-[#fff8cf] text-[#8b6d00]" : request.status === "approved" ? "bg-[#e7f4e9] text-shamrock" : "bg-[#fff0e5] text-orange"}`}>{request.status}</span></div><p className="mt-3 text-sm text-slate-600"><b className="text-blue-950">{request.current_club?.name || "Current club"}</b><span className="mx-2 text-silver">→</span><b className="text-violet">{request.requested_club?.name || "Requested club"}</b></p><p className="mt-3 max-w-2xl text-xs leading-5 text-slate-500">{request.reason}</p>{request.contact && <p className="mt-2 text-[11px] font-semibold text-slate-400">Contact: {request.contact}</p>}</div>{request.status === "pending" && <div className="flex shrink-0 gap-2"><button onClick={() => setStatus(request, "declined")} className="flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-xs font-bold text-slate-500 transition hover:border-orange hover:text-orange"><X size={14} /> Decline</button><button onClick={() => setStatus(request, "approved")} className="flex items-center gap-1.5 rounded-lg bg-shamrock px-3 py-2 text-xs font-bold text-white transition hover:bg-[#267433]"><Check size={14} /> Approve</button></div>}</div></article>)}</div>}</div></main>;
}
