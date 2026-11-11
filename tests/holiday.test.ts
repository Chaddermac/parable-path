import assert from "node:assert/strict";
import test from "node:test";
import { holidayQuestions } from "../lib/holiday/questions.ts";
import { patterns, parseStories, resultPath, scoreHoliday, shuffleAnswers, type Pattern } from "../lib/holiday/scoring.ts";

test("16 approved questions, four distinct patterns each, eight opportunities per pattern", () => {
  assert.equal(holidayQuestions.length, 16);
  for (const [i, q] of holidayQuestions.entries()) {
    assert.equal(q.id, i + 1); assert.equal(q.answers.length, 4);
    assert.equal(new Set(q.answers.map(a => a.pattern)).size, 4);
    assert.ok(q.answers.every(a => a.text && !a.text.includes("[")));
  }
  for (const pattern of patterns) assert.equal(holidayQuestions.flatMap(q => q.answers).filter(a => a.pattern === pattern).length, 8);
});
test("all eight outcomes can win outright with a score of eight", () => {
  for (const target of patterns) {
    const answers = holidayQuestions.map((q, i) => q.answers.find(a => a.pattern === target)?.pattern ?? q.answers[Math.floor(i / 2) % 4].pattern);
    const result = scoreHoliday(holidayQuestions, answers);
    assert.deepEqual(result.leaders, [target]); assert.equal(result.scores[target], 8);
    assert.equal(Object.values(result.scores).reduce((a,b) => a+b), 16);
  }
});
test("all eight tied categories remain equally plausible; no default winner", () => {
  const answers = holidayQuestions.map((q,i) => q.answers[Math.floor(i/2)%4].pattern);
  const result = scoreHoliday(holidayQuestions, answers);
  assert.deepEqual(result.leaders, patterns); assert.deepEqual(result.secondary, []);
  assert.deepEqual(parseStories(resultPath(result.leaders).split("/").at(-1)!), patterns);
});
test("close secondary includes every story exactly one point behind", () => {
  const answers = holidayQuestions.map((q,i) => q.answers[Math.floor(i/2)%4].pattern);
  answers[2] = "lost";
  const result = scoreHoliday(holidayQuestions, answers);
  assert.deepEqual(result.leaders, ["lost"]);
  assert.equal(result.secondary.length, 6); assert.ok(!result.secondary.includes("scarcity"));
});
test("shuffling leaves mappings intact and never mutates source", () => {
  const source = holidayQuestions[0].answers;
  const before = JSON.stringify(source);
  const shuffled = shuffleAnswers(source, () => 0);
  assert.notDeepEqual(shuffled, source); assert.equal(JSON.stringify(source), before);
  for (const a of shuffled) assert.ok(source.some(original => original.text === a.text && original.pattern === a.pattern));
});
test("incomplete and impossible responses are rejected", () => {
  assert.throws(() => scoreHoliday(holidayQuestions, []));
  assert.throws(() => scoreHoliday(holidayQuestions, Array(16).fill("lost") as Pattern[]));
  for (const invalid of ["", "unknown", "lost~lost", "lost~unknown"]) assert.equal(parseStories(invalid), null);
});
test("seeded simulation stays symmetric and exposes tie frequency", () => {
  let seed = 2147;
  const random = () => { seed = (Math.imul(seed,1664525) + 1013904223) >>> 0; return seed / 4294967296; };
  const counts = Object.fromEntries(patterns.map(p => [p,0])) as Record<Pattern,number>;
  let ties=0, close=0;
  for (let i=0;i<20000;i++) {
    const result = scoreHoliday(holidayQuestions, holidayQuestions.map(q => q.answers[Math.floor(random()*4)].pattern));
    for (const p of result.leaders) counts[p]++;
    if(result.leaders.length > 1) ties++;
    if(result.secondary.length) close++;
    for (const value of Object.values(result.scores)) assert.ok(value >= 0 && value <= 8);
  }
  const values = Object.values(counts);
  assert.ok(Math.max(...values)/Math.min(...values) < 1.12);
  console.info(JSON.stringify({ simulation:20000, counts, ties, close, note:"Uniform synthetic choices, not human validation" }));
});
