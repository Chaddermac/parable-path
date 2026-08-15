import type { AssessmentQuestion, DiagnosticResult, RoomId, Scores } from "./types";

export function scoreAssessment(answers: Record<string, number>, questions: AssessmentQuestion[], roomIds: RoomId[], closeThreshold: number, forcedChoice?: RoomId) {
  const incomplete = questions.filter((question) => !Number.isInteger(answers[question.id]) || answers[question.id] < 1 || answers[question.id] > 5);
  if (incomplete.length) throw new Error(`Incomplete assessment: ${incomplete.map((question) => question.id).join(", ")}`);
  const scores = Object.fromEntries(roomIds.map((id) => [id, 0])) as Scores;
  const roomScores = roomIds.map((id) => {
    const items = questions.filter((question) => question.room === id);
    const value = (dimension: AssessmentQuestion["dimension"]) => answers[items.find((item) => item.dimension === dimension)!.id];
    const overall = items.reduce((sum, item) => sum + answers[item.id], 0) / items.length;
    const innerStory = (value("story") + value("emotion")) / 2;
    const strategy = value("strategy");
    const shadow = (value("shadow") + value("mirror")) / 2;
    scores[id] = overall;
    return { room: id, overall, innerStory, strategy, shadow, normalized: ((overall - 1) / 4) * 100 };
  });
  const ranking = [...roomIds].sort((a, b) => scores[b] - scores[a] || (a === forcedChoice ? -1 : b === forcedChoice ? 1 : 0));
  const diagnostic: Omit<DiagnosticResult, "assessmentVersion"> = { roomScores: roomScores.sort((a,b) => b.overall-a.overall), isCloseSecondary: scores[ranking[0]] - scores[ranking[1]] <= closeThreshold, isFlatProfile: scores[ranking[0]] < 2.5 };
  return { scores, ranking, diagnostic };
}
