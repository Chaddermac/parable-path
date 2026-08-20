import type { RoomId } from "../../types.ts";

export interface PopularOption {
  label: string;
  scores: Partial<Record<RoomId, number>>;
}

export interface PopularQuestion {
  id: string;
  round: string;
  prompt: string;
  options: PopularOption[];
}

export interface PopularScoreResult {
  primary: RoomId;
  secondary: RoomId;
  normalizedScores: Record<RoomId, number>;
  rawScores: Record<RoomId, number>;
  nearTie: boolean;
}

export interface PopularResultCopy {
  room: RoomId;
  displayName: string;
  icon: string;
  accentColor: string;
  accentSoft: string;
  recognition: string;
  description: string;
  underlyingStory: string;
  strengthLabel: string;
  strength: string;
  shadowLabel: string;
  shadow: string;
  openDoorLabel: string;
  possibility: string;
  exploreUrl: string;
}
