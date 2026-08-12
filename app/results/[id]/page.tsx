"use client";

import { roomById } from "@/lib/content";
import { readResult, updateResult } from "@/lib/storage";
import type { ResultRecord } from "@/lib/types";
import { EmailResultForm } from "@/components/EmailResultForm";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ResultPage() {
  const { id } = useParams<{ id: string }>();
  const [result, setResult] = useState<ResultRecord | null | undefined>(undefined);
  useEffect(() => setResult(readResult(id)), [id]);
  if (result === undefined) return null;
  if (!result) return <main className="shell py-20 text-center"><h1 className="font-serif text-5xl">This reflection is not in this browser.</h1><p className="mt-4 text-ink/60">Results are stored only on the device where the assessment was completed.</p><Link href="/start" className="button-primary mt-8">Begin a reflection</Link></main>;
  const primary = roomById[result.ranking[0]];
  const topThree = result.ranking.slice(0, 3).map((roomId) => roomById[roomId]);
  const aiSections = result.aiResult ? [
    ["1", "Your Possible Room", result.aiResult.possibleRoom],
    ["2", "The Broken Story", result.aiResult.brokenStory],
    ["3", "Why This May Fit", result.aiResult.whyThisMayFit],
    ["4", "The Parable Doorway", result.aiResult.parableDoorway],
    ["5", "What Jesus Disrupts", result.aiResult.whatJesusDisrupts],
    ["6", "The True Story", result.aiResult.trueStory],
    ["7", "Your Redemptive Calling", result.aiResult.redemptiveCalling],
    ["8", "Metanoia Prompt", result.aiResult.metanoiaPrompt],
    ["9", "One Next Faithful Step", result.aiResult.nextFaithfulStep],
    ["10", "Important Note", result.aiResult.importantNote]
  ] : null;
  const selectStep = (nextStep: string) => { const next = { ...result, nextStep }; setResult(next); updateResult(next); };
  return <main className="shell py-10 sm:py-16">
    <section className="max-w-3xl"><p className="eyebrow">A possible room</p><h1 className="display mt-4 text-forest">The {primary.name} Room</h1><p className="mt-6 font-serif text-xl leading-8 text-ink/65">You may be inhabiting the {primary.name} Room in this season. Hold this possibility lightly—not as a label, but as an invitation to notice the story shaping you.</p>{result.syncStatus === "local-only" && <p className="mt-4 rounded-lg border border-gold/40 bg-gold/10 p-3 text-xs leading-5 text-ink/65">Your reflection is safe in this browser, but remote storage is not configured or temporarily unavailable.</p>}</section>
    {aiSections ? <section className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-ink/10 bg-ink/10 md:grid-cols-2">{aiSections.map(([number, title, copy], index) => <article key={title} className={`p-7 sm:p-9 ${index === 3 || index === 5 ? "bg-forest text-paper" : "bg-paper"}`}><p className={`text-xs font-semibold uppercase tracking-[.18em] ${index === 3 || index === 5 ? "text-gold" : "text-clay"}`}>{number}</p><h2 className="mt-4 font-serif text-2xl">{title}</h2><p className="mt-4 whitespace-pre-line text-sm leading-7 opacity-75">{copy}</p></article>)}</section> : <section className="mt-12 grid overflow-hidden rounded-2xl border border-ink/10 lg:grid-cols-3">
      <article className="bg-paper/70 p-7 sm:p-9"><p className="eyebrow">01 · Recognize</p><h2 className="mt-8 font-serif text-2xl">The Broken Story</h2><blockquote className="mt-5 font-serif text-3xl leading-tight text-forest">“{primary.falseStory}”</blockquote><p className="mt-6 text-sm leading-6 text-ink/60">This may reflect a story shaping your responses right now. It is not your identity.</p></article>
      <article className="bg-forest p-7 text-paper sm:p-9"><p className="text-xs font-semibold uppercase tracking-[.2em] text-gold">02 · Receive</p><h2 className="mt-8 font-serif text-2xl">Parable doorway</h2><p className="mt-5 text-sm leading-6 text-paper/65">{primary.parables}</p><blockquote className="mt-8 border-t border-paper/20 pt-7 font-serif text-2xl leading-tight">“{primary.trueStory}”</blockquote></article>
      <article className="bg-paper/70 p-7 sm:p-9"><p className="eyebrow">03 · Become</p><h2 className="mt-8 font-serif text-2xl">Redemptive calling</h2><p className="mt-5 font-serif text-4xl text-clay">{primary.calling}</p><p className="mt-7 text-sm leading-6 text-ink/65">{primary.prompt}</p></article>
    </section>}
    {result.aiStatus === "unavailable" && <p className="mt-4 rounded-lg border border-gold/40 bg-gold/10 p-3 text-center text-xs leading-5 text-ink/65">AI-assisted reflection is not configured or temporarily unavailable. The fixed, rule-based result is shown instead.</p>}
    <section className="panel mt-8 p-7 sm:p-9"><div className="flex flex-col justify-between gap-5 sm:flex-row"><div><p className="eyebrow">Score summary</p><h2 className="mt-3 font-serif text-3xl">Three rooms to hold in reflection</h2></div><p className="max-w-md text-sm leading-6 text-ink/55">Each room ranges from 3–15. The forced choice breaks a tie only; it does not add points.</p></div><div className="mt-7 grid gap-4 sm:grid-cols-3">{topThree.map((room, index) => <div key={room.id} className="rounded-xl border border-ink/10 p-5"><span className="text-xs uppercase tracking-wider text-ink/45">{index === 0 ? "Primary" : index === 1 ? "Secondary" : "Third"}</span><div className="mt-2 flex items-end justify-between"><strong className="font-serif text-2xl">{room.name}</strong><span className="text-sm text-ink/55">{result.scores[room.id]} / 15</span></div><div className="mt-4 h-1.5 overflow-hidden rounded-full bg-ink/10"><div className="h-full rounded-full bg-clay" style={{ width: `${(result.scores[room.id] / 15) * 100}%` }} /></div></div>)}</div></section>
    {result.reflection && <section className="mx-auto mt-12 max-w-3xl text-center"><p className="eyebrow">What you noticed</p><blockquote className="mt-5 font-serif text-2xl leading-9">“{result.reflection}”</blockquote></section>}
    <section className="panel mt-12 p-7 sm:p-9"><p className="eyebrow">One next faithful step</p><h2 className="mt-3 font-serif text-3xl">Choose something small and concrete.</h2><div className="mt-6 grid gap-3 md:grid-cols-2">{primary.nextSteps.map((step) => <button onClick={() => selectStep(step)} key={step} className={`rounded-xl border p-5 text-left text-sm leading-6 transition ${result.nextStep === step ? "border-forest bg-forest text-paper" : "border-ink/15 hover:border-moss"}`}>{step}</button>)}</div></section>
    <EmailResultForm responseId={id} />
    <aside className="mx-auto mt-12 max-w-3xl text-center"><h2 className="font-serif text-3xl">Hold this lightly.</h2><p className="mt-4 text-sm leading-7 text-ink/60">This result is a reflection aid, not a fixed label, personality test, prophecy, counseling, crisis care, or clinical diagnosis. You may recognize more than one room—or a different room in another season.</p><div className="mt-8 flex flex-wrap justify-center gap-3"><Link href={`/feedback/${id}`} className="button-primary">Share feedback →</Link><Link href="/start" className="button-secondary">Begin again</Link></div></aside>
  </main>;
}
