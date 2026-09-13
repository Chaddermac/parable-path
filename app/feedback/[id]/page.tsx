"use client";

import { saveFeedback } from "@/lib/api";
import type { FeedbackRecord } from "@/lib/types";
import Link from "next/link";
import { useParams } from "next/navigation";
import { FormEvent, useState } from "react";

const scoreFields = [
  ["accuracyScore", "My result felt accurate."],
  ["parableHelpfulnessScore", "The parable connection was helpful."],
  ["repentanceReframingScore", "The result helped me understand repentance differently."],
  ["nextStepUsefulnessScore", "The next faithful step was concrete and usable."],
  ["toneScore", "The tone felt invitational rather than shaming."]
] as const;

export default function FeedbackPage() {
  const { id } = useParams<{ id: string }>();
  const [state, setState] = useState<"idle" | "saving" | "saved" | "local-only">("idle");
  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setState("saving");
    const data = new FormData(event.currentTarget);
    const feedback: FeedbackRecord = {
      id: crypto.randomUUID(), responseId: id, createdAt: new Date().toISOString(),
      accuracyScore: Number(data.get("accuracyScore")),
      parableHelpfulnessScore: Number(data.get("parableHelpfulnessScore")),
      repentanceReframingScore: Number(data.get("repentanceReframingScore")),
      nextStepUsefulnessScore: Number(data.get("nextStepUsefulnessScore")),
      toneScore: Number(data.get("toneScore")),
      helpfulText: String(data.get("helpfulText") || ""),
      unclearText: String(data.get("unclearText") || "")
    };
    localStorage.setItem(`parablepath:feedback:${id}`, JSON.stringify(feedback));
    try { await saveFeedback(feedback); setState("saved"); }
    catch { setState("local-only"); }
  };
  if (state === "saved" || state === "local-only") return <main className="shell py-20 text-center"><p className="eyebrow">Feedback saved</p><h1 className="mt-5 font-serif text-5xl">Thank you for helping shape the path.</h1><p className="mx-auto mt-5 max-w-xl leading-7 text-ink/60">{state === "saved" ? "Your feedback was received." : "Your feedback is safe in this browser, but remote storage is temporarily unavailable."}</p><Link href={`/results/${id}`} className="button-primary mt-8">Return to my reflection</Link></main>;
  return <main className="shell py-10 sm:py-16"><form onSubmit={submit} className="panel mx-auto max-w-3xl p-6 sm:p-10"><p className="eyebrow">A brief response</p><h1 className="mt-4 font-serif text-4xl sm:text-5xl">How did this reflection meet you?</h1><p className="mt-4 text-sm leading-6 text-ink/60">Names and email are not requested. Please do not include sensitive personal information.</p>
    <div className="mt-9 space-y-8">{scoreFields.map(([name, label]) => <fieldset key={name}><legend className="font-semibold">{label}</legend><div className="mt-3 grid grid-cols-5 gap-2">{[1,2,3,4,5].map((score) => <label key={score} className="cursor-pointer rounded-lg border border-ink/15 p-3 text-center text-sm has-[:checked]:border-forest has-[:checked]:bg-forest has-[:checked]:text-paper"><input className="sr-only" type="radio" name={name} value={score} aria-label={`${label} ${score} out of 5`} required /><span className="block font-semibold">{score}</span><span className="mt-1 hidden text-[10px] opacity-70 sm:block">{score === 1 ? "Not at all" : score === 5 ? "Very much" : ""}</span></label>)}</div></fieldset>)}</div>
    <label className="mt-9 block font-semibold">What felt most helpful?<textarea name="helpfulText" rows={4} maxLength={2000} className="mt-3 w-full resize-y rounded-xl border border-ink/15 bg-transparent p-4 font-normal outline-none focus:border-forest" placeholder="Optional" /></label>
    <label className="mt-7 block font-semibold">What felt unclear, inaccurate, or unhelpful?<textarea name="unclearText" rows={4} maxLength={2000} className="mt-3 w-full resize-y rounded-xl border border-ink/15 bg-transparent p-4 font-normal outline-none focus:border-forest" placeholder="Optional" /></label>
    <div className="mt-8 flex flex-wrap gap-3"><button className="button-primary" type="submit" disabled={state === "saving"}>{state === "saving" ? "Saving…" : "Save feedback"}</button><Link className="button-secondary" href={`/results/${id}`}>Skip for now</Link></div>
  </form></main>;
}
