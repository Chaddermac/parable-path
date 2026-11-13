// Run against a built, running server: node tests/holiday-http.mjs http://127.0.0.1:3000
import assert from "node:assert/strict";
const origin = process.argv[2] || "http://127.0.0.1:3000";
const stories = ["lost", "scarcity", "control", "stalled", "boundary", "settling", "delay", "distraction"];
const landing = await fetch(`${origin}/holidayedition`);
assert.equal(landing.status,200);
const landingHtml = await landing.text();
assert.ok(landingHtml.includes("reference-globe.webp"));
assert.ok(landingHtml.includes("winter-title"));
assert.ok(landingHtml.includes("White Elephant"));
assert.equal((landingHtml.match(/type="radio"/g)||[]).length,5,"Embedded approved first question has five native answers");
assert.ok(landingHtml.indexOf("winter-title") < landingHtml.indexOf('id="quiz"'));
for (const story of [...stories, "lost~control", stories.join("~")]) {
  const response = await fetch(`${origin}/holidayedition/results/${story}`);
  assert.equal(response.status, 200, `Result ${story}`);
  const html = await response.text();
  const resultCount = story.split("~").length;
  assert.equal((html.match(/<li>/g)||[]).length, resultCount*6, "Three patterns and three gifts per result");
  assert.ok(html.includes("The Gift You Bring"));
  assert.ok(!html.includes("Your holiday invitation"));
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
for (const [format,width,height] of [["square",1080,1080],["portrait",1080,1350],["story",1080,1920],["wallpaper",1440,3120]]) {
  const response = await fetch(`${origin}/api/holiday/card/control?format=${format}&download=1`);
  assert.equal(response.status,200);
  assert.ok(response.headers.get("content-disposition").includes(`${format}.png`));
  const bytes = new Uint8Array(await response.arrayBuffer());
  assert.equal(new DataView(bytes.buffer).getUint32(16),width);
  assert.equal(new DataView(bytes.buffer).getUint32(20),height);
}
for (const format of ["unknown","__proto__"]) assert.equal((await fetch(`${origin}/api/holiday/card/control?format=${format}`)).status,400);
for (const [data, headers, expected] of [
  [{ event:"quiz_complete", scores:{lost:3,scarcity:1,control:3,stalled:1,boundary:2,settling:2,delay:2,distraction:2}, seconds:180, rawAnswers:["must be discarded"] }, {}, 204],
  [{ event:"unknown" }, {}, 400],
  [{ event:"page_view" }, { dnt:"1" }, 204],
  [{ event:"page_view" }, { origin:"https://example.com" }, 403],
]) {
  const response = await fetch(`${origin}/api/holiday/events`, { method:"POST", headers:{ "Content-Type":"application/json", origin, ...headers }, body:JSON.stringify(data) });
  assert.equal(response.status, expected);
}
for (const story of ["unknown","lost~lost"]) assert.equal((await fetch(`${origin}/holidayedition/results/${story}`)).status, 404);
console.info("HTTP smoke passed: eight results, multiway ties, fourteen base PNGs, four download formats, analytics validation, DNT, origin check, invalid results.");

const oldLanding = await fetch(`${origin}/holiday?start=1`, { redirect: "manual" });
assert.equal(oldLanding.status, 308);
assert.equal(new URL(oldLanding.headers.get("location"), origin).pathname, "/holidayedition");
assert.equal(new URL(oldLanding.headers.get("location"), origin).search, "?start=1");
const oldResult = await fetch(`${origin}/holiday/results/control?also=lost`, { redirect: "manual" });
assert.equal(oldResult.status, 308);
assert.equal(new URL(oldResult.headers.get("location"), origin).pathname, "/holidayedition/results/control");
assert.equal(new URL(oldResult.headers.get("location"), origin).search, "?also=lost");

for (const [path,word,cardCount] of [
  ["lost?responses=8","A tentative story to explore",1],
  ["lost~scarcity?responses=11","A tentative story to explore",2],
  ["lost?responses=12","Your Holiday Story",1],
  ["no-match?responses=0","We didn’t find a clear holiday match.",0],
  ["no-match?responses=7","We didn’t find a clear holiday match.",0],
]) {
  const r=await fetch(`${origin}/holidayedition/results/${path}`);assert.equal(r.status,200,path);
  const html=await r.text();assert.ok(html.includes(word),path);
  assert.equal((html.match(/class="holiday-result"/g)||[]).length,cardCount,path);
  assert.ok(html.includes("Did your Holiday Story feel like you?"));
}
for(const path of ["unknown?responses=0","no-match?responses=8","lost?responses=-1","lost?responses=17","lost?responses=8&responses=9"]) {
  assert.equal((await fetch(`${origin}/holidayedition/results/${path}`)).status,404,path);
}
for(const data of [
  {event:"question_answered",question:1,no_match:true},
  {event:"result_feedback",leaders:["lost","scarcity"],fit:"mostly",interpretation:"tentative"},
  {event:"result_feedback",leaders:[],fit:"not_really",interpretation:"insufficient"},
]) assert.equal((await fetch(`${origin}/api/holiday/events`,{method:"POST",headers:{"Content-Type":"application/json",origin},body:JSON.stringify({...data,questionVersion:"4.1",rawAnswers:["discard me"],email:"discard@example.com"})})).status,204);
for(const data of [{event:"result_feedback",leaders:["lost"],fit:"bad"},{event:"question_answered",question:17,no_match:true},{event:"quiz_complete",scores:{lost:8,scarcity:8,control:0,stalled:0,boundary:0,settling:0,delay:0,distraction:0}}]) {
  assert.equal((await fetch(`${origin}/api/holiday/events`,{method:"POST",headers:{"Content-Type":"application/json",origin},body:JSON.stringify(data)})).status,400);
}
console.info("Version 4.1 smoke passed: five choices; standard, tentative and no-clear-match results; feedback validation; impossible score rejection.");

const tentativeCard=await fetch(`${origin}/api/holiday/card/lost?tentative=1`);
assert.equal(tentativeCard.status,200);
assert.deepEqual([...new Uint8Array(await tentativeCard.arrayBuffer()).slice(0,8)],[137,80,78,71,13,10,26,10]);
const tentativeHtml=await (await fetch(`${origin}/holidayedition/results/lost?responses=8`)).text();
assert.ok(tentativeHtml.includes('property="og:url" content="https://parablepath.com/holidayedition/results/lost?responses=8"'));
