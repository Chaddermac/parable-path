import assert from "node:assert/strict";
import test from "node:test";
import { scoreAssessment } from "../lib/scoring.ts";

const rooms = ["lost","boundary","control","stalled","settling","scarcity","delay","distraction"] as const;
const dimensions = ["story","emotion","strategy","shadow","mirror"] as const;
const questions = rooms.flatMap((room) => dimensions.map((dimension, index) => ({ id: `${room}_${index}`, room, dimension, text: "test" })));
const answers = (defaults = 1) => Object.fromEntries(questions.map((question) => [question.id, defaults]));
const setRoom = (input: Record<string, number>, room: string, values: number[]) => dimensions.forEach((_, index) => { input[`${room}_${index}`] = values[index]; });

test("clear Control", () => { const input=answers(); setRoom(input,"control",[5,5,5,5,5]); assert.equal(scoreAssessment(input,questions,[...rooms],.25).ranking[0],"control"); });
test("close Control and Scarcity", () => { const input=answers(); setRoom(input,"control",[4,4,4,5,5]); setRoom(input,"scarcity",[4,4,4,4,5]); const result=scoreAssessment(input,questions,[...rooms],.25); assert.deepEqual(result.ranking.slice(0,2),["control","scarcity"]); assert.equal(result.diagnostic.isCloseSecondary,true); });
test("distinct Control and Scarcity", () => { const input=answers(); setRoom(input,"control",[4,4,4,5,5]); setRoom(input,"scarcity",[4,4,4,3,4]); assert.equal(scoreAssessment(input,questions,[...rooms],.25).diagnostic.isCloseSecondary,false); });
test("flat profile", () => assert.equal(scoreAssessment(answers(2),questions,[...rooms],.25).diagnostic.isFlatProfile,true));
test("incomplete assessment", () => { const input=answers(); delete input.lost_0; assert.throws(()=>scoreAssessment(input,questions,[...rooms],.25),/Incomplete assessment: lost_0/); });
test("shadow-rich Control retains dimensions without reweighting", () => { const input=answers(); setRoom(input,"control",[3,3,4,5,5]); const score=scoreAssessment(input,questions,[...rooms],.25).diagnostic.roomScores.find((item)=>item.room==="control")!; assert.equal(score.overall,4); assert.equal(score.innerStory,3); assert.equal(score.strategy,4); assert.equal(score.shadow,5); });
