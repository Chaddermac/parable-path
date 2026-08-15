import type { AssessmentDraft, DiagnosticResult, ResultRecord, RoomId, Scores } from "./types";
import { ASSESSMENT_VERSION, CLOSE_SECONDARY_THRESHOLD, questions, rooms } from "./content";
import { scoreAssessment } from "./scoring";

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
  const scored = scoreAssessment(answers, questions, rooms.map((room) => room.id), CLOSE_SECONDARY_THRESHOLD, forcedChoice);
  const { scores, ranking } = scored;
  const diagnostic: DiagnosticResult = { ...scored.diagnostic, assessmentVersion: ASSESSMENT_VERSION };
  return { scores, ranking, diagnostic };
}

export function createResult(draft: AssessmentDraft, reflection: string): ResultRecord {
  const id = crypto.randomUUID();
  const { scores, ranking, diagnostic } = calculateScores(draft.answers, draft.forcedChoice);
  const result: ResultRecord = { ...draft, forcedChoice: draft.forcedChoice || ranking[0], id, createdAt: new Date().toISOString(), reflection, scores, ranking, diagnostic, syncStatus: "pending", aiStatus: "pending" };
  localStorage.setItem(`${RESULT_PREFIX}${id}`, JSON.stringify(result));
  localStorage.removeItem(DRAFT_KEY);
  return result;
}

export function readResult(id: string): ResultRecord | null {
  try { return JSON.parse(localStorage.getItem(`${RESULT_PREFIX}${id}`) || "null"); }
  catch { return null; }
}

export function updateResult(result: ResultRecord) { localStorage.setItem(`${RESULT_PREFIX}${result.id}`, JSON.stringify(result)); }
