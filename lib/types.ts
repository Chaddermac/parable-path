export type RoomId = "lost" | "scarcity" | "control" | "stalled" | "boundary" | "settling" | "delay" | "distraction";

export type Scores = Record<RoomId, number>;

export interface AssessmentDraft {
  answers: Record<string, number>;
  forcedChoice?: RoomId;
}

export interface ResultRecord extends AssessmentDraft {
  id: string;
  createdAt: string;
  reflection: string;
  scores: Scores;
  ranking: RoomId[];
  nextStep?: string;
}
