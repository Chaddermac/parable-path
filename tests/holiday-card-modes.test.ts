import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";
import { holidayCardPath, effectiveCardMode } from "../lib/holiday/card-formats.ts";
import { holidaySocialGifts } from "../lib/holiday/share-copy.ts";
import { patterns } from "../lib/holiday/scoring.ts";

test("Share and Keep exports have separate versioned URLs; wallpaper is always reflective", () => {
  for (const mode of ["share","keep"] as const) {
    const url=new URL(holidayCardPath("boundary",{format:"square",mode}),"https://www.parablepath.com");
    assert.equal(url.searchParams.get("mode"),mode);
    assert.equal(url.searchParams.get("v"),"winter-8");
    assert.equal(effectiveCardMode("wallpaper",mode),"keep");
    assert.equal(new URL(holidayCardPath("boundary",{format:"wallpaper",mode}),url).searchParams.get("mode"),"keep");
  }
  assert.equal(effectiveCardMode("square"),"share");
});
test("all eight stories have concise social gifts and distinct invitation prompts", () => {
  for(const pattern of patterns) {
    assert.ok(holidaySocialGifts[pattern].gift.length<95);
    assert.ok(holidaySocialGifts[pattern].prompt.length<100);
  }
  assert.equal(new Set(Object.values(holidaySocialGifts).map(x=>x.prompt)).size,8);
});
test("social composition separates reflection content and uses only existing typology imagery", () => {
  const source=readFileSync(new URL("../components/holiday/HolidaySocialCard.tsx",import.meta.url),"utf8");
  const [share,wallpaper]=source.split("export function HolidayWallpaper");
  assert.ok(share.includes("CHRISTMAS MOVIE ENERGY"));
  assert.ok(share.includes("YOUR HOLIDAY SUPERPOWER"));
  assert.ok(!share.includes("Your Holiday Survival Guide"));
  assert.ok(share.includes("portrait?"),"Only portrait adds short reflection lines");
  assert.ok(wallpaper.includes("ONE SMALL PRACTICE"));
  assert.ok(!wallpaper.includes("WHAT’S YOUR HOLIDAY STORY?"));
  assert.ok(!source.includes("content.movieCopy"),"No explanatory movie paragraphs on social cards");
});
