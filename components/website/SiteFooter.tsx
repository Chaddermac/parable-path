import Link from "next/link";
import { appUrl } from "@/lib/site-links";
export function SiteFooter() {
  return <footer className="website-footer"><div className="shell website-footer-grid">
    <div><Link href="/" className="website-footer-brand">ParablePath</Link><p>People belong. Stories change.<br />God redeems.</p><span className="website-kicker">House of Stories</span></div>
    <nav aria-label="Explore ParablePath"><h2>Explore</h2><Link href="/how-it-works">How it works</Link><Link href="/story-types">Story Types</Link><Link href="/parables">Parables</Link><Link href="/start">Take the assessment</Link></nav>
    <nav aria-label="About and support"><h2>Stay connected</h2><Link href="/about">About ParablePath</Link><Link href="/contact">Contact & support</Link><a href={appUrl}>Open ParablePath.app ↗</a></nav>
  </div><div className="shell website-footer-bottom"><p>A reflection aid. Hold your result lightly.</p><nav aria-label="Policies"><Link href="/privacy">Privacy & care</Link><Link href="/terms">Terms of use</Link></nav></div></footer>;
}
