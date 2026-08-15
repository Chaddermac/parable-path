"use client";

import { calculateScores, createResult, readDraft, updateResult } from "@/lib/storage";
import { generateAiResult, saveResponse, saveSafetyFlag } from "@/lib/api";
import { hasCrisisLanguage } from "@/lib/safety";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ReflectPage() {
  const router = useRouter();
  const [reflection, setReflection] = useState("");
  const [saving, setSaving] = useState(false);
  const [safetyFlagged, setSafetyFlagged] = useState(false);
  const finish = async () => {
    const draft = readDraft();
    if (draft.consentGiven !== true) { router.push("/start"); return; }
    if (Object.keys(draft.answers).length !== 40) { router.push("/assessment"); return; }
    setSaving(true);
    if (hasCrisisLanguage(reflection)) {
      const { scores, ranking } = calculateScores(draft.answers, draft.forcedChoice);
      try { await saveSafetyFlag({ id: crypto.randomUUID(), createdAt: new Date().toISOString(), draft, scores, ranking }); }
      catch { /* The support message must never depend on database availability. */ }
      setReflection("");
      setSafetyFlagged(true);
      setSaving(false);
      return;
    }
    const result = createResult(draft, reflection.trim());
    try { await saveResponse(result); result.syncStatus = "saved"; }
    catch { result.syncStatus = "local-only"; }
    try { result.aiResult = await generateAiResult(result); result.aiStatus = "generated"; }
    catch { result.aiStatus = "unavailable"; }
    updateResult(result);
    router.push(`/results/${result.id}`);
  };
  if (safetyFlagged) return <main className="shell py-12 sm:py-20"><div className="panel mx-auto max-w-3xl border-clay/30 p-7 sm:p-12">
    <p className="eyebrow">Immediate support matters</p>
    <h1 className="mt-5 font-serif text-4xl leading-tight sm:text-6xl">This tool is not designed for crisis care.</h1>
    <p className="mt-6 text-lg leading-8 text-ink/70">What you shared may involve immediate safety or abuse. ParablePath will not generate a normal reflection from it, and your written words were not saved to the database.</p>
    <div className="mt-8 rounded-xl bg-cream p-6 text-sm leading-7 text-ink/75">
      <p><strong className="text-ink">If you or someone else is in immediate danger, contact your local emergency services now.</strong></p>
      <p className="mt-3">If you are in the United States, call or text <a className="font-semibold text-forest underline" href="tel:988">988</a> for the Suicide & Crisis Lifeline. Elsewhere, contact a local crisis line.</p>
      <p className="mt-3">If it is safe to do so, reach out now to a trusted person, pastor, counselor, advocate, or local crisis-support service. You do not have to handle an urgent situation alone.</p>
    </div>
    <div className="mt-8 flex flex-wrap gap-3"><button className="button-secondary" onClick={() => setSafetyFlagged(false)}>Edit my reflection</button><a className="button-primary" href="/">Return home</a></div>
  </div></main>;
  return <main className="shell py-12 sm:py-20"><div className="mx-auto max-w-3xl">
    <p className="eyebrow">Receive · an open reflection</p>
    <h1 className="mt-5 font-serif text-4xl leading-tight sm:text-6xl">Before seeing a result, what story have you noticed shaping your life lately?</h1>
    <p className="mt-5 max-w-2xl leading-7 text-ink/60">There is no correct answer. A sentence or a few honest words are enough. This stays in your browser.</p>
    <label className="mt-10 block"><span className="sr-only">Your reflection</span><textarea autoFocus value={reflection} onChange={(e) => setReflection(e.target.value)} maxLength={1500} rows={8} placeholder="I have been noticing…" className="w-full resize-y rounded-2xl border border-ink/15 bg-paper/70 p-5 font-serif text-xl leading-8 outline-none transition placeholder:text-ink/30 focus:border-forest focus:ring-2 focus:ring-forest/10" /></label>
    <div className="mt-7 flex items-center justify-between"><button className="button-secondary" onClick={() => router.push("/assessment")} disabled={saving}>← Back</button><button className="button-primary" onClick={finish} disabled={saving}>{saving ? "Saving…" : "See my reflection →"}</button></div>
  </div></main>;
}
