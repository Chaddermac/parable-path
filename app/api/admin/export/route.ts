import { ADMIN_COOKIE, sessionMatches } from "@/lib/admin-auth";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

const csvCell = (value: unknown) => `"${String(value ?? "").replaceAll('"', '""')}"`;

export async function GET(request: Request) {
  const cookie = request.headers.get("cookie")?.split(";").map((item) => item.trim()).find((item) => item.startsWith(`${ADMIN_COOKIE}=`))?.slice(ADMIN_COOKIE.length + 1);
  if (!sessionMatches(cookie)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const supabase = createServerSupabaseClient();
    const [{ data: responses, error: responseError }, { data: feedback, error: feedbackError }] = await Promise.all([
      supabase.from("responses").select("id,created_at,primary_room,secondary_room,third_room,forced_choice,scores,consent_given,safety_flag").order("created_at", { ascending: false }),
      supabase.from("feedback").select("response_id,accuracy_score,parable_helpfulness_score,repentance_reframing_score,next_step_usefulness_score,tone_score")
    ]);
    if (responseError || feedbackError) throw responseError || feedbackError;
    const feedbackByResponse = new Map((feedback || []).map((row) => [row.response_id, row]));
    const headers = ["created_at", "primary_room", "secondary_room", "third_room", "forced_choice", "scores", "consent_given", "safety_flag", "accuracy_score", "parable_helpfulness_score", "repentance_reframing_score", "next_step_usefulness_score", "tone_score"];
    const rows = (responses || []).map((row) => {
      const responseFeedback = feedbackByResponse.get(row.id);
      return [row.created_at, row.primary_room, row.secondary_room, row.third_room, row.forced_choice, JSON.stringify(row.scores), row.consent_given, row.safety_flag, responseFeedback?.accuracy_score, responseFeedback?.parable_helpfulness_score, responseFeedback?.repentance_reframing_score, responseFeedback?.next_step_usefulness_score, responseFeedback?.tone_score].map(csvCell).join(",");
    });
    const csv = [headers.map(csvCell).join(","), ...rows].join("\r\n");
    return new Response(csv, { headers: { "Content-Type": "text/csv; charset=utf-8", "Content-Disposition": `attachment; filename="parablepath-export-${new Date().toISOString().slice(0, 10)}.csv"`, "Cache-Control": "no-store" } });
  } catch (error) {
    console.error("Unable to export admin data", error);
    return NextResponse.json({ error: "Export is temporarily unavailable." }, { status: 503 });
  }
}
