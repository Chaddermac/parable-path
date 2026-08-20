import { PopularResultActions } from "@/components/popular/PopularResultActions";
import { popularResultByRoom } from "@/lib/parablepath/popular/results";
import type { RoomId } from "@/lib/types";
import type { Metadata } from "next";
import type { CSSProperties } from "react";

export const metadata: Metadata = {
  title: "Your Story Room | ParablePath",
  description: "Name the story you may be inhabiting and discover what door could open next.",
  alternates: { canonical: "https://parablepath.com/results" }
};

export default async function PopularResultsPage({ searchParams }: { searchParams: Promise<{ room?: string; secondary?: string; between?: string }> }) {
  const { room: requestedRoom, secondary: requestedSecondary, between } = await searchParams;
  const room = (requestedRoom && requestedRoom in popularResultByRoom ? requestedRoom : "lost") as RoomId;
  const result = popularResultByRoom[room];
  const secondary = requestedSecondary && requestedSecondary in popularResultByRoom && requestedSecondary !== room
    ? popularResultByRoom[requestedSecondary as RoomId]
    : null;
  const roomStyle = { "--room-accent": result.accentColor, "--room-accent-soft": result.accentSoft } as CSSProperties;
  return <main className="popular-reveal shell py-8 sm:py-14" style={roomStyle}>
    <section className="popular-reveal-hero relative overflow-hidden rounded-[2rem] px-6 py-10 sm:px-12 sm:py-14">
      <div className="popular-reveal-ring" aria-hidden="true" />
      <div className="relative z-10 max-w-4xl">
        <p className="popular-reveal-label">Your Story Room</p>
        <div className="popular-room-icon mt-6" aria-hidden="true">{result.icon}</div>
        <h1 className="popular-room-name mt-5 text-[clamp(3.25rem,10vw,7.5rem)] leading-[.88] tracking-[-.065em]">{result.displayName}</h1>
        <p className="popular-room-tentative mt-5 text-sm font-bold">{between === "1" && secondary
          ? `You may be standing between ${result.displayName} and ${secondary.displayName}. Your answers lean toward this room.`
          : "Right now, your answers point toward this room."}</p>
        <blockquote className="popular-recognition mt-7 max-w-3xl text-2xl font-bold leading-tight sm:text-4xl">“{result.recognition}”</blockquote>
        <p className="popular-result-description mt-6 max-w-2xl text-base leading-7 sm:text-lg sm:leading-8">{result.description}</p>
      </div>
    </section>

    <section className="popular-understory mt-7 rounded-[1.75rem] p-7 sm:p-10">
      <p className="popular-reveal-label">The Story Underneath</p>
      <blockquote className="mt-5 max-w-4xl text-2xl font-bold leading-tight sm:text-4xl">“{result.underlyingStory}”</blockquote>
    </section>

    <section className="mt-7 grid gap-4 lg:grid-cols-3">
      <article className="popular-result-card"><p className="popular-card-label">Your Strength</p><h2>{result.strengthLabel}</h2><p>{result.strength}</p></article>
      <article className="popular-result-card"><p className="popular-card-label">The Shadow</p><h2>{result.shadowLabel}</h2><p>{result.shadow}</p></article>
      <article className="popular-result-card popular-open-door"><p className="popular-card-label">The Open Door</p><h2>{result.openDoorLabel}</h2><p>{result.possibility}</p></article>
    </section>

    <section className="popular-next-step mt-7 rounded-[1.75rem] p-7 sm:p-10">
      <p className="popular-reveal-label">Curious what’s underneath?</p>
      <h2 className="mt-4 max-w-3xl text-3xl font-bold leading-tight sm:text-5xl">A quick result names the room. The deeper journey explores the story.</h2>
      <p className="mt-5 max-w-2xl text-base leading-7">ParablePath’s formation experience helps you notice the story, receive a truer one, and choose one faithful next step.</p>
      <PopularResultActions room={result.displayName} exploreUrl={result.exploreUrl} />
    </section>

    <p className="popular-not-label mx-auto mt-8 max-w-3xl text-center text-sm leading-6">This is not a label for who you are. It is a way of noticing the story that may be shaping how you see yourself, other people, and what happens next.</p>
  </main>;
}
