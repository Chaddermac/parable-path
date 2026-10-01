"use client";

import { EmailResultForm } from "@/components/EmailResultForm";
import { FormationTypologyResultCard } from "@/components/formation/FormationTypologyResultCard";
import { fallbackAiResult, normalizeAiResult } from "@/lib/ai-reflection";
import { roomById } from "@/lib/content";
import { formationResultByRoom } from "@/lib/parablepath/popular/results";
import { readResult, updateResult } from "@/lib/storage";
import type { ResultRecord, RoomId } from "@/lib/types";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const landscapeLabels = ["Primary story", "Secondary story", "Nearby pattern"] as const;

export default function ResultPage() {
  const { id } = useParams<{ id: string }>();
  const [result, setResult] = useState<ResultRecord | null | undefined>(undefined);

  useEffect(() => {
    const local = readResult(id);
    if (local) { setResult(local); return; }
    let active = true;
    fetch(`/api/results/${id}`, { cache: "no-store" })
      .then(async (response) => response.ok ? response.json() as Promise<{ result: ResultRecord }> : Promise.reject())
      .then(({ result: stored }) => { if (active) setResult(stored); })
      .catch(() => { if (active) setResult(null); });
    return () => { active = false; };
  }, [id]);

  if (result === undefined) return <main className="shell py-20 text-center"><p className="eyebrow">Opening your reflection</p></main>;
  if (!result) return <main className="shell py-20 text-center"><h1 className="font-serif text-5xl">This reflection is unavailable.</h1><p className="mt-4 text-ink/60">The link may be incomplete, or the reflection may not have been saved.</p><Link href="/start" className="button-primary mt-8">Begin a reflection</Link></main>;
  if (!result.diagnostic || result.ranking.length < 3) return <main className="shell py-20 text-center"><p className="eyebrow">Assessment updated</p><h1 className="mt-4 font-serif text-5xl">This earlier reflection used a previous assessment.</h1><Link href="/start" className="button-primary mt-8">Begin the updated assessment</Link></main>;

  const [primaryId, secondaryId, thirdId] = result.ranking as [RoomId, RoomId, RoomId];
  const primary = roomById[primaryId];
  const reflection = normalizeAiResult(result.aiResult, primaryId, secondaryId, thirdId) || fallbackAiResult(primaryId, secondaryId, thirdId);
  const selectStep = (nextStep: string) => { const next = { ...result, nextStep }; setResult(next); updateResult(next); };

  return <main>
    <FormationTypologyResultCard profile={formationResultByRoom[primaryId]} />
    <div className="shell py-10 sm:py-16">
      {result.syncStatus === "local-only" ? <p className="mb-8 rounded-xl border border-gold/30 bg-gold/10 p-4 text-sm leading-6 text-ink/65" role="status">Your result remains available in this browser. We will retry saving the anonymous research response when storage reconnects.</p> : null}

      <section className="panel p-7 sm:p-10" aria-labelledby="landscape-heading">
        <p className="eyebrow">Your Story Landscape</p>
        <h2 id="landscape-heading" className="mt-3 font-serif text-4xl text-forest">Several stories can be present at once.</h2>
        <p className="mt-4 max-w-3xl leading-7 text-ink/65">These are interacting story patterns, not fixed personality types. You may recognize each one differently across relationships, responsibilities, and seasons.</p>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {[primaryId, secondaryId, thirdId].map((roomId, index) => <article key={roomId} className={`rounded-2xl border p-6 ${index === 0 ? "border-forest bg-forest text-paper" : "border-ink/10 bg-cream/60"}`}>
            <p className={`text-xs font-semibold uppercase tracking-[.18em] ${index === 0 ? "text-gold" : "text-clay"}`}>{landscapeLabels[index]}</p>
            <h3 className="mt-3 font-serif text-3xl">{roomById[roomId].name}</h3>
            <p className={`mt-3 text-sm leading-6 ${index === 0 ? "text-paper/75" : "text-ink/60"}`}>“{roomById[roomId].falseStory}”</p>
          </article>)}
        </div>
        {result.diagnostic.roomScores.length ? <details className="mt-7 border-t border-ink/10 pt-5"><summary className="cursor-pointer font-semibold">See all eight story scores</summary><div className="mt-6 space-y-4">{result.diagnostic.roomScores.map((score) => <div key={score.room}><div className="flex justify-between text-sm"><span>{roomById[score.room].name}</span><span className="text-ink/45">{score.overall.toFixed(1)} / 5</span></div><div className="mt-2 h-1.5 overflow-hidden rounded-full bg-ink/10"><div className="h-full rounded-full bg-clay" style={{ width: `${score.normalized}%` }} /></div></div>)}</div></details> : null}
      </section>

      <section className="mt-12" aria-labelledby="reflection-heading">
        <p className="eyebrow">AI-assisted combined-story reflection</p>
        <h2 id="reflection-heading" className="mt-3 font-serif text-4xl text-forest">A reflection shaped by your responses</h2>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-ink/60">This personalized reflection is generated once, saved with your anonymous response, and reused here and in your email.</p>
        <div className="mt-8 grid gap-px overflow-hidden rounded-2xl border border-ink/10 bg-ink/10 md:grid-cols-2">
          <article className="bg-paper p-7 sm:p-9"><p className="eyebrow">Why this may fit</p><p className="mt-5 whitespace-pre-line text-sm leading-7 text-ink/70">{reflection.whyThisMayFit}</p></article>
          <article className="bg-paper p-7 sm:p-9"><p className="eyebrow">How these stories may interact</p><p className="mt-5 whitespace-pre-line text-sm leading-7 text-ink/70">{reflection.storyInteraction}</p></article>
          <article className="bg-forest p-7 text-paper sm:col-span-2 sm:p-9"><p className="text-xs font-semibold uppercase tracking-[.2em] text-gold">What Jesus disrupts</p><p className="mt-5 whitespace-pre-line text-sm leading-7 text-paper/80">{reflection.whatJesusDisrupts}</p><p className="mt-6 border-t border-paper/15 pt-5 font-serif text-xl">{primary.parables}</p></article>
        </div>
      </section>

      <section className="mt-12 grid gap-5 lg:grid-cols-2">
        <article className="panel p-7 sm:p-9"><p className="eyebrow">Metanoia question</p><h2 className="mt-4 font-serif text-3xl leading-tight">{reflection.metanoiaQuestion}</h2></article>
        <article className="panel p-7 sm:p-9"><p className="eyebrow">One next faithful step</p><p className="mt-4 text-base leading-7 text-ink/70">{reflection.nextFaithfulStep}</p><div className="mt-6 grid gap-3">{formationResultByRoom[primaryId].nextSteps.map((step) => <button type="button" onClick={() => selectStep(step)} key={step} className={`rounded-xl border p-4 text-left text-sm leading-6 transition ${result.nextStep === step ? "border-forest bg-forest text-paper" : "border-ink/15 hover:border-moss"}`}>{step}</button>)}</div></article>
      </section>

      <EmailResultForm responseId={id} primaryRoom={primaryId} />

      <aside className="mx-auto mt-12 max-w-3xl text-center"><p className="text-sm leading-7 text-ink/60"><strong><span className="brand-name">ParablePath</span> is a spiritual reflection aid, not a fixed label, personality test, clinical diagnosis, prophecy, counseling, or crisis care.</strong> Hold this result lightly. You may recognize more than one story, or different stories in different seasons. Return to the parables themselves and consider sharing what you notice with a trusted spiritual companion.</p><div className="mt-8 flex flex-wrap justify-center gap-3"><Link href={`/feedback/${id}`} className="button-primary">Share feedback →</Link><Link href="/start" className="button-secondary">Begin again</Link></div></aside>
    </div>
  </main>;
}
