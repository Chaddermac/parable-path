import { ResultIcon } from "@/components/popular/ResultIcons";
import { formationResultByRoom, formationStoryInvitation, isRoomId } from "@/lib/parablepath/popular/results";
import { ImageResponse } from "next/og";

export const runtime = "edge";

const list = (items: readonly string[], accent: string) => <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>{items.map((item, index) => <div key={item} style={{ display: "flex", alignItems: "flex-start", gap: 14 }}><span style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 32, height: 32, borderRadius: 99, flexShrink: 0, color: "white", background: accent, fontWeight: 700 }}>{index + 1}</span><span style={{ fontSize: 21, lineHeight: 1.35 }}>{item}</span></div>)}</div>;

export async function GET(_: Request, { params }: { params: Promise<{ storyId: string }> }) {
  const { storyId } = await params;
  if (!isRoomId(storyId)) return new Response("Result not found", { status: 404 });
  const profile = formationResultByRoom[storyId];
  const icon = <div style={{ width: 150, height: 150, borderRadius: 999, display: "flex", padding: 31, background: profile.accent, color: "white", flexShrink: 0 }}><ResultIcon name={profile.icon}/></div>;
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", padding: "64px 72px 48px", color: "#092745", background: "#fbf8ef", fontFamily: "Arial, sans-serif" }}>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}><div style={{ display: "flex", flexDirection: "column" }}><strong style={{ fontFamily: "Georgia, serif", fontSize: 48 }}>ParablePath</strong><span style={{ fontSize: 14, letterSpacing: 6, marginTop: 4 }}>HOUSE OF STORIES</span></div><div style={{ display: "flex", flexDirection: "column", marginLeft: "auto", marginRight: 34 }}><b style={{ fontSize: 14, letterSpacing: 4 }}>FROM FALSE STORIES<br/>TO REDEMPTIVE CALLINGS</b><i style={{ fontFamily: "Georgia, serif", fontSize: 21, marginTop: 8 }}>Your life is not random.<br/>You’re living a story.</i></div>{icon}</header>
      <section style={{ display: "flex", flexDirection: "column", marginTop: 38 }}><span style={{ fontSize: 16, fontWeight: 700, letterSpacing: 4, color: profile.accent }}>YOUR PARABLEPATH RESULT</span><h1 style={{ fontFamily: "Georgia, serif", color: "#0b3b29", fontSize: 64, lineHeight: 1.02, letterSpacing: -2, margin: "12px 0 0" }}>You may be living in the {profile.storyName} Story.</h1><p style={{ fontFamily: "Georgia, serif", color: profile.accent, fontSize: 37, margin: "17px 0 0" }}>You are invited to become a {profile.callingName}.</p></section>
      <section style={{ display: "flex", flexDirection: "column", borderTop: `3px solid ${profile.accent}`, marginTop: 26, paddingTop: 20 }}><h2 style={{ fontFamily: "Georgia, serif", fontSize: 33, margin: 0 }}>Your Redemptive Calling</h2><p style={{ fontSize: 20, lineHeight: 1.4, margin: "8px 0 0" }}>{profile.callingDescription}</p></section>
      <section style={{ display: "flex", gap: 38, marginTop: 25 }}><div style={{ display: "flex", flexDirection: "column", width: "43%", borderRight: "2px solid #d5c9a8", paddingRight: 32 }}><b style={{ fontSize: 16, letterSpacing: 4, color: profile.accent }}>FALSE STORY</b><p style={{ fontFamily: "Georgia, serif", fontSize: 34, lineHeight: 1.1, margin: "10px 0 0" }}>“{profile.falseStory}”</p></div><div style={{ display: "flex", flexDirection: "column", flex: 1 }}><b style={{ fontSize: 16, letterSpacing: 3, color: profile.accent }}>SHADOW SIDE: {profile.shadowName.toUpperCase()}</b><p style={{ fontSize: 19, lineHeight: 1.35, margin: "8px 0 0" }}>{profile.shadowDescription}</p></div></section>
      <section style={{ display: "flex", flexDirection: "column", marginTop: 24, padding: "20px 28px", borderRadius: 18, background: profile.accentSoft }}><h2 style={{ fontFamily: "Georgia, serif", color: "#0b3b29", fontSize: 32, margin: "0 0 10px" }}>Ways to live into your true story</h2>{list(profile.practices, profile.accent)}</section>
      <section style={{ display: "flex", flexDirection: "column", marginTop: 24, borderBottom: "2px solid #d5c9a8", paddingBottom: 19 }}><h2 style={{ fontFamily: "Georgia, serif", color: "#0b3b29", fontSize: 32, margin: 0 }}>Read the parable</h2><p style={{ fontSize: 18, lineHeight: 1.4, margin: "8px 0 0" }}><b>STORY Invitation:</b> {formationStoryInvitation}</p><p style={{ fontSize: 19, margin: "7px 0 0" }}><b>Parable references:</b> {profile.parableReferences}</p></section>
      <section style={{ display: "flex", flexDirection: "column", marginTop: 18 }}><h2 style={{ fontFamily: "Georgia, serif", color: "#0b3b29", fontSize: 32, margin: "0 0 10px" }}>Next Steps</h2>{list(profile.nextSteps, profile.accent)}</section>
      <footer style={{ display: "flex", justifyContent: "center", marginTop: "auto", paddingTop: 18, borderTop: "2px solid #d5c9a8", color: "#0b5547", fontSize: 14, letterSpacing: 5 }}>PEOPLE BELONG. STORIES CHANGE. GOD REDEEMS.</footer>
    </div>,
    { width: 1200, height: 1600, headers: { "Content-Disposition": `attachment; filename="parablepath-${storyId}-formation-card.png"`, "Cache-Control": "public, max-age=31536000, immutable" } }
  );
}
