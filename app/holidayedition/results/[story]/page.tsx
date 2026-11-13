import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { HolidayTypes } from "@/components/holiday/HolidayTypes";
import { TypologyGlobe, WinterStar } from "@/components/holiday/WinterArtwork";
import { HolidayActions, HolidayConversion, HolidayResultView } from "@/components/holiday/HolidayActions";
import { holidayResults } from "@/lib/holiday/results";
import { isPattern, parseStories, resultPath } from "@/lib/holiday/scoring";
type Props = { params: Promise<{ story: string }>; searchParams: Promise<{ also?: string | string[] }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { story } = await params;
  const leaders = parseStories(story);
  if (!leaders) return { title: "Holiday story unavailable", robots: { index: false } };
  const title = leaders.map(p => holidayResults[p].name).join(" + ");
  const url = `https://parablepath.com/holidayedition/results/${story}`;
  return { title: `${title} | ParablePath Holiday Edition`, description: "A playful holiday reflection. Discover your own holiday story in 16 questions.", alternates: { canonical: url }, openGraph: { title, url, description: "What’s your holiday story? Take the ParablePath Holiday Edition.", images: [{ url: `https://parablepath.com/api/holiday/card/${story}`, width: 1200, height: 630 }] }, twitter: { card: "summary_large_image", title, images: [`https://parablepath.com/api/holiday/card/${story}`] } };
}
export default async function HolidayResultPage({ params, searchParams }: Props) {
  const { story } = await params;
  const leaders = parseStories(story);
  if (!leaders) notFound();
  const { also } = await searchParams;
  const secondary = [...new Set(typeof also === "string" ? also.split(",").filter(isPattern).filter(p => !leaders.includes(p)) : [])];
  const names = leaders.map(p => holidayResults[p].name).join(" + ");
  return <main className="holiday holiday-results"><HolidayResultView leaders={leaders}/>
    <section className="reference-result-hero"><div><p className="holiday-eyebrow">ParablePath · Holiday Edition</p><h1>{leaders.length > 1 ? "The season holds more than one story." : "A more meaningful holiday season."}</h1><p className="holiday-subtitle">Discover your holiday story and find a little more clarity, connection, and purpose this Christmas.</p><a className="button-primary" href="#holiday-result">Unwrap Your Holiday Story →</a></div>{leaders.length === 1 ? <TypologyGlobe pattern={leaders[0]} large/> : <WinterStar className="reference-tie-star"/>}</section>
    {leaders.length > 1 && <p className="holiday-subtitle">These stories tied for your highest score. Each is equally worth exploring.</p>}
    <HolidayTypes/>
    <div id="holiday-result" className="holiday-result-grid">{leaders.map(pattern => { const result = holidayResults[pattern]; return <article key={pattern} className="holiday-result">
      <div className="reference-result-intro"><TypologyGlobe pattern={pattern} large/><div><p className="holiday-eyebrow">{leaders.length > 1 ? "Equally plausible story" : "Your Holiday Story"}</p>
      <h2>You’re {result.name.replace(/^The /, "the ")}!</h2><p className="holiday-calling">Your ParablePath Calling: {result.calling}</p>
      <p>{result.description}</p></div><aside className="holiday-challenge"><p className="holiday-eyebrow">A seasonal practice</p><h3>Your Holiday Challenge</h3><p>{result.challenge}</p></aside></div><div className="reference-result-depth"><section><h3>The Story Beneath the Season</h3><p className="holiday-section-note">Patterns you may recognize.</p><ul>{result.shadowPatterns.map(text => <li key={text}>{text}</li>)}</ul></section><section><h3>The Gift You Bring</h3><p className="holiday-section-note">Ways this calling could take shape.</p><ul>{result.gifts.map(text => <li key={text}>{text}</li>)}</ul></section></div>
      <p className="holiday-fine">{result.name} connects to the {result.calling} calling in ParablePath.</p>
      <details className="winter-export-preview"><summary>Preview your share card</summary><img className="holiday-card-preview" src={`/api/holiday/card/${pattern}`} alt={`${result.name}. ${result.calling}. ${result.line} Take the quiz at parablepath.com/holidayedition.`} width="1200" height="630" loading="lazy"/></details>
      <HolidayActions names={names} path={resultPath(leaders, secondary)} story={pattern}/>
    </article>; })}</div>
    {secondary.length > 0 && <section className="holiday-secondary"><h2>Another thread worth exploring</h2><p>Within one point of your leading {leaders.length > 1 ? "stories" : "story"}. These may resonate, too.</p>{secondary.map(p => <Link key={p} href={resultPath([p])}>{holidayResults[p].name} · {holidayResults[p].calling} ↗</Link>)}</section>}
    <HolidayConversion/><p className="holiday-fine">A seasonal reflection, not a permanent identity or a validated psychological assessment. A shared result link contains story names only; no answers or scores.</p>
    <Link className="holiday-back" href="/holidayedition">Take the holiday quiz →</Link>
  </main>;
}
