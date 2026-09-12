import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { isRoomId, popularDeeperUrl, popularResultByRoom, popularStoryInvitation } from "../lib/parablepath/popular/results.ts";

const expected = {
  lost: "Table-Maker",
  scarcity: "Multiplier",
  control: "Healer",
  stalled: "Mentor / Coach",
  boundary: "Bridger",
  settling: "Innovator / Imagineer",
  delay: "WayMaker",
  distraction: "Awakener"
} as const;

test("all eight story IDs have complete compact result data and approved mappings", () => {
  assert.deepEqual(Object.keys(popularResultByRoom).sort(), Object.keys(expected).sort());
  for (const [id, calling] of Object.entries(expected)) {
    const profile = popularResultByRoom[id as keyof typeof expected];
    assert.equal(profile.callingName, calling);
    assert.equal(profile.id, id);
    assert.ok(profile.headline.includes(calling));
    assert.ok(profile.callingTagline.length > 10);
    assert.ok(profile.callingSummary.length > 45);
    assert.ok(profile.falseStory.length > 5);
    assert.ok(profile.shadowName.length > 3);
    assert.ok(profile.shadowSummary.length > 35);
    assert.ok(profile.parableReference.length > 12);
    assert.match(profile.cornerAccent, /^#[0-9a-f]{6}$/i);
    assert.match(profile.iconBackground, /^#[0-9a-f]{6}$/i);
    assert.equal(isRoomId(id), true);
  }
});

test("icons and corner accents are unique and Control maps to Healer", () => {
  const profiles = Object.values(popularResultByRoom);
  assert.equal(new Set(profiles.map(({ callingIcon }) => callingIcon)).size, 8);
  assert.equal(new Set(profiles.map(({ cornerAccent }) => cornerAccent)).size, 8);
  assert.equal(popularResultByRoom.control.callingName, "Healer");
});

test("compact result constants preserve the intentional deeper-experience handoff", () => {
  assert.equal(popularStoryInvitation, "See the room • Trace the story • Open the parable.");
  assert.equal(popularDeeperUrl, "https://parablepath.app/assessment");
  assert.equal(isRoomId("not-a-room"), false);
});

test("Mercy-Releaser appears nowhere in result implementation", async () => {
  const files = [
    "lib/parablepath/popular/results.ts",
    "components/popular/TypologyResultCard.tsx",
    "app/api/result-card/[storyId]/route.tsx"
  ];
  const source = (await Promise.all(files.map((file) => readFile(new URL(`../${file}`, import.meta.url), "utf8")))).join("\n");
  assert.equal(source.includes("Mercy-Releaser"), false);
});

test("compact card includes its CTA, invalid-result path, and reduced-motion support", async () => {
  const [card, route, styles, download] = await Promise.all([
    readFile(new URL("../components/popular/TypologyResultCard.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/experiences/popular/results/[[...path]]/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../app/api/result-card/[storyId]/route.tsx", import.meta.url), "utf8")
  ]);
  assert.match(card, /Want the deeper story\?/);
  assert.match(card, /popularDeeperUrl/);
  assert.match(route, /if \(!isRoomId\(storyId\)\)/);
  assert.match(route, /href="\/assessment"/);
  assert.match(styles, /prefers-reduced-motion: reduce[\s\S]*compact-result-card/);
  assert.match(download, /if \(!isRoomId\(storyId\)\)/);
  assert.match(download, /profile\.callingIcon/);
});
