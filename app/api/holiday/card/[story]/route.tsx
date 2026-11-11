import { ImageResponse } from "next/og";
import { ResultIcon } from "@/components/popular/ResultIcons";
import { holidayResults } from "@/lib/holiday/results";
import { parseStories } from "@/lib/holiday/scoring";
export const runtime = "edge";
export async function GET(request: Request, { params }: { params: Promise<{ story: string }> }) {
  const { story } = await params;
  const leaders = story === "quiz" ? [] : parseStories(story);
  if (!leaders) return new Response("Story not found", { status: 404 });
  const single = leaders.length === 1 ? holidayResults[leaders[0]] : null;
  const title = leaders.length ? leaders.map(p => holidayResults[p].name).join(" + ") : "What’s Your Holiday Story?";
  const calling = leaders.length ? leaders.map(p => holidayResults[p].calling).join(" · ") : "16 questions. Eight holiday personalities.";
  return new ImageResponse(<div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: "100%", height: "100%", background: "#f3eee2", color: "#1f4b3a", padding: "48px 60px", border: "16px solid #1f4b3a" }}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}><span style={{ fontSize: 32, fontFamily: "Georgia", fontWeight: 700 }}>ParablePath</span><span style={{ fontSize: 19, letterSpacing: 4, color: "#805923" }}>HOLIDAY EDITION</span></div>
    <div style={{ display: "flex", alignItems: "center", gap: 35 }}><div style={{ display: "flex", flexDirection: "column", flex: 1 }}><h1 style={{ fontFamily: "Georgia", fontSize: leaders.length > 2 ? 36 : 64, lineHeight: 1.08, margin: "0 0 20px" }}>{title}</h1><p style={{ fontSize: leaders.length > 4 ? 20 : 28, margin: 0, color: "#805923" }}>{calling}</p><p style={{ fontSize: 23, lineHeight: 1.4, margin: "22px 0 0" }}>{single?.line || (leaders.length ? "Several stories. Equal possibility. One new chapter." : "Family drama. Gift exchanges. Awkward parties.")}</p></div>{single ? <div style={{ display: "flex", width: 175, height: 175, padding: 25, borderRadius: 100, color: "#1f4b3a", background: "#e2d1aa" }}><svg width="125" height="125" viewBox="0 0 64 64"><ResultIcon name={single.icon}/></svg></div> : <svg width="100" height="100" viewBox="0 0 100 100"><path d="M50 0 62 38 100 50 62 62 50 100 38 62 0 50 38 38Z" fill="#9b6530"/></svg>}</div>
    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 20, borderTop: "1px solid #b3a483", paddingTop: 19 }}><span>Unwrap your story → parablepath.com/holiday</span><svg width="80" height="24" viewBox="0 0 80 24"><path d="M12 0 15 9 24 12 15 15 12 24 9 15 0 12 9 9ZM40 0 43 9 52 12 43 15 40 24 37 15 28 12 37 9ZM68 0 71 9 80 12 71 15 68 24 65 15 56 12 65 9Z" fill="#9b6530"/></svg></div>
  </div>, { width: 1200, height: 630, headers: { "Cache-Control": "public, max-age=3600", ...(new URL(request.url).searchParams.has("download") ? { "Content-Disposition": `attachment; filename="parablepath-holiday-${story}.png"` } : {}) } });
}
