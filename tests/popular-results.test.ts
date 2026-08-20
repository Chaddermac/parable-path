import assert from "node:assert/strict";
import test from "node:test";
import { popularResultByRoom } from "../lib/parablepath/popular/results.ts";

const expectedRooms = ["lost", "boundary", "control", "stalled", "settling", "scarcity", "delay", "distraction"] as const;

test("all eight popular Story Rooms have complete reveal presentation data", () => {
  assert.deepEqual(Object.keys(popularResultByRoom).sort(), [...expectedRooms].sort());

  for (const room of expectedRooms) {
    const result = popularResultByRoom[room];
    assert.equal(result.room, room);
    assert.match(result.displayName, /^The .+ Room$/);
    assert.match(result.accentColor, /^#[0-9a-f]{6}$/i);
    assert.match(result.accentSoft, /^#[0-9a-f]{6}$/i);
    assert.ok(result.icon.length > 0);
    assert.ok(result.recognition.length > 20);
    assert.ok(result.description.length > 80);
    assert.ok(result.underlyingStory.length > 5);
    assert.ok(result.strengthLabel.length > 2);
    assert.ok(result.shadowLabel.length > 2);
    assert.ok(result.openDoorLabel.length > 2);
    assert.equal(result.exploreUrl, "https://parablepath.app/assessment");
  }
});

test("each Story Room uses a distinct primary accent", () => {
  const accents = expectedRooms.map((room) => popularResultByRoom[room].accentColor);
  assert.equal(new Set(accents).size, expectedRooms.length);
});
