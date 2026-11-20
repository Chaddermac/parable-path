// Run against a built app: node tests/holiday-card-exports.mjs http://127.0.0.1:3024
import assert from "node:assert/strict";
const origin = process.argv[2] || "http://127.0.0.1:3024";
const stories = ["lost", "scarcity", "control", "stalled", "boundary", "settling", "delay", "distraction"];
const formats = {square:[1080,1080],portrait:[1080,1350],story:[1080,1920],wallpaper:[1440,3120],landscape:[1200,630]};
for (const story of stories) {
  for (const [format, [width,height]] of Object.entries(formats)) {
    for (const mode of format === "wallpaper" ? ["keep"] : ["share","keep"]) {
    const response = await fetch(`${origin}/api/holiday/card/${story}?format=${format}&mode=${mode}&download=1`);
    assert.equal(response.status,200,`${story}/${format}`);
    const bytes = new Uint8Array(await response.arrayBuffer());
    assert.deepEqual([...bytes.slice(0,8)],[137,80,78,71,13,10,26,10]);
    const header = new DataView(bytes.buffer);
    assert.equal(header.getUint32(16),width);
    assert.equal(header.getUint32(20),height);
    assert.ok(bytes.length > 30000,"The styled card should not be empty");
    assert.ok(response.headers.get("content-disposition")?.includes(`${mode}-${format}.png`));
    }
  }
  console.info(`Passed all five export formats: ${story}`);
}
assert.equal((await fetch(`${origin}/api/holiday/card/lost?mode=unknown`)).status,400);
