import { holidayEvents, resultFitOptions } from "@/lib/holiday/analytics";
import { isPattern, patterns, summarizeScores, type Pattern } from "@/lib/holiday/scoring";
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
    const event: Record<string, unknown> = { event:input.event, ...(input.questionVersion === "4.1" ? { questionVersion:"4.1" } : {}) };
    if (input.event === "question_answered") {
      if (!Number.isInteger(input.question) || input.question < 1 || input.question > 16 || typeof input.no_match !== "boolean") return new Response(null,{status:400});
      event.no_match = input.no_match;
    }
    if (input.event === "quiz_complete") {
      if (!input.scores || !patterns.every(p => Number.isInteger(input.scores[p]) && input.scores[p] >= 0 && input.scores[p] <= 8)) return new Response(null,{status:400});
      const scores = Object.fromEntries(patterns.map(p => [p,input.scores[p]])) as Record<Pattern,number>;
      if (patterns.slice(0,4).reduce((sum,p) => sum+scores[p],0) > 8 || patterns.slice(4).reduce((sum,p) => sum+scores[p],0) > 8) return new Response(null,{status:400});
      Object.assign(event,summarizeScores(scores));
    }
    if (input.event === "result_feedback") {
      if (!resultFitOptions.some(option => option.value === input.fit) || !Array.isArray(input.leaders) || input.leaders.length > 8 || !input.leaders.every(isPattern)) return new Response(null,{status:400});
      event.fit=input.fit;
    }
    if (["standard","tentative","insufficient"].includes(input.interpretation) && input.event !== "quiz_complete") event.interpretation=input.interpretation;
    if (Number.isInteger(input.question) && input.question >= 1 && input.question <= 16) event.question = input.question;
    if (Number.isInteger(input.seconds) && input.seconds >= 0 && input.seconds <= 86400) event.seconds = input.seconds;
    for (const key of ["leaders", "secondary"]) if (input.event !== "quiz_complete" && Array.isArray(input[key]) && input[key].length <= 8 && input[key].every(isPattern)) event[key] = [...new Set(input[key])];
    if (input.event !== "quiz_complete" && typeof input.tied === "boolean") event.tied = input.tied;
    // Structured events use the deployment's existing log retention/drain.
    console.info(JSON.stringify({ source: "holiday", ...event }));
    return new Response(null, { status: 204 });
  } catch { return new Response(null, { status: 400 }); }
}
