export type RoomId = "lost" | "scarcity" | "control" | "stalled" | "boundary" | "settling" | "delay" | "distraction";

export type Scores = Record<RoomId, number>;

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
  nextStep?: string;
  syncStatus?: "pending" | "saved" | "local-only";
  aiResult?: AiResult;
  aiStatus?: "pending" | "generated" | "unavailable";
}
