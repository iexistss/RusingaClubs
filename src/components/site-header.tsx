"use client";
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { CrestLogo } from "./logo";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return <header className="relative z-20 border-b border-slate-100 bg-white/95 backdrop-blur">
    <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10">
      <Link href="/" onClick={() => setOpen(false)}><CrestLogo /></Link>
      <nav className="hidden items-center gap-8 text-[13px] font-semibold text-slate-500 md:flex">
        <Link className="transition hover:text-blue-900" href="/#clubs">Explore clubs</Link><Link className="transition hover:text-blue-900" href="/join">How it works</Link>
      </nav>
      <div className="hidden items-center gap-5 md:flex"><Link className="text-[13px] font-semibold text-blue-900 transition hover:text-violet" href="/login">Club leader sign in</Link><Link className="rounded-full bg-blue-900 px-5 py-3 text-[13px] font-semibold text-white shadow-sm transition hover:bg-blue-950" href="/join">Join a club <span className="ml-2">→</span></Link></div>
      <button aria-label="Toggle menu" className="outline-ring rounded-lg p-2 text-blue-900 md:hidden" onClick={() => setOpen(!open)}>{open ? <X size={22} /> : <Menu size={22} />}</button>
    </div>
    {open && <div className="border-t border-slate-100 bg-white px-5 py-5 md:hidden"><nav className="flex flex-col gap-4 text-sm font-semibold text-slate-600"><Link href="/#clubs" onClick={() => setOpen(false)}>Explore clubs</Link><Link href="/join" onClick={() => setOpen(false)}>How it works</Link><Link className="mt-2 rounded-full bg-blue-900 px-4 py-3 text-center text-white" href="/join" onClick={() => setOpen(false)}>Join a club →</Link><Link className="text-center text-blue-900" href="/login" onClick={() => setOpen(false)}>Club leader sign in</Link></nav></div>}
  </header>;
}
