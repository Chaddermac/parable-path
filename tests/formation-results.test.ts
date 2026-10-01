import assert from "node:assert/strict";
import test from "node:test";
import { normalizeAiResult, normalizeLegacyCallingLanguage } from "../lib/ai-reflection.ts";
import { renderFormationResultEmail } from "../lib/formation-email.ts";
import { formationResultByRoom } from "../lib/parablepath/popular/results.ts";
import type { AiResult } from "../lib/types.ts";

const expected = {
  lost: "Table-Maker", scarcity: "Multiplier", control: "Healer", stalled: "Mentor / Coach",
  boundary: "Bridger", settling: "Innovator / Imagineer", delay: "Waymaker", distraction: "Awakener"
} as const;

test("all eight formation results use the approved canonical cards", () => {
  assert.deepEqual(Object.keys(formationResultByRoom).sort(), Object.keys(expected).sort());
  for (const [id, calling] of Object.entries(expected)) {
    const profile = formationResultByRoom[id as keyof typeof expected];
    assert.equal(profile.callingName, calling);
    assert.equal(profile.practices.length, 3);
    assert.equal(profile.nextSteps.length, 3);
    assert.ok(profile.callingDescription.length > 100);
    assert.ok(profile.shadowDescription.length > 100);
    assert.ok(profile.parableReferences.length > 10);
  }
  assert.equal(formationResultByRoom.lost.callingName, "Table-Maker");
  assert.equal(formationResultByRoom.control.callingName, "Healer");
});

test("legacy results normalize before rendering", () => {
  const legacyNames = [["Heavenly", "Host"].join(" "), ["Planetary", "Trustee"].join(" "), ["Mercy", "Releaser"].join("-")];
  assert.equal(normalizeLegacyCallingLanguage(legacyNames.join(" / ")), "Table-Maker / Multiplier / Healer");
  const normalized = normalizeAiResult({ whyThisMayFit: legacyNames[0], whatJesusDisrupts: "Grace interrupts the old story.", metanoiaPrompt: "What changes now?", nextFaithfulStep: "Invite one person." }, "lost", "scarcity", "control");
  assert.equal(normalized?.whyThisMayFit, "Table-Maker");
  assert.match(normalized?.storyInteraction || "", /Scarcity.*Control/);
});

test("the email contains the identical stored reflection and all landscape ranks", () => {
  const reflection: AiResult = {
    whyThisMayFit: "UNIQUE WHY COPY",
    storyInteraction: "UNIQUE INTERACTION COPY",
    whatJesusDisrupts: "UNIQUE DISRUPTION COPY",
    metanoiaQuestion: "UNIQUE METANOIA COPY?",
    nextFaithfulStep: "UNIQUE STEP COPY"
  };
  const html = renderFormationResultEmail({ responseId: "11111111-1111-4111-8111-111111111111", primary: "lost", secondary: "scarcity", third: "control", reflection, origin: "https://www.parablepath.app" });
  for (const copy of Object.values(reflection)) assert.match(html, new RegExp(copy.replace("?", "\\?")));
  assert.match(html, /Primary story[\s\S]*Lost/);
  assert.match(html, /Secondary story[\s\S]*Scarcity/);
  assert.match(html, /Nearby pattern[\s\S]*Control/);
  assert.match(html, /Your ParablePath reflection: Table-Maker/);
  assert.match(html, /api\/formation-card\/lost/);
  assert.match(html, /name and email|delivery email address/i);
});
