import assert from "node:assert/strict";
import test from "node:test";
import { holidayEngagement, holidayStoryBridge, holidayAppLink } from "../lib/holiday/engagement.ts";
import { holidayResults } from "../lib/holiday/results.ts";
import { holidayShareHooks } from "../lib/holiday/share-copy.ts";
import { formationResultByRoom } from "../lib/parablepath/popular/results.ts";
import { patterns } from "../lib/holiday/scoring.ts";

test("all eight existing results have a complete engagement layer without renaming their calling", () => {
  assert.deepEqual(Object.keys(holidayEngagement).sort(), [...patterns].sort());
  const expected = ["Table-Maker", "Multiplier", "Healer", "Mentor", "Bridger", "Innovator", "WayMaker", "Awakener"];
  for (const [index, pattern] of patterns.entries()) {
    assert.equal(holidayResults[pattern].calling, expected[index]);
    const data = holidayStoryBridge(pattern);
    for (const value of [data.recognition, data.movie, data.movieCopy, data.watch, data.lean, data.tryThis, data.holidayVersion, data.invitation, data.conversion, data.parableQuestion]) assert.ok(value.length > 0);
    assert.equal(data.days.length, 5);
    assert.equal(new Set(data.days).size, 5);
    assert.equal(data.falseStory, formationResultByRoom[pattern].falseStory);
    assert.match(data.slug, /^[a-z]+(?:-[a-z]+)*$/);
    assert.ok(holidayShareHooks[pattern].length < 150);
  }
  assert.equal(new Set(Object.values(holidayShareHooks)).size, 8);
});
test("app deep links use verified canonical story routes and preserve anonymous holiday context", () => {
  for (const pattern of patterns) for (const placement of ["result", "challenge", "parable"] as const) {
    const url = new URL(holidayAppLink(pattern, placement));
    assert.equal(url.origin, "https://www.parablepath.app");
    assert.equal(url.pathname, `/story-types/${holidayEngagement[pattern].slug}`);
    assert.equal(url.searchParams.get("holiday_result"), pattern);
    assert.equal(url.searchParams.get("utm_content"), holidayEngagement[pattern].slug);
    assert.equal(url.searchParams.get("placement"), placement);
    assert.equal(url.searchParams.get("source"), "holiday");
    assert.equal(url.searchParams.get("utm_source"), "parablepath.com");
  }
  const noMatch = new URL(holidayAppLink());
  assert.equal(noMatch.pathname, "/story-types");
  assert.equal(noMatch.searchParams.has("holiday_result"), false);
});
