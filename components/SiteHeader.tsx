import Image from "next/image";
import Link from "next/link";

export function SiteHeader({ experience = "formation" }: { experience?: "popular" | "formation" }) {
  const popular = experience === "popular";
  return <header className={`shell flex h-20 items-center justify-between sm:h-24 ${popular ? "popular-header" : ""}`}>
    <Link href="/" aria-label="ParablePath home" className={`flex items-center gap-3 text-xl ${popular ? "popular-brand" : "font-serif text-forest"}`}>
      <Image src="/parablepath-logo.png" alt="" width={48} height={48} priority className={`h-12 w-12 object-contain ${popular ? "" : "mix-blend-multiply"}`} />
      <span>ParablePath</span>
    </Link>
    <span className={`hidden text-xs uppercase tracking-[.16em] sm:block ${popular ? "popular-header-note" : "text-ink/50"}`}>{popular ? "What’s your Story Room?" : "Recognize · Receive · Become"}</span>
  </header>;
}
