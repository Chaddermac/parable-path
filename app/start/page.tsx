"use client";

import Link from "next/link";
import { useState } from "react";

export default function StartPage() {
  const [consent, setConsent] = useState(false);
  return <main className="shell py-10 sm:py-16">
    <div className="mx-auto max-w-3xl">
      <p className="eyebrow">Before you begin</p>
      <h1 className="mt-4 font-serif text-5xl tracking-tight sm:text-6xl">Make room for honesty, not certainty.</h1>
      <div className="panel mt-10 p-6 sm:p-9">
        <h2 className="font-serif text-2xl">How this reflection works</h2>
        <ol className="mt-5 space-y-4 text-sm leading-7 text-ink/70">
          <li><strong className="text-ink">1. Recognize.</strong> Respond to 24 statements on a five-point scale, then choose the false story that feels closest.</li>
          <li><strong className="text-ink">2. Receive.</strong> Pause for an open reflection before seeing the parable and True Story connected with your responses.</li>
          <li><strong className="text-ink">3. Become.</strong> Consider a redemptive calling and choose one small, faithful next step.</li>
        </ol>
        <div className="mt-7 rounded-xl bg-cream p-5 text-sm leading-6 text-ink/65"><strong className="text-ink">Please hold the result lightly.</strong> ParablePath is not a personality test, clinical diagnosis, prophecy, counseling, or crisis care. It cannot tell you who you are. Your responses remain in this browser and are not sent to a server.</div>
        <label className="mt-7 flex cursor-pointer items-start gap-3 text-sm leading-6">
          <input className="mt-1 h-4 w-4 accent-forest" type="checkbox" checked={consent} onChange={(event) => setConsent(event.target.checked)} />
          <span>I understand that this is a reflection aid, not a fixed label, and I choose to continue.</span>
        </label>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href={consent ? "/assessment" : "#consent"} aria-disabled={!consent} onClick={(event) => { if (!consent) event.preventDefault(); }} className={`button-primary ${!consent ? "pointer-events-none opacity-40" : ""}`}>Begin assessment →</Link>
          <Link href="/" className="button-secondary">Go back</Link>
        </div>
      </div>
    </div>
  </main>;
}
