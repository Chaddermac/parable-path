"use client";
import { useState, type ReactNode } from "react";
import { HolidayTypes } from "./HolidayTypes";
import { trackHoliday } from "@/lib/holiday/analytics";
import { WinterGift, WinterStar, WinterTree, WinterSnowflake, WinterHeart } from "./WinterArtwork";
export function HolidayLanding({ onStart, children }: { onStart: () => void; children: ReactNode }) {
  const [status, setStatus] = useState("");
  const [manual, setManual] = useState("");
  async function invite() {
    const url = new URL("/holidayedition", location.origin).href;
    try {
      if (navigator.share) { await navigator.share({ title: "What’s Your Holiday Story?", text: "A little laughter. A little recognition. Find your holiday story.", url }); trackHoliday("share"); }
      else { await navigator.clipboard.writeText(url); setStatus("Quiz link copied. Invite a little Christmas curiosity."); trackHoliday("copy_link"); }
    } catch (error) { if (!(error instanceof Error && error.name === "AbortError")) { setManual(url); setStatus("Copy this quiz link to invite your friends."); } }
  }
  return <main className="holiday holiday-landing">
    <section className="winter-hero" aria-labelledby="winter-title">
      <div className="winter-hero-copy"><div className="reference-hero-label"><WinterSnowflake/><p className="holiday-eyebrow">ParablePath Holiday Edition</p></div><h1 id="winter-title">What’s Your<br/><em>Holiday Story?</em></h1><p className="holiday-subtitle">A fun, festive version of ParablePath that reveals how you tend to show up during the holidays — through a timeless story lens.</p><button className="button-primary holiday-start" onClick={onStart}>Find Your Holiday Story <span aria-hidden="true">→</span></button><p className="holiday-support">16 fun questions <span>·</span> 3–4 minutes <span>·</span> Easy to share</p><p className="winter-no-account">No account. No email. Just your holiday instincts.</p></div>
      <div className="winter-hero-art"><div className="winter-orbit"/><img className="winter-village" src="/holiday/reference-globe.webp" width="1200" height="900" fetchPriority="high" alt="A Christmas star over a snowy chapel and illuminated pine trees, inside a glass globe with a navy and gold base."/><img className="winter-base-emblem" src="/holiday/emblem.png" width="56" height="56" alt=""/><span className="winter-float winter-float-gift"><WinterGift/></span><span className="winter-float winter-float-tree"><WinterTree/></span><span className="winter-float winter-float-star"><WinterStar/></span><WinterStar className="winter-small-star"/><WinterSnowflake className="reference-hero-flake reference-hero-flake-one"/><WinterSnowflake className="reference-hero-flake reference-hero-flake-two"/></div>
    </section>
    <section className="winter-highlights" aria-label="A little holiday magic">{[
      ["A Seasonal Twist", "The same story-rich insight you love, now with holiday spirit."],
      ["Discover Your Type", "See your holiday strengths, patterns, and playful challenges."],
      ["Fun & Shareable", "Compare with friends and family and see everyone’s holiday story."],
      ["Meaningful & Lighthearted", "A fresh, joyful way to reflect, connect, and celebrate the season."]
    ].map(([title,copy],i) => <article key={title}><span className={`winter-highlight-icon winter-highlight-icon-${i}`}>{i === 0 ? <WinterGift/> : i === 1 ? <WinterTree/> : i === 2 ? <WinterStar/> : <WinterHeart/>}</span><h2>{title}</h2><p>{copy}</p></article>)}</section>
    {children}
    <HolidayTypes/>
    <section id="share-invite" className="winter-invite"><WinterGift/><div><p className="holiday-eyebrow">Good stories are better together</p><h2>A little Christmas curiosity.<br/>Pass it around.</h2><p>Invite your group chat, your family, or the friend who takes White Elephant very seriously.</p></div><div><button className="button-secondary" onClick={() => void invite()}>Share &amp; invite →</button><p role="status">{status}</p>{manual && <input value={manual} readOnly aria-label="Quiz invitation link" onFocus={e => e.target.select()}/>}</div></section>
    <p className="holiday-fine winter-privacy">A playful seasonal reflection, not a validated psychological assessment. Anonymous usage events help improve the experience. Individual answers stay in this page; Do Not Track is honored.</p>
  </main>;
}
