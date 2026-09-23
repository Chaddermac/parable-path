import type { AiResult, AssessmentDraft, FeedbackRecord, ResultRecord, RoomId, Scores } from "./types.ts";
import type { PopularOption } from "./parablepath/popular/types.ts";

async function postJson(path: string, body: unknown, attempts = 3) {
  let lastError: Error | null = null;
  for (let attempt = 0; attempt < attempts; attempt += 1) {
    let response: Response;
    try {
      response = await fetch(path, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });
    } catch (error) {
      lastError = error instanceof Error ? error : new Error("Network request failed.");
      if (attempt === attempts - 1) throw lastError;
      await new Promise((resolve) => setTimeout(resolve, 300 * 2 ** attempt));
      continue;
    }
    if (response.ok) return;
    const payload = await response.json().catch(() => null) as { error?: string } | null;
    lastError = new Error(payload?.error || `Request failed with status ${response.status}`);
    if (response.status < 500 || attempt === attempts - 1) throw lastError;
    await new Promise((resolve) => setTimeout(resolve, 300 * 2 ** attempt));
  }
  throw lastError || new Error("Request failed.");
}

export function saveResponse(result: ResultRecord) {
  return postJson("/api/responses", createResponsePayload(result));
}

export function createResponsePayload(result: ResultRecord): Record<string, unknown> {
  return {
    id: result.id,
    createdAt: result.createdAt,
    answers: result.answers,
    scores: result.scores,
    primaryRoom: result.ranking[0],
    secondaryRoom: result.ranking[1],
    thirdRoom: result.ranking[2],
    forcedChoice: result.forcedChoice,
    openReflection: result.reflection,
    consentGiven: result.consentGiven === true,
    dimensionScores: result.diagnostic.roomScores,
    isCloseSecondary: result.diagnostic.isCloseSecondary,
    assessmentVersion: result.diagnostic.assessmentVersion
  };
}

export function savePopularResponse(input: {
  id: string;
  answers: PopularOption[];
}) {
  return postJson("/api/responses/popular", createPopularResponsePayload(input));
}

export function createPopularResponsePayload(input: {
  id: string;
  answers: PopularOption[];
}): Record<string, unknown> {
  return {
    id: input.id,
    answers: input.answers.map((answer) => answer.label),
    consentGiven: true
  };
}

export function saveSafetyFlag(input: {
  id: string;
  createdAt: string;
  draft: AssessmentDraft;
  scores: Scores;
  ranking: RoomId[];
}) {
  return postJson("/api/responses/safety", {
    id: input.id,
    createdAt: input.createdAt,
    answers: input.draft.answers,
    scores: input.scores,
    primaryRoom: input.ranking[0],
    secondaryRoom: input.ranking[1],
    thirdRoom: input.ranking[2],
    forcedChoice: input.draft.forcedChoice || input.ranking[0],
    consentGiven: input.draft.consentGiven === true,
    safetyFlag: true,
    assessmentVersion: "formation-v1"
  });
}

export function saveFeedback(feedback: FeedbackRecord) {
  return postJson("/api/feedback", feedback);
}

export async function generateAiResult(result: ResultRecord): Promise<AiResult> {
  const response = await fetch("/api/results/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      responseId: result.id,
      scores: result.scores,
      primaryRoom: result.ranking[0],
      secondaryRoom: result.ranking[1],
      thirdRoom: result.ranking[2],
      forcedChoice: result.forcedChoice,
      openReflection: result.reflection
    })
  });
  if (!response.ok) throw new Error("AI result generation is unavailable.");
  const payload = await response.json() as { result: AiResult };
  return payload.result;
}
