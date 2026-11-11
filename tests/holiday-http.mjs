// Run against a built, running server: node tests/holiday-http.mjs http://127.0.0.1:3000
import assert from "node:assert/strict";
const origin = process.argv[2] || "http://127.0.0.1:3000";
const stories = ["lost", "scarcity", "control", "stalled", "boundary", "settling", "delay", "distraction"];
const landing = await fetch(`${origin}/holiday`);
assert.equal(landing.status,200);
const landingHtml = await landing.text();
assert.ok(landingHtml.includes("reference-globe.webp"));
assert.ok(landingHtml.includes("winter-title"));
assert.ok(landingHtml.includes("White Elephant"));
assert.equal((landingHtml.match(/type="radio"/g)||[]).length,4,"Embedded approved first question has four native answers");
assert.ok(landingHtml.indexOf("winter-title") < landingHtml.indexOf('id="quiz"'));
for (const story of [...stories, "lost~control", stories.join("~")]) {
  const response = await fetch(`${origin}/holiday/results/${story}`);
  assert.equal(response.status, 200, `Result ${story}`);
  const html = await response.text();
  if (story.includes("~")) assert.ok(html.includes("These stories tied for your highest score"));
}
for (const story of [...stories, "quiz", stories.join("~")]) {
  const response = await fetch(`${origin}/api/holiday/card/${story}`);
  assert.equal(response.status, 200, `Card ${story}`);
  const bytes = new Uint8Array(await response.arrayBuffer());
  assert.deepEqual([...bytes.slice(0,8)], [137,80,78,71,13,10,26,10]);
  assert.equal(new DataView(bytes.buffer).getUint32(16), 1200);
  assert.equal(new DataView(bytes.buffer).getUint32(20), 630);
}
for (const [format,width,height] of [["square",1080,1080],["portrait",1080,1350],["story",1080,1920]]) {
  const response = await fetch(`${origin}/api/holiday/card/control?format=${format}&download=1`);
  assert.equal(response.status,200);
  assert.ok(response.headers.get("content-disposition").includes(`${format}.png`));
  const bytes = new Uint8Array(await response.arrayBuffer());
  assert.equal(new DataView(bytes.buffer).getUint32(16),width);
  assert.equal(new DataView(bytes.buffer).getUint32(20),height);
}
for (const format of ["unknown","__proto__"]) assert.equal((await fetch(`${origin}/api/holiday/card/control?format=${format}`)).status,400);
for (const [data, headers, expected] of [
  [{ event:"quiz_complete", leaders:["lost","control"], secondary:["delay"], tied:true, seconds:180, rawAnswers:["must be discarded"] }, {}, 204],
  [{ event:"unknown" }, {}, 400],
  [{ event:"page_view" }, { dnt:"1" }, 204],
  [{ event:"page_view" }, { origin:"https://example.com" }, 403],
]) {
  const response = await fetch(`${origin}/api/holiday/events`, { method:"POST", headers:{ "Content-Type":"application/json", origin, ...headers }, body:JSON.stringify(data) });
  assert.equal(response.status, expected);
}
for (const story of ["unknown","lost~lost"]) assert.equal((await fetch(`${origin}/holiday/results/${story}`)).status, 404);
console.info("HTTP smoke passed: eight results, multiway ties, thirteen PNGs, three download formats, analytics validation, DNT, origin check, invalid results.");
