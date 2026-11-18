import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { rooms } from "../lib/content.ts";
import { formationResultByRoom } from "../lib/parablepath/popular/results.ts";
import { publicStories, storyFromSlug } from "../lib/website.ts";

test("each canonical room has exactly one browsable public story with its original reflection content", () => {
  assert.deepEqual(publicStories.map(story => story.room).sort(), rooms.map(room => room.id).sort());
  assert.equal(new Set(publicStories.map(story => story.slug)).size, rooms.length);
  for(const story of publicStories){
    assert.match(story.slug,/^[a-z]+(?:-[a-z]+)*$/);
    assert.equal(storyFromSlug(story.slug)?.room,story.room);
    assert.equal(story.profile,formationResultByRoom[story.room]);
    assert.equal(story.roomData.id,story.room);
  }
  assert.equal(storyFromSlug("not-a-story"),undefined);
  assert.equal(storyFromSlug("table-maker")?.room,"lost");
  assert.equal(storyFromSlug("healer")?.room,"control");
});

test("all exact app medallion crops stay within the supplied artwork",()=>{
  const bytes=readFileSync(new URL("../public/brand/story-symbols.png",import.meta.url));
  const width=bytes.readUInt32BE(16),height=bytes.readUInt32BE(20);
  assert.equal(width,1254); assert.equal(height,1254);
  for(const {crop:[x,y,size]} of publicStories){ assert.ok(x>=0&&y>=0&&size>0); assert.ok(x+size<=width&&y+size<=height); }
});

test("vibrant wheel colors keep navy labels readable, including the darker hover state", () => {
  function luminance(hex: string, brightness = 1) {
    const channels = hex.slice(1).match(/../g)!.map(channel => {
      const value = parseInt(channel, 16) / 255 * brightness;
      return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
    });
    return channels[0] * 0.2126 + channels[1] * 0.7152 + channels[2] * 0.0722;
  }
  const navy = luminance("#062c66");
  for (const story of publicStories) {
    for (const brightness of [1, 0.94]) {
      const contrast = (luminance(story.field, brightness) + 0.05) / (navy + 0.05);
      assert.ok(contrast >= 4.5, `${story.label} label contrast: ${contrast.toFixed(2)}:1`);
    }
  }
});
