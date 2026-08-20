"use client";

import { popularQuestions } from "@/lib/parablepath/popular/questions";
import { scorePopularAssessment } from "@/lib/parablepath/popular/scoring";
import type { RoomId } from "@/lib/types";
import { useRouter } from "next/navigation";
import { useState } from "react";

function developmentQuery() {
  if (typeof window === "undefined") return "";
  return new URLSearchParams(window.location.search).get("experience") === "popular" ? "&experience=popular" : "";
}

export function PopularAssessment() {
  const router = useRouter();
  const [started, setStarted] = useState(false);
  const [answers, setAnswers] = useState<RoomId[]>([]);
  const question = popularQuestions[answers.length];

  const choose = (room: RoomId) => {
    const next = [...answers, room];
    if (next.length === popularQuestions.length) {
      const result = scorePopularAssessment(next);
      router.push(`/results?room=${result}${developmentQuery()}`);
      return;
    }
    setAnswers(next);
  };

  if (!started) return <main className="shell py-10 sm:py-20">
    <section className="relative overflow-hidden rounded-[2rem] border border-gold/30 bg-forest px-6 py-14 text-paper shadow-soft sm:px-12 sm:py-20">
      <div aria-hidden="true" className="absolute -right-20 -top-20 h-64 w-64 rounded-full border-[36px] border-gold/15" />
      <p className="text-xs font-semibold uppercase tracking-[.2em] text-gold">Find Your Story Room · early preview</p>
      <h1 className="mt-6 max-w-4xl font-serif text-5xl leading-[.95] tracking-[-.035em] sm:text-7xl">What story might you be living?</h1>
      <p className="mt-7 max-w-2xl font-serif text-xl leading-8 text-paper/80">You are not a type. You may be inhabiting a story.</p>
      <button className="mt-10 inline-flex items-center justify-center rounded-full bg-gold px-7 py-4 text-sm font-bold text-ink transition hover:-translate-y-0.5 hover:bg-paper focus:outline-none focus:ring-2 focus:ring-paper" onClick={() => setStarted(true)}>Find Your Story Room →</button>
      <p className="mt-6 text-xs text-paper/55">Three sample prompts · about one minute</p>
    </section>
  </main>;

  return <main className="shell py-8 sm:py-14">
    <section className="mx-auto max-w-3xl">
      <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[.16em] text-ink/50"><span>Laugh · recognize · name</span><span>{answers.length + 1} / {popularQuestions.length}</span></div>
      <div className="mt-3 h-2 overflow-hidden rounded-full bg-ink/10"><div className="h-full rounded-full bg-gold transition-all" style={{ width: `${((answers.length + 1) / popularQuestions.length) * 100}%` }} /></div>
      <p className="mt-10 text-xs font-semibold uppercase tracking-[.18em] text-clay">Choose the answer that catches you first</p>
      <h1 className="mt-4 font-serif text-4xl leading-tight sm:text-6xl">{question.prompt}</h1>
      <div className="mt-10 grid gap-4">{question.options.map((option) => <button key={option.label} onClick={() => choose(option.room)} className="panel group min-h-24 p-6 text-left font-serif text-xl leading-8 transition hover:-translate-y-1 hover:border-gold hover:bg-paper focus:outline-none focus:ring-2 focus:ring-gold"><span className="mr-3 text-clay transition group-hover:translate-x-1">→</span>{option.label}</button>)}</div>
      <button className="mt-7 text-sm font-semibold text-ink/55 underline decoration-ink/20 underline-offset-4" onClick={() => answers.length ? setAnswers(answers.slice(0, -1)) : setStarted(false)}>← Back</button>
    </section>
  </main>;
}
