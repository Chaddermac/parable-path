"use client";

import { EmailResultForm } from "@/components/EmailResultForm";
import { roomById, roomInsights } from "@/lib/content";
import { readResult, updateResult } from "@/lib/storage";
import type { ResultRecord } from "@/lib/types";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ResultPage() {
  const { id } = useParams<{ id: string }>();
  const [result, setResult] = useState<ResultRecord | null | undefined>(undefined);
  useEffect(() => setResult(readResult(id)), [id]);
  if (result === undefined) return null;
  if (!result) return <main className="shell py-20 text-center"><h1 className="font-serif text-5xl">This reflection is not in this browser.</h1><p className="mt-4 text-ink/60">Results remain available on the device where the assessment was completed.</p><Link href="/start" className="button-primary mt-8">Begin a reflection</Link></main>;
  if (!result.diagnostic) return <main className="shell py-20 text-center"><p className="eyebrow">Assessment updated</p><h1 className="mt-4 font-serif text-5xl">Your earlier reflection used the previous question set.</h1><p className="mx-auto mt-5 max-w-2xl text-ink/60">ParablePath now explores story, strategy, and shadow across a new 40-item assessment. Earlier browser results have not been relabeled or recalculated under the new model.</p><Link href="/start" className="button-primary mt-8">Begin the updated assessment</Link></main>;
  const primary = roomById[result.ranking[0]], secondary = roomById[result.ranking[1]];
  const insight = roomInsights[primary.id], secondaryInsight = roomInsights[secondary.id];
  const primaryDimension = result.diagnostic.roomScores.find((score) => score.room === primary.id)!;
  const shadowLed = primaryDimension.shadow > primaryDimension.innerStory && primaryDimension.shadow > primaryDimension.strategy;
  const selectStep = (nextStep: string) => { const next = { ...result, nextStep }; setResult(next); updateResult(next); };
  return <main className="shell py-10 sm:py-16">
    <section className="max-w-4xl"><p className="eyebrow">Your current story landscape</p>
      {result.diagnostic.isFlatProfile ? <><h1 className="display mt-4 text-forest">No single story strongly dominates</h1><p className="mt-6 max-w-3xl font-serif text-xl leading-8 text-ink/65">Your responses do not point to one particularly strong pattern right now. Your patterns may be situational, relatively balanced, or difficult to recognize through a brief assessment. These are two stories worth exploring.</p></> : <><h1 className="display mt-4 text-forest">{result.diagnostic.isCloseSecondary ? `${primary.name} + ${secondary.name}` : primary.name}</h1><p className="mt-6 max-w-3xl font-serif text-xl leading-8 text-ink/65">{result.diagnostic.isCloseSecondary ? `${primary.name} and ${secondary.name} appear to be close companion stories in this season.` : `${primary.name} appears to be your strongest current pattern, with ${secondary.name} worth noticing nearby.`} This is an invitation to recognition, not a label.</p></>}
      {shadowLed && <p className="mt-5 rounded-xl border border-gold/40 bg-gold/10 p-4 text-sm leading-6">You may recognize this story most clearly through the shadow it casts.</p>}
    </section>

    <section className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-ink/10 bg-ink/10 md:grid-cols-2">
      <article className="bg-paper p-7 sm:p-9"><p className="eyebrow">1 · Your room</p><h2 className="mt-4 font-serif text-4xl">{primary.name}</h2><p className="mt-5 text-sm leading-7 text-ink/65">A narrative room you may be inhabiting right now—not who you are.</p></article>
      <article className="bg-paper p-7 sm:p-9"><p className="eyebrow">2 · The story beneath it</p><blockquote className="mt-5 font-serif text-2xl leading-9 text-forest">“{insight.story}”</blockquote></article>
      <article className="bg-paper p-7 sm:p-9"><p className="eyebrow">3 · Why this story can work</p><p className="mt-5 text-sm leading-7 text-ink/70">{insight.strength}</p></article>
      <article className="bg-paper p-7 sm:p-9"><p className="eyebrow">4 · What it may be protecting</p><p className="mt-5 text-sm leading-7 text-ink/70">{insight.protects}</p></article>
      <article className="bg-forest p-7 text-paper sm:p-9"><p className="text-xs font-semibold uppercase tracking-[.2em] text-gold">5 · Every room casts a shadow</p><h2 className="mt-4 font-serif text-3xl">{insight.shadowLabel}</h2><p className="mt-5 text-sm leading-7 text-paper/75">{insight.shadow}</p></article>
      <article className="bg-forest p-7 text-paper sm:p-9"><p className="text-xs font-semibold uppercase tracking-[.2em] text-gold">6 · The relational cost</p><p className="mt-5 text-sm leading-7 text-paper/75">{insight.relationalCost}</p></article>
    </section>

    <section className="mx-auto mt-12 max-w-3xl text-center"><p className="eyebrow">7 · A question to sit with</p><h2 className="mt-5 font-serif text-3xl leading-tight sm:text-4xl">{insight.question}</h2></section>
    <section className="panel mt-12 p-7 sm:p-9"><p className="eyebrow">8 · Jesus opens another story</p><h2 className="mt-3 font-serif text-3xl">{primary.parables}</h2><p className="mt-5 text-sm leading-7 text-ink/65">This parable invites you to imagine reality differently: {primary.trueStory}</p><div className="mt-7 border-t border-ink/10 pt-6"><span className="text-xs uppercase tracking-wider text-ink/45">Redemptive calling</span><p className="mt-2 font-serif text-3xl text-clay">{primary.calling}</p></div></section>

    <section className="mt-12"><p className="eyebrow">9 · The STORY Path</p><div className="mt-5 grid gap-3 sm:grid-cols-5">{[["S","See the Room"],["T","Trace the Story"],["O","Open the Parable"],["R","Reorient the Imagination"],["Y","Yes to the Next Faithful Step"]].map(([letter,label]) => <div key={letter} className="panel p-5"><strong className="font-serif text-3xl text-clay">{letter}</strong><p className="mt-2 text-xs font-semibold leading-5">{label}</p></div>)}</div></section>
    <section className="panel mt-12 p-7 sm:p-9"><p className="eyebrow">10 · Next faithful yes</p><h2 className="mt-3 font-serif text-3xl">Choose one achievable response.</h2><div className="mt-6 grid gap-3 md:grid-cols-2">{primary.nextSteps.map((step) => <button onClick={() => selectStep(step)} key={step} className={`rounded-xl border p-5 text-left text-sm leading-6 transition ${result.nextStep === step ? "border-forest bg-forest text-paper" : "border-ink/15 hover:border-moss"}`}>{step}</button>)}</div></section>

    <section className="panel mt-12 p-7 sm:p-9"><p className="eyebrow">Another story worth noticing</p><h2 className="mt-3 font-serif text-3xl">{secondary.name}</h2><p className="mt-4 text-sm leading-7 text-ink/65">“{secondaryInsight.story}” Its shadow may appear as <strong>{secondaryInsight.shadowLabel}</strong>.</p><p className="mt-4 font-serif text-xl">{secondaryInsight.question}</p></section>
    <details className="panel mt-8 p-7"><summary className="cursor-pointer font-semibold">See your full story landscape</summary><div className="mt-6 space-y-4">{result.diagnostic.roomScores.map((score) => <div key={score.room}><div className="flex justify-between text-sm"><span>{roomById[score.room].name}</span><span className="text-ink/45">{score.overall >= 4 ? "Highly present" : score.overall >= 3 ? "Present" : score.overall >= 2 ? "Occasional" : "Less present"}</span></div><div className="mt-2 h-1.5 overflow-hidden rounded-full bg-ink/10"><div className="h-full rounded-full bg-clay" style={{width:`${score.normalized}%`}} /></div></div>)}</div></details>
    {result.reflection && <section className="mx-auto mt-12 max-w-3xl text-center"><p className="eyebrow">What you noticed</p><blockquote className="mt-5 font-serif text-2xl leading-9">“{result.reflection}”</blockquote></section>}
    <EmailResultForm responseId={id} />
    <aside className="mx-auto mt-12 max-w-3xl text-center"><p className="text-sm leading-7 text-ink/60"><strong>ParablePath is a spiritual reflection tool, not a psychological diagnosis or personality test.</strong> These results are an invitation to notice patterns, ask better questions, and explore how the parables of Jesus might open another way of seeing and living.</p><div className="mt-8 flex flex-wrap justify-center gap-3"><Link href={`/feedback/${id}`} className="button-primary">Share feedback →</Link><Link href="/start" className="button-secondary">Begin again</Link></div></aside>
  </main>;
}
