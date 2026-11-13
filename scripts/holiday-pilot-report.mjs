import { createInterface } from 'node:readline';
import { pathToFileURL } from 'node:url';
const patterns=['lost','scarcity','control','stalled','boundary','settling','delay','distraction'];
const fits=['yes','mostly','a_little','not_really'];
export function pilotReport(events) {
  const questions=Array.from({length:16},(_,i)=>({question:i+1,responses:0,noMatch:0}));
  const report={version:'4.1',starts:0,completions:0,noMatchResponses:0,noMatchCountDistribution:{},storyDistribution:{},ties:0,closeScores:0,tentative:0,insufficient:0,appClicks:0,feedback:{},questions};
  for (const e of events) {
    if (!e || typeof e!=='object') continue;
    const leaders=Array.isArray(e.leaders)?[...new Set(e.leaders.filter(p=>patterns.includes(p)))]:[];
    if (e.source!=='holiday' || e.questionVersion!=='4.1') continue;
    if (e.event==='quiz_start') report.starts++;
    if (e.event==='question_answered' && Number.isInteger(e.question) && e.question>=1 && e.question<=16 && typeof e.no_match==='boolean') {
      const q=questions[e.question-1];q.responses++;if(e.no_match)q.noMatch++;
    }
    if(e.event==='quiz_complete') {
      report.completions++;
      report.noMatchResponses+=e.noMatchCount||0;
      const count=String(e.noMatchCount||0);report.noMatchCountDistribution[count]=(report.noMatchCountDistribution[count]||0)+1;
      if(e.interpretation==='insufficient') report.insufficient++;
      else for(const p of leaders)report.storyDistribution[p]=(report.storyDistribution[p]||0)+1;
      if(e.interpretation==='tentative')report.tentative++;
      if(e.tied)report.ties++;
      if(e.close)report.closeScores++;
    }
    if(e.event==='result_feedback' && fits.includes(e.fit))for(const p of leaders.length?leaders:['no_match']) {
      report.feedback[p]||={};report.feedback[p][e.fit]=(report.feedback[p][e.fit]||0)+1;
    }
    if(e.event==='app_click')report.appClicks++;
  }
  report.questions=questions.map(q=>({...q,noMatchRate:q.responses?q.noMatch/q.responses:null,editorialReview:q.responses>0&&q.noMatch/q.responses>=.25}));
  return {...report,note:'Anonymous log-event counts, not unique people. Question rates use final responses from completed quizzes. The 25% pilot flag calls for editorial review, not automatic removal. Tied categories count equally. App clicks and result feedback are event counts.'};
}
if (process.argv[1] && import.meta.url===pathToFileURL(process.argv[1]).href) {
  const events=[];
  for await(const line of createInterface({input:process.stdin,crlfDelay:Infinity})) {
    try {let e=JSON.parse(line);if(typeof e.message==='string')e=JSON.parse(e.message);events.push(e);}catch{/* Ignore non-event log lines. */}
  }
  console.log(JSON.stringify(pilotReport(events),null,2));
}
