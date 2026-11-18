import test from 'node:test';
import assert from 'node:assert/strict';
import {pilotReport} from '../scripts/holiday-pilot-report.mjs';
test('pilot flags exactly 25% final no-match responses without excluding questions',()=>{
  const events=Array.from({length:4},(_,i)=>({source:'holiday',questionVersion:'4.1',event:'question_answered',question:1,no_match:i===0}));
  const report=pilotReport(events);
  assert.equal(report.questions[0].noMatchRate,.25);assert.equal(report.questions[0].editorialReview,true);
  assert.equal(report.questions[1].noMatchRate,null);assert.equal(report.questions[1].editorialReview,false);
  assert.equal(report.questions.length,16);
});
test('pilot counts tied leaders equally and feedback never alters result totals',()=>{
  const common={source:'holiday',questionVersion:'4.1'};
  const completion={...common,event:'quiz_complete',leaders:['lost','control'],noMatchCount:5,tied:true,close:true,interpretation:'tentative'};
  const before=pilotReport([completion]);
  const after=pilotReport([completion,{...common,event:'result_feedback',leaders:['lost','control'],fit:'mostly'}]);
  assert.deepEqual(after.storyDistribution,before.storyDistribution);
  assert.deepEqual(after.storyDistribution,{lost:1,control:1});
  assert.equal(after.feedback.lost.mostly,1);assert.equal(after.feedback.control.mostly,1);
  assert.equal(after.noMatchCountDistribution['5'],1);assert.equal(after.tentative,1);
});
