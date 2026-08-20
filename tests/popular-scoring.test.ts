import assert from "node:assert/strict";
import test from "node:test";
import { scorePopularAssessment } from "../lib/parablepath/popular/scoring.ts";

test("popular scoring returns the most frequent room", () => {
  assert.equal(scorePopularAssessment(["control", "lost", "control"]), "control");
});

test("popular scoring resolves ties by the earliest answer", () => {
  assert.equal(scorePopularAssessment(["delay", "boundary", "scarcity"]), "delay");
});
