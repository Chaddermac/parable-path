import { roomById } from "./content.ts";
import { formationResultByRoom } from "./parablepath/popular/results.ts";
import type { RoomId } from "./types";
export { appUrl } from "./site-links.ts";
export const storyLinks = [
  { room: "lost", slug: "table-maker", label: "Table-Maker", field: "#b4bda5", crop: [483, 160, 92] },
  { room: "boundary", slug: "bridger", label: "Bridger", field: "#acc0c1", crop: [1010, 230, 104] },
  { room: "control", slug: "healer", label: "Healer", field: "#a5b3d0", crop: [1082, 512, 103] },
  { room: "stalled", slug: "mentor", label: "Mentor", field: "#a4a5b9", crop: [1034, 800, 103] },
  { room: "settling", slug: "innovator", label: "Innovator", field: "#afa5bb", crop: [432, 987, 77] },
  { room: "scarcity", slug: "multiplier", label: "Multiplier", field: "#cfa4a4", crop: [113, 800, 104] },
  { room: "delay", slug: "waymaker", label: "Waymaker", field: "#e4b59f", crop: [68, 512, 104] },
  { room: "distraction", slug: "awakener", label: "Awakener", field: "#ecd0a3", crop: [138, 232, 100] },
] as const;
export function websiteStory(room: RoomId) { return storyLinks.find((story) => story.room === room)!; }
export function storyFromSlug(slug: string) { return storyLinks.find((story) => story.slug === slug); }
export const movements = [
  { title: "Read", description: "Explore the stories of Jesus. Notice the people, tensions, and questions inside a parable." },
  { title: "Recognize", description: "Notice the stories shaping how you interpret and respond to life." },
  { title: "Rewrite", description: "Name the story you are learning to live through Jesus." },
  { title: "Practice", description: "Take small faithful steps that help the new story become lived reality." },
] as const;
export const storyPath = [
  ["S", "See the Story", "Notice the story you may be living."],
  ["T", "Trace the Story", "Name its promises, fears, assumptions, and patterns."],
  ["O", "Open the Parable", "Let the stories of Jesus disrupt the story you have been living."],
  ["R", "Reorient the Imagination", "Receive a new way of seeing what is possible through Jesus."],
  ["Y", "Yes to the Next Faithful Step", "Practice the new story in ordinary life."],
] as const;
export const publicStories = storyLinks.map((story) => ({ ...story, profile: formationResultByRoom[story.room], roomData: roomById[story.room] }));
