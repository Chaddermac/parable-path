import { ResultIcon } from "@/components/popular/ResultIcons";
import { isRoomId, popularResultByRoom } from "@/lib/parablepath/popular/results";
import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET(_: Request, { params }: { params: Promise<{ storyId: string }> }) {
  const { storyId } = await params;
  if (!isRoomId(storyId)) return new Response("Result not found", { status: 404 });
  const profile = popularResultByRoom[storyId];
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "58px 66px", background: "linear-gradient(145deg, #4930d5, #6740eb 55%, #3f27cc)", color: "white", fontFamily: "Arial, sans-serif", borderRadius: 38, overflow: "hidden", position: "relative" }}>
      <div style={{ position: "absolute", width: 300, height: 300, right: -145, bottom: -150, borderRadius: 999, background: profile.cornerAccent, display: "flex" }}/>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <strong style={{ fontFamily: "Georgia, serif", fontSize: 38 }}>ParablePath</strong>
        <div style={{ width: 118, height: 118, borderRadius: 999, background: profile.iconBackground, color: "#071d69", display: "flex", padding: 25 }}><ResultIcon name={profile.callingIcon}/></div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", maxWidth: 960 }}>
        <span style={{ width: 390, border: "2px solid rgba(255,255,255,.65)", borderRadius: 99, padding: "12px 20px", fontWeight: 700, fontSize: 18, letterSpacing: 3 }}>YOUR PARABLEPATH RESULT</span>
        <h1 style={{ margin: "24px 0 0", fontSize: 78, lineHeight: .95, letterSpacing: -4 }}>{profile.headline}</h1>
        <p style={{ margin: "22px 0 0", color: "#fff4cf", fontSize: 36, fontWeight: 700 }}>{profile.callingTagline}</p>
        <p style={{ margin: "16px 0 0", color: "#ddd6ff", fontSize: 25, lineHeight: 1.35 }}>{profile.callingSummary}</p>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", borderTop: "2px solid rgba(255,255,255,.55)", paddingTop: 20, fontSize: 18, letterSpacing: 1.5 }}><span>{profile.falseStory}</span><span>parablepath.com</span></div>
    </div>,
    { width: 1200, height: 630, headers: { "Content-Disposition": `attachment; filename="parablepath-${storyId}-result.png"`, "Cache-Control": "public, max-age=31536000, immutable" } }
  );
}
