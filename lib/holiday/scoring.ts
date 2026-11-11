export const patterns = ["lost", "scarcity", "control", "stalled", "boundary", "settling", "delay", "distraction"] as const;
export type Pattern = typeof patterns[number];
export type HolidayAnswer = { pattern: Pattern; text: string };
export type HolidayQuestion = { id: number; title: string; prompt: string; answers: HolidayAnswer[] };
export function isPattern(value: unknown): value is Pattern { return typeof value === "string" && patterns.includes(value as Pattern); }
export function scoreHoliday(questions: HolidayQuestion[], answers: Pattern[]) {
  if (questions.length !== 16 || answers.length !== questions.length) throw new Error("Complete all 16 questions first.");
  const scores = Object.fromEntries(patterns.map(p => [p, 0])) as Record<Pattern, number>;
  answers.forEach((pattern, i) => {
    if (!questions[i].answers.some(a => a.pattern === pattern)) throw new Error("Invalid answer mapping.");
    scores[pattern]++;
  });
  const highest = Math.max(...Object.values(scores));
  const leaders = patterns.filter(p => scores[p] === highest);
  const secondary = patterns.filter(p => scores[p] === highest - 1);
  return { scores, leaders, secondary };
}
export function shuffleAnswers<T>(answers: readonly T[], random = Math.random): T[] {
  const copy = [...answers];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}
// All co-leaders are encoded together; ordering never selects a winner.
export function resultPath(leaders: Pattern[], secondary: Pattern[] = []) {
  const path = `/holiday/results/${leaders.join("~")}`;
  return secondary.length ? `${path}?also=${secondary.join(",")}` : path;
}
export function parseStories(value: string): Pattern[] | null {
  const entries = value.split("~");
  return entries.length > 0 && entries.every(isPattern) && new Set(entries).size === entries.length ? entries as Pattern[] : null;
}
