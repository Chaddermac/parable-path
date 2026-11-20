import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";
import { holidayCardPath, effectiveCardMode } from "../lib/holiday/card-formats.ts";
import { holidaySocialGifts } from "../lib/holiday/share-copy.ts";
import { holidayEngagement } from "../lib/holiday/engagement.ts";
import { holidayResults } from "../lib/holiday/results.ts";
import { patterns } from "../lib/holiday/scoring.ts";

test("Share and Keep exports have separate versioned URLs; wallpaper is always reflective", () => {
  for (const mode of ["share","keep"] as const) {
    const url=new URL(holidayCardPath("boundary",{format:"square",mode}),"https://www.parablepath.com");
    assert.equal(url.searchParams.get("mode"),mode);
    assert.equal(url.searchParams.get("v"),"winter-10");
    assert.equal(effectiveCardMode("wallpaper",mode),"keep");
    assert.equal(new URL(holidayCardPath("boundary",{format:"wallpaper",mode}),url).searchParams.get("mode"),"keep");
  }
  assert.equal(effectiveCardMode("square"),"share");
});
test("all eight stories have concise social gifts and distinct invitation prompts", () => {
  for(const pattern of patterns) {
    assert.ok(holidaySocialGifts[pattern].gift.length<95);
    assert.ok(holidaySocialGifts[pattern].prompt.length<100);
    assert.ok(holidaySocialGifts[pattern].tell.length>0 && holidaySocialGifts[pattern].tell.length<140);
  }
  assert.equal(new Set(Object.values(holidaySocialGifts).map(x=>x.prompt)).size,8);
});
test("the approved Holiday Tell copy and movie/calling pairs cover every story", () => {
  const approved = [
    ["lost","Buddy the Elf","Table-Maker","You notice who has nowhere to sit before you notice whether you have a seat yourself."],
    ["scarcity","Scrooge After the Ghosts","Multiplier","You brought extra food, an extra gift, and somehow still know exactly what everything cost."],
    ["control","The Grinch, Heart Three Sizes Larger","Healer","You can sense tension in the room before anyone else has realized there is tension in the room."],
    ["stalled","Charlie Brown","Mentor","You have three thoughtful ideas, two backup plans, and one lingering concern that none of them is quite ready yet."],
    ["boundary","Rudolph","Bridger","You are mentally arranging the seating chart before anyone else has found a parking spot."],
    ["settling","Jack Skellington","Innovator","You hear “annual tradition” and immediately start imagining three ways it could be more interesting."],
    ["delay","George Bailey","WayMaker","Someone says, “We should go see the lights,” and you already have the tickets open on your phone."],
    ["distraction","Linus","Awakener","You can be in the middle of a great moment while mentally answering the next three things on your list."],
  ] as const;
  assert.equal(approved.length,patterns.length);
  for(const [story,movie,calling,tell] of approved) {
    assert.equal(holidaySocialGifts[story].tell,tell);
    assert.equal(holidayEngagement[story].movie,movie);
    assert.equal(holidayResults[story].calling,calling);
  }
});
test("social composition separates reflection content and uses only existing typology imagery", () => {
  const source=readFileSync(new URL("../components/holiday/HolidaySocialCard.tsx",import.meta.url),"utf8");
  const [share,wallpaper]=source.split("export function HolidayWallpaper");
  assert.ok(share.includes("CHRISTMAS MOVIE ENERGY"));
  assert.ok(share.includes("YOUR HOLIDAY SUPERPOWER"));
  assert.ok(share.includes("YOUR HOLIDAY TELL"));
  assert.ok(!share.includes("Your Holiday Survival Guide"));
  assert.ok(share.includes("portrait?"),"Only portrait adds short reflection lines");
  assert.ok(wallpaper.includes("ONE SMALL PRACTICE"));
  assert.ok(!wallpaper.includes("WHAT’S YOUR HOLIDAY STORY?"));
  assert.ok(!source.includes("content.movieCopy"),"No explanatory movie paragraphs on social cards");
});
