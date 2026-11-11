import { holidayEvents } from "@/lib/holiday/analytics";
import { isPattern } from "@/lib/holiday/scoring";
export async function POST(request: Request) {
  if (request.headers.get("dnt") === "1") return new Response(null, { status: 204 });
  const origin = request.headers.get("origin");
  if (origin) {
    try {
      const parsed = new URL(origin);
      const host = request.headers.get("host") || new URL(request.url).host;
      if (parsed.host !== host || !["http:", "https:"].includes(parsed.protocol)) return new Response(null, { status: 403 });
    } catch { return new Response(null, { status: 403 }); }
  }
  const raw = await request.text();
  if (raw.length > 1024) return new Response(null, { status: 413 });
  try {
    const input = JSON.parse(raw);
    if (!holidayEvents.includes(input.event)) return new Response(null, { status: 400 });
    const event: Record<string, unknown> = { event: input.event };
    if (Number.isInteger(input.question) && input.question >= 1 && input.question <= 16) event.question = input.question;
    if (Number.isInteger(input.seconds) && input.seconds >= 0 && input.seconds <= 86400) event.seconds = input.seconds;
    for (const key of ["leaders", "secondary"]) if (Array.isArray(input[key]) && input[key].length <= 8 && input[key].every(isPattern)) event[key] = [...new Set(input[key])];
    if (typeof input.tied === "boolean") event.tied = input.tied;
    // Structured events use the deployment's existing log retention/drain.
    console.info(JSON.stringify({ source: "holiday", ...event }));
    return new Response(null, { status: 204 });
  } catch { return new Response(null, { status: 400 }); }
}
