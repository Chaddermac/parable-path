import { roomById, roomInsights } from "../../content.ts";
import type { RoomId } from "../../types.ts";
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

const popularPresentationByRoom: Record<RoomId, {
  icon: string;
  accentColor: string;
  accentSoft: string;
  description: string;
  strengthLabel: string;
  openDoorLabel: string;
}> = {
  lost: { icon: "✦", accentColor: "#d94d68", accentSoft: "#ffe8ee", description: "You notice every shift in the room—who leaned in, who drifted away, and whether your place still feels secure. You can adapt quickly, even when what you really want is to know you belong without performing for it.", strengthLabel: "Social awareness", openDoorLabel: "Belonging" },
  scarcity: { icon: "◒", accentColor: "#d36b18", accentSoft: "#fff0df", description: "You track what is available, what might run out, and whether everyone is getting a fair share. Preparation comes naturally; relaxing your grip can feel considerably less natural.", strengthLabel: "Resourcefulness", openDoorLabel: "Enough" },
  control: { icon: "⌘", accentColor: "#6547dc", accentSoft: "#eeeaff", description: "You notice what could go wrong before everyone else does. You prepare. You organize. You fix. You carry responsibility—and occasionally wonder why everyone else seems remarkably comfortable with disorder.", strengthLabel: "Responsibility", openDoorLabel: "Trust" },
  stalled: { icon: "↗", accentColor: "#177e89", accentSoft: "#e1f6f5", description: "You can see the complexity, research the options, and describe the first step in impressive detail. Starting before the plan feels complete is where the plot tends to thicken.", strengthLabel: "Thoughtfulness", openDoorLabel: "Movement" },
  boundary: { icon: "⇄", accentColor: "#b33b84", accentSoft: "#fbe6f3", description: "You care deeply about people, values, and the lines that keep them safe. You also notice very quickly who feels familiar, who does not, and who might be about to rearrange the seating chart.", strengthLabel: "Conviction", openDoorLabel: "Neighbor-love" },
  settling: { icon: "◌", accentColor: "#38743c", accentSoft: "#e7f3e5", description: "You have learned not to be swept away by hype or easy promises. Sometimes that realism protects you; sometimes it quietly talks you out of hoping before hope gets a chance.", strengthLabel: "Realism", openDoorLabel: "Possibility" },
  delay: { icon: "◇", accentColor: "#2670c9", accentSoft: "#e5f1ff", description: "You know that timing matters, and you are rarely the first person to make a reckless move. The trouble begins when 'not yet' becomes the permanent address of an important yes.", strengthLabel: "Patience", openDoorLabel: "Today" },
  distraction: { icon: "◎", accentColor: "#c14b32", accentSoft: "#ffebe4", description: "You are curious, responsive, and remarkably good at finding the next interesting thing. Quiet can feel suspiciously empty—especially when it might ask what is happening underneath all that motion.", strengthLabel: "Curiosity", openDoorLabel: "Attention" }
};

export const popularResultByRoom = Object.fromEntries(
  (Object.keys(roomById) as RoomId[]).map((room) => {
    const formation = roomById[room];
    const insight = roomInsights[room];
    const presentation = popularPresentationByRoom[room];
    const result: PopularResultCopy = {
      room,
      displayName: `The ${formation.name} Room`,
      icon: presentation.icon,
      accentColor: presentation.accentColor,
      accentSoft: presentation.accentSoft,
      recognition: recognitionByRoom[room],
      description: presentation.description,
      underlyingStory: formation.falseStory,
      strengthLabel: presentation.strengthLabel,
      strength: insight.strength,
      shadowLabel: insight.shadowLabel,
      shadow: insight.shadow,
      openDoorLabel: presentation.openDoorLabel,
      possibility: formation.trueStory,
      exploreUrl: "https://parablepath.app/assessment"
    };
    return [room, result];
  })
) as Record<RoomId, PopularResultCopy>;
