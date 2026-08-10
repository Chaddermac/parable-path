"use client";

import { createResult, readDraft } from "@/lib/storage";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ReflectPage() {
  const router = useRouter();
  const [reflection, setReflection] = useState("");
  const finish = () => { const draft = readDraft(); if (Object.keys(draft.answers).length !== 24 || !draft.forcedChoice) { router.push("/assessment"); return; } const result = createResult(draft, reflection.trim()); router.push(`/results/${result.id}`); };
  return <main className="shell py-12 sm:py-20"><div className="mx-auto max-w-3xl">
    <p className="eyebrow">Receive · an open reflection</p>
    <h1 className="mt-5 font-serif text-4xl leading-tight sm:text-6xl">Before seeing a result, what story have you noticed shaping your life lately?</h1>
    <p className="mt-5 max-w-2xl leading-7 text-ink/60">There is no correct answer. A sentence or a few honest words are enough. This stays in your browser.</p>
    <label className="mt-10 block"><span className="sr-only">Your reflection</span><textarea autoFocus value={reflection} onChange={(e) => setReflection(e.target.value)} maxLength={1500} rows={8} placeholder="I have been noticing…" className="w-full resize-y rounded-2xl border border-ink/15 bg-paper/70 p-5 font-serif text-xl leading-8 outline-none transition placeholder:text-ink/30 focus:border-forest focus:ring-2 focus:ring-forest/10" /></label>
    <div className="mt-7 flex items-center justify-between"><button className="button-secondary" onClick={() => router.push("/assessment")}>← Back</button><button className="button-primary" onClick={finish}>See my reflection →</button></div>
  </div></main>;
}
