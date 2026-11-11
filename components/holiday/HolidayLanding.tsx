"use client";
import { useState } from "react";
import { holidayArtwork, showcaseOrder } from "@/lib/holiday/artwork";
import { holidayResults } from "@/lib/holiday/results";
import { trackHoliday } from "@/lib/holiday/analytics";
import { TypologyGlobe, WinterGift, WinterStar, WinterTree } from "./WinterArtwork";
export function HolidayLanding({ onStart }: { onStart: () => void }) {
  const [status, setStatus] = useState("");
  const [manual, setManual] = useState("");
  async function invite() {
    const url = new URL("/holiday", location.origin).href;
    try {
      if (navigator.share) { await navigator.share({ title: "What’s Your Holiday Story?", text: "A little laughter. A little recognition. Find your holiday story.", url }); trackHoliday("share"); }
      else { await navigator.clipboard.writeText(url); setStatus("Quiz link copied. Invite a little Christmas curiosity."); trackHoliday("copy_link"); }
    } catch (error) { if (!(error instanceof Error && error.name === "AbortError")) { setManual(url); setStatus("Copy this quiz link to invite your friends."); } }
  }
  return <main className="holiday holiday-landing">
    <section className="winter-hero" aria-labelledby="winter-title">
      <div className="winter-hero-copy"><p className="holiday-eyebrow"><span/>ParablePath Holiday Edition</p><h1 id="winter-title">What’s Your<br/><em>Holiday Story?</em></h1><p className="holiday-subtitle">Family drama. Gift exchanges. Awkward holiday parties. Discover the story that shows up when Christmas gets interesting.</p><button className="button-primary holiday-start" onClick={onStart}>Find Your Holiday Story <span aria-hidden="true">→</span></button><p className="holiday-support">16 fun questions <span>·</span> 3–4 minutes <span>·</span> Easy to share</p><p className="winter-no-account">No account. No email. Just your holiday instincts.</p></div>
      <div className="winter-hero-art"><div className="winter-orbit"/><img className="winter-village" src="/holiday/winter-village.webp" width="900" height="900" fetchPriority="high" alt="A glowing Christmas star over a snowy village inside a glass snow globe."/><img className="winter-base-emblem" src="/holiday/emblem.png" width="56" height="56" alt=""/><span className="winter-float winter-float-gift"><WinterGift/></span><span className="winter-float winter-float-tree"><WinterTree/></span><span className="winter-float winter-float-star"><WinterStar/></span><WinterStar className="winter-small-star"/><span className="winter-art-caption">Every season holds a story.</span></div>
    </section>
    <section className="winter-highlights" aria-label="A little holiday magic">{[
      ["A Seasonal Twist", "The ParablePath experience with a little Christmas spirit."],
      ["Find Your Holiday Type", "Discover which story shows up during the holidays."],
      ["Fun & Shareable", "Compare your results with friends and family."],
      ["More Than a Quiz", "Discover the deeper story beneath everyday moments."]
    ].map(([title,copy],i) => <article key={title}><span className={`winter-highlight-icon winter-highlight-icon-${i}`}>{i === 0 ? <WinterTree/> : i === 2 ? <WinterGift/> : <WinterStar/>}</span><h2>{title}</h2><p>{copy}</p></article>)}</section>
    <section id="holiday-types" className="winter-types"><p className="holiday-eyebrow">Eight ways to meet the season</p><h2>A whole world of holiday stories.</h2><p className="winter-section-intro">The host. The giver. The one making room for a little more wonder.<br className="winter-desktop-break"/> Which story might be yours?</p><div className="winter-types-grid">{showcaseOrder.map(pattern => { const result=holidayResults[pattern]; return <details className="winter-type" key={pattern}><summary><TypologyGlobe pattern={pattern}/><h3>{result.name}</h3><p>{holidayArtwork[pattern].calling}</p><span className="winter-type-more">A little peek <span aria-hidden="true">+</span></span></summary><p className="winter-type-preview">{result.line}</p></details>; })}</div><button className="button-primary" onClick={onStart}>Find Your Holiday Story →</button></section>
    <section id="share-invite" className="winter-invite"><WinterGift/><div><p className="holiday-eyebrow">Good stories are better together</p><h2>A little Christmas curiosity.<br/>Pass it around.</h2><p>Invite your group chat, your family, or the friend who takes White Elephant very seriously.</p></div><div><button className="button-secondary" onClick={() => void invite()}>Share &amp; invite →</button><p role="status">{status}</p>{manual && <input value={manual} readOnly aria-label="Quiz invitation link" onFocus={e => e.target.select()}/>}</div></section>
    <p className="holiday-fine winter-privacy">A playful seasonal reflection, not a validated psychological assessment. Anonymous usage events help improve the experience. Individual answers stay in this page; Do Not Track is honored.</p>
  </main>;
}
