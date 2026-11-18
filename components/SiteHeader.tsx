"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { appUrl, siteNavigation } from "@/lib/site-links";

export function SiteHeader({ experience = "formation" }: { experience?: "popular" | "formation" }) {
  const pathname = usePathname(), [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  return <header className="website-header"><div className="shell website-header-row">
    <Link href="/" aria-label="ParablePath home" onClick={close} className="website-brand">
      <Image src="/parablepath-full-logo.png" alt="" width={235} height={100} priority sizes="180px" />
    </Link>
    <nav className="website-desktop-nav" aria-label="Main navigation">{siteNavigation.map(([href, label]) => <Link key={href} href={href} aria-current={pathname.startsWith(href) ? "page" : undefined}>{label}</Link>)}</nav>
    <div className="website-header-actions"><a className="website-app-link" href={appUrl}>Open the app ↗</a><Link className="button-primary website-header-cta" href={experience === "popular" ? "/fun/assessment" : "/start"}>Take the assessment <span aria-hidden="true">→</span></Link></div>
    <button type="button" className="website-menu-button" aria-expanded={open} aria-controls="website-mobile-nav" onClick={() => setOpen(!open)}>{open ? "Close" : "Menu"} <span aria-hidden="true">{open ? "×" : "☰"}</span></button>
  </div><nav id="website-mobile-nav" className="website-mobile-nav shell" aria-label="Mobile navigation" hidden={!open} onKeyDown={(event) => { if (event.key === "Escape") { close(); document.querySelector<HTMLButtonElement>(".website-menu-button")?.focus(); } }}>
    {siteNavigation.map(([href, label]) => <Link key={href} href={href} onClick={close} aria-current={pathname.startsWith(href) ? "page" : undefined}>{label}</Link>)}<Link href="/start" onClick={close}>Take the assessment →</Link><a href={appUrl}>Open ParablePath.app ↗</a>
  </nav></header>;
}
