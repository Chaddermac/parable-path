"use client";

import { orderedPopularOptions, popularQuestions } from "@/lib/parablepath/popular/questions";
import { scorePopularAssessment } from "@/lib/parablepath/popular/scoring";
import type { PopularOption } from "@/lib/parablepath/popular/types";
import { savePopularResponse } from "@/lib/api";
import { useRouter } from "next/navigation";
import { useState } from "react";

const roundTransitions: Record<string, string> = {
  popular_05: "Okay. Everyday you has been documented. Let’s add some stress.",
  popular_09: "Excellent. Now let’s involve other humans. What could go wrong?",
  popular_13: "You’ve been very convincing. Now for the stuff underneath."
};

export function PopularAssessment() {
  const router = useRouter();
  const [answers, setAnswers] = useState<PopularOption[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState("");
  const question = popularQuestions[answers.length];
  const options = orderedPopularOptions(question);

  const choose = async (option: PopularOption) => {
    if (isSaving) return;
    const next = [...answers, option];
    if (next.length === popularQuestions.length) {
      const result = scorePopularAssessment(next);
      setIsSaving(true);
      setSaveError("");
      try {
        await savePopularResponse({ id: crypto.randomUUID(), answers: next });
        router.push(`/results/${result.primary}`);
      } catch {
        setSaveError("We couldn’t securely save your answers. Please try your final choice again.");
        setIsSaving(false);
      }
      return;
    }
    setAnswers(next);
  };

  return <main className="popular-page shell py-8 sm:py-14">
    <section className="mx-auto max-w-3xl">
      <div className="popular-kicker flex items-center justify-between gap-4 text-xs font-bold uppercase tracking-[.16em]"><span>{question.round}</span><span>{answers.length + 1} / {popularQuestions.length}</span></div>
      <div className="popular-progress mt-3 h-2.5 overflow-hidden rounded-full"><div className="h-full rounded-full transition-all" style={{ width: `${((answers.length + 1) / popularQuestions.length) * 100}%` }} /></div>
      {roundTransitions[question.id] ? <p className="mt-7 text-lg font-semibold leading-7 text-ink/70">{roundTransitions[question.id]}</p> : null}
      <p className="popular-accent-label mt-10 text-xs font-bold uppercase tracking-[.18em]">Go with your first instinct</p>
      <h1 className="popular-question mt-4 text-4xl leading-tight sm:text-6xl">{question.prompt}</h1>
      <div className="mt-10 grid gap-4">{options.map((option, index) => <button key={option.label} disabled={isSaving} onClick={() => void choose(option)} className="popular-answer group min-h-24 p-6 text-left text-lg font-semibold leading-8 disabled:cursor-wait disabled:opacity-60 sm:text-xl"><span className="popular-answer-index mr-4 inline-flex h-8 w-8 items-center justify-center rounded-full text-sm">{String.fromCharCode(65 + index)}</span>{option.label}</button>)}</div>
      {isSaving ? <p className="mt-6 text-sm font-semibold text-ink/60" role="status">Saving your anonymous answers…</p> : null}
      {saveError ? <p className="mt-6 text-sm font-semibold text-rust" role="alert">{saveError}</p> : null}
      <button disabled={isSaving} className="popular-back mt-7 text-sm font-bold underline underline-offset-4 disabled:opacity-50" onClick={() => answers.length ? setAnswers(answers.slice(0, -1)) : router.push("/")}>← Back</button>
    </section>
  </main>;
}
