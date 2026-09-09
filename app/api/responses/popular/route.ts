import { POPULAR_ASSESSMENT_VERSION, popularQuestions } from "@/lib/parablepath/popular/questions";
import { popularRoomOrder, scorePopularAssessment } from "@/lib/parablepath/popular/scoring";
import type { PopularOption } from "@/lib/parablepath/popular/types";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

const sourceDomain = (request: Request) => (request.headers.get("x-forwarded-host") || request.headers.get("host") || "")
  .split(",")[0].trim().toLowerCase().split(":")[0] || null;

function resolveAnswers(value: unknown): PopularOption[] | null {
  if (!Array.isArray(value) || value.length !== popularQuestions.length) return null;

  const answers = value.map((label, index) => {
    if (typeof label !== "string") return null;
    return popularQuestions[index].options.find((option) => option.label === label) || null;
  });

  return answers.every((answer): answer is PopularOption => answer !== null) ? answers : null;
}

export async function POST(request: Request) {
  try {
    const body: unknown = await request.json();
    if (!body || typeof body !== "object" || Array.isArray(body)) {
      return NextResponse.json({ error: "Invalid response payload." }, { status: 400 });
    }

    const input = body as Record<string, unknown>;
    const answers = resolveAnswers(input.answers);
    if (typeof input.id !== "string" || !answers || input.consentGiven !== true) {
      return NextResponse.json({ error: "A complete, consented assessment is required." }, { status: 400 });
    }

    const result = scorePopularAssessment(answers);
    const ranking = [...popularRoomOrder].sort((a, b) =>
      result.normalizedScores[b] - result.normalizedScores[a] || popularRoomOrder.indexOf(a) - popularRoomOrder.indexOf(b)
    );
    const answerRecord = Object.fromEntries(popularQuestions.map((question, index) => [question.id, answers[index].label]));
    const payload = {
      id: input.id,
      answers: answerRecord,
      scores: result.normalizedScores,
      primary_room: ranking[0],
      secondary_room: ranking[1],
      third_room: ranking[2],
      forced_choice: ranking[0],
      open_reflection: "",
      consent_given: true,
      safety_flag: false,
      dimension_scores: result.rawScores,
      is_close_secondary: result.nearTie,
      assessment_version: POPULAR_ASSESSMENT_VERSION,
      source_domain: sourceDomain(request)
    };

    const supabase = createServerSupabaseClient();
    let { error } = await supabase.from("responses").upsert(payload, { onConflict: "id" });
    if (error?.code === "PGRST204" && error.message.includes("source_domain")) {
      const { source_domain: _sourceDomain, ...legacyPayload } = payload;
      ({ error } = await supabase.from("responses").upsert(legacyPayload, { onConflict: "id" }));
    }
    if (error) throw error;

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Unable to save popular response", error);
    return NextResponse.json({ error: "Response storage is temporarily unavailable." }, { status: 503 });
  }
}
