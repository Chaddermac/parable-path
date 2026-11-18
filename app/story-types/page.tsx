import type { Metadata } from "next";
import Link from "next/link";
import { StoryWheel } from "@/components/website/StoryWheel";
import { StorySymbol } from "@/components/website/StorySymbol";
import { publicStories } from "@/lib/website";
export const metadata: Metadata = { title: "Explore the eight stories", alternates: { canonical: "/story-types" } };
export default function StoryTypes() {
  return <main className="shell website-page"><section className="website-two-column website-page-intro"><div><p className="website-kicker">The ParablePath Story Wheel</p><h1>There is more to your story.</h1><p className="website-lead">Explore eight recurring story patterns and the redemptive callings they can open toward.</p><p>You may recognize more than one. These are stories to reflect on, not fixed personality types.</p><Link href="/start" className="button-primary">Discover your story →</Link></div><StoryWheel /></section><div className="website-story-grid">{publicStories.map(({slug,room,profile,roomData}) => <article key={room} className="website-story-tile"><StorySymbol room={room} /><p className="website-kicker">{profile.storyName} Story</p><h2><Link href={`/story-types/${slug}`}>{profile.callingName}</Link></h2><p>{roomData.trueStory}</p><Link href={`/story-types/${slug}`} className="website-text-link">Explore this story <span aria-hidden="true">→</span><span className="sr-only">: {profile.callingName}</span></Link></article>)}</div></main>;
}
