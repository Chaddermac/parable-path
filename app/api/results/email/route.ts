import { roomById } from "@/lib/content";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import type { AiResult, RoomId } from "@/lib/types";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const roomIds = new Set(Object.keys(roomById));

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" }[character] || character));
}

function validAiResult(value: unknown): value is AiResult {
  if (!value || typeof value !== "object" || Array.isArray(value)) return false;
  const result = value as Record<string, unknown>;
  return ["possibleRoom", "brokenStory", "whyThisMayFit", "parableDoorway", "whatJesusDisrupts", "trueStory", "redemptiveCalling", "metanoiaPrompt", "nextFaithfulStep", "importantNote"].every((key) => typeof result[key] === "string");
}

export async function POST(request: Request) {
  try {
    if (!process.env.RESEND_API_KEY || !process.env.RESULT_EMAIL_FROM) {
      return NextResponse.json({ error: "Result email is not configured yet." }, { status: 503 });
    }
    const body: unknown = await request.json();
    if (!body || typeof body !== "object" || Array.isArray(body)) return NextResponse.json({ error: "Invalid request." }, { status: 400 });
    const { responseId, email } = body as Record<string, unknown>;
    if (typeof responseId !== "string" || !UUID_PATTERN.test(responseId) || typeof email !== "string" || email.length > 254 || !EMAIL_PATTERN.test(email)) {
      return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
    }

    const { data, error } = await createServerSupabaseClient().from("responses")
      .select("primary_room, ai_result, safety_flag")
      .eq("id", responseId)
      .maybeSingle();
    if (error) throw error;
    if (!data || data.safety_flag || !roomIds.has(data.primary_room)) return NextResponse.json({ error: "This result is unavailable." }, { status: 404 });

    const room = roomById[data.primary_room as RoomId];
    const generated = validAiResult(data.ai_result) ? data.ai_result : null;
    const sections = generated ? [
      ["Your Possible Room", generated.possibleRoom], ["The Broken Story", generated.brokenStory], ["Why This May Fit", generated.whyThisMayFit],
      ["The Parable Doorway", generated.parableDoorway], ["What Jesus Disrupts", generated.whatJesusDisrupts], ["The True Story", generated.trueStory],
      ["Your Redemptive Calling", generated.redemptiveCalling], ["Metanoia Prompt", generated.metanoiaPrompt], ["One Next Faithful Step", generated.nextFaithfulStep], ["Important Note", generated.importantNote]
    ] : [
      ["Your Possible Room", `The ${room.name} Room`], ["The Broken Story", room.falseStory], ["The Parable Doorway", room.parables],
      ["The True Story", room.trueStory], ["Your Redemptive Calling", room.calling], ["Metanoia Prompt", room.prompt],
      ["Important Note", "This result is a reflection aid, not a fixed label, personality test, clinical diagnosis, prophecy, counseling, or crisis care."]
    ];
    const html = `<!doctype html><html><body style="margin:0;background:#f4efe6;color:#26352d;font-family:Arial,sans-serif"><main style="max-width:680px;margin:auto;padding:40px 24px"><p style="color:#a15c3b;font-size:12px;font-weight:700;letter-spacing:.16em;text-transform:uppercase">Recognize · Receive · Become</p><h1 style="font-family:Georgia,serif;font-size:42px;margin:12px 0 32px">Your ParablePath reflection</h1>${sections.map(([title, copy]) => `<section style="background:#fff;border:1px solid #ddd5c8;border-radius:14px;padding:24px;margin:14px 0"><h2 style="font-family:Georgia,serif;font-size:24px;margin:0 0 12px">${escapeHtml(title)}</h2><p style="font-size:15px;line-height:1.7;margin:0;white-space:pre-line">${escapeHtml(copy)}</p></section>`).join("")}<p style="font-size:12px;line-height:1.6;color:#68736d;margin-top:28px">This email was requested from the ParablePath result page. ParablePath does not store the recipient email address.</p></main></body></html>`;

    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from: process.env.RESULT_EMAIL_FROM, to: [email], subject: `Your ParablePath reflection: The ${room.name} Room`, html })
    });
    if (!resendResponse.ok) throw new Error(`Email provider returned ${resendResponse.status}.`);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Unable to email result", error);
    return NextResponse.json({ error: "Email delivery is temporarily unavailable." }, { status: 503 });
  }
}
