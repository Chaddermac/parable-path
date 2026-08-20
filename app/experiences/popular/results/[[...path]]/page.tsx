import { PopularResultActions } from "@/components/popular/PopularResultActions";
import { roomById } from "@/lib/content";
import { popularResultByRoom } from "@/lib/parablepath/popular/results";
import type { RoomId } from "@/lib/types";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Your Story Room | ParablePath",
  description: "Name the story you may be inhabiting and discover what door could open next.",
  alternates: { canonical: "https://parablepath.com/results" }
};

export default async function PopularResultsPage({ searchParams }: { searchParams: Promise<{ room?: string }> }) {
  const { room: requestedRoom } = await searchParams;
  const room = (requestedRoom && requestedRoom in popularResultByRoom ? requestedRoom : "lost") as RoomId;
  const result = popularResultByRoom[room];
  const formation = roomById[room];
  return <main className="shell py-10 sm:py-16">
    <section className="max-w-4xl"><p className="eyebrow">Your possible Story Room</p><h1 className="display mt-4 text-forest">{formation.name}</h1><p className="mt-6 max-w-3xl font-serif text-2xl leading-9 text-ink/70">{result.recognition}</p><p className="mt-5 max-w-2xl text-sm leading-7 text-ink/60">{result.description}</p></section>
    <section className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-ink/10 bg-ink/10 md:grid-cols-2">
      <article className="bg-paper p-7 sm:p-9"><p className="eyebrow">The story underneath</p><blockquote className="mt-5 font-serif text-2xl leading-9 text-forest">“{result.underlyingStory}”</blockquote></article>
      <article className="bg-paper p-7 sm:p-9"><p className="eyebrow">The strength</p><p className="mt-5 text-sm leading-7 text-ink/70">{result.strength}</p></article>
      <article className="bg-forest p-7 text-paper sm:p-9"><p className="text-xs font-semibold uppercase tracking-[.2em] text-gold">The shadow</p><p className="mt-5 text-sm leading-7 text-paper/75">{result.shadow}</p></article>
      <article className="bg-forest p-7 text-paper sm:p-9"><p className="text-xs font-semibold uppercase tracking-[.2em] text-gold">The open door</p><p className="mt-5 font-serif text-2xl leading-9 text-paper">{result.possibility}</p></article>
    </section>
    <section className="panel mt-12 p-7 sm:p-10"><p className="eyebrow">Go deeper</p><h2 className="mt-4 font-serif text-4xl">A quick result can name the room. Formation explores the story.</h2><p className="mt-5 max-w-2xl text-sm leading-7 text-ink/65">The deeper ParablePath assessment explores false story, shadow, parable, redemptive calling, and one next faithful step.</p><PopularResultActions room={formation.name} /></section>
    <p className="mx-auto mt-10 max-w-3xl text-center text-xs leading-6 text-ink/50">This early popular assessment uses placeholder prompts for architecture testing. It is a reflection aid, not a personality type or diagnosis.</p>
  </main>;
}
