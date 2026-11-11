"use client";
import { useEffect, useRef, useState } from "react";
import { holidayDestination } from "@/lib/holiday/results";
import { trackHoliday } from "@/lib/holiday/analytics";
import type { Pattern } from "@/lib/holiday/scoring";
export function HolidayResultView({ leaders }: { leaders: Pattern[] }) {
  const tracked = useRef(false);
  useEffect(() => { if (!tracked.current) { trackHoliday("result_view", { leaders }); tracked.current = true; } }, [leaders]);
  return null;
}
export function HolidayActions({ names, path, story }: { names: string; path: string; story: Pattern }) {
  const [status, setStatus] = useState("");
  const [manual, setManual] = useState("");
  const [format, setFormat] = useState("square");
  const sharing = useRef(false);
  async function copy() {
    const url = new URL(path, window.location.origin).href;
    try { await navigator.clipboard.writeText(url); setStatus("Link copied. Ready to share!"); trackHoliday("copy_link"); }
    catch { setManual(url); setStatus("Copy the link below to share your story."); }
  }
  async function share() {
    if (sharing.current) return;
    sharing.current = true;
    try {
      if (navigator.share) {
        await navigator.share({ title: "My ParablePath Holiday Story", text: `${names}. What’s your holiday story?`, url: new URL(path, window.location.origin).href });
        trackHoliday("share"); setStatus("Your story is ready to spread some cheer.");
      } else await copy();
    } catch (error) { if (!(error instanceof Error && error.name === "AbortError")) await copy(); }
    finally { sharing.current = false; }
  }
  return <div className="holiday-share"><button className="button-primary" onClick={() => void share()}>{names.includes(" + ") ? "Share These Holiday Stories" : "Share My Holiday Story"} ↗</button><button className="button-secondary" onClick={() => void copy()}>Copy link</button><div className="winter-downloads"><label>Save your result card<select value={format} onChange={e => setFormat(e.target.value)}><option value="square">Square · 1080 × 1080</option><option value="portrait">Portrait · 1080 × 1350</option><option value="story">Story · 1080 × 1920</option></select></label><a className="holiday-back" href={`/api/holiday/card/${story}?download=1&format=${format}`} download onClick={() => trackHoliday("download_card")}>Download card ↓</a></div><p role="status">{status}</p>{manual && <input aria-label="Result link to copy" value={manual} readOnly onFocus={e => e.target.select()}/>}</div>;
}
export function HolidayConversion() {
  return <section className="holiday-conversion"><p className="holiday-eyebrow">There’s more to your story</p><h2>Your Holiday Story Is Just One Chapter.<br/>Discover Your Deeper Story.</h2><a className="button-primary" href={holidayDestination} onClick={() => trackHoliday("app_click")}>Explore Your Deeper Story ↗</a></section>;
}
