import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { TypologyGlobe } from "@/components/holiday/WinterArtwork";
import { holidayArtwork } from "@/lib/holiday/artwork";
import { HolidayActions, HolidayConversion, HolidayResultView } from "@/components/holiday/HolidayActions";
import { holidayResults } from "@/lib/holiday/results";
import { isPattern, parseStories, resultPath } from "@/lib/holiday/scoring";
type Props = { params: Promise<{ story: string }>; searchParams: Promise<{ also?: string | string[] }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { story } = await params;
  const leaders = parseStories(story);
  if (!leaders) return { title: "Holiday story unavailable", robots: { index: false } };
  const title = leaders.map(p => holidayResults[p].name).join(" + ");
  const url = `https://parablepath.com/holiday/results/${story}`;
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
    <p className="holiday-eyebrow">ParablePath · Holiday Edition</p>
    <h1>{leaders.length > 1 ? "Your story has a few chapters." : "Your holiday story, unwrapped."}</h1>
    {leaders.length > 1 && <p className="holiday-subtitle">These stories tied for your highest score. Each is equally worth exploring.</p>}
    <div className="holiday-result-grid">{leaders.map(pattern => { const result = holidayResults[pattern]; return <article key={pattern} className="holiday-result">
      <TypologyGlobe pattern={pattern} large/><p className="holiday-eyebrow">{leaders.length > 1 ? "Equally plausible story" : "Your Holiday Story"}</p>
      <h2>You’re {result.name.replace(/^The /, "the ")}!</h2><p className="holiday-calling">Your ParablePath Calling: {holidayArtwork[pattern].calling}</p>
      <p>{result.description}</p><h3>The story beneath the season</h3><p>{result.shadow}</p><h3>Your holiday invitation</h3><p>{result.invitation}</p>
      <aside className="holiday-challenge"><h3>Your Holiday Challenge</h3><p>{result.challenge}</p></aside>
      <p className="holiday-fine">{result.name} connects to the {result.calling} calling in ParablePath.</p>
      <details className="winter-export-preview"><summary>Preview your share card</summary><img className="holiday-card-preview" src={`/api/holiday/card/${pattern}`} alt={`${result.name}. ${result.calling}. ${result.line} Take the quiz at parablepath.com/holiday.`} width="1200" height="630" loading="lazy"/></details>
      <HolidayActions names={names} path={resultPath(leaders, secondary)} story={pattern}/>
    </article>; })}</div>
    {secondary.length > 0 && <section className="holiday-secondary"><h2>Another thread worth exploring</h2><p>Within one point of your leading {leaders.length > 1 ? "stories" : "story"}. These may resonate, too.</p>{secondary.map(p => <Link key={p} href={resultPath([p])}>{holidayResults[p].name} · {holidayResults[p].calling} ↗</Link>)}</section>}
    <HolidayConversion/><p className="holiday-fine">A seasonal reflection, not a permanent identity or a validated psychological assessment. A shared result link contains story names only; no answers or scores.</p>
    <Link className="holiday-back" href="/holiday">Take the holiday quiz →</Link>
  </main>;
}
