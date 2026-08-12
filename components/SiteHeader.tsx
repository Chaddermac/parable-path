import Image from "next/image";
import Link from "next/link";

export function SiteHeader() {
  return <header className="shell flex h-20 items-center justify-between sm:h-24">
    <Link href="/" aria-label="ParablePath home" className="flex items-center gap-3 font-serif text-xl text-forest">
      <Image src="/parablepath-logo.png" alt="" width={48} height={48} priority className="h-12 w-12 object-contain mix-blend-multiply" />
      <span>ParablePath</span>
    </Link>
    <span className="hidden text-xs uppercase tracking-[.16em] text-ink/50 sm:block">Recognize · Receive · Become</span>
  </header>;
}
