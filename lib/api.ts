import type { AiResult, AssessmentDraft, ResultRecord, RoomId, Scores } from "./types";

async function postJson(path: string, body: unknown) {
  const response = await fetch(path, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });
  if (!response.ok) {
    const payload = await response.json().catch(() => null) as { error?: string } | null;
    throw new Error(payload?.error || `Request failed with status ${response.status}`);
  }
}

export function saveResponse(result: ResultRecord) {
  return postJson("/api/responses", {
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
  });
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
