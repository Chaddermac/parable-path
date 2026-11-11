import type { CSSProperties } from "react";
import { holidayArtwork } from "@/lib/holiday/artwork";
import type { Pattern } from "@/lib/holiday/scoring";
export function WinterStar({ className = "" }: { className?: string }) {
  return <svg className={className} viewBox="0 0 40 40" fill="none" aria-hidden="true"><path d="m20 1 5 14 14 5-14 5-5 14-5-14L1 20l14-5Z" fill="currentColor"/><path d="M20 8v24M8 20h24" stroke="white" strokeOpacity=".5"/></svg>;
}
export function WinterTree({ className = "" }: { className?: string }) {
  return <svg className={className} viewBox="0 0 70 100" aria-hidden="true"><path d="M35 3 14 32h11L6 58h14L0 87h70L50 58h14L45 32h11Z" fill="#557f70"/><path d="m35 3-21 29h11L6 58h14L0 87h15l20-20 19 20h16L50 58h14L45 32h11Z" fill="#6e948b" fillOpacity=".35"/><path d="m35 3-9 13h18Zm-9 37-9 12h14Zm9 24-8 13h17Z" fill="#f8fcff"/><path d="M31 87h8v13h-8Z" fill="#a7b7c6"/></svg>;
}
export function WinterGift({ className = "" }: { className?: string }) {
  return <svg className={className} viewBox="0 0 70 80" aria-hidden="true"><rect x="8" y="31" width="54" height="44" rx="5" fill="#e7e2ff"/><rect x="3" y="24" width="64" height="15" rx="4" fill="#d2c7f0"/><path d="M31 24h8v51h-8Z" fill="#df7773"/><path d="M35 25C2 23 12 1 25 12l10 13Zm0 0c33-2 23-24 10-13L35 25Z" fill="none" stroke="#df7773" strokeWidth="5"/></svg>;
}
export function TypologyGlobe({ pattern, large = false }: { pattern: Pattern; large?: boolean }) {
  const art = holidayArtwork[pattern];
  return <div className={`winter-type-globe ${large ? "winter-type-globe-large" : ""}`} style={{ "--type-accent": art.color } as CSSProperties} aria-hidden="true">
    <div className="winter-glass"><span className="winter-glass-shine"/><img src={`/holiday/artwork/${art.id}.webp`} alt="" width="400" height="400" loading={large ? "eager" : "lazy"}/><span className="winter-globe-snow"/><span className="winter-globe-dots"/></div>
    <div className="winter-globe-base"><WinterStar/></div>
  </div>;
}
export function WinterAtmosphere() {
  return <div className="winter-atmosphere" aria-hidden="true"><div className="winter-snowfall">{Array.from({ length: 16 }, (_,i) => <i key={i} style={{ left: `${i * 6.5}%`, animationDelay: `${-i * 1.7}s`, animationDuration: `${19 + i % 5 * 3}s` }}/>)}</div><WinterTree className="winter-edge-tree winter-edge-tree-left"/><WinterTree className="winter-edge-tree winter-edge-tree-right"/><div className="winter-snowbank winter-snowbank-back"/><div className="winter-snowbank"/></div>;
}
