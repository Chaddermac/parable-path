import { normalizeAiResult } from "@/lib/ai-reflection";
import { renderFormationResultEmail } from "@/lib/formation-email";
import { formationResultByRoom, isRoomId } from "@/lib/parablepath/popular/results";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export const runtime = "nodejs";
const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  try {
    if (!process.env.RESEND_API_KEY || !process.env.RESULT_EMAIL_FROM) return NextResponse.json({ error: "Result email is not configured yet." }, { status: 503 });
    const body: unknown = await request.json();
    if (!body || typeof body !== "object" || Array.isArray(body)) return NextResponse.json({ error: "Invalid request." }, { status: 400 });
    const { responseId, email, testTag } = body as Record<string, unknown>;
    if (typeof responseId !== "string" || !UUID_PATTERN.test(responseId) || typeof email !== "string" || email.length > 254 || !EMAIL_PATTERN.test(email)) return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });

    const { data, error } = await createServerSupabaseClient().from("responses").select("primary_room, secondary_room, third_room, ai_result, safety_flag").eq("id", responseId).maybeSingle();
    if (error) throw error;
    if (!data || data.safety_flag || !isRoomId(data.primary_room) || !isRoomId(data.secondary_room) || !isRoomId(data.third_room)) return NextResponse.json({ error: "This result is unavailable." }, { status: 404 });
    const reflection = normalizeAiResult(data.ai_result, data.primary_room, data.secondary_room, data.third_room);
    if (!reflection) return NextResponse.json({ error: "The saved reflection is not ready yet. Your result remains available online." }, { status: 409 });

    const origin = process.env.RESULT_PUBLIC_ORIGIN || "https://www.parablepath.app";
    const html = renderFormationResultEmail({ responseId, primary: data.primary_room, secondary: data.secondary_room, third: data.third_room, reflection, origin });
    const profile = formationResultByRoom[data.primary_room];
    const tag = typeof testTag === "string" && /^[a-z0-9_-]{1,64}$/i.test(testTag) ? [{ name: "parablepath_test", value: testTag }] : undefined;
    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from: process.env.RESULT_EMAIL_FROM, to: [email], subject: `Your ParablePath reflection: ${profile.callingName}`, html, ...(tag ? { tags: tag } : {}) })
    });
    if (!resendResponse.ok) throw new Error(`Email provider returned ${resendResponse.status}.`);
    const provider = await resendResponse.json().catch(() => null) as { id?: string } | null;
    return NextResponse.json({ ok: true, id: provider?.id });
  } catch (error) {
    console.error("Unable to email result", error);
    return NextResponse.json({ error: "Email delivery is temporarily unavailable. Your result is still available on this page." }, { status: 503 });
  }
}
