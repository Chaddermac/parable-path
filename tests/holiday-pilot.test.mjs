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
test('expanded funnel reports anonymous event ratios and allowlisted app placements without user attribution',()=>{
  const common={source:'holiday',questionVersion:'4.1'};
  const events=['page_view','quiz_start','quiz_complete','result_view','share','download_card','crew_invite','parable_click','holiday_challenge_view'].map(event=>({...common,event}));
  events.push({...common,event:'app_click',story:'distraction',placement:'challenge'});
  events.push({...common,event:'holiday_challenge_app_click',story:'distraction',placement:'challenge'});
  const report=pilotReport(events);
  assert.equal(report.appClicks,1,'dedicated challenge event must not double-count app clicks');
  assert.equal(report.appClicksByStory.distraction,1);
  assert.equal(report.appClicksByPlacement.challenge,1);
  assert.equal(report.eventRatios.completionToAppClick,1);
  assert.equal(report.crewInvites,1);assert.equal(report.challengeViews,1);
  assert.match(report.note,/not unique people/);
  assert.equal(pilotReport([]).eventRatios.completionToAppClick,null);
});
test('download summaries count only allowlisted format and card mode',()=>{
  const event={source:'holiday',questionVersion:'4.1',event:'download_card'};
  const report=pilotReport([{...event,format:'square',card_mode:'share'},{...event,format:'wallpaper',card_mode:'keep'},{...event,format:'unknown',card_mode:'unknown'}]);
  assert.deepEqual(report.downloadsByMode,{share:1,keep:1});
  assert.deepEqual(report.downloadsByFormat,{square:1,wallpaper:1});
  assert.equal(report.downloads,3);
});
