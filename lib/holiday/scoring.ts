export const patterns = ["lost", "scarcity", "control", "stalled", "boundary", "settling", "delay", "distraction"] as const;
export type Pattern = typeof patterns[number];
export type AnswerPattern = Pattern | "no_match";
export type HolidayAnswer = { pattern: AnswerPattern; text: string };
export type HolidayQuestion = { id: number; title: string; prompt: string; answers: HolidayAnswer[] };
export type Interpretation = "standard" | "tentative" | "insufficient";
export function isPattern(value: unknown): value is Pattern { return typeof value === "string" && patterns.includes(value as Pattern); }
export function interpretResponses(scoredCount: number): Interpretation {
  return scoredCount < 8 ? "insufficient" : scoredCount < 12 ? "tentative" : "standard";
}
export function summarizeScores(scores: Record<Pattern, number>) {
  const ranked = Object.values(scores).sort((a,b) => b-a);
  const scoredCount = ranked.reduce((sum,n) => sum+n,0);
  const highest = ranked[0], secondHighest = ranked[1];
  const leaders = highest > 0 ? patterns.filter(p => scores[p] === highest) : [];
  const secondary = highest > 1 ? patterns.filter(p => scores[p] === highest-1) : [];
  return { scores, scoredCount, noMatchCount:16-scoredCount, highest, secondHighest, difference:highest-secondHighest,
    leaders, secondary, tied:leaders.length > 1, close:secondary.length > 0, interpretation:interpretResponses(scoredCount) };
}
export function scoreHoliday(questions: HolidayQuestion[], answers: AnswerPattern[]) {
  if (questions.length !== 16 || answers.length !== questions.length) throw new Error("Complete all 16 questions first.");
  const scores = Object.fromEntries(patterns.map(p => [p,0])) as Record<Pattern,number>;
  // forEach skips holes in sparse arrays; indexed validation must reject unanswered slots.
  for (let i=0;i<questions.length;i++) {
    const pattern = answers[i];
    if (!questions[i].answers.some(a => a.pattern === pattern)) throw new Error("Invalid answer mapping.");
    if (pattern !== "no_match") scores[pattern]++;
  }
  return summarizeScores(scores);
}
export function shuffleAnswers(answers: readonly HolidayAnswer[], random = Math.random): HolidayAnswer[] {
  const copy = answers.filter(a => a.pattern !== "no_match");
  for (let i=copy.length-1;i>0;i--) {
    const j = Math.floor(random()*(i+1));
    [copy[i],copy[j]]=[copy[j],copy[i]];
  }
  return [...copy,...answers.filter(a => a.pattern === "no_match")];
}
// Shared URLs contain stories and an optional response count, never answer histories.
export function resultPath(leaders: Pattern[], secondary: Pattern[] = [], scoredCount = 16) {
  const interpretation = interpretResponses(scoredCount);
  const path = `/holidayedition/results/${interpretation === "insufficient" ? "no-match" : leaders.join("~")}`;
  const query = new URLSearchParams();
  if (interpretation !== "insufficient" && secondary.length) query.set("also",secondary.join(","));
  if (scoredCount < 12) query.set("responses",String(scoredCount));
  return query.size ? `${path}?${query.toString()}` : path;
}
export function parseStories(value: string): Pattern[] | null {
  const entries = value.split("~");
  return entries.length > 0 && entries.every(isPattern) && new Set(entries).size === entries.length ? entries as Pattern[] : null;
}
export function parseResponseCount(value: unknown): number | null {
  if (typeof value !== "string" || !/^(?:[0-9]|1[0-6])$/.test(value)) return null;
  return Number(value);
}
