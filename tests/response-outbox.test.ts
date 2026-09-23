import assert from "node:assert/strict";
import { afterEach, beforeEach, test } from "node:test";
import {
  createPendingResponse,
  flushPendingResponses,
  getPendingResponseCount,
  queuePendingResponse,
  readPendingResponses,
  RESPONSE_OUTBOX_KEY
} from "../lib/response-outbox.ts";
import { completePopularAssessment } from "../lib/parablepath/popular/completion.ts";
import { popularQuestions } from "../lib/parablepath/popular/questions.ts";

class MemoryStorage {
  private values = new Map<string, string>();
  getItem(key: string) { return this.values.get(key) ?? null; }
  setItem(key: string, value: string) { this.values.set(key, value); }
  removeItem(key: string) { this.values.delete(key); }
}

const originalWindow = globalThis.window;
const originalFetch = globalThis.fetch;

beforeEach(() => {
  Object.defineProperty(globalThis, "window", { configurable: true, value: { localStorage: new MemoryStorage() } });
});

afterEach(() => {
  Object.defineProperty(globalThis, "window", { configurable: true, value: originalWindow });
  globalThis.fetch = originalFetch;
});

test("ignores corrupted storage and deduplicates by endpoint plus response id", () => {
  window.localStorage.setItem(RESPONSE_OUTBOX_KEY, "not-json");
  assert.deepEqual(readPendingResponses(), []);

  const first = createPendingResponse("one", "/api/responses/popular", { id: "one", value: 1 });
  const replacement = createPendingResponse("one", "/api/responses/popular", { id: "one", value: 2 });
  assert.equal(queuePendingResponse(first), true);
  assert.equal(queuePendingResponse(replacement), true);
  assert.equal(getPendingResponseCount(), 1);
  assert.equal(readPendingResponses()[0].payload.value, 2);
});

test("keeps the oldest 50 unsynced responses", () => {
  for (let index = 0; index < 55; index += 1) {
    const id = String(index);
    queuePendingResponse(createPendingResponse(id, "/api/responses/popular", { id }));
  }
  const pending = readPendingResponses();
  assert.equal(pending.length, 50);
  assert.equal(pending[0].id, "0");
  assert.equal(pending[49].id, "49");
});

test("removes successful and permanent invalid responses but retains temporary failures", async () => {
  queuePendingResponse(createPendingResponse("ok", "/api/responses/popular", { id: "ok" }));
  queuePendingResponse(createPendingResponse("invalid", "/api/responses/popular", { id: "invalid" }));
  queuePendingResponse(createPendingResponse("temporary", "/api/responses/popular", { id: "temporary" }));
  globalThis.fetch = (async (_input, init) => {
    const body = JSON.parse(String(init?.body)) as { id: string };
    return new Response(null, { status: body.id === "ok" ? 200 : body.id === "invalid" ? 400 : 503 });
  }) as typeof fetch;

  await flushPendingResponses();
  const pending = readPendingResponses();
  assert.deepEqual(pending.map((item) => item.id), ["temporary"]);
  assert.equal(pending[0].attempts, 1);
  assert.ok(pending[0].lastAttemptAt);
});

test("popular completion reveals a local result and keeps one stable id across a 503 and network failure", async () => {
  const answers = popularQuestions.map((question) => question.options[0]);
  const responseId = "018f47a0-7b62-7d04-8f6d-52bd5e8f9a11";
  const completion = completePopularAssessment(answers, responseId);
  assert.ok(completion.result.primary);
  assert.equal(completion.responseId, responseId);
  assert.equal(getPendingResponseCount(), 1);

  globalThis.fetch = (async () => new Response(null, { status: 503 })) as typeof fetch;
  await flushPendingResponses();
  globalThis.fetch = (async () => { throw new TypeError("offline"); }) as typeof fetch;
  await flushPendingResponses();

  const pending = readPendingResponses();
  assert.equal(pending.length, 1);
  assert.equal(pending[0].id, responseId);
  assert.equal(pending[0].attempts, 2);
});

test("server-side reads do not access window or localStorage", () => {
  Object.defineProperty(globalThis, "window", { configurable: true, value: undefined });
  assert.deepEqual(readPendingResponses(), []);
  assert.equal(getPendingResponseCount(), 0);
  assert.equal(queuePendingResponse(createPendingResponse("offline", "/api/responses", { id: "offline" })), false);
});
