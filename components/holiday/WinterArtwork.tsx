import type { CSSProperties } from "react";
import { holidayArtwork } from "@/lib/holiday/artwork";
import type { Pattern } from "@/lib/holiday/scoring";
export function WinterStar({ className = "" }: { className?: string }) {
  return <svg className={className} viewBox="0 0 40 40" fill="none" aria-hidden="true"><path d="m20 1 5 14 14 5-14 5-5 14-5-14L1 20l14-5Z" fill="currentColor"/><path d="M20 8v24M8 20h24" stroke="white" strokeOpacity=".5"/></svg>;
}
export function WinterSnowflake({ className = "" }: { className?: string }) {
  return <svg className={className} viewBox="0 0 64 64" fill="none" aria-hidden="true"><g stroke="currentColor" strokeWidth="2.3" strokeLinecap="round">{[0,60,120].map(angle=><g key={angle} transform={`rotate(${angle} 32 32)`}><path d="M32 4v56m-8-47 8 7 8-7m-16 38 8-7 8 7M24 5l8 7 8-7m-16 54 8-7 8 7"/></g>)}</g></svg>;
}
export function WinterHeart() {
  return <svg viewBox="0 0 48 48" fill="none" aria-hidden="true"><path d="M24 41S5 30 5 17C5 6 18 3 24 13 30 3 43 6 43 17c0 13-19 24-19 24Z" stroke="currentColor" strokeWidth="2.4"/></svg>;
}
export function WinterTree({ className = "" }: { className?: string }) {
  return <svg className={className} viewBox="0 0 70 100" aria-hidden="true"><path d="M31 81h8v19h-8Z" fill="#798d99"/><path d="M35 2C29 15 24 24 16 33l9-2C20 43 12 53 6 59l14-2C15 69 7 81 1 87c12 3 23-1 34-5 11 4 23 8 34 5-6-6-14-18-19-30l14 2c-6-6-14-16-19-28l9 2C46 24 41 15 35 2Z" fill="#4e7b72"/><path d="M35 5C35 30 31 58 23 85l12-3c11 4 23 8 34 5-6-6-14-18-19-30l14 2c-6-6-14-16-19-28l9 2C46 24 41 15 35 5Z" fill="#648f87" fillOpacity=".7"/><path d="M35 2c-3 7-7 14-11 21 4 1 8-1 11-3 4 3 7 4 11 3C42 16 38 9 35 2Zm-8 35c-3 7-7 13-11 18 7 2 13-2 18-5 5 4 13 7 20 5-4-5-8-12-11-18-5 6-11 7-16 0Zm-5 27C18 71 14 77 10 82c8 1 17-3 24-7 7 4 17 8 25 7-4-5-9-13-12-18-9 7-17 7-25 0Z" fill="#f8fbff"/><g fill="#ffe5a2"><circle cx="30" cy="29" r="1.6"/><circle cx="43" cy="43" r="1.7"/><circle cx="24" cy="60" r="1.7"/><circle cx="42" cy="72" r="1.7"/><circle cx="18" cy="79" r="1.6"/></g></svg>;
}
export function WinterGift({ className = "" }: { className?: string }) {
  return <svg className={className} viewBox="0 0 70 80" aria-hidden="true"><rect x="8" y="31" width="54" height="44" rx="5" fill="#e7e2ff"/><rect x="3" y="24" width="64" height="15" rx="4" fill="#d2c7f0"/><path d="M31 24h8v51h-8Z" fill="#df7773"/><path d="M35 25C2 23 12 1 25 12l10 13Zm0 0c33-2 23-24 10-13L35 25Z" fill="none" stroke="#df7773" strokeWidth="5"/></svg>;
}
export function TypologyGlobe({ pattern, large = false }: { pattern: Pattern; large?: boolean }) {
  const art = holidayArtwork[pattern];
  return <div className={`winter-type-globe ${large ? "winter-type-globe-large" : ""}`} style={{ "--type-accent": art.color } as CSSProperties} aria-hidden="true">
    <div className="winter-glass"><span className="winter-glass-shine"/><img src={`/holiday/artwork/${art.id}.webp`} alt="" width="400" height="400" loading={large ? "eager" : "lazy"}/><WinterTree className="reference-globe-pine reference-globe-pine-left"/><WinterTree className="reference-globe-pine reference-globe-pine-right"/><span className="winter-globe-snow"/><span className="winter-globe-dots"/></div>
    <div className="winter-globe-base"><WinterStar/></div>
  </div>;
}
export function WinterAtmosphere() {
  return <div className="winter-atmosphere" aria-hidden="true"><div className="winter-snowfall">{Array.from({ length: 16 }, (_,i) => <i key={i} style={{ left: `${i * 6.5}%`, animationDelay: `${-i * 1.7}s`, animationDuration: `${19 + i % 5 * 3}s` }}/>)}</div><div className="reference-distant-pines">{Array.from({length:8},(_,i)=><WinterTree key={i} className={`reference-pine reference-pine-${i}`}/>)}</div><WinterSnowflake className="reference-snowflake reference-snowflake-one"/><WinterSnowflake className="reference-snowflake reference-snowflake-two"/><WinterStar className="reference-atmos-star"/><div className="winter-snowbank winter-snowbank-back"/><div className="winter-snowbank"/><div className="reference-lower-snowbank"/></div>;
}
