import type { PopularQuestion } from "./types";

export const POPULAR_ASSESSMENT_VERSION = "popular-v1";

// PLACEHOLDER QUESTION BANK: these prompts verify the popular experience,
// routing, and state flow. Replace them before treating popular-v1 as validated.
export const popularQuestions: PopularQuestion[] = [
  {
    id: "popular_placeholder_01",
    prompt: "The group chat goes quiet. Your brain immediately writes…",
    options: [
      { label: "A twelve-part documentary about whether everyone secretly dislikes me.", room: "lost" },
      { label: "A project plan for getting this conversation back on track.", room: "control" },
      { label: "Nothing. I opened three other apps before finishing this sentence.", room: "distraction" }
    ]
  },
  {
    id: "popular_placeholder_02",
    prompt: "A free afternoon appears on your calendar. You…",
    options: [
      { label: "Protect it like the last available parking space on earth.", room: "scarcity" },
      { label: "Make a beautiful plan, then wait until you feel more ready.", room: "stalled" },
      { label: "Assume this is probably as exciting as life gets now.", room: "settling" }
    ]
  },
  {
    id: "popular_placeholder_03",
    prompt: "Someone unexpected needs a seat at the table. Your first instinct is…",
    options: [
      { label: "Who invited them—and do they know how we do things here?", room: "boundary" },
      { label: "Absolutely. I will deal with the details tomorrow.", room: "delay" },
      { label: "Add a chair, then quietly wonder whether I still belong at the table.", room: "lost" }
    ]
  }
];
