import assert from "node:assert/strict";
import test from "node:test";
import { orderedPopularOptions, POPULAR_ASSESSMENT_VERSION, popularQuestions } from "../lib/parablepath/popular/questions.ts";
import { maximumPopularScores, popularRoomOrder, scorePopularAssessment } from "../lib/parablepath/popular/scoring.ts";

test("popular v2 contains 16 five-choice questions across four rounds", () => {
  assert.equal(POPULAR_ASSESSMENT_VERSION, "popular-v2");
  assert.equal(popularQuestions.length, 16);
  assert.deepEqual([...new Set(popularQuestions.map((question) => question.round))], ["Just a Normal Day", "When Life Gets Weird", "Other Humans", "The Stuff Underneath"]);
  for (const question of popularQuestions) assert.equal(question.options.length, 5);
});

test("answer ordering is varied without changing answer content", () => {
  let reorderedQuestions = 0;
  for (const question of popularQuestions) {
    const ordered = orderedPopularOptions(question);
    assert.deepEqual(new Set(ordered), new Set(question.options));
    if (ordered.some((option, index) => option !== question.options[index])) reorderedQuestions += 1;
  }
  assert.ok(reorderedQuestions >= 12);
});

test("every option uses only primary and optional secondary weights", () => {
  for (const question of popularQuestions) {
    for (const option of question.options) {
      const weights = Object.values(option.scores).sort((a, b) => b - a);
      assert.equal(weights[0], 2);
      assert.ok(weights.length <= 2);
      if (weights.length === 2) assert.equal(weights[1], 1);
    }
  }
});

test("normalization gives every room a 100 percent attainable ceiling", () => {
  const maximums = maximumPopularScores();
  for (const room of popularRoomOrder) {
    assert.ok(maximums[room] > 0);
    const answers = popularQuestions.map((question) => [...question.options].sort((a, b) => (b.scores[room] || 0) - (a.scores[room] || 0))[0]);
    assert.equal(scorePopularAssessment(answers).normalizedScores[room], 100);
  }
});

test("dominant answer patterns resolve to each intended room", () => {
  for (const room of popularRoomOrder) {
    const eligible = popularQuestions.filter((question) => question.options.some((option) => option.scores[room] === 2));
    const answers = eligible.map((question) => question.options.find((option) => option.scores[room] === 2)!);
    assert.equal(scorePopularAssessment(answers).primary, room);
  }
});

test("a seven-point normalized gap is treated as a near tie", () => {
  const first = popularQuestions[0].options[0];
  const result = scorePopularAssessment([first]);
  assert.equal(typeof result.nearTie, "boolean");
  assert.notEqual(result.primary, result.secondary);
});
