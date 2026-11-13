import type { FormationTypologyProfile } from "@/lib/parablepath/popular/results";
import { roomById } from "@/lib/content";
import { StorySymbol } from "./StorySymbol";
import { storyPath } from "@/lib/website";

export function StoryProfileCard({ profile, result = false }: { profile: FormationTypologyProfile; result?: boolean }) {
  const Heading = result ? "h1" : "h2";
  return <article className="website-profile-card" style={{ "--story-accent": profile.accent, "--story-soft": profile.accentSoft } as React.CSSProperties}>
    <div className="website-profile-heading"><div><p className="website-kicker">{result ? "Your possible story" : "A story you may recognize"}</p><Heading>You may be living in the {profile.storyName} Story.</Heading><p className="website-calling-invitation">You are invited to become a {profile.callingName}.</p></div><StorySymbol room={profile.id} /></div>
    <section className="website-profile-intro"><h3>Your redemptive calling</h3><p>{profile.callingDescription}</p><p className="website-true-story">{roomById[profile.id].trueStory}</p></section>
    <div className="website-profile-pair"><section><p className="website-kicker">The false story</p><blockquote>“{profile.falseStory}”</blockquote></section><section><p className="website-kicker">Watch for {profile.shadowName} mode</p><p>{profile.shadowDescription}</p></section></div>
    <section className="website-profile-practices"><h3>Ways to live into your true story</h3><ol>{profile.practices.map((practice) => <li key={practice}>{practice}</li>)}</ol></section>
    <section className="website-profile-parable"><h3>Open the parable</h3><p>{profile.parableReferences}</p><p><strong>STORY Path:</strong> {storyPath.map(([, title]) => title).join(" · ")}</p></section>
    <section><h3>Next faithful steps</h3><ol>{profile.nextSteps.map((step) => <li key={step}>{step}</li>)}</ol></section>
    <p className="website-profile-note">A reflection aid, not a fixed label. People belong. Stories change. God redeems.</p>
  </article>;
}
