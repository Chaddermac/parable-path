import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Formation Reflection | ParablePath",
  description: "Return to the formation assessment to create a ParablePath reflection.",
  alternates: { canonical: "https://parablepath.app/results" }
};

export default function FormationResultsIndex() {
  return <main className="shell py-20 text-center"><p className="eyebrow">Formation reflection</p><h1 className="mt-5 font-serif text-5xl">No reflection was selected.</h1><p className="mx-auto mt-5 max-w-xl leading-7 text-ink/60">Complete the formation assessment to receive a result stored in this browser.</p><Link href="/start" className="button-primary mt-8">Begin a reflection</Link></main>;
}
