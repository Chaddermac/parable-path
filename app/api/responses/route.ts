import { createServerSupabaseClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

const roomIds = new Set(["lost", "scarcity", "control", "stalled", "boundary", "settling", "delay", "distraction"]);
const isObject = (value: unknown): value is Record<string, unknown> => Boolean(value) && typeof value === "object" && !Array.isArray(value);

export async function POST(request: Request) {
  try {
    const body: unknown = await request.json();
    if (!isObject(body) || typeof body.id !== "string" || !isObject(body.answers) || !isObject(body.scores)) {
      return NextResponse.json({ error: "Invalid response payload." }, { status: 400 });
    }
    if (![body.primaryRoom, body.secondaryRoom, body.thirdRoom, body.forcedChoice].every((room) => typeof room === "string" && roomIds.has(room))) {
      return NextResponse.json({ error: "Invalid room value." }, { status: 400 });
    }
    if (Object.keys(body.answers).length !== 40 || body.consentGiven !== true) {
      return NextResponse.json({ error: "A complete, consented assessment is required." }, { status: 400 });
    }

    const { error } = await createServerSupabaseClient().from("responses").upsert({
      id: body.id,
      created_at: typeof body.createdAt === "string" ? body.createdAt : new Date().toISOString(),
      answers: body.answers,
      scores: body.scores,
      primary_room: body.primaryRoom,
      secondary_room: body.secondaryRoom,
      third_room: body.thirdRoom,
      forced_choice: body.forcedChoice,
      open_reflection: typeof body.openReflection === "string" ? body.openReflection : "",
      consent_given: true,
      safety_flag: false,
      dimension_scores: isObject(body.dimensionScores) || Array.isArray(body.dimensionScores) ? body.dimensionScores : [],
      is_close_secondary: body.isCloseSecondary === true,
      assessment_version: typeof body.assessmentVersion === "string" ? body.assessmentVersion : "2.0-story-strategy-shadow"
    }, { onConflict: "id" });
    if (error) throw error;
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Unable to save response", error);
    return NextResponse.json({ error: "Response storage is temporarily unavailable." }, { status: 503 });
  }
}
