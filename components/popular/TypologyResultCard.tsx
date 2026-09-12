import { BookIcon, BrokenHeartIcon, CompassIcon, ResultIcon, WarningIcon } from "@/components/popular/ResultIcons";
import { PopularResultActions } from "@/components/popular/PopularResultActions";
import { popularDeeperUrl, popularDisclaimer, popularStoryInvitation, type PopularTypologyProfile } from "@/lib/parablepath/popular/results";
import type { CSSProperties, ReactNode } from "react";

function InformationRow({ icon, label, children, tone }: { icon: ReactNode; label: string; children: ReactNode; tone: "pink" | "yellow" | "mint" | "blue" }) {
  return <section className="compact-result-row">
    <span className={`compact-row-icon is-${tone}`} aria-hidden="true">{icon}</span>
    <div><h2>{label}</h2><p>{children}</p></div>
  </section>;
}

export function TypologyResultCard({ profile }: { profile: PopularTypologyProfile }) {
  const style = { "--corner-accent": profile.cornerAccent, "--calling-icon-bg": profile.iconBackground } as CSSProperties;
  return <div className="compact-result-shell" style={style}>
    <p className="sr-only" role="status" aria-live="polite">Your result is {profile.callingName}.</p>
    <article className="compact-result-card" aria-labelledby="compact-result-heading">
      <span className="compact-result-arc" aria-hidden="true"/>
      <span className="compact-result-corner" aria-hidden="true"/>
      <header className="compact-result-hero">
        <p className="compact-result-label">YOUR PARABLEPATH RESULT</p>
        <div className="compact-calling-icon" role="img" aria-label={`${profile.callingName} symbol`}><ResultIcon name={profile.callingIcon}/></div>
        <h1 id="compact-result-heading">{profile.headline}</h1>
        <p className="compact-result-tagline">{profile.callingTagline}</p>
        <p className="compact-result-summary">{profile.callingSummary}</p>
      </header>

      <div className="compact-result-rows">
        <InformationRow label="FALSE STORY" tone="pink" icon={<BrokenHeartIcon/>}><strong>{profile.falseStory}</strong></InformationRow>
        <InformationRow label={`WATCH FOR ${profile.shadowName.toUpperCase()} MODE`} tone="yellow" icon={<WarningIcon/>}>{profile.shadowSummary}</InformationRow>
        <InformationRow label="READ THE PARABLE" tone="mint" icon={<BookIcon/>}><strong>{profile.parableReference}</strong></InformationRow>
        <InformationRow label="STORY INVITATION" tone="blue" icon={<CompassIcon/>}>{popularStoryInvitation}</InformationRow>
      </div>

      <footer className="compact-result-cta">
        <h2>Want the deeper story?</h2>
        <p>Go to ParablePath.app for your full profile, shadow patterns, and next steps.</p>
        <a href={popularDeeperUrl} aria-label="Go to the deeper ParablePath formation assessment">Go deeper <span aria-hidden="true">→</span></a>
      </footer>
    </article>
    <PopularResultActions profile={profile}/>
    <p className="compact-result-disclaimer">{popularDisclaimer}</p>
  </div>;
}
