"use client";

import { questionPages, scaleLabels } from "@/lib/content";
import { emptyDraft, readDraft, writeDraft } from "@/lib/storage";
import type { AssessmentDraft } from "@/lib/types";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

export default function AssessmentPage() {
  const router = useRouter();
  const [draft, setDraft] = useState<AssessmentDraft>(emptyDraft);
  const [page, setPage] = useState(0);
  const [ready, setReady] = useState(false);
  const [showErrors, setShowErrors] = useState(false);
  useEffect(() => { const saved = readDraft(); setDraft(saved); const firstIncomplete = questionPages.findIndex((part) => part.some((question) => !saved.answers[question.id])); setPage(firstIncomplete < 0 ? 4 : firstIncomplete); setReady(true); }, []);
  const current = questionPages[page];
  const unanswered = useMemo(() => current.filter((question) => !draft.answers[question.id]), [current, draft.answers]);
  if (!ready) return null;
  const choose = (id: string, value: number) => { const next = { ...draft, answers: { ...draft.answers, [id]: value } }; setDraft(next); writeDraft(next); };
  const next = () => { if (unanswered.length) { setShowErrors(true); document.getElementById(unanswered[0].id)?.focus(); return; } setShowErrors(false); if (page === 4) router.push("/reflect"); else { setPage((value) => value + 1); window.scrollTo({ top: 0, behavior: "smooth" }); } };
  return <main className="shell py-8 sm:py-12">
    <section className="mx-auto max-w-4xl">
      <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[.16em] text-ink/55"><span>Recognize</span><span>Part {page + 1} of 5</span></div>
      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-ink/10" role="progressbar" aria-valuemin={1} aria-valuemax={5} aria-valuenow={page + 1} aria-label={`Part ${page + 1} of 5`}><div className="h-full bg-clay transition-all" style={{ width: `${(page + 1) * 20}%` }} /></div>
      <h1 className="mt-7 font-serif text-4xl sm:text-5xl">What feels true in this season?</h1>
      <p className="mt-3 text-sm leading-6 text-ink/60">Answer according to what you actually tend to experience and do, especially under stress. There are no “good” results.</p>
      {showErrors && unanswered.length > 0 && <div role="alert" className="mt-6 rounded-xl border border-clay/40 bg-clay/10 p-4 text-sm text-ink">Please answer {unanswered.length === 1 ? "the highlighted statement" : `all ${unanswered.length} highlighted statements`} before continuing.</div>}
      <div className="mt-8 space-y-5">{current.map((question, questionIndex) => {
        const missing = showErrors && !draft.answers[question.id];
        return <fieldset key={question.id} className={`panel p-5 sm:p-7 ${missing ? "border-clay ring-1 ring-clay" : ""}`}>
          <legend id={question.id} tabIndex={-1} className="w-full px-0 font-serif text-xl leading-7 sm:text-2xl"><span className="mr-2 text-sm text-ink/40">{page * 8 + questionIndex + 1}.</span>{question.text}</legend>
          <div className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-5">{scaleLabels.map((label, index) => { const value = index + 1; const checked = draft.answers[question.id] === value; return <label key={label} className={`flex min-h-14 cursor-pointer items-center gap-3 rounded-xl border p-3 text-sm transition sm:min-h-20 sm:flex-col sm:justify-center sm:text-center ${checked ? "border-forest bg-forest text-paper" : "border-ink/15 bg-white/50 hover:border-moss"}`}><input className="h-4 w-4 accent-gold sm:sr-only" type="radio" name={question.id} value={value} checked={checked} onChange={() => choose(question.id, value)} /><strong>{value}</strong><span className="text-xs leading-4 opacity-80">{label}</span></label>; })}</div>
        </fieldset>;
      })}</div>
      <div className="mt-8 flex items-center justify-between"><button className="button-secondary" onClick={() => page === 0 ? router.push("/start") : setPage((value) => value - 1)}>← Previous</button><button className="button-primary" onClick={next}>{page === 4 ? "Continue to reflection" : "Continue"} →</button></div>
    </section>
  </main>;
}
