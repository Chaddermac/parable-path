"use client";

export const RESPONSE_OUTBOX_KEY = "parablepath:response-outbox:v1";
const MAX_PENDING_RESPONSES = 50;
const RESULT_PREFIX = "parablepath:result:";

export type ResponseEndpoint =
  | "/api/responses"
  | "/api/responses/popular"
  | "/api/responses/safety";

export type PendingResponse = {
  id: string;
  endpoint: ResponseEndpoint;
  payload: Record<string, unknown>;
  createdAt: string;
  attempts: number;
  lastAttemptAt?: string;
};

const endpoints = new Set<ResponseEndpoint>([
  "/api/responses",
  "/api/responses/popular",
  "/api/responses/safety"
]);

function hasStorage() {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function isPendingResponse(value: unknown): value is PendingResponse {
  if (!isRecord(value) || !isRecord(value.payload)) return false;
  return typeof value.id === "string"
    && value.id.length > 0
    && typeof value.endpoint === "string"
    && endpoints.has(value.endpoint as ResponseEndpoint)
    && value.payload.id === value.id
    && typeof value.createdAt === "string"
    && !Number.isNaN(Date.parse(value.createdAt))
    && Number.isInteger(value.attempts)
    && Number(value.attempts) >= 0
    && (value.lastAttemptAt === undefined || (typeof value.lastAttemptAt === "string" && !Number.isNaN(Date.parse(value.lastAttemptAt))));
}

function writePendingResponses(pending: PendingResponse[]) {
  if (!hasStorage()) return false;
  try {
    window.localStorage.setItem(RESPONSE_OUTBOX_KEY, JSON.stringify(pending.slice(0, MAX_PENDING_RESPONSES)));
    return true;
  } catch {
    console.warn("ParablePath could not update local response storage.");
    return false;
  }
}

export function readPendingResponses(): PendingResponse[] {
  if (!hasStorage()) return [];
  try {
    const value: unknown = JSON.parse(window.localStorage.getItem(RESPONSE_OUTBOX_KEY) || "[]");
    if (!Array.isArray(value)) return [];
    return value.filter(isPendingResponse).slice(0, MAX_PENDING_RESPONSES);
  } catch {
    console.warn("ParablePath ignored corrupted local response storage.");
    return [];
  }
}

export function queuePendingResponse(pending: PendingResponse) {
  if (!isPendingResponse(pending)) return false;
  const current = readPendingResponses();
  const duplicateIndex = current.findIndex((item) => item.endpoint === pending.endpoint && item.id === pending.id);
  if (duplicateIndex >= 0) {
    current[duplicateIndex] = {
      ...current[duplicateIndex],
      payload: pending.payload
    };
  } else {
    current.push(pending);
  }
  return writePendingResponses(current);
}

export function removePendingResponse(endpoint: ResponseEndpoint, id: string) {
  return writePendingResponses(readPendingResponses().filter((item) => !(item.endpoint === endpoint && item.id === id)));
}

export function getPendingResponseCount() {
  return readPendingResponses().length;
}

function markFormationResultSaved(id: string) {
  if (!hasStorage()) return;
  try {
    const key = `${RESULT_PREFIX}${id}`;
    const stored: unknown = JSON.parse(window.localStorage.getItem(key) || "null");
    if (!isRecord(stored)) return;
    window.localStorage.setItem(key, JSON.stringify({ ...stored, syncStatus: "saved" }));
  } catch {
    console.warn("ParablePath could not update local response status.");
  }
}

function shouldDiscard(status: number) {
  return status >= 400 && status < 500 && ![408, 425, 429].includes(status);
}

let activeFlush: Promise<void> | null = null;

export function flushPendingResponses(): Promise<void> {
  if (activeFlush) return activeFlush;
  activeFlush = (async () => {
    for (const pending of readPendingResponses()) {
      let response: Response;
      try {
        response = await fetch(pending.endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(pending.payload)
        });
      } catch {
        const now = new Date().toISOString();
        const latest = readPendingResponses();
        const index = latest.findIndex((item) => item.endpoint === pending.endpoint && item.id === pending.id);
        if (index >= 0) {
          latest[index] = { ...latest[index], attempts: latest[index].attempts + 1, lastAttemptAt: now };
          writePendingResponses(latest);
        }
        continue;
      }

      if (response.ok) {
        removePendingResponse(pending.endpoint, pending.id);
        if (pending.endpoint === "/api/responses") markFormationResultSaved(pending.id);
        continue;
      }

      if (shouldDiscard(response.status)) {
        removePendingResponse(pending.endpoint, pending.id);
        continue;
      }

      const now = new Date().toISOString();
      const latest = readPendingResponses();
      const index = latest.findIndex((item) => item.endpoint === pending.endpoint && item.id === pending.id);
      if (index >= 0) {
        latest[index] = { ...latest[index], attempts: latest[index].attempts + 1, lastAttemptAt: now };
        writePendingResponses(latest);
      }
    }
  })().finally(() => {
    activeFlush = null;
  });
  return activeFlush;
}

export function createPendingResponse(
  id: string,
  endpoint: ResponseEndpoint,
  payload: Record<string, unknown>
): PendingResponse {
  return { id, endpoint, payload, createdAt: new Date().toISOString(), attempts: 0 };
}
