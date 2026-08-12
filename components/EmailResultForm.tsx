"use client";

import { FormEvent, useState } from "react";

export function EmailResultForm({ responseId }: { responseId: string }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [message, setMessage] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setMessage("");
    try {
      const response = await fetch("/api/results/email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ responseId, email })
      });
      const body = await response.json() as { error?: string };
      if (!response.ok) throw new Error(body.error || "Unable to send your result.");
      setStatus("sent");
      setEmail("");
      setMessage("Your reflection has been sent. You may close this page when you are ready.");
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Unable to send your result.");
    }
  }

  return <section className="panel mx-auto mt-12 max-w-3xl p-7 sm:p-9">
    <p className="eyebrow">Keep your reflection</p>
    <h2 className="mt-3 font-serif text-3xl">Email this result to yourself</h2>
    <p className="mt-4 text-sm leading-7 text-ink/60">Your email address is used only to deliver this message. It is not added to your assessment record or stored by ParablePath.</p>
    <form onSubmit={submit} className="mt-6 flex flex-col gap-3 sm:flex-row">
      <label className="sr-only" htmlFor="result-email">Email address</label>
      <input id="result-email" name="email" type="email" autoComplete="email" required value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" className="min-w-0 flex-1 rounded-full border border-ink/20 bg-white px-5 py-3.5 text-sm outline-none focus:border-forest focus:ring-2 focus:ring-gold/50" />
      <button type="submit" disabled={status === "sending"} className="button-primary">{status === "sending" ? "Sending…" : "Email my result"}</button>
    </form>
    {message && <p role="status" className={`mt-4 text-sm ${status === "error" ? "text-clay" : "text-forest"}`}>{message}</p>}
  </section>;
}
