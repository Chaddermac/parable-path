import { BookIcon, ResultIcon, SproutIcon, StepsIcon } from "@/components/popular/ResultIcons";
import { formationStoryInvitation, type FormationTypologyProfile } from "@/lib/parablepath/popular/results";
import type { CSSProperties, ReactNode } from "react";

function NumberedList({ items }: { items: readonly string[] }) { return <ol className="typology-list">{items.map((item, index) => <li key={item}><span aria-hidden="true">{index + 1}</span><p>{item}</p></li>)}</ol>; }
function RoundIcon({ children, strong = false }: { children: ReactNode; strong?: boolean }) { return <div className={`typology-round-icon${strong ? " is-strong" : ""}`}>{children}</div>; }

export function FormationTypologyResultCard({ profile }: { profile: FormationTypologyProfile }) {
  const style = { "--result-accent": profile.accent, "--result-soft": profile.accentSoft } as CSSProperties;
  return <div className="typology-result-shell experience-popular"><div className="typology-result-page" style={style}>
    <p className="sr-only" role="status" aria-live="polite">Your result is the {profile.storyName} Story, with an invitation to become a {profile.callingName}.</p>
    <article className="typology-card">
      <header className="typology-masthead">
        <div><p className="typology-brand">ParablePath</p><p className="typology-brand-sub">HOUSE OF STORIES</p></div>
        <div className="typology-tag"><b>FROM FALSE STORIES<br/>TO REDEMPTIVE CALLINGS</b><i>Your life is not random.<br/>You’re living a story.</i></div>
        <RoundIcon strong><ResultIcon name={profile.icon}/></RoundIcon>
      </header>

      <section className="typology-reveal" aria-labelledby="result-heading">
        <p>YOUR PARABLEPATH RESULT</p>
        <h1 id="result-heading">You may be living in the <em>{profile.storyName} Story.</em></h1>
        <div className="typology-transition"><span>But that is not where your story has to end.</span><strong>You are invited to become a {profile.callingName}.</strong></div>
      </section>

      <section className="typology-calling" aria-labelledby="calling-heading">
        <RoundIcon><SproutIcon/></RoundIcon>
        <div><h2 id="calling-heading">Your Redemptive Calling</h2><p>{profile.callingDescription}</p></div>
      </section>

      <section className="typology-story-grid">
        <div className="typology-story-block"><RoundIcon strong><ResultIcon name={profile.icon}/></RoundIcon><div><p className="typology-label">FALSE STORY</p><blockquote>“{profile.falseStory}”</blockquote></div></div>
        <div className="typology-shadow"><RoundIcon><span className="typology-compass" aria-hidden="true">✦</span></RoundIcon><div><h2>SHADOW SIDE: {profile.shadowName.toUpperCase()}</h2><p>{profile.shadowDescription}</p></div></div>
      </section>

      <section className="typology-practices"><RoundIcon strong><SproutIcon/></RoundIcon><div><h2>Ways to live into your true story</h2><NumberedList items={profile.practices}/></div></section>

      <section className="typology-detail-row"><RoundIcon><BookIcon/></RoundIcon><div><h2>Read the parable</h2><p><strong>STORY Invitation:</strong> {formationStoryInvitation}</p><p><strong>Parable references:</strong> {profile.parableReferences}</p></div></section>
      <section className="typology-detail-row"><RoundIcon><StepsIcon/></RoundIcon><div><h2>Next Steps</h2><NumberedList items={profile.nextSteps}/></div></section>

      <footer className="typology-card-footer"><span/><b>✦</b><span/><p>PEOPLE BELONG. STORIES CHANGE. GOD REDEEMS.</p></footer>
    </article>
    <p className="typology-note">This result is a reflection aid, not a fixed label or diagnosis. Hold it with curiosity, and keep what helps you move toward faithful love.</p>
  </div></div>;
}
