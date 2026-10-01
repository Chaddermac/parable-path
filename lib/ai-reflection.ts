import { roomById } from "./content.ts";
import type { AiResult, RoomId } from "./types.ts";

const legacyCallingNames: ReadonlyArray<readonly [string, string]> = [
  ["Heavenly Host", "Table-Maker"],
  ["Planetary Trustee", "Multiplier"],
  ["Mercy-Releaser", "Healer"]
];

export function normalizeLegacyCallingLanguage(value: string) {
  return legacyCallingNames.reduce((copy, [legacy, current]) => copy.replaceAll(legacy, current), value);
}

function readString(value: Record<string, unknown>, key: string) {
  const field = value[key];
  return typeof field === "string" && field.trim() ? normalizeLegacyCallingLanguage(field.trim()) : "";
}

export function normalizeAiResult(value: unknown, primary: RoomId, secondary: RoomId, third: RoomId): AiResult | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  const record = value as Record<string, unknown>;
  const whyThisMayFit = readString(record, "whyThisMayFit");
  const whatJesusDisrupts = readString(record, "whatJesusDisrupts");
  const nextFaithfulStep = readString(record, "nextFaithfulStep");
  const metanoiaQuestion = readString(record, "metanoiaQuestion") || readString(record, "metanoiaPrompt");
  const storyInteraction = readString(record, "storyInteraction") ||
    `The ${roomById[primary].name} Story may be most visible right now, while the ${roomById[secondary].name} and ${roomById[third].name} Stories may shape how it is expressed in different relationships or seasons.`;
  if (!whyThisMayFit || !whatJesusDisrupts || !metanoiaQuestion || !nextFaithfulStep) return null;
  return { whyThisMayFit, storyInteraction, whatJesusDisrupts, metanoiaQuestion, nextFaithfulStep };
}

export function fallbackAiResult(primary: RoomId, secondary: RoomId, third: RoomId): AiResult {
  const room = roomById[primary];
  return {
    whyThisMayFit: `Your responses suggest that the ${room.name} Story may be worth noticing in this season. This is a tentative invitation to reflection, not a fixed description of who you are.`,
    storyInteraction: `The ${room.name} Story may be most visible right now, while the ${roomById[secondary].name} and ${roomById[third].name} Stories may shape how it is expressed in different relationships or seasons.`,
    whatJesusDisrupts: `${room.parables} opens another way of seeing: ${room.trueStory}`,
    metanoiaQuestion: room.prompt,
    nextFaithfulStep: room.nextSteps[0]
  };
}
