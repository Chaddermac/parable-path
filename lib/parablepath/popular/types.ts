import type { RoomId } from "@/lib/types";

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
  recognition: string;
  description: string;
  underlyingStory: string;
  strength: string;
  shadow: string;
  possibility: string;
}
