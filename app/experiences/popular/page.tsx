import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Find Your Story Room | ParablePath",
  description: "Your life is not random. You’re living a story. Find your ParablePath Story Room.",
  alternates: { canonical: "https://parablepath.com" }
};

export default function PopularHomePage() {
  return <main className="popular-page shell flex min-h-[calc(100vh-11rem)] items-center py-8 sm:py-12">
    <section className="popular-hero relative w-full overflow-hidden rounded-[2rem] px-6 py-12 sm:px-12 sm:py-16 lg:px-16 lg:py-20">
      <div aria-hidden="true" className="popular-orbit popular-orbit-one" />
      <div aria-hidden="true" className="popular-orbit popular-orbit-two" />
      <div className="relative z-10 max-w-4xl">
        <p className="popular-pill">A quick story quiz</p>
        <h1 className="popular-display mt-7 max-w-4xl text-[clamp(3.25rem,10vw,7.5rem)] leading-[.88] tracking-[-.065em]">Your life is not random. You’re living a story.</h1>
        <p className="popular-invitation mt-6 text-2xl sm:text-4xl">Let’s see which one.</p>
        <Link href="/assessment" className="popular-cta mt-10">Find Your Story Room <span aria-hidden="true">→</span></Link>
        <p className="popular-meta mt-5 text-sm">16 quick prompts · 3–4 minutes · easy to share</p>
      </div>
    </section>
  </main>;
}
