"use client";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { holidayAppLink, holidayConversionTitle, holidayEngagement } from "@/lib/holiday/engagement";
import { holidayResults } from "@/lib/holiday/results";
import { showcaseOrder } from "@/lib/holiday/artwork";
import { trackHoliday, type HolidayEvent } from "@/lib/holiday/analytics";
import type { Pattern } from "@/lib/holiday/scoring";
import { TypologyGlobe } from "./WinterArtwork";

export function HolidaySeen({ event, story, children, className }: { event: HolidayEvent; story: Pattern; children: ReactNode; className?: string }) {
  const element = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const target = element.current;
    if (!target || navigator.doNotTrack === "1") return;
    const observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) { trackHoliday(event, { story }); observer.disconnect(); }
    }, { threshold: 0.25 });
    observer.observe(target);
    return () => observer.disconnect();
  }, [event, story]);
  return <div ref={element} className={className}>{children}</div>;
}

export function HolidayAppCTA({ story, placement = "result" }: { story?: Pattern; placement?: "result" | "challenge" | "parable" }) {
  return <a className="button-primary" href={holidayAppLink(story, placement)} onClick={() => {
    trackHoliday("app_click", { story, placement });
    if (placement === "challenge") trackHoliday("holiday_challenge_app_click", { story, placement });
  }}>{placement === "challenge" ? "Continue this practice in ParablePath.app" : story ? `Explore Your ${holidayResults[story].calling} Story` : "Explore the ParablePath Stories"} →</a>;
}

export function HolidayPersonalConversion({ story }: { story: Pattern }) {
  return <section className="holiday-conversion"><p className="holiday-eyebrow">There’s more to your story</p><h2>{holidayConversionTitle(story)}</h2><p>{holidayEngagement[story].conversion}</p><p><strong>This probably doesn’t only happen at Christmas.</strong></p><HolidayAppCTA story={story}/></section>;
}

export function HolidayParableLink({ story }: { story: Pattern }) {
  return <a className="holiday-back" href={`/parables/${holidayEngagement[story].slug}?source=holiday`} onClick={() => trackHoliday("parable_click", { story, placement: "parable" })}>Explore the parable →</a>;
}

// Reuses the landing page's native-share → clipboard → selectable-link fallback.
export function HolidayCrew() {
  const [status, setStatus] = useState("");
  const [manual, setManual] = useState("");
  const busy = useRef(false);
  async function invite() {
    if (busy.current) return;
    busy.current = true;
    const url = new URL("/holidayedition", window.location.origin).href;
    try {
      trackHoliday("crew_invite", { placement: "crew" });
      if (navigator.share) {
        await navigator.share({ title: "Every holiday gathering has a cast.", text: "Who’s your Holiday Host? Find your crew’s Holiday Stories.", url });
        trackHoliday("share", { placement: "crew" }); setStatus("Invitation shared.");
      } else {
        await navigator.clipboard.writeText(url); trackHoliday("copy_link", { placement: "crew" }); setStatus("Quiz link copied. Invite your holiday crew!");
      }
    } catch (error) {
      if (!(error instanceof Error && error.name === "AbortError")) { setManual(url); setStatus("Copy the quiz link below to invite your crew."); }
    } finally { busy.current = false; }
  }
  return <section className="holiday-crew"><h2>Every holiday gathering has a cast.</h2><p>Send the Holiday Edition to your family, group chat, coworkers, or friends and see which Holiday Stories show up.</p><div className="holiday-crew-grid">{showcaseOrder.map(story => <div key={story}><TypologyGlobe pattern={story}/><span>{holidayResults[story].name}</span></div>)}</div><p className="holiday-crew-prompts">Who’s your Holiday Host? Who’s the Peace Restorer? Who turns into the Holiday Pathfinder on December 23? Who is absolutely the Moment Maker?</p><button className="button-primary" onClick={() => void invite()}>Invite Your Holiday Crew →</button><p role="status">{status}</p>{manual && <input readOnly value={manual} aria-label="Holiday crew invitation link" onFocus={e => e.target.select()}/>}</section>;
}
