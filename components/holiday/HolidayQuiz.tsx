"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { holidayQuestions } from "@/lib/holiday/questions";
import { resultPath, scoreHoliday, shuffleAnswers, type HolidayAnswer, type Pattern } from "@/lib/holiday/scoring";
import { trackHoliday } from "@/lib/holiday/analytics";

export function HolidayQuiz() {
  const router = useRouter();
  const [step, setStep] = useState(-1);
  const [answers, setAnswers] = useState<(Pattern | undefined)[]>([]);
  const [options, setOptions] = useState<HolidayAnswer[][]>([]);
  const [finishing, setFinishing] = useState(false);
  const heading = useRef<HTMLHeadingElement>(null);
  const started = useRef(0);
  const current = useRef(-1);
  const completed = useRef(false);
  const viewed = useRef(false);
  useEffect(() => {
    if (!viewed.current) { trackHoliday("page_view"); viewed.current = true; }
    const exit = () => { if (current.current >= 0 && !completed.current) trackHoliday("quiz_exit", { question: current.current + 1 }); };
    window.addEventListener("pagehide", exit);
    return () => window.removeEventListener("pagehide", exit);
  }, []);
  useEffect(() => {
    current.current = step;
    if (step >= 0) { heading.current?.focus(); trackHoliday("question_view", { question: step + 1 }); }
  }, [step]);
  function start() {
    setOptions(holidayQuestions.map(q => shuffleAnswers(q.answers)));
    setAnswers([]); started.current = Date.now(); completed.current = false;
    trackHoliday("quiz_start"); setStep(0);
  }
  function next() {
    if (!answers[step] || finishing) return;
    trackHoliday("question_answered", { question: step + 1 });
    if (step < 15) { setStep(step + 1); return; }
    const result = scoreHoliday(holidayQuestions, answers as Pattern[]);
    setFinishing(true); completed.current = true;
    trackHoliday("quiz_complete", { leaders: result.leaders, secondary: result.secondary, tied: result.leaders.length > 1, seconds: Math.round((Date.now() - started.current) / 1000) });
    router.push(resultPath(result.leaders, result.secondary));
  }
  if (step < 0) return <main className="holiday holiday-landing">
    <div className="holiday-sparkles" aria-hidden="true">✦ <span>✧</span> ✦</div>
    <p className="holiday-eyebrow">ParablePath · Holiday Edition</p>
    <h1>What’s Your<br/><em>Holiday Story?</em></h1>
    <p className="holiday-subtitle">Family drama. Gift exchanges. Awkward parties. Discover which holiday personality shows up when the season gets interesting.</p>
    <button className="button-primary holiday-start" onClick={start}>Discover My Holiday Story <span aria-hidden="true">↗</span></button>
    <p className="holiday-support">16 questions. Eight holiday personalities.<br/>One surprisingly revealing Christmas story.</p>
    <div className="holiday-scene" aria-hidden="true"><svg className="holiday-tree" width="75" height="110" viewBox="0 0 75 110"><path d="M37 19 16 48h12L10 72h14L4 96h66L50 72h14L46 48h13Z" fill="#1f4b3a" fillOpacity=".07" stroke="#1f4b3a" strokeWidth="1.5" strokeLinejoin="round"/><path d="M37 96v13M37 0l3 8 8 3-8 3-3 8-3-8-8-3 8-3Z" fill="#9b6530" stroke="#9b6530"/><circle cx="32" cy="55" r="3" fill="#a14332"/><circle cx="43" cy="77" r="3" fill="#9b6530"/></svg><span className="holiday-scene-note">A little laughter.<br/>A little recognition.<br/><em>A new chapter.</em></span><svg className="holiday-present" width="75" height="95" viewBox="0 0 75 95"><g fill="none" stroke="#a14332" strokeWidth="1.5" strokeLinejoin="round"><path d="M8 43h59v13H8ZM13 56h49v34H13ZM33 43h9v47M37 43C4 41 15 16 29 29l8 14ZM37 43c33-2 22-27 8-14l-8 14Z"/><path d="m37 0 3 9 9 3-9 3-3 9-3-9-9-3 9-3Z"/></g></svg></div>
    <p className="holiday-fine">No account. No email. Just your holiday instincts.<br/>A playful reflection, not a validated psychological assessment.<br/>Anonymous usage events help improve this experience. No individual answers are sent; Do Not Track is honored.</p>
  </main>;
  const question = holidayQuestions[step];
  return <main className="holiday holiday-quiz">
    <div className="holiday-progress-label"><span>Holiday Edition</span><span>Question {step + 1} of 16</span></div>
    <progress aria-label="Questions completed" value={step} max={16}/>
    <p className="holiday-eyebrow">{question.title}</p>
    <h1 ref={heading} tabIndex={-1} className="holiday-question">{question.prompt}</h1>
    <form onSubmit={e => { e.preventDefault(); next(); }}>
      <fieldset disabled={finishing}><legend className="sr-only">Choose what you would actually do</legend>
        <div className="holiday-options">{options[step].map((answer, index) => <label key={answer.pattern} className="holiday-option">
          <input type="radio" name={`question-${question.id}`} checked={answers[step] === answer.pattern} onChange={() => setAnswers(previous => { const copy = [...previous]; copy[step] = answer.pattern; return copy; })}/>
          <span className="holiday-letter" aria-hidden="true">{String.fromCharCode(65 + index)}</span><span>{answer.text}</span>
        </label>)}</div>
      </fieldset>
      <div className="holiday-navigation"><button type="button" className="holiday-back" disabled={finishing} onClick={() => setStep(step - 1)}>← Back</button><button type="submit" className="button-primary" disabled={!answers[step] || finishing}>{finishing ? "Opening your story…" : step === 15 ? "Reveal My Holiday Story" : "Next question →"}</button></div>
    </form>
    <p className="holiday-fine">Choose what you’d actually do. You can go back and change your answers.</p>
  </main>;
}
