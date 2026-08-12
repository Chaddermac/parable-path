import type { AssessmentDraft, ResultRecord, RoomId, Scores } from "./types";
import { rooms } from "./content";

const DRAFT_KEY = "parablepath:draft";
const RESULT_PREFIX = "parablepath:result:";

export const emptyDraft = (): AssessmentDraft => ({ answers: {} });

export function readDraft(): AssessmentDraft {
  if (typeof window === "undefined") return emptyDraft();
  try { return JSON.parse(localStorage.getItem(DRAFT_KEY) || "null") || emptyDraft(); }
  catch { return emptyDraft(); }
}

export function writeDraft(draft: AssessmentDraft) { localStorage.setItem(DRAFT_KEY, JSON.stringify(draft)); }

export function calculateScores(answers: Record<string, number>, forcedChoice?: RoomId) {
  const scores = Object.fromEntries(rooms.map(({ id }) => [id, 0])) as Scores;
  for (const [questionId, value] of Object.entries(answers)) {
    const room = questionId.split("-").slice(0, -1).join("-") as RoomId;
    if (room in scores) scores[room] += value;
  }
  const ranking = (Object.keys(scores) as RoomId[]).sort((a, b) => scores[b] - scores[a] || (a === forcedChoice ? -1 : b === forcedChoice ? 1 : 0));
  return { scores, ranking };
}

export function createResult(draft: AssessmentDraft, reflection: string): ResultRecord {
  const id = crypto.randomUUID();
  const { scores, ranking } = calculateScores(draft.answers, draft.forcedChoice);
  const result: ResultRecord = { ...draft, id, createdAt: new Date().toISOString(), reflection, scores, ranking, syncStatus: "pending", aiStatus: "pending" };
  localStorage.setItem(`${RESULT_PREFIX}${id}`, JSON.stringify(result));
  localStorage.removeItem(DRAFT_KEY);
  return result;
}

export function readResult(id: string): ResultRecord | null {
  try { return JSON.parse(localStorage.getItem(`${RESULT_PREFIX}${id}`) || "null"); }
  catch { return null; }
}

export function updateResult(result: ResultRecord) { localStorage.setItem(`${RESULT_PREFIX}${result.id}`, JSON.stringify(result)); }
