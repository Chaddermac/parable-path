"use client";

import { createPopularResponsePayload } from "../../api.ts";
import { createPendingResponse, queuePendingResponse } from "../../response-outbox.ts";
import { scorePopularAssessment } from "./scoring.ts";
import type { PopularOption } from "./types.ts";

export const POPULAR_COMPLETION_KEY = "parablepath:popular-completion:v1";

export function completePopularAssessment(answers: PopularOption[], responseId = crypto.randomUUID()) {
  const result = scorePopularAssessment(answers);
  const payload = createPopularResponsePayload({ id: responseId, answers });
  const queued = queuePendingResponse(createPendingResponse(responseId, "/api/responses/popular", payload));
  if (queued && typeof window !== "undefined") {
    try {
      window.localStorage.setItem(POPULAR_COMPLETION_KEY, JSON.stringify({ responseId, room: result.primary }));
    } catch {
      console.warn("ParablePath could not update local response status.");
    }
  }
  return { result, responseId, queued };
}
