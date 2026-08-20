"use client";

import { popularQuestions } from "@/lib/parablepath/popular/questions";
import { scorePopularAssessment } from "@/lib/parablepath/popular/scoring";
import type { PopularOption } from "@/lib/parablepath/popular/types";
import { useRouter } from "next/navigation";
import { useState } from "react";

function developmentQuery() {
  if (typeof window === "undefined") return "";
  return new URLSearchParams(window.location.search).get("experience") === "popular" ? "&experience=popular" : "";
}

export function PopularAssessment() {
  const router = useRouter();
  const [answers, setAnswers] = useState<PopularOption[]>([]);
  const question = popularQuestions[answers.length];

  const choose = (option: PopularOption) => {
    const next = [...answers, option];
    if (next.length === popularQuestions.length) {
      const result = scorePopularAssessment(next);
      const tieQuery = result.nearTie ? `&secondary=${result.secondary}&between=1` : "";
      router.push(`/results?room=${result.primary}${tieQuery}${developmentQuery()}`);
      return;
    }
    setAnswers(next);
  };

  return <main className="popular-page shell py-8 sm:py-14">
    <section className="mx-auto max-w-3xl">
      <div className="popular-kicker flex items-center justify-between gap-4 text-xs font-bold uppercase tracking-[.16em]"><span>{question.round}</span><span>{answers.length + 1} / {popularQuestions.length}</span></div>
      <div className="popular-progress mt-3 h-2.5 overflow-hidden rounded-full"><div className="h-full rounded-full transition-all" style={{ width: `${((answers.length + 1) / popularQuestions.length) * 100}%` }} /></div>
      <p className="popular-accent-label mt-10 text-xs font-bold uppercase tracking-[.18em]">Go with your first instinct</p>
      <h1 className="popular-question mt-4 text-4xl leading-tight sm:text-6xl">{question.prompt}</h1>
      <div className="mt-10 grid gap-4">{question.options.map((option, index) => <button key={option.label} onClick={() => choose(option)} className="popular-answer group min-h-24 p-6 text-left text-lg font-semibold leading-8 sm:text-xl"><span className="popular-answer-index mr-4 inline-flex h-8 w-8 items-center justify-center rounded-full text-sm">{String.fromCharCode(65 + index)}</span>{option.label}</button>)}</div>
      <button className="popular-back mt-7 text-sm font-bold underline underline-offset-4" onClick={() => answers.length ? setAnswers(answers.slice(0, -1)) : router.push("/")}>← Back</button>
    </section>
  </main>;
}
