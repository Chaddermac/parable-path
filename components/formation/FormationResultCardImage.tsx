import { BookIcon, CompassIcon, ResultIcon, SheepIcon, SproutIcon, StepsIcon } from "@/components/popular/ResultIcons";
import { formationStoryInvitation, type FormationTypologyProfile } from "@/lib/parablepath/popular/results";
import type { ReactNode } from "react";

const forest = "#073c2c";
const navy = "#071d49";
const gold = "#c89527";
const ivory = "#fbf8ef";

function Medallion({ children, accent, pale = false, size = 82 }: { children: ReactNode; accent: string; pale?: boolean; size?: number }) {
  return <div style={{ width: size, height: size, borderRadius: 999, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, padding: size * .22, color: pale ? accent : "#fff", background: pale ? "#f1efe3" : accent, border: pale ? "1px solid #e6dfca" : "5px solid rgba(255,255,255,.72)" }}>{children}</div>;
}

function NumberedList({ items, accent }: { items: readonly string[]; accent: string }) {
  return <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>{items.map((item, index) => <div key={item} style={{ display: "flex", alignItems: "center", gap: 15 }}><span style={{ width: 29, height: 29, borderRadius: 99, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, background: accent, color: "#fff", fontFamily: "Source Sans 3", fontSize: 18, fontWeight: 700 }}>{index + 1}</span><span style={{ color: navy, fontFamily: "Source Sans 3", fontSize: 19, lineHeight: 1.15 }}>{item}</span></div>)}</div>;
}

function SunStar() { return <svg viewBox="0 0 32 32" width="28" height="28" aria-hidden="true"><path d="m16 1 2.4 10.6L26 6l-5.6 7.6L31 16l-10.6 2.4L26 26l-7.6-5.6L16 31l-2.4-10.6L6 26l5.6-7.6L1 16l10.6-2.4L6 6l7.6 5.6L16 1Z" fill="none" stroke={gold} strokeWidth="1.5"/></svg>; }

export function FormationResultCardImage({ profile, logoSrc }: { profile: FormationTypologyProfile; logoSrc: string }) {
  const headingSize = profile.callingName.length > 21 ? 48 : 54;
  return <div style={{ width: "100%", height: "100%", display: "flex", padding: 26, background: "radial-gradient(circle at 50% 10%, #ffffff 0%, #fbf8ef 47%, #f2eee3 100%)", color: navy, fontFamily: "Source Sans 3" }}>
    <article aria-label={`${profile.storyName} Story formation card: invitation to become a ${profile.callingName}`} style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", border: "1px solid #e5dfd1", borderRadius: 30, background: ivory, boxShadow: "0 12px 32px rgba(42,37,25,.14)", padding: "34px 52px 26px", overflow: "hidden" }}>
      <header style={{ height: 108, display: "flex", alignItems: "center", borderBottom: "1px solid #d9cc9f", paddingBottom: 14 }}>
        <div style={{ width: 350, height: 102, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}><img src={logoSrc} alt="ParablePath" width="350" height="90" style={{ width: 350, height: 90, objectFit: "contain" }}/><span style={{ marginTop: -18, color: navy, fontSize: 10, fontWeight: 700, letterSpacing: 4 }}>HOUSE OF STORIES</span></div>
        <div style={{ width: 1, height: 68, background: "#c9ba8a", margin: "0 32px 0 20px" }}/>
        <div style={{ display: "flex", flexDirection: "column", flex: 1 }}><span style={{ color: navy, fontSize: 13, fontWeight: 700, letterSpacing: 4.5, lineHeight: 1.25 }}>FROM FALSE STORIES</span><span style={{ color: navy, fontSize: 13, fontWeight: 700, letterSpacing: 4.5, lineHeight: 1.25 }}>TO REDEMPTIVE CALLINGS</span><span style={{ marginTop: 8, color: forest, fontFamily: "Libre Baskerville", fontSize: 18, fontStyle: "italic", lineHeight: 1.25 }}>Your life is not random.</span><span style={{ color: forest, fontFamily: "Libre Baskerville", fontSize: 18, fontStyle: "italic", lineHeight: 1.25 }}>You’re living a story.</span></div>
        <Medallion accent={profile.accent} size={104}><ResultIcon name={profile.icon}/></Medallion>
      </header>

      <section style={{ display: "flex", flexDirection: "column", padding: "20px 10px 15px", borderBottom: `2px solid ${profile.accent}` }}>
        <span style={{ color: profile.accent, fontSize: 13, fontWeight: 700, letterSpacing: 4 }}>YOUR PARABLEPATH RESULT</span>
        <h1 style={{ margin: "8px 0 0", color: forest, fontFamily: "Libre Baskerville", fontSize: headingSize, fontWeight: 700, letterSpacing: -1.9, lineHeight: 1.06 }}>You may be living in the {profile.storyName} Story.</h1>
        <p style={{ margin: "8px 0 0", color: profile.accent, fontFamily: "Libre Baskerville", fontSize: 29, fontWeight: 700, lineHeight: 1.15 }}>You are invited to become a {profile.callingName}.</p>
      </section>

      <section style={{ display: "flex", alignItems: "flex-start", gap: 20, padding: "17px 0", borderBottom: "1px solid #c9ba8a" }}>
        <Medallion accent={forest} pale size={60}><SproutIcon/></Medallion>
        <div style={{ display: "flex", flexDirection: "column", flex: 1 }}><h2 style={{ margin: 0, color: forest, fontFamily: "Libre Baskerville", fontSize: 29, lineHeight: 1.1 }}>Your Redemptive Calling</h2><p style={{ margin: "6px 0 0", color: navy, fontSize: 18, lineHeight: 1.28 }}>{profile.callingDescription}</p></div>
      </section>

      <section style={{ display: "flex", minHeight: 176, padding: "15px 0", borderBottom: "1px solid #c9ba8a" }}>
        <div style={{ width: "43%", display: "flex", alignItems: "center", gap: 17, paddingRight: 21, borderRight: "1px solid #c9ba8a" }}><Medallion accent={profile.accent} size={68}><SheepIcon/></Medallion><div style={{ display: "flex", flexDirection: "column" }}><span style={{ color: forest, fontSize: 14, fontWeight: 800, letterSpacing: 3.5 }}>FALSE STORY</span><p style={{ margin: "7px 0 0", color: navy, fontFamily: "Libre Baskerville", fontSize: 27, fontWeight: 700, lineHeight: 1.15 }}>“{profile.falseStory}”</p></div></div>
        <div style={{ flex: 1, display: "flex", alignItems: "flex-start", gap: 17, paddingLeft: 24 }}><Medallion accent={forest} pale size={62}><CompassIcon/></Medallion><div style={{ display: "flex", flexDirection: "column", flex: 1 }}><h2 style={{ margin: 0, color: forest, fontSize: 14, fontWeight: 800, letterSpacing: 3 }}>SHADOW SIDE: {profile.shadowName.toUpperCase()}</h2><p style={{ margin: "5px 0 0", color: navy, fontSize: 16.5, lineHeight: 1.23 }}>{profile.shadowDescription}</p></div></div>
      </section>

      <section style={{ display: "flex", alignItems: "center", gap: 20, marginTop: 14, borderRadius: 18, background: profile.accentSoft, padding: "13px 22px" }}><Medallion accent={profile.accent} size={72}><SproutIcon/></Medallion><div style={{ display: "flex", flexDirection: "column", flex: 1 }}><h2 style={{ margin: "0 0 8px", color: forest, fontFamily: "Libre Baskerville", fontSize: 29, lineHeight: 1.05 }}>Ways to live into your true story</h2><NumberedList items={profile.practices} accent={profile.accent}/></div></section>

      <section style={{ display: "flex", alignItems: "center", gap: 20, padding: "15px 14px", borderBottom: "1px solid #c9ba8a" }}><Medallion accent={profile.accent} pale size={64}><BookIcon/></Medallion><div style={{ display: "flex", flexDirection: "column", flex: 1 }}><h2 style={{ margin: 0, color: forest, fontFamily: "Libre Baskerville", fontSize: 29, lineHeight: 1.05 }}>Read the parable</h2><div style={{ display: "flex", alignItems: "flex-start", marginTop: 6, color: navy, fontSize: 14, lineHeight: 1.3 }}><b style={{ color: forest, marginRight: 5, flexShrink: 0 }}>STORY Invitation:</b><span style={{ flex: 1 }}>{formationStoryInvitation}</span></div><div style={{ display: "flex", alignItems: "flex-start", marginTop: 8, color: navy, fontSize: 16, lineHeight: 1.2 }}><b style={{ color: forest, marginRight: 5, flexShrink: 0 }}>Parable references:</b><span style={{ flex: 1 }}>{profile.parableReferences}</span></div></div></section>

      <section style={{ display: "flex", alignItems: "center", gap: 20, padding: "14px" }}><Medallion accent={profile.accent} pale size={64}><StepsIcon/></Medallion><div style={{ display: "flex", flexDirection: "column", flex: 1 }}><h2 style={{ margin: "0 0 7px", color: forest, fontFamily: "Libre Baskerville", fontSize: 29, lineHeight: 1.05 }}>Next Steps</h2><NumberedList items={profile.nextSteps} accent={profile.accent}/></div></section>

      <footer style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "auto" }}><div style={{ width: "100%", display: "flex", alignItems: "center", gap: 14 }}><span style={{ height: 1, background: "#c9ba8a", flex: 1 }}/><SunStar/><span style={{ height: 1, background: "#c9ba8a", flex: 1 }}/></div><p style={{ margin: 0, color: forest, fontSize: 11, fontWeight: 700, letterSpacing: 4 }}>PEOPLE BELONG. STORIES CHANGE. GOD REDEEMS.</p></footer>
    </article>
  </div>;
}
