import type { RoomId } from "../../types.ts";

export interface PopularOption {
  label: string;
  room: RoomId;
}

export interface PopularQuestion {
  id: string;
  prompt: string;
  options: PopularOption[];
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
