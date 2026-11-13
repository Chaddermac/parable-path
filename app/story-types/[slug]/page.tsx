import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { storyFromSlug, storyLinks } from "@/lib/website";
import { formationResultByRoom } from "@/lib/parablepath/popular/results";
import { StoryProfileCard } from "@/components/website/StoryProfileCard";
export function generateStaticParams() { return storyLinks.map(({slug}) => ({slug})); }
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata> { const {slug}=await params; const story=storyFromSlug(slug); return {title: story ? formationResultByRoom[story.room].callingName : "Story not found", alternates:{canonical:`/story-types/${slug}`}}; }
export default async function StoryDetail({params}:{params:Promise<{slug:string}>}) {
  const {slug}=await params, story=storyFromSlug(slug); if(!story) notFound();
  const profile=formationResultByRoom[story.room];
  return <main className="shell website-page"><Link className="website-text-link" href="/story-types">← All eight stories</Link><header className="website-reading-intro"><p className="website-kicker">Explore the {profile.storyName} Story</p><h1>{profile.callingName}</h1><p className="website-lead">An invitation to explore, receive, and practice.</p></header><StoryProfileCard profile={profile}/><div className="website-bottom-invitation"><p>Curious which stories you may recognize in this season?</p><Link href="/start" className="button-primary">Take the assessment →</Link><Link href="/parables" className="website-text-link">Explore the parables</Link></div></main>;
}
