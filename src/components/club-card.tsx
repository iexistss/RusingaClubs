import Link from "next/link";
import { ArrowRight, CalendarDays, Clock3 } from "lucide-react";
import type { Club } from "@/lib/types";

const tones: Record<string, string> = { violet: "bg-[#f7eafa] text-violet", orange: "bg-[#fff0e5] text-orange", yellow: "bg-[#fff8cf] text-[#a17700]", green: "bg-[#e7f4e9] text-shamrock", blue: "bg-[#e4eff9] text-blue-900" };
export function ClubCard({ club }: { club: Club }) {
  return <article className="group flex min-h-[284px] flex-col rounded-[22px] border border-slate-100 bg-white p-6 shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-soft">
    <div className="flex items-start justify-between"><div className={`flex h-12 w-12 items-center justify-center rounded-2xl text-2xl font-semibold ${tones[club.color] || tones.blue}`}>{club.icon}</div><span className="rounded-full bg-slate-50 px-3 py-1.5 text-[11px] font-semibold text-slate-400">{club.members ? `${club.members} members` : "Open registration"}</span></div>
    <div className="mt-6 flex flex-wrap items-center gap-2"><h3 className="text-xl font-bold tracking-tight text-blue-950">{club.name}</h3>{club.subscriptionRequired && <span className="rounded-full bg-[#fff0e5] px-2 py-1 text-[9px] font-bold uppercase tracking-wide text-orange">Subscription</span>}</div><p className="mt-2 max-w-[290px] text-[13px] leading-6 text-slate-500">{club.description}</p>
    <div className="mt-auto flex flex-wrap items-center gap-4 pt-5 text-[11px] font-semibold text-slate-400"><span className="rounded-full bg-[#f0f6fb] px-2 py-1 text-blue-900">{club.audience}</span><span className="flex items-center gap-1.5"><CalendarDays size={13} className="text-silver" />{club.meeting_day}</span><span className="flex items-center gap-1.5"><Clock3 size={13} className="text-silver" />{club.meeting_time}</span></div>
    <Link href={`/join?club=${club.id}`} className="outline-ring mt-5 flex items-center justify-between border-t border-slate-100 pt-4 text-[12px] font-bold text-blue-900"><span>Join this club</span><ArrowRight size={15} className="transition-transform group-hover:translate-x-1" /></Link>
  </article>;
}
