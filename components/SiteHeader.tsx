import Link from "next/link";

export function SiteHeader() {
  return <header className="shell flex h-20 items-center justify-between sm:h-24">
    <Link href="/" className="flex items-center gap-3 font-serif text-xl text-forest">
      <svg className="h-8 w-8 fill-none stroke-current" viewBox="0 0 42 42" aria-hidden="true"><path strokeWidth="1.7" d="M9 36V18C9 10.8 14.4 5 21 5s12 5.8 12 13v18M15 36V19c0-3.9 2.7-7 6-7s6 3.1 6 7v17M4 36h34" /></svg>
      ParablePath
    </Link>
    <span className="hidden text-xs uppercase tracking-[.16em] text-ink/50 sm:block">Recognize · Receive · Become</span>
  </header>;
}
