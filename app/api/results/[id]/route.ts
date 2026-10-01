import { normalizeAiResult } from "@/lib/ai-reflection";
import { roomById } from "@/lib/content";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import type { DiagnosticResult, ResultRecord, RoomId, RoomScore, Scores } from "@/lib/types";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const isRoomId = (value: unknown): value is RoomId => typeof value === "string" && value in roomById;

export async function GET(_request: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  if (!UUID_PATTERN.test(id)) return NextResponse.json({ error: "Invalid result id." }, { status: 400 });
  try {
    const { data, error } = await createServerSupabaseClient().from("responses")
      .select("id, created_at, scores, primary_room, secondary_room, third_room, forced_choice, open_reflection, consent_given, safety_flag, dimension_scores, is_close_secondary, assessment_version, ai_result")
      .eq("id", id)
      .maybeSingle();
    if (error) throw error;
    if (!data || data.safety_flag || !isRoomId(data.primary_room) || !isRoomId(data.secondary_room) || !isRoomId(data.third_room)) {
      return NextResponse.json({ error: "This result is unavailable." }, { status: 404 });
    }
    const ranking = [data.primary_room, data.secondary_room, data.third_room] as RoomId[];
    const scores = data.scores as Scores;
    const roomScores = Array.isArray(data.dimension_scores) ? data.dimension_scores as RoomScore[] : [];
    const diagnostic: DiagnosticResult = {
      roomScores,
      isCloseSecondary: data.is_close_secondary === true,
      isFlatProfile: false,
      assessmentVersion: typeof data.assessment_version === "string" ? data.assessment_version : "formation-v1"
    };
    const result: ResultRecord = {
      id: data.id,
      createdAt: data.created_at,
      answers: {},
      scores,
      ranking,
      diagnostic,
      forcedChoice: isRoomId(data.forced_choice) ? data.forced_choice : data.primary_room,
      consentGiven: data.consent_given === true,
      reflection: typeof data.open_reflection === "string" ? data.open_reflection : "",
      syncStatus: "saved",
      aiResult: normalizeAiResult(data.ai_result, ranking[0], ranking[1], ranking[2]) || undefined,
      aiStatus: data.ai_result ? "generated" : "unavailable"
    };
    return NextResponse.json({ result }, { headers: { "Cache-Control": "private, no-store" } });
  } catch (error) {
    console.error("Unable to retrieve result", error);
    return NextResponse.json({ error: "Result retrieval is temporarily unavailable." }, { status: 503 });
  }
}
