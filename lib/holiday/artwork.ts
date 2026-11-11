import type { Pattern } from "./scoring";
// Original artwork bundle colors and symbols; no newly drawn typology icons.
export const holidayArtwork: Record<Pattern, { id: string; color: string; calling: string }> = {
  lost: { id: "table-maker", color: "#2F7C1D", calling: "Table-Maker" },
  boundary: { id: "bridger", color: "#047178", calling: "Bridger" },
  control: { id: "healer", color: "#015CC8", calling: "Healer" },
  stalled: { id: "mentor", color: "#013885", calling: "Mentor/Coach" },
  settling: { id: "innovator", color: "#49227E", calling: "Innovator" },
  scarcity: { id: "multiplier", color: "#9D0524", calling: "Multiplier" },
  delay: { id: "waymaker", color: "#E94902", calling: "WayMaker" },
  distraction: { id: "awakener", color: "#E89101", calling: "Awakener" }
};
export const showcaseOrder: Pattern[] = ["lost", "boundary", "control", "stalled", "settling", "scarcity", "delay", "distraction"];
