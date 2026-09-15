export function CrestLogo({ dark = false }: { dark?: boolean }) {
  return <div className="flex items-center gap-3" aria-label="Rusinga School">
    <div className={`relative flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white ${dark ? "ring-1 ring-white/20" : "shadow-sm"}`}>
      <img src="/logo/rusinga-crest.png" alt="" className="h-full w-full object-contain" />
    </div>
    <div className="leading-none"><div className={`text-[15px] font-bold tracking-tight ${dark ? "text-white" : "text-blue-950"}`}>Rusinga</div><div className={`mt-1 text-[9px] font-semibold uppercase tracking-[.22em] ${dark ? "text-white/60" : "text-silver"}`}>School clubs</div></div>
  </div>;
}
