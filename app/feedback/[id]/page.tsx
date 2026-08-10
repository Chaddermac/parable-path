"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { FormEvent, useState } from "react";

export default function FeedbackPage() {
  const { id } = useParams<{ id: string }>();
  const [sent, setSent] = useState(false);
  const submit = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); const data = new FormData(event.currentTarget); localStorage.setItem(`parablepath:feedback:${id}`, JSON.stringify({ helpful: data.get("helpful"), resonated: data.get("resonated"), comments: data.get("comments"), createdAt: new Date().toISOString() })); setSent(true); };
  if (sent) return <main className="shell py-20 text-center"><p className="eyebrow">Feedback saved</p><h1 className="mt-5 font-serif text-5xl">Thank you for helping shape the path.</h1><p className="mx-auto mt-5 max-w-xl leading-7 text-ink/60">For this MVP, your feedback stays in this browser. It will not be transmitted.</p><Link href={`/results/${id}`} className="button-primary mt-8">Return to my reflection</Link></main>;
  return <main className="shell py-10 sm:py-16"><form onSubmit={submit} className="panel mx-auto max-w-2xl p-6 sm:p-10"><p className="eyebrow">A brief response</p><h1 className="mt-4 font-serif text-4xl sm:text-5xl">How did this reflection meet you?</h1><p className="mt-4 text-sm leading-6 text-ink/60">Your response stays in this browser for now. Please do not include sensitive personal information.</p>
    <fieldset className="mt-9"><legend className="font-semibold">Was the experience helpful?</legend><div className="mt-3 flex flex-wrap gap-3">{["Yes", "Somewhat", "Not yet"].map((value) => <label key={value} className="cursor-pointer rounded-full border border-ink/15 px-4 py-2 text-sm has-[:checked]:border-forest has-[:checked]:bg-forest has-[:checked]:text-paper"><input className="sr-only" type="radio" name="helpful" value={value} required />{value}</label>)}</div></fieldset>
    <fieldset className="mt-8"><legend className="font-semibold">How closely did the possible room resonate?</legend><div className="mt-3 flex flex-wrap gap-3">{["Closely", "Partly", "Not closely"].map((value) => <label key={value} className="cursor-pointer rounded-full border border-ink/15 px-4 py-2 text-sm has-[:checked]:border-forest has-[:checked]:bg-forest has-[:checked]:text-paper"><input className="sr-only" type="radio" name="resonated" value={value} required />{value}</label>)}</div></fieldset>
    <label className="mt-8 block font-semibold">What would you change or carry forward?<textarea name="comments" rows={5} maxLength={1000} className="mt-3 w-full resize-y rounded-xl border border-ink/15 bg-transparent p-4 font-normal outline-none focus:border-forest" placeholder="Optional" /></label>
    <div className="mt-8 flex flex-wrap gap-3"><button className="button-primary" type="submit">Save feedback</button><Link className="button-secondary" href={`/results/${id}`}>Skip for now</Link></div>
  </form></main>;
}
