"use client";

import { questions, rooms, scaleLabels } from "@/lib/content";
import { emptyDraft, readDraft, writeDraft } from "@/lib/storage";
import type { AssessmentDraft, RoomId } from "@/lib/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AssessmentPage() {
  const router = useRouter();
  const [draft, setDraft] = useState<AssessmentDraft>(emptyDraft);
  const [index, setIndex] = useState(0);
  const [ready, setReady] = useState(false);
  useEffect(() => { const saved = readDraft(); setDraft(saved); const first = questions.findIndex((q) => !saved.answers[q.id]); setIndex(first < 0 ? questions.length : first); setReady(true); }, []);
  if (!ready) return null;
  const isForced = index === questions.length;
  const progress = Math.round(((index + (isForced ? 1 : 0)) / (questions.length + 1)) * 100);
  const chooseLikert = (value: number) => { const next = { ...draft, answers: { ...draft.answers, [questions[index].id]: value } }; setDraft(next); writeDraft(next); };
  const chooseStory = (room: RoomId) => { const next = { ...draft, forcedChoice: room }; setDraft(next); writeDraft(next); };
  const goNext = () => { if (isForced) router.push("/reflect"); else setIndex((value) => value + 1); };
  const canContinue = isForced ? Boolean(draft.forcedChoice) : Boolean(draft.answers[questions[index].id]);
  return <main className="flex min-h-[calc(100vh-6rem)] flex-col">
    <div className="h-1 bg-ink/10"><div className="h-full bg-clay transition-all" style={{ width: `${progress}%` }} /></div>
    <div className="shell flex flex-1 items-center py-10 sm:py-16">
      <section className="mx-auto w-full max-w-4xl">
        <div className="flex items-center justify-between text-xs uppercase tracking-[.16em] text-ink/50"><span>Recognize</span><span>{isForced ? "One final choice" : `${index + 1} of ${questions.length}`}</span></div>
        {isForced ? <>
          <h1 className="mt-8 max-w-3xl font-serif text-4xl leading-tight sm:text-6xl">Which story feels closest to what you are navigating right now?</h1>
          <p className="mt-4 text-sm text-ink/60">Choose one, even if more than one resonates. This choice breaks score ties; it does not override your responses.</p>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">{rooms.map((room) => <button key={room.id} onClick={() => chooseStory(room.id)} className={`rounded-xl border p-5 text-left transition ${draft.forcedChoice === room.id ? "border-forest bg-forest text-paper" : "border-ink/15 bg-paper/60 hover:border-moss"}`}><span className="text-xs uppercase tracking-wider opacity-60">{room.name}</span><span className="mt-2 block font-serif text-xl">“{room.falseStory}”</span></button>)}</div>
        </> : <>
          <p className="eyebrow mt-8">Notice what feels true lately</p>
          <h1 className="mt-4 max-w-3xl font-serif text-4xl leading-tight sm:text-6xl">{questions[index].text}</h1>
          <div className="mt-10 grid gap-2 sm:grid-cols-5" role="radiogroup" aria-label="Agreement scale">{scaleLabels.map((label, i) => { const value = i + 1; const selected = draft.answers[questions[index].id] === value; return <button key={label} role="radio" aria-checked={selected} onClick={() => chooseLikert(value)} className={`min-h-24 rounded-xl border p-4 text-left text-sm transition sm:text-center ${selected ? "border-forest bg-forest text-paper" : "border-ink/15 bg-paper/60 hover:border-moss"}`}><strong className="block text-lg">{value}</strong><span className="mt-2 block text-xs leading-4 opacity-75">{label}</span></button>; })}</div>
        </>}
        <div className="mt-9 flex items-center justify-between">
          <button className="button-secondary" onClick={() => setIndex((value) => Math.max(0, value - 1))} disabled={index === 0}>← Back</button>
          <button className="button-primary" onClick={goNext} disabled={!canContinue}>{isForced ? "Continue to reflection" : "Continue"} →</button>
        </div>
      </section>
    </div>
  </main>;
}
