import type { ResultIconName } from "@/lib/parablepath/popular/results";

const line = { fill: "none", stroke: "currentColor", strokeWidth: 2.2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

export function ResultIcon({ name, className }: { name: ResultIconName; className?: string }) {
  return <svg className={className} viewBox="0 0 64 64" aria-hidden="true">
    {name === "table" && <g {...line}><circle cx="32" cy="20" r="7"/><circle cx="16" cy="26" r="5"/><circle cx="48" cy="26" r="5"/><path d="M20 38c1-8 5-12 12-12s11 4 12 12M8 39c1-6 4-9 9-9 3 0 5 1 7 4m32 5c-1-6-4-9-9-9-3 0-5 1-7 4M10 42h44M16 42v13m32-13v13"/></g>}
    {name === "bridge" && <g {...line}><path d="M7 43h50M12 43V25m40 18V25M12 28c12 0 12-10 20-10s8 10 20 10M17 43V31m10 12V24m10 19V24m10 19V31M10 50c6-4 10-4 16 0s10 4 16 0 10-4 16 0"/></g>}
    {name === "healer" && <g {...line}><path d="M32 53S10 40 10 23c0-8 5-13 12-13 5 0 8 3 10 7 2-4 5-7 10-7 7 0 12 5 12 13 0 17-22 30-22 30Z"/><path d="m23 37 18-18 7 7-18 18m-8-6 7 7m5-21 7 7m-14 4 2 2m5-7 2 2m-14 0 2 2"/></g>}
    {name === "mentor" && <g {...line}><path d="M12 49h10V39h10V29h10V19h10M12 49V16h14v23M16 16v-4h6v4"/><path d="M18 9h2"/></g>}
    {name === "innovator" && <g {...line}><path d="M22 40c-5-4-8-9-8-15a18 18 0 0 1 36 0c0 6-3 11-8 15-2 2-3 4-3 7H25c0-3-1-5-3-7ZM25 52h14M28 57h8M32 3v5M9 25H4m56 0h-5M13 9l4 4m34-4-4 4"/></g>}
    {name === "multiplier" && <g {...line}><circle cx="32" cy="23" r="12"/><path d="M32 35v19M32 43c-9 0-15-4-17-11 9 0 15 4 17 11Zm0 5c9 0 15-4 17-11-9 0-15 4-17 11ZM20 15c-5 0-9 4-9 9m33-9c5 0 9 4 9 9"/></g>}
    {name === "waymaker" && <g {...line}><path d="M9 14h16v30H9zm30 0h16v30H39M25 29h14M32 23v12M25 44 15 55m24-11 10 11"/><path d="M32 54c-4-5-7-8-11-10m11 10c4-5 7-8 11-10"/></g>}
    {name === "awakener" && <g {...line}><path d="M10 39c5-12 12-18 22-18s17 6 22 18H10Zm-3 6h50M32 7v7M13 14l5 5m33-5-5 5M5 29h7m40 0h7M15 51c10-5 24-5 34 0"/></g>}
  </svg>;
}

export function SproutIcon({ className }: { className?: string }) { return <svg className={className} viewBox="0 0 48 48" aria-hidden="true"><g {...line}><path d="M24 39V21M24 27c-9 0-15-5-16-14 9 0 15 5 16 14Zm0-6c8 0 13-4 14-12-8 0-13 4-14 12ZM15 39h18"/></g></svg>; }
export function BookIcon({ className }: { className?: string }) { return <svg className={className} viewBox="0 0 48 48" aria-hidden="true"><g {...line}><path d="M24 39c-4-4-9-6-17-5V10c8-1 13 1 17 5m0 24c4-4 9-6 17-5V10c-8-1-13 1-17 5v24Z"/></g></svg>; }
export function StepsIcon({ className }: { className?: string }) { return <svg className={className} viewBox="0 0 48 48" aria-hidden="true"><g {...line}><path d="M17 7c4 1 6 7 4 13s-6 9-10 8-6-7-4-13 6-9 10-8Zm20 15c4 1 6 7 4 13s-6 9-10 8-6-7-4-13 6-9 10-8ZM9 34l9 2m11 12 9 2"/></g></svg>; }
export function BrokenHeartIcon() { return <svg viewBox="0 0 48 48" aria-hidden="true"><path fill="currentColor" d="M24 42S7 32 7 18c0-7 4-11 10-11 4 0 6 2 8 5 2-3 5-5 8-5 6 0 10 4 10 11 0 12-13 21-17 24l-4-10 6-6-7-5 5-9-2 30Z"/></svg>; }
export function WarningIcon() { return <svg viewBox="0 0 48 48" aria-hidden="true"><g {...line}><path d="M24 6 44 41H4L24 6Z"/><path d="M24 17v12m0 6h.01"/></g></svg>; }
export function CompassIcon() { return <svg viewBox="0 0 48 48" aria-hidden="true"><g {...line}><circle cx="24" cy="24" r="19"/><path d="m31 17-4 10-10 4 4-10 10-4Z"/></g></svg>; }
