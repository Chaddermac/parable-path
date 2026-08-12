import Link from "next/link";

export default function Home() {
  return <main className="shell flex min-h-[calc(100vh-11rem)] items-center py-12 text-center">
    <div className="mx-auto max-w-4xl">
      <p className="eyebrow">A guided spiritual reflection</p>
      <h1 className="display mt-6">What if the story you’re living<br /><em className="font-normal text-forest">isn’t the whole story?</em></h1>
      <p className="mx-auto mt-7 max-w-2xl font-serif text-lg leading-8 text-ink/65 sm:text-xl">Walk slowly through a few honest questions. A parable may open a door toward the truer story Jesus reveals—and one faithful step.</p>
      <Link href="/start" className="button-primary mt-9">Enter the path <span className="ml-8">→</span></Link>
      <div className="mx-auto mt-14 max-w-xl border-t border-ink/10 pt-6 text-xs leading-6 text-ink/55">Not a test. Not a diagnosis. Not a fixed label.<br />A place to notice, receive, and respond.</div>
    </div>
  </main>;
}
