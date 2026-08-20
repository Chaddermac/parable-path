import { roomById, roomInsights } from "@/lib/content";
import type { RoomId } from "@/lib/types";
import type { PopularResultCopy } from "./types";

const recognitionByRoom: Record<RoomId, string> = {
  lost: "You can read a room before most people have found their seat.",
  scarcity: "You know exactly how many slices are left—and who already had two.",
  control: "You brought a plan, a backup plan, and notes for everyone else’s plan.",
  stalled: "Your next step has a next step, and both are still in draft.",
  boundary: "You notice the guest list before you notice the party.",
  settling: "You have become very good at calling disappointment realism.",
  delay: "Your future self has received another assignment from present you.",
  distraction: "You came here for one question and now have eleven tabs open."
};

// PLACEHOLDER RESULT COPY: fixed room names and formation content remain the
// source of truth; this lighter framing can be refined with the final question set.
export const popularResultByRoom = Object.fromEntries(
  (Object.keys(roomById) as RoomId[]).map((room) => {
    const formation = roomById[room];
    const insight = roomInsights[room];
    const result: PopularResultCopy = {
      room,
      recognition: recognitionByRoom[room],
      description: `You may be spending time in the ${formation.name} room. This is a story you may be inhabiting, not a type you are.`,
      underlyingStory: formation.falseStory,
      strength: insight.strength,
      shadow: insight.shadow,
      possibility: formation.trueStory
    };
    return [room, result];
  })
) as Record<RoomId, PopularResultCopy>;
