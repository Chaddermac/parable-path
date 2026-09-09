import assert from "node:assert/strict";
import test from "node:test";
import { popularResultByRoom } from "../lib/parablepath/popular/results.ts";

const expectedRooms = ["lost", "boundary", "control", "stalled", "settling", "scarcity", "delay", "distraction"] as const;

test("all eight popular Story Rooms have complete reveal presentation data", () => {
  assert.deepEqual(Object.keys(popularResultByRoom).sort(), [...expectedRooms].sort());

  for (const room of expectedRooms) {
    const result = popularResultByRoom[room];
    assert.equal(result.id, room);
    assert.ok(result.storyName.length > 2);
    assert.match(result.accent, /^#[0-9a-f]{6}$/i);
    assert.match(result.accentSoft, /^#[0-9a-f]{6}$/i);
    assert.ok(result.icon.length > 0);
    assert.ok(result.callingName.length > 2);
    assert.ok(result.callingDescription.length > 80);
    assert.ok(result.falseStory.length > 5);
    assert.ok(result.shadowName.length > 2);
    assert.ok(result.shadowDescription.length > 80);
    assert.equal(result.practices.length, 3);
    assert.equal(result.nextSteps.length, 3);
    assert.ok(result.parableReferences.length > 8);
  }
});

test("each Story Room uses a distinct primary accent", () => {
  const accents = expectedRooms.map((room) => popularResultByRoom[room].accent);
  assert.equal(new Set(accents).size, expectedRooms.length);
});
