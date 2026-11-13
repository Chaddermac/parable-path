"use client";
import { holidayCardFormats, holidayCardPath, type HolidayCardFormat } from "@/lib/holiday/card-formats";
import { useEffect, useRef, useState } from "react";
import { holidayDestination } from "@/lib/holiday/results";
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
  const dimensions=holidayCardFormats;
  return <><details className="winter-export-preview"><summary>Preview your {format === "wallpaper" ? "phone wallpaper" : "share card"}</summary><img className="holiday-card-preview" src={holidayCardPath(story,{format,tentative})} alt={`${names}. Holiday Edition ${format} graphic.`} width={dimensions[format][0]} height={dimensions[format][1]} loading="lazy"/></details><div className="holiday-share"><button className="button-primary" onClick={() => void share()}>{names.includes(" + ") ? "Share These Holiday Stories" : "Share My Holiday Story"} ↗</button><button className="button-secondary" onClick={() => void copy()}>Copy link</button><div className="winter-downloads"><label>Save your result card<select value={format} onChange={e => setFormat(e.target.value as HolidayCardFormat)}><option value="square">Square · 1080 × 1080</option><option value="portrait">Portrait · 1080 × 1350</option><option value="story">Social story · 1080 × 1920</option><option value="wallpaper">Phone wallpaper · 1440 × 3120</option></select></label><a className="holiday-back" href={holidayCardPath(story,{format,tentative,download:true})} download onClick={() => trackHoliday("download_card")}>Download card ↓</a></div><p role="status">{status}</p>{manual && <input aria-label="Result link to copy" value={manual} readOnly onFocus={e => e.target.select()}/>}</div>{format === "wallpaper" && <p className="holiday-fine">A keepsake for your lock screen, with room for your clock and phone controls. Download, then save the image to your photos.</p>}</>;
}
export function HolidayConversion() {
  return <section className="holiday-conversion"><p className="holiday-eyebrow">There’s more to your story</p><h2>Your Holiday Story Is Just One Chapter.<br/>Discover Your Deeper Story.</h2><a className="button-primary" href={holidayDestination} onClick={() => trackHoliday("app_click")}>Explore Your Deeper Story ↗</a></section>;
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
