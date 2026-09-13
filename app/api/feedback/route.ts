import { createServerSupabaseClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

const isObject = (value: unknown): value is Record<string, unknown> => Boolean(value) && typeof value === "object" && !Array.isArray(value);
const validScore = (value: unknown) => Number.isInteger(value) && Number(value) >= 1 && Number(value) <= 5;

export async function POST(request: Request) {
  try {
    const body: unknown = await request.json();
    if (!isObject(body) || typeof body.id !== "string" || typeof body.responseId !== "string") {
      return NextResponse.json({ error: "Invalid feedback payload." }, { status: 400 });
    }
    const scores = [body.accuracyScore, body.parableHelpfulnessScore, body.repentanceReframingScore, body.nextStepUsefulnessScore, body.toneScore];
    if (!scores.every(validScore)) {
      return NextResponse.json({ error: "Feedback scores must be between 1 and 5." }, { status: 400 });
    }

    const { error } = await createServerSupabaseClient().from("feedback").upsert({
      id: body.id,
      response_id: body.responseId,
      created_at: typeof body.createdAt === "string" ? body.createdAt : new Date().toISOString(),
      accuracy_score: body.accuracyScore,
      parable_helpfulness_score: body.parableHelpfulnessScore,
      repentance_reframing_score: body.repentanceReframingScore,
      next_step_usefulness_score: body.nextStepUsefulnessScore,
      tone_score: body.toneScore,
      helpful_text: typeof body.helpfulText === "string" ? body.helpfulText.slice(0, 2000) : "",
      unclear_text: typeof body.unclearText === "string" ? body.unclearText.slice(0, 2000) : ""
    }, { onConflict: "id" });
    if (error) throw error;
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Unable to save feedback", error);
    return NextResponse.json({ error: "Feedback storage is temporarily unavailable." }, { status: 503 });
  }
}

