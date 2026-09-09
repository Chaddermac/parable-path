import Image from "next/image";
import Link from "next/link";

export function SiteHeader({ experience = "formation" }: { experience?: "popular" | "formation" }) {
  const popular = experience === "popular";
  return <header className={`shell flex h-20 items-center justify-between sm:h-24 ${popular ? "popular-header" : ""}`}>
    <Link href="/" aria-label="ParablePath home" className="flex items-center">
      <Image src="/parablepath-full-logo.png" alt="" width={235} height={100} priority sizes="(max-width: 639px) 151px, 188px" className="h-16 w-auto object-contain sm:h-20" />
    </Link>
    <span className={`hidden text-xs uppercase tracking-[.16em] sm:block ${popular ? "popular-header-note" : "text-ink/50"}`}>{popular ? "What’s your Story Room?" : "Recognize · Receive · Become"}</span>
  </header>;
}
