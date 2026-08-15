export type RoomId = "lost" | "scarcity" | "control" | "stalled" | "boundary" | "settling" | "delay" | "distraction";

export type Scores = Record<RoomId, number>;
export type Dimension = "story" | "emotion" | "strategy" | "shadow" | "mirror";
export interface AssessmentQuestion { id: string; room: RoomId; dimension: Dimension; text: string; }
export interface RoomScore { room: RoomId; overall: number; innerStory: number; strategy: number; shadow: number; normalized: number; }
export interface DiagnosticResult { roomScores: RoomScore[]; isCloseSecondary: boolean; isFlatProfile: boolean; assessmentVersion: string; }

export interface AiResult {
  possibleRoom: string;
  brokenStory: string;
  whyThisMayFit: string;
  parableDoorway: string;
  whatJesusDisrupts: string;
  trueStory: string;
  redemptiveCalling: string;
  metanoiaPrompt: string;
  nextFaithfulStep: string;
  importantNote: string;
}

export interface AssessmentDraft {
  answers: Record<string, number>;
  forcedChoice?: RoomId;
  consentGiven?: boolean;
}

export interface ResultRecord extends AssessmentDraft {
  id: string;
  createdAt: string;
  reflection: string;
  scores: Scores;
  ranking: RoomId[];
  diagnostic: DiagnosticResult;
  nextStep?: string;
  syncStatus?: "pending" | "saved" | "local-only";
  aiResult?: AiResult;
  aiStatus?: "pending" | "generated" | "unavailable";
}
