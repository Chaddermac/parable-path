import { createServerSupabaseClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

const roomIds = new Set(["lost", "scarcity", "control", "stalled", "boundary", "settling", "delay", "distraction"]);
const isObject = (value: unknown): value is Record<string, unknown> => Boolean(value) && typeof value === "object" && !Array.isArray(value);
const sourceDomain = (request: Request) => (request.headers.get("x-forwarded-host") || request.headers.get("host") || "").split(",")[0].trim().toLowerCase().split(":")[0] || null;

export async function POST(request: Request) {
  try {
    const body: unknown = await request.json();
    if (!isObject(body) || typeof body.id !== "string" || !isObject(body.answers) || !isObject(body.scores)) {
      return NextResponse.json({ error: "Invalid safety payload." }, { status: 400 });
    }
    if (![body.primaryRoom, body.secondaryRoom, body.thirdRoom, body.forcedChoice].every((room) => typeof room === "string" && roomIds.has(room))) {
      return NextResponse.json({ error: "Invalid room value." }, { status: 400 });
    }
    if (Object.keys(body.answers).length !== 40 || body.consentGiven !== true || body.safetyFlag !== true) {
      return NextResponse.json({ error: "A complete, consented assessment is required." }, { status: 400 });
    }

    // This payload deliberately has no reflection field. Only the generic flag is stored.
    const payload = {
      id: body.id,
      created_at: typeof body.createdAt === "string" ? body.createdAt : new Date().toISOString(),
      answers: body.answers,
      scores: body.scores,
      primary_room: body.primaryRoom,
      secondary_room: body.secondaryRoom,
      third_room: body.thirdRoom,
      forced_choice: body.forcedChoice,
      open_reflection: "",
      consent_given: true,
      safety_flag: true,
      ai_result: null,
      assessment_version: typeof body.assessmentVersion === "string" ? body.assessmentVersion : "formation-v1",
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
    console.error("Unable to save safety flag", error);
    return NextResponse.json({ error: "Safety flag storage is temporarily unavailable." }, { status: 503 });
  }
}
