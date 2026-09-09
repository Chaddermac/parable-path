import { ResultIcon } from "@/components/popular/ResultIcons";
import { isRoomId, popularResultByRoom } from "@/lib/parablepath/popular/results";
import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET(_: Request, { params }: { params: Promise<{ storyId: string }> }) {
  const { storyId } = await params;
  if (!isRoomId(storyId)) return new Response("Result not found", { status: 404 });
  const profile = popularResultByRoom[storyId];
  return new ImageResponse(<div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "66px 72px", background: "#faf7ef", color: "#071d49", fontFamily: "Georgia, serif", border: `16px solid ${profile.accent}` }}>
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}><div style={{ display: "flex", flexDirection: "column" }}><strong style={{ fontSize: 34 }}>ParablePath</strong><span style={{ fontFamily: "Arial", fontSize: 14, letterSpacing: 5 }}>HOUSE OF STORIES</span></div><div style={{ width: 120, height: 120, borderRadius: 999, background: profile.accent, color: "white", display: "flex", padding: 25 }}><ResultIcon name={profile.icon}/></div></div>
    <div style={{ display: "flex", flexDirection: "column" }}><span style={{ fontFamily: "Arial", color: profile.accent, fontWeight: 700, fontSize: 18, letterSpacing: 4 }}>YOUR PARABLEPATH RESULT</span><h1 style={{ margin: "18px 0 0", maxWidth: 1000, fontSize: 64, lineHeight: 1.05 }}>I may be inhabiting the {profile.storyName} Story.</h1><p style={{ margin: "22px 0 0", fontSize: 34, color: profile.accent }}>I’m being invited to become a {profile.callingName}.</p></div>
    <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "Arial", fontSize: 17, letterSpacing: 2 }}><span>PEOPLE BELONG. STORIES CHANGE. GOD REDEEMS.</span><span>ParablePath.app</span></div>
  </div>, { width: 1200, height: 630, headers: { "Content-Disposition": `attachment; filename="parablepath-${storyId}-result.png"`, "Cache-Control": "public, max-age=31536000, immutable" } });
}
