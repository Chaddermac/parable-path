"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { holidayQuestions } from "@/lib/holiday/questions";
import { resultPath, scoreHoliday, shuffleAnswers, type HolidayAnswer, type AnswerPattern } from "@/lib/holiday/scoring";
import { trackHoliday } from "@/lib/holiday/analytics";
import { HolidayLanding } from "./HolidayLanding";
import { WinterStar } from "./WinterArtwork";

export function HolidayQuiz() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<(AnswerPattern | undefined)[]>([]);
  const [options, setOptions] = useState<HolidayAnswer[][]>(() => holidayQuestions.map(q => q.answers));
  const [active, setActive] = useState(false);
  const [finishing, setFinishing] = useState(false);
  const heading = useRef<HTMLHeadingElement>(null);
  const started = useRef(0);
  const current = useRef(0);
  const completed = useRef(false);
  const viewed = useRef(false);
  useEffect(() => {
    setOptions(holidayQuestions.map(q => shuffleAnswers(q.answers)));
    if (!viewed.current) { trackHoliday("page_view"); viewed.current = true; }
    const exit = () => { if (started.current > 0 && !completed.current) trackHoliday("quiz_exit", { question: current.current + 1 }); };
    window.addEventListener("pagehide", exit);
    return () => window.removeEventListener("pagehide", exit);
  }, []);
  useEffect(() => {
    current.current = step;
    if (active) trackHoliday("question_view", { question: step + 1 });
  }, [step, active]);
  useEffect(() => {
    if (started.current) {
      heading.current?.focus({ preventScroll: true });
      document.getElementById("quiz")?.scrollIntoView({ block: "start" });
    }
  }, [step]);
  function markStarted() {
    if (started.current) return;
    started.current = Date.now(); completed.current = false; setActive(true);
    trackHoliday("quiz_start");
  }
  function start() {
    markStarted();
    heading.current?.focus({ preventScroll: true });
    document.getElementById("quiz")?.scrollIntoView({ block: "start" });
  }
  useEffect(() => {
    const begin = () => start();
    window.addEventListener("holiday:start", begin);
    if (new URLSearchParams(window.location.search).get("start") === "1") {
      window.history.replaceState(null, "", "/holidayedition#quiz"); begin();
    }
    return () => window.removeEventListener("holiday:start", begin);
  }, []);
  function next() {
    if (!answers[step] || finishing) return;
    if (step < 15) { setStep(step + 1); return; }
    const result = scoreHoliday(holidayQuestions, answers as AnswerPattern[]);
    setFinishing(true); completed.current = true;
    // Emit final per-question no-match indicators once; edits do not inflate pilot rates.
    answers.forEach((answer, i) => trackHoliday("question_answered", { question:i+1, no_match:answer === "no_match" }));
    trackHoliday("quiz_complete", { scores:result.scores, seconds:Math.round((Date.now()-started.current)/1000) });
    router.push(resultPath(result.leaders, result.secondary, result.scoredCount));
  }
  const question = holidayQuestions[step];
  return <HolidayLanding onStart={start}><section id="quiz" className="holiday-quiz"><img className="reference-quiz-decoration" src="/holiday/reference-trees.webp" width="450" height="550" alt="" loading="lazy"/><WinterStar className="reference-quiz-star"/><div className="holiday-discovery-instructions"><h2>The holidays bring out everyone's story. What's yours?</h2><p>Family gatherings. Gift exchanges. Awkward conversations. Pick the response that sounds most like you—not what sounds most impressive.</p><p>If none fits, that's an answer too.</p><p><strong>16 questions · Approximately 3–4 minutes</strong></p></div><div className="winter-question-card">
    <div className="holiday-progress-label"><span>A Quick Holiday Quiz</span><span>Question {step + 1} of 16</span></div>
    <progress aria-label="Assessment progress" value={step + 1} max={16}/>
    <p className="holiday-eyebrow">{question.title}</p>
    <h2 ref={heading} tabIndex={-1} className="holiday-question">{question.prompt}</h2>
    <form onSubmit={e => { e.preventDefault(); next(); }}>
      <fieldset disabled={finishing}><legend className="sr-only">Choose what you would actually do</legend>
        <div className="holiday-options">{options[step].map((answer, index) => <label key={answer.pattern} className="holiday-option">
          <input type="radio" name={`question-${question.id}`} checked={answers[step] === answer.pattern} onChange={() => { markStarted(); setAnswers(previous => { const copy = [...previous]; copy[step] = answer.pattern; return copy; }); }}/>
          <span className="holiday-letter" aria-hidden="true">{String.fromCharCode(65 + index)}</span><span>{answer.text}</span>
        </label>)}</div>
      </fieldset>
      <div className="holiday-navigation"><button type="button" className="holiday-back" disabled={finishing || step === 0} onClick={() => setStep(step - 1)}>← Back</button><button type="submit" className="button-primary" disabled={!answers[step] || finishing}>{finishing ? "Opening your story…" : step === 15 ? "Reveal My Holiday Story →" : "Next question →"}</button></div>
    </form>
    </div><p className="holiday-fine">Choose what you’d actually do. You can go back and change your answers.</p>
  </section></HolidayLanding>;
}
