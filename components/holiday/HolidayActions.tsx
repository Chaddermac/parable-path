"use client";
import { holidayCardFormats, holidayCardPath, effectiveCardMode, type HolidayCardFormat, type HolidayCardMode } from "@/lib/holiday/card-formats";
import { useEffect, useRef, useState } from "react";
import { HolidayAppCTA } from "./HolidayEngagement";
import { holidayShareHooks } from "@/lib/holiday/share-copy";
import { holidayResults } from "@/lib/holiday/results";
import { trackHoliday, resultFitOptions } from "@/lib/holiday/analytics";
import type { Pattern, Interpretation } from "@/lib/holiday/scoring";
export function HolidayResultView({ leaders, interpretation = "standard" }: { leaders: Pattern[]; interpretation?: Interpretation }) {
  const tracked = useRef(false);
  useEffect(() => { if (!tracked.current) { trackHoliday("result_view", { leaders, interpretation }); tracked.current = true; } }, [leaders, interpretation]);
  return null;
}
export function HolidayActions({ names, path, story, tentative = false }: { names: string; path: string; story: Pattern; tentative?: boolean }) {
  const [status, setStatus] = useState("");
  const [manual, setManual] = useState("");
  const [format, setFormat] = useState<HolidayCardFormat>("square");
  const [selectedMode, setSelectedMode] = useState<HolidayCardMode>("share");
  const mode = effectiveCardMode(format, selectedMode);
  const exportEvent = { story, format, card_mode:mode };
  const sharing = useRef(false);
  async function copy() {
    const url = new URL(path, window.location.origin).href;
    try { await navigator.clipboard.writeText(url); setStatus("Link copied. Ready to share!"); trackHoliday("copy_link", exportEvent); }
    catch { setManual(url); setStatus("Copy the link below to share your story."); }
  }
  async function share() {
    if (sharing.current) return;
    sharing.current = true;
    try {
      if (navigator.share) {
        await navigator.share({ title: "My ParablePath Holiday Story", text: names.includes(" + ") ? `${names}. More than one story may fit. What’s yours?` : `${names}. ${holidayShareHooks[story]} What’s your holiday story?`, url: new URL(path, window.location.origin).href });
        trackHoliday("share", exportEvent); setStatus("Your story is ready to spread some cheer.");
      } else await copy();
    } catch (error) { if (!(error instanceof Error && error.name === "AbortError")) await copy(); }
    finally { sharing.current = false; }
  }
  const dimensions=holidayCardFormats;
  return <>
    <div className="holiday-export-choices"><h3>Share it. Or keep it close.</h3><p>Share Cards are made for the group chat. Keep Cards hold the practical Survival Guide.</p><div className="winter-downloads">
      <label>Card style<select value={mode} disabled={format === "wallpaper"} onChange={e => setSelectedMode(e.target.value as HolidayCardMode)}><option value="share">Share Card · social</option><option value="keep">Keep Card · reflection</option></select></label>
      <label>Save your result card<select value={format} onChange={e => setFormat(e.target.value as HolidayCardFormat)}><option value="square">Square · 1080 × 1080</option><option value="portrait">Portrait · 1080 × 1350</option><option value="story">Social story · 1080 × 1920</option><option value="wallpaper">Phone wallpaper · 1440 × 3120</option></select></label>
    </div></div>
    <details className="winter-export-preview"><summary>Preview your {format === "wallpaper" ? "phone wallpaper" : mode === "keep" ? "Keep Card" : "Share Card"}</summary><img className="holiday-card-preview" src={holidayCardPath(story,{format,mode,tentative})} alt={`${holidayResults[story].name}. ${mode === "keep" ? "Reflective practice" : "Recognition, movie energy and superpower"} ${format} card.`} width={dimensions[format][0]} height={dimensions[format][1]} loading="lazy"/></details>
    <div className="holiday-share"><button className="button-primary" onClick={() => void share()}>{names.includes(" + ") ? "Share These Holiday Stories" : "Share My Holiday Story"} ↗</button><button className="button-secondary" onClick={() => void copy()}>Copy link</button><a className="holiday-back" href={holidayCardPath(story,{format,mode,tentative,download:true})} download onClick={() => trackHoliday("download_card",exportEvent)}>Download {mode === "keep" ? "Keep Card" : "Share Card"} ↓</a><p role="status">{status}</p>{manual && <input aria-label="Result link to copy" value={manual} readOnly onFocus={e => e.target.select()}/>}</div>
    {format === "wallpaper" && <p className="holiday-fine">Wallpaper is always a quiet Keep Card: one practice, minimal branding, and room for your clock and controls. Phone layouts vary; preview your lock-screen crop.</p>}
  </>;
}
export function HolidayConversion() {
  return <section className="holiday-conversion"><p className="holiday-eyebrow">There’s more to your story</p><h2>Your story is still worth exploring.</h2><p>No holiday match is needed to explore the deeper stories or try a practice.</p><HolidayAppCTA/></section>;
}

export function HolidayFeedback({ leaders, interpretation }: { leaders: Pattern[]; interpretation: Interpretation }) {
  const [selected,setSelected] = useState("");
  function respond(fit:string) {
    if (selected) return;
    setSelected(fit);
    trackHoliday("result_feedback",{ leaders, interpretation, fit });
  }
  return <section className="holiday-feedback" aria-labelledby="holiday-fit-heading"><h2 id="holiday-fit-heading">Did your Holiday Story feel like you?</h2><p>Optional feedback. Your answer won’t change your score.</p><fieldset disabled={Boolean(selected)}><legend className="sr-only">How well did your result fit?</legend><div>{resultFitOptions.map(option => <label key={option.value}><input type="radio" name="holiday-result-fit" value={option.value} checked={selected === option.value} onChange={() => respond(option.value)}/><span>{option.label}</span></label>)}</div></fieldset><p role="status">{selected ? "Thank you for helping us improve the Holiday Edition." : ""}</p></section>;
}
