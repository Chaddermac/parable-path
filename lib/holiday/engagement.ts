import { formationResultByRoom } from "../parablepath/popular/results.ts";
import { holidayResults } from "./results.ts";
import type { Pattern } from "./scoring";

type Engagement = {
  slug: string; recognition: string; movie: string; movieCopy: string;
  watch: string; lean: string; tryThis: string; holidayVersion: string;
  invitation: string; conversion: string; parableQuestion: string;
  days: readonly [string, string, string, string, string];
};
// Editorial illustrations, never replacement typologies. Character references are text-only.
export const holidayEngagement: Record<Pattern, Engagement> = {
  lost: {
    slug: "table-maker", recognition: "You saved everyone a seat. You may still be wondering whether someone saved one for you.",
    movie: "Buddy the Elf", movieCopy: "You may wonder where you fit, but you also have a gift for making other people feel like they belong.",
    watch: "Making room for everyone else while quietly wondering whether anyone noticed you.",
    lean: "Your ability to make people feel genuinely wanted.", tryThis: "Let someone host you. Accept help, receive an invitation, or tell someone what you actually need.",
    holidayVersion: "You can create a welcoming gathering while quietly wondering whether you belong in it.",
    invitation: "Receive welcome, then extend it. A Table-Maker helps people discover there is room for them, too.",
    conversion: "The ache of belonging may show up beyond the guest list. Explore receiving welcome as well as creating it.",
    parableQuestion: "Jesus’ stories in Luke 15 invite us to notice who is sought, found, and welcomed home.",
    days: ["Accept one small offer of help.", "Tell a trusted person one thing you need this season.", "Read the Lost Sheep in Luke 15:1–7 slowly.", "Invite someone into an ordinary moment, not a perfect event.", "Ask: Where did I receive belonging rather than earn it?"],
  },
  scarcity: {
    slug: "multiplier", recognition: "You know the gift budget by heart. Christmas doesn’t have to come with a scoreboard.",
    movie: "Scrooge After the Ghosts", movieCopy: "Christmas gets better when what you have stops being something to protect and becomes something you can share.",
    watch: "Comparing what you gave, what they gave, and whether everything feels fair.", lean: "Your ability to turn what you have into something that blesses others.", tryThis: "Give someone an hour of your attention without keeping score.",
    holidayVersion: "Gift-giving can turn into a mental spreadsheet of who owes whom.", invitation: "Practice generosity within your real limits. A Multiplier turns received gifts into blessing for others.",
    conversion: "Holiday budgets may reveal a wider story about enough, comparison, and generosity. Explore abundance without ignoring your limits.",
    parableQuestion: "The Rich Fool and the Laborers ask whether life is secured by what we accumulate—or received as gift.",
    days: ["Name three gifts you have already received.", "Share encouragement that costs nothing.", "Read the Rich Fool in Luke 12:13–21 slowly.", "Offer someone ten undivided minutes without expecting repayment.", "Ask: What could become a blessing instead of a comparison?"],
  },
  control: {
    slug: "healer", recognition: "You just want everyone to enjoy Christmas. Preferably correctly.", movie: "The Grinch, Heart Three Sizes Larger",
    movieCopy: "You know how quickly frustration can take over a room. Your deeper gift is helping grace become bigger than the grievance.",
    watch: "Believing that everyone behaving correctly is the same thing as peace.", lean: "Your capacity to tell the truth while making room for grace.", tryThis: "Release one small holiday expectation and choose connection over correction.",
    holidayVersion: "A peaceful Christmas can start to mean everyone following your plan.", invitation: "Make room for mercy and healthy repair. A Healer participates in restoration without controlling the outcome.",
    conversion: "Holiday tension may reveal a deeper relationship with control, expectations, resentment, and repair.",
    parableQuestion: "The Unforgiving Servant asks what happens when received mercy stops at our own front door.",
    days: ["Name one small expectation you can release.", "Listen to someone without correcting the details.", "Read the Unforgiving Servant in Matthew 18:21–35 slowly.", "Offer an honest apology where it is safe and appropriate.", "Ask: Where could mercy make room for repair, with healthy boundaries?"],
  },
  stalled: {
    slug: "mentor", recognition: "Six decorating tutorials later, the meaningful moment may still be waiting for you to begin.", movie: "Charlie Brown",
    movieCopy: "You may spend more time questioning whether you have it right than most people realize. That makes you unusually good at encouraging imperfect beginnings.",
    watch: "Preparing so long that meaningful moments never actually begin.", lean: "Your ability to help yourself and others take imperfect first steps.", tryThis: "Do one holiday activity before it feels completely ready.",
    holidayVersion: "The perfect plan can keep a simple invitation permanently in draft mode.", invitation: "Begin with what you have. A Mentor helps people take a next faithful step before everything is clear.",
    conversion: "Waiting to feel ready may be a familiar story outside Christmas, too. Explore the courage of small beginnings.",
    parableQuestion: "The Talents invites us to notice what we bury while waiting to feel ready to participate.",
    days: ["Choose one small holiday idea you have postponed.", "Give it a ten-minute imperfect beginning.", "Read the Talents in Matthew 25:14–30 slowly.", "Encourage someone else’s first step without fixing it.", "Ask: What moved when I stopped waiting for perfect?"],
  },
  boundary: {
    slug: "bridger", recognition: "You love your family. You also have a very strategic seating plan.", movie: "Rudolph",
    movieCopy: "The thing that makes someone feel outside the circle may be exactly what the community needs.",
    watch: "Staying only with the people who already feel safe and familiar.", lean: "Your ability to create connection across difference.", tryThis: "Have one genuine conversation with someone outside your usual circle. Keep healthy boundaries.",
    holidayVersion: "You may sort the room into easy conversations and people to avoid.", invitation: "Let curiosity cross a familiar line. A Bridger creates pathways of neighbor-love without requiring everyone to agree.",
    conversion: "The holiday seating chart may hint at how you draw your circle all year. Explore connection across difference, without abandoning safety.",
    parableQuestion: "The Good Samaritan turns a question about who counts as a neighbor into an invitation to become one.",
    days: ["Notice one label you use for someone who feels different.", "Ask a curious question instead of making an assumption.", "Read the Good Samaritan in Luke 10:25–37 slowly.", "Share a small kindness across a familiar social line.", "Ask: Whose story did I hear more clearly this week?"],
  },
  settling: {
    slug: "innovator", recognition: "Same menu. Same stories. Maybe this year has room for one small surprise.", movie: "Jack Skellington",
    movieCopy: "You see possibilities other people miss. The trick is learning which possibilities are worth bringing to life. Preferably with fewer disastrous experiments.",
    watch: "Assuming this Christmas will be exactly like every other Christmas.", lean: "Your ability to see possibility inside familiar traditions.", tryThis: "Create one small new tradition.",
    holidayVersion: "Expecting the same disappointments can make new possibilities hard to notice.", invitation: "Make room for a small possibility. An Innovator helps people imagine more than the arrangement they have settled for.",
    conversion: "Holiday repetition may reflect a wider story about what can still change. Explore a hopeful possibility without needing a grand reinvention.",
    parableQuestion: "Mustard seed and hidden treasure suggest that surprising possibility can begin small and close to home.",
    days: ["Name one tradition you love and one you have quietly outgrown.", "Imagine a small alternative with someone, not just for them.", "Read the Mustard Seed in Matthew 13:31–32 slowly.", "Try one low-cost experiment that brings people together.", "Ask: Where did possibility surprise me?"],
  },
  delay: {
    slug: "waymaker", recognition: "Every year you say, ‘We should do that.’ December 23 would like a word.", movie: "George Bailey",
    movieCopy: "You notice what needs to happen, then start building a way forward for the people around you.",
    watch: "Letting meaningful intentions become ‘something I’ll do later.’", lean: "Your ability to turn a good intention into an actual path forward.", tryThis: "Make one call, send one invitation, or begin one conversation today.",
    holidayVersion: "You can care deeply about reconnecting and still leave the invitation unsent.", invitation: "Let today’s yes open a path. A WayMaker helps good intentions become faithful action.",
    conversion: "‘Later’ may be shaping more than your Christmas plans. Explore one timely response that could open a path for others.",
    parableQuestion: "The Two Sons asks about the difference between saying yes and actually responding.",
    days: ["Name one meaningful thing you keep postponing.", "Send the message or make a safe, simple first move.", "Read the Two Sons in Matthew 21:28–32 slowly.", "Help someone remove one practical obstacle to their next step.", "Ask: What path did a small yes open this week?"],
  },
  distraction: {
    slug: "awakener", recognition: "Christmas is happening all around you. Your biggest challenge may be actually being there for it.", movie: "Linus",
    movieCopy: "While everyone else is spinning, you have the ability to stop the room and remember what actually matters.",
    watch: "Being so busy creating Christmas that you miss Christmas.", lean: "Your ability to help yourself and others become fully present.", tryThis: "Choose one holiday gathering to experience without your phone.",
    holidayVersion: "You can be surrounded by Christmas while mentally living three tasks ahead.", invitation: "Become an Awakener—someone who notices what matters and helps others notice it too.",
    conversion: "Your Holiday Edition result suggests that attention may be one of the stories shaping your life.",
    parableQuestion: "Jesus’ Parable of the Sower asks a surprisingly modern question: what keeps the most important things from taking root?",
    days: ["Eat one meal without your phone.", "Notice one person who seems overlooked.", "Read the Sower in Luke 8:4–15 slowly.", "Give someone ten uninterrupted minutes.", "Ask: What did I almost miss this week?"],
  },
};
export function holidayStoryBridge(pattern: Pattern) {
  return { ...holidayEngagement[pattern], falseStory: formationResultByRoom[pattern].falseStory };
}
export function holidayAppLink(pattern?: Pattern, placement: "result" | "challenge" | "parable" = "result") {
  const slug = pattern ? holidayEngagement[pattern].slug : undefined;
  const url = new URL(slug ? `/story-types/${slug}` : "/story-types", "https://www.parablepath.app");
  url.search = new URLSearchParams({ source: "holiday", utm_source: "parablepath.com", utm_medium: "holiday_quiz", utm_campaign: "holiday_edition", utm_content: slug || "no-match", placement, ...(pattern ? { holiday_result: pattern, holiday_calling: slug! } : {}) }).toString();
  return url.href;
}
export function holidayConversionTitle(pattern: Pattern) { return `Your Holiday Story Points Toward the ${holidayResults[pattern].calling}`; }
