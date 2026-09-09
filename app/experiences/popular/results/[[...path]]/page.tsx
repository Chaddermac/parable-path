import { TypologyResultCard } from "@/components/popular/TypologyResultCard";
import { isRoomId, popularResultByRoom } from "@/lib/parablepath/popular/results";
import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";

type Props = { params: Promise<{ path?: string[] }>; searchParams: Promise<{ room?: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const storyId = (await params).path?.[0];
  const profile = isRoomId(storyId) ? popularResultByRoom[storyId] : null;
  return {
    title: profile ? `${profile.storyName} Story · ${profile.callingName} | ParablePath` : "Your ParablePath Result",
    description: profile ? `A reflective invitation from the ${profile.storyName} Story toward becoming a ${profile.callingName}.` : "Find the story that may be shaping you.",
    robots: { index: false, follow: true }
  };
}

export default async function PopularResultsPage({ params, searchParams }: Props) {
  const [{ path }, { room: legacyRoom }] = await Promise.all([params, searchParams]);
  const storyId = path?.[0];
  if (!storyId && isRoomId(legacyRoom)) redirect(`/results/${legacyRoom}`);
  if (!isRoomId(storyId)) return <main className="typology-empty shell">
    <section>
      <p className="typology-label">YOUR PARABLEPATH RESULT</p>
      <h1>We couldn’t find this result.</h1>
      <p>The result link may be incomplete. Take the assessment to discover the story that may be shaping you.</p>
      <Link href="/assessment">Take the assessment <span aria-hidden="true">→</span></Link>
    </section>
  </main>;
  return <TypologyResultCard profile={popularResultByRoom[storyId]}/>;
}
