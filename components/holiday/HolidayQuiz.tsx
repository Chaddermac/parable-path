"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { holidayQuestions } from "@/lib/holiday/questions";
import { resultPath, scoreHoliday, shuffleAnswers, type HolidayAnswer, type Pattern } from "@/lib/holiday/scoring";
import { trackHoliday } from "@/lib/holiday/analytics";
import { HolidayLanding } from "./HolidayLanding";
import { WinterStar } from "./WinterArtwork";

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
  useEffect(() => {
    const begin = () => { if (current.current < 0) start(); else heading.current?.focus(); };
    window.addEventListener("holiday:start", begin);
    if (new URLSearchParams(window.location.search).get("start") === "1" && current.current < 0) {
      window.history.replaceState(null, "", "/holiday#quiz"); begin();
    }
    return () => window.removeEventListener("holiday:start", begin);
  }, []);
  function next() {
    if (!answers[step] || finishing) return;
    trackHoliday("question_answered", { question: step + 1 });
    if (step < 15) { setStep(step + 1); return; }
    const result = scoreHoliday(holidayQuestions, answers as Pattern[]);
    setFinishing(true); completed.current = true;
    trackHoliday("quiz_complete", { leaders: result.leaders, secondary: result.secondary, tied: result.leaders.length > 1, seconds: Math.round((Date.now() - started.current) / 1000) });
    router.push(resultPath(result.leaders, result.secondary));
  }
  if (step < 0) return <HolidayLanding onStart={start}/>;
  const question = holidayQuestions[step];
  return <main id="quiz" className="holiday holiday-quiz"><div className="winter-question-top"><p className="holiday-eyebrow">A little honesty. A little holiday magic.</p><WinterStar/></div><div className="winter-question-card">
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
      <div className="holiday-navigation"><button type="button" className="holiday-back" disabled={finishing} onClick={() => setStep(step - 1)}>← Back</button><button type="submit" className="button-primary" disabled={!answers[step] || finishing}>{finishing ? "Opening your story…" : step === 15 ? "Reveal My Holiday Story →" : "Next question →"}</button></div>
    </form>
    </div><p className="holiday-fine">Choose what you’d actually do. You can go back and change your answers.</p>
  </main>;
}
