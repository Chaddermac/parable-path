import type { RoomId } from "../../types.ts";

export type ResultIconName = "table" | "bridge" | "healer" | "mentor" | "innovator" | "multiplier" | "waymaker" | "awakener";
export type TypologyProfile = { id: RoomId; storyName: string; callingName: string; accent: string; accentSoft: string; icon: ResultIconName; callingDescription: string; falseStory: string; shadowName: string; shadowDescription: string; practices: readonly [string, string, string]; parableReferences: string; nextSteps: readonly [string, string, string] };
export const storyInvitation = "See the room • Trace the story • Open the parable • Reorient the imagination • Yes to the next faithful step";

export const popularResultByRoom: Record<RoomId, TypologyProfile> = {
  lost: {
    id: "lost", storyName: "Lost", callingName: "Table-Maker", accent: "#397425", accentSoft: "#edf3e8", icon: "table",
    callingDescription: "A Table-Maker helps create opportunities for belonging for other people. Table-Makers know what it feels like not to belong. They channel those experiences into helping other people find the welcome they are looking for. In God’s story, Table-Makers notice the overlooked, make room, and turn strangers into neighbors.",
    falseStory: "I don’t belong.", shadowName: "Drifter", shadowDescription: "A Drifter is someone who doesn’t quite connect with another person or group, often out of fear of not being accepted or because of hurt in the past. When a Drifter joins a group, they may not stay long. They often find excuses not to attend or communicate and may quietly decide the group did not fit their needs.",
    practices: ["Initiate one invitation this week.", "Stay present when belonging feels risky instead of pulling away.", "Tell one trusted person where connection feels difficult for you."], parableReferences: "Luke 15 — Lost Sheep, Lost Coin, Lost Sons", nextSteps: ["Join one group or circle for four weeks before deciding if it fits.", "Reach out to one person who may be on the margins.", "Practice naming one reason you belong in God’s story."]
  },
  boundary: {
    id: "boundary", storyName: "Boundary", callingName: "Bridger", accent: "#008ba0", accentSoft: "#e5f3f2", icon: "bridge",
    callingDescription: "A Bridger connects across divides. Bridgers know how quickly people sort one another into insiders and outsiders. They channel those tensions into helping people cross lines of fear, suspicion, and separation. In God’s story, Bridgers create pathways of mercy, understanding, and neighbor-love.",
    falseStory: "Those people are not my people.", shadowName: "Divider", shadowDescription: "A Divider sorts people into camps and keeps distance from those who feel different. Dividers often assume the worst, protect their own circle, and justify exclusion in the name of safety, purity, or common sense. They may speak about people before they speak to them.",
    practices: ["Start one conversation with someone outside your usual circle.", "Ask a curious question before making a judgment.", "Practice using names and stories instead of labels."], parableReferences: "Luke 10 — Good Samaritan", nextSteps: ["Share a meal or coffee with someone whose experience differs from yours.", "Serve beside people outside your normal social lane.", "Notice where God may be widening your definition of neighbor."]
  },
  control: {
    id: "control", storyName: "Control", callingName: "Healer", accent: "#075fc1", accentSoft: "#e6f0fa", icon: "healer",
    callingDescription: "A Healer restores what is broken. Healers know how resentment, control, and pain can damage relationships. They channel those experiences into helping people find mercy, repair, and wholeness. In God’s story, Healers mend what has been torn and help grace do its quiet work.",
    falseStory: "I must control / deserve.", shadowName: "Controller", shadowDescription: "A Controller grips tightly, manages outcomes, and struggles to release offenses or uncertainty. Controllers often keep emotional score, try to stay in charge, and resist vulnerability because it feels unsafe. They may confuse being right with being whole.",
    practices: ["Choose repair over being right in one relationship this week.", "Name one place where you are gripping too tightly.", "Practice one concrete act of mercy toward someone who has disappointed you."], parableReferences: "Matt. 18 — Unforgiving Servant", nextSteps: ["Identify one resentment that needs to be released to God.", "Apologize where you have contributed to a break in trust.", "Take one step toward reconciliation or healthy repair."]
  },
  stalled: {
    id: "stalled", storyName: "Stalled", callingName: "Mentor/Coach", accent: "#19589a", accentSoft: "#e8f0f7", icon: "mentor",
    callingDescription: "A Mentor / Coach moves people into growth. Mentors know how easy it is to live on good intentions without action. They channel that struggle into helping others take the next faithful step. In God’s story, Mentors encourage courage, nurture small beginnings, and help people keep moving.",
    falseStory: "Intentions are enough.", shadowName: "Staller", shadowDescription: "A Staller has sincere intentions and good ideas, but keeps postponing action. Stallers often wait for perfect timing, hesitate when it is time to move, and confuse wanting change with actually taking a step. They may remain stuck even while talking about growth.",
    practices: ["Take the first imperfect step instead of waiting for perfect conditions.", "Set one small deadline and share it with someone you trust.", "Encourage another person by helping them name their next step too."], parableReferences: "Matt. 25 / Mark 4 — Talents / Growing Seed", nextSteps: ["Choose one delayed goal and act on it within 48 hours.", "Ask for accountability around one growth area.", "Celebrate movement, not perfection."]
  },
  settling: {
    id: "settling", storyName: "Settling", callingName: "Innovator/Imagineer", accent: "#563091", accentSoft: "#f0eafa", icon: "innovator",
    callingDescription: "An Innovator / Imagineer reimagines what is possible. Innovators know how easy it is to settle for what is familiar or comfortable. They channel that experience into helping people notice possibility, hidden treasure, and small beginnings. In God’s story, Innovators stir holy imagination and help others see more than “good enough.”",
    falseStory: "This is as good as it gets.", shadowName: "Settler", shadowDescription: "A Settler lowers expectations, accepts limitation too quickly, and chooses comfort over possibility. Settlers often stop looking for growth, assume change will not come, and shrink their hopes to avoid disappointment. They may live smaller than God’s invitation.",
    practices: ["Name one place where you have quietly settled.", "Imagine one courageous alternative and write it down.", "Experiment with one creative step that opens new possibility."], parableReferences: "Matt. 13 — Mustard Seed / Treasure", nextSteps: ["Keep an idea journal for the next two weeks.", "Share one bold possibility with a friend, team, or small group.", "Try one new practice that stretches your imagination."]
  },
  scarcity: {
    id: "scarcity", storyName: "Scarcity", callingName: "Multiplier", accent: "#94113b", accentSoft: "#f6e9e9", icon: "multiplier",
    callingDescription: "A Multiplier stewards abundance for others. Multipliers know the fear that whispers there will never be enough. They channel that experience into generosity, encouragement, and wise stewardship. In God’s story, Multipliers open their hands, trust God’s provision, and help resources become blessing.",
    falseStory: "There’s not enough.", shadowName: "Hoarder", shadowDescription: "A Hoarder lives from fear of shortage. Hoarders hold tightly to money, time, energy, or opportunity and often assume someone else’s gain means their loss. They may protect what they have so carefully that little room remains for trust or generosity.",
    practices: ["Practice generosity first instead of waiting until you feel secure.", "Notice signs of abundance and say thank you for them.", "Share time, money, or encouragement intentionally with someone else."], parableReferences: "Luke 12 / Matt. 20 — Rich Fool / Laborers", nextSteps: ["Give something away this week as an act of trust.", "Write down three gifts you have already received.", "Bless someone else’s success without comparing it to your own."]
  },
  delay: {
    id: "delay", storyName: "Delay", callingName: "WayMaker", accent: "#e75f00", accentSoft: "#faefe3", icon: "waymaker",
    callingDescription: "A WayMaker opens a faithful path forward. WayMakers know how delay can quietly shape a life. They channel that struggle into helping people prepare, respond, and move from someday to today. In God’s story, WayMakers practice readiness and help others take timely action.",
    falseStory: "I’ll deal with it later.", shadowName: "Avoider", shadowDescription: "An Avoider postpones hard conversations, decisions, or acts of obedience. Avoiders often tell themselves there will be more time, mistake delay for wisdom, and keep deferring what they already know needs attention. They may live in perpetual later.",
    practices: ["Do the hard thing first in one area of your life this week.", "Break a delayed task into one clear next step.", "Build a simple rhythm of preparation before urgency arrives."], parableReferences: "Matt. 25 — Wise Virgins", nextSteps: ["Send the email, make the call, or have the conversation today.", "Choose one area where ‘later’ becomes ‘now.’", "Prepare one practical habit that will make faithfulness easier."]
  },
  distraction: {
    id: "distraction", storyName: "Distraction", callingName: "Awakener", accent: "#d99a00", accentSoft: "#fbf2d8", icon: "awakener",
    callingDescription: "An Awakener redirects attention to what matters. Awakeners know how noise, busyness, and lesser loves can choke what is life-giving. They channel that experience into helping people notice, wake up, and return to what matters most. In God’s story, Awakeners call people back to presence, focus, and fruitfulness.",
    falseStory: "Other things matter more right now.", shadowName: "Dabbler", shadowDescription: "A Dabbler is pulled in too many directions. Dabblers chase urgency, entertainment, or endless distraction and struggle to stay rooted in what matters most. They often begin many things, finish few of them, and live with scattered attention.",
    practices: ["Create one short daily window of silence, prayer, or reflection.", "Limit one distraction that regularly steals your attention.", "Protect one life-giving habit that helps you stay rooted."], parableReferences: "Luke 8 — Sower", nextSteps: ["Put your phone away for a daily 20-minute focus window.", "Ask what is choking growth in your life right now.", "Begin a simple Scripture or prayer rhythm this week."]
  }
};

export function isRoomId(value: string | undefined): value is RoomId { return Boolean(value && value in popularResultByRoom); }
