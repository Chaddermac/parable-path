import type { PopularQuestion } from "./types";

export const POPULAR_ASSESSMENT_VERSION = "popular-v1";

export const popularQuestions: PopularQuestion[] = [
  { id: "popular_01", round: "Everyday You", prompt: "You suddenly get an entire Saturday with absolutely nothing scheduled. What happens?", options: [
    { label: "Within ten minutes I have accidentally created a schedule for my unscheduled day.", scores: { control: 2, distraction: 1 } },
    { label: "Amazing. I can finally start the thing I have been meaning to start for six months. I probably won't, but the possibility is exciting.", scores: { delay: 2, stalled: 1 } },
    { label: "I start thinking about all the things I could do and somehow spend two hours deciding.", scores: { distraction: 2, lost: 1 } },
    { label: "Honestly? I want everyone to leave me alone for a while.", scores: { boundary: 2 } },
    { label: "I do basically what I always do. Why mess with a perfectly decent Saturday?", scores: { settling: 2 } }
  ] },
  { id: "popular_02", round: "Everyday You", prompt: "You're leaving for vacation. Which version of you shows up?", options: [
    { label: "I have the itinerary, confirmations, weather forecast, backup route, and emergency snacks.", scores: { control: 2, scarcity: 1 } },
    { label: "I packed at 11:47 p.m. and remain confident that stores exist where we are going.", scores: { delay: 2, distraction: 1 } },
    { label: "I've researched seventeen restaurants and now choosing one feels impossible.", scores: { distraction: 2 } },
    { label: "I mainly need to know who is coming, because that determines whether this is actually a vacation.", scores: { boundary: 2 } },
    { label: "I mostly hope the trip feels like something meaningful instead of just another thing we did.", scores: { lost: 2 } }
  ] },
  { id: "popular_03", round: "Everyday You", prompt: "Your phone battery hits 8%. Your reaction?", options: [
    { label: "How did I allow things to deteriorate this far?", scores: { control: 2 } },
    { label: "Eight percent is basically 30 minutes. Probably.", scores: { scarcity: 2, delay: 1 } },
    { label: "I immediately close apps, dim the screen, and begin rationing battery like we're crossing the Oregon Trail.", scores: { scarcity: 2, control: 1 } },
    { label: "Maybe this is the universe telling me to stop looking at my phone. I ignore this insight.", scores: { distraction: 2 } },
    { label: "I don't really care unless someone I actually want to talk to is trying to reach me.", scores: { boundary: 2 } }
  ] },
  { id: "popular_04", round: "Everyday You", prompt: "Someone asks, “So what’s next for you?”", options: [
    { label: "Great question. I would also like to know.", scores: { lost: 2 } }, { label: "I have a plan. Would you like the short version or the spreadsheet?", scores: { control: 2 } },
    { label: "I know what I should do next. The issue is apparently starting.", scores: { delay: 2 } }, { label: "Honestly, things are fine. I’m not sure I need a “next.”", scores: { settling: 2 } },
    { label: "I have approximately nine possible next things and all of them sound interesting.", scores: { distraction: 2 } }
  ] },
  { id: "popular_05", round: "Everyday You", prompt: "Which sentence has the best chance of coming out of your mouth?", options: [
    { label: "“It’ll be easier if I just do it.”", scores: { control: 2 } }, { label: "“I’ll get to it.”", scores: { delay: 2 } }, { label: "“We don’t need to make this a whole thing.”", scores: { settling: 2 } },
    { label: "“I just don’t know what I’m supposed to be doing right now.”", scores: { lost: 2 } }, { label: "“Wait. That reminds me of something…”", scores: { distraction: 2 } }
  ] },
  { id: "popular_06", round: "Everyday You", prompt: "You open your refrigerator and realize you're almost out of something you use constantly.", options: [
    { label: "Almost out? I bought a backup last week.", scores: { control: 2, scarcity: 1 } }, { label: "I immediately wonder whether I should buy three of them while I'm at the store.", scores: { scarcity: 2 } },
    { label: "I'll remember next time I'm out. Narrator: I will not remember.", scores: { delay: 2 } }, { label: "I somehow return from the store with six unrelated things and not the thing I needed.", scores: { distraction: 2 } },
    { label: "Whatever. I'll make something else work.", scores: { settling: 2 } }
  ] },
  { id: "popular_07", round: "Under Pressure", prompt: "The plan changes at the last minute. Internally, you are thinking:", options: [
    { label: "Fine. Totally fine. Why would anyone need a plan anyway? Civilization is overrated.", scores: { control: 2 } }, { label: "Honestly, I’m relieved. I wasn't completely sure I wanted to do it.", scores: { delay: 2 } },
    { label: "Depends. Who changed it and why?", scores: { boundary: 2 } }, { label: "Great. Maybe the new plan will be more interesting.", scores: { distraction: 2 } },
    { label: "This is why I try not to get too invested in plans anymore.", scores: { stalled: 2 } }
  ] },
  { id: "popular_08", round: "Under Pressure", prompt: "You receive the text: “Can we talk?” What does your brain do first?", options: [
    { label: "Replays every interaction from the last six months.", scores: { control: 2, boundary: 1 } }, { label: "Decides I probably did something wrong.", scores: { lost: 2 } },
    { label: "Wonders who told them what.", scores: { boundary: 2 } }, { label: "Avoids opening the message for a suspiciously long time.", scores: { delay: 2 } },
    { label: "Opens Instagram for “one second” and forgets the text exists.", scores: { distraction: 2 } }
  ] },
  { id: "popular_09", round: "Under Pressure", prompt: "Something important goes badly. Your first instinct is closest to:", options: [
    { label: "Fix it. Immediately. Preferably before anyone notices.", scores: { control: 2 } }, { label: "Pull back and figure out who I can actually trust here.", scores: { boundary: 2 } },
    { label: "Tell myself I should have seen this coming.", scores: { scarcity: 2, lost: 1 } }, { label: "Wonder whether this proves I’m never really going anywhere.", scores: { stalled: 2 } },
    { label: "Distract myself until my nervous system agrees not to discuss it.", scores: { distraction: 2 } }
  ] },
  { id: "popular_10", round: "Under Pressure", prompt: "When you're overwhelmed, your home or workspace is most likely to become:", options: [
    { label: "Weirdly organized. Control something, anything.", scores: { control: 2 } }, { label: "A museum of projects I fully intend to finish.", scores: { delay: 2, stalled: 1 } },
    { label: "Covered in evidence of seventeen simultaneous interests.", scores: { distraction: 2 } }, { label: "Exactly the same as always. I don't have the energy to rethink my life right now.", scores: { settling: 2 } },
    { label: "A bunker. Please knock before entering. Actually, don't knock.", scores: { boundary: 2 } }
  ] },
  { id: "popular_11", round: "Under Pressure", prompt: "You realize you made a mistake that affected other people.", options: [
    { label: "I immediately start figuring out how to repair everything.", scores: { control: 2 } }, { label: "I keep thinking about whether this changes how they see me.", scores: { lost: 2, boundary: 1 } },
    { label: "I want to explain the twelve contextual factors that technically contributed.", scores: { boundary: 2, control: 1 } }, { label: "I promise myself I’ll deal with it once things calm down.", scores: { delay: 2 } },
    { label: "I start wondering whether I should have been doing something completely different with my life anyway.", scores: { stalled: 2, lost: 1 } }
  ] },
  { id: "popular_12", round: "Under Pressure", prompt: "Life suddenly gets uncertain. Which thought gets loudest?", options: [
    { label: "“What do I need to do to keep this from getting worse?”", scores: { control: 2 } }, { label: "“What if there isn't enough—money, time, opportunity, energy—to get through this?”", scores: { scarcity: 2 } },
    { label: "“Who is actually with me?”", scores: { boundary: 2 } }, { label: "“What if nothing ever really changes?”", scores: { stalled: 2 } }, { label: "“Maybe I should just wait until I know more.”", scores: { delay: 2 } }
  ] },
  { id: "popular_13", round: "With Other People", prompt: "You're assigned a group project. Within five minutes:", options: [
    { label: "I have accidentally become the project manager.", scores: { control: 2 } }, { label: "I am quietly assessing who will actually do their part.", scores: { boundary: 2 } },
    { label: "I have several exciting ideas that may or may not relate to the assignment.", scores: { distraction: 2 } }, { label: "I’m happy to help. Just tell me what we're doing.", scores: { lost: 2 } },
    { label: "I assume somebody will eventually tell us when this is actually due.", scores: { delay: 2 } }
  ] },
  { id: "popular_14", round: "With Other People", prompt: "A friend keeps making the same bad decision. You are most tempted to:", options: [
    { label: "Explain, for the fifth time, exactly what they need to do.", scores: { control: 2 } }, { label: "Start creating some distance. I cannot keep doing this.", scores: { boundary: 2 } },
    { label: "Stop expecting them to change. This is just who they are.", scores: { settling: 2 } }, { label: "Worry that if I say what I really think, I'll lose the relationship.", scores: { lost: 2 } },
    { label: "Have a profound conversation and then somehow never follow up.", scores: { distraction: 2, delay: 1 } }
  ] },
  { id: "popular_15", round: "With Other People", prompt: "Someone new enters your social circle. Your internal system does this:", options: [
    { label: "Welcome! Let's find out everything about you immediately.", scores: { distraction: 2 } }, { label: "Welcome! But I will need approximately six months of observational data.", scores: { boundary: 2 } },
    { label: "I hope they like me.", scores: { lost: 2 } }, { label: "Fine by me, as long as this doesn't change the whole group dynamic.", scores: { settling: 2 } },
    { label: "I am already thinking about how to help them get connected.", scores: { control: 2 } }
  ] },
  { id: "popular_16", round: "With Other People", prompt: "When conflict starts getting uncomfortable, you tend to:", options: [
    { label: "Take over the conversation and try to solve it.", scores: { control: 2 } }, { label: "Pull back until I know whether the relationship is safe.", scores: { boundary: 2 } },
    { label: "Say “it’s fine” and genuinely hope that eventually makes it true.", scores: { settling: 2 } }, { label: "Put off the conversation until there is absolutely no alternative.", scores: { delay: 2 } },
    { label: "Wonder whether the whole conflict means I don't belong here.", scores: { lost: 2 } }
  ] },
  { id: "popular_17", round: "With Other People", prompt: "Your group chat has 47 unread messages. What now?", options: [
    { label: "Read every single one because context matters.", scores: { control: 2 } }, { label: "Scan for my name and any evidence of drama.", scores: { boundary: 2 } },
    { label: "Send a meme without reading anything and hope it fits.", scores: { distraction: 2 } }, { label: "Leave it unread until the number becomes emotionally meaningless.", scores: { delay: 2 } },
    { label: "Honestly, I muted that chat three months ago.", scores: { settling: 2 } }
  ] },
  { id: "popular_18", round: "With Other People", prompt: "Someone you care about gets an opportunity you've wanted for yourself. Your most honest first reaction?", options: [
    { label: "I’m happy for them—and immediately start wondering what I'm doing wrong.", scores: { lost: 2 } }, { label: "I start calculating whether I'm falling behind.", scores: { scarcity: 2 } },
    { label: "I tell myself maybe that opportunity wasn't actually that great anyway.", scores: { settling: 2 } }, { label: "I start figuring out what steps I need to take to make something happen.", scores: { control: 2 } },
    { label: "Their opportunity reminds me of three completely different things I might want to pursue.", scores: { distraction: 2 } }
  ] },
  { id: "popular_19", round: "What You Really Want", prompt: "If life could magically give you one thing right now, which sounds most appealing?", options: [
    { label: "A clear sense of where I'm going.", scores: { lost: 2 } }, { label: "The ability to finally move forward.", scores: { stalled: 2 } }, { label: "Enough margin that I could stop worrying about what might run out.", scores: { scarcity: 2 } },
    { label: "Permission to stop managing everything.", scores: { control: 2 } }, { label: "Enough focus to finish what matters.", scores: { distraction: 2 } }
  ] },
  { id: "popular_20", round: "What You Really Want", prompt: "Which fear feels just a little too familiar?", options: [
    { label: "“What if I choose wrong?”", scores: { lost: 2 } }, { label: "“What if I never really get moving?”", scores: { stalled: 2 } }, { label: "“What if I don't have enough?”", scores: { scarcity: 2 } },
    { label: "“What if I let go and everything falls apart?”", scores: { control: 2 } }, { label: "“What if I let people too close and regret it?”", scores: { boundary: 2 } }
  ] },
  { id: "popular_21", round: "What You Really Want", prompt: "Which version of “someday” sounds most like you?", options: [
    { label: "Someday I'll finally start.", scores: { delay: 2 } }, { label: "Someday things will change.", scores: { stalled: 2 } }, { label: "Someday I'll figure out what I actually want.", scores: { lost: 2 } },
    { label: "Someday I'll have enough time, money, or margin to relax.", scores: { scarcity: 2 } }, { label: "Someday I'll simplify things. Right after these seventeen other things.", scores: { distraction: 2 } }
  ] },
  { id: "popular_22", round: "What You Really Want", prompt: "Which compliment would secretly mean the most to you?", options: [
    { label: "“You always know what to do.”", scores: { control: 2 } }, { label: "“You really belong here.”", scores: { lost: 2 } }, { label: "“You make people feel safe.”", scores: { boundary: 2 } },
    { label: "“You actually made it happen.”", scores: { stalled: 2, delay: 1 } }, { label: "“You see possibilities other people miss.”", scores: { distraction: 2 } }
  ] },
  { id: "popular_23", round: "What You Really Want", prompt: "Imagine nothing significant changes in your life for the next five years. Your reaction?", options: [
    { label: "Absolutely not. We need a plan immediately.", scores: { control: 2 } }, { label: "That sounds disturbingly plausible.", scores: { stalled: 2 } }, { label: "Honestly? If things stay reasonably good, maybe that's okay.", scores: { settling: 2 } },
    { label: "I suddenly want to sign up for six things and move to Portugal.", scores: { distraction: 2 } }, { label: "My bigger fear is that I’ll miss the window and opportunities will disappear.", scores: { scarcity: 2 } }
  ] },
  { id: "popular_24", round: "What You Really Want", prompt: "Pick the sentence that feels most like an uncomfortable truth.", options: [
    { label: "Sometimes I spend so much energy keeping things together that I forget I don't control everything.", scores: { control: 2 } }, { label: "Sometimes protecting myself keeps me from the people I actually need.", scores: { boundary: 2 } },
    { label: "Sometimes waiting feels safer than beginning.", scores: { delay: 2 } }, { label: "Sometimes “good enough” is another way of avoiding what could change.", scores: { settling: 2 } },
    { label: "Sometimes I stay so busy, curious, or distracted that I don't have to decide what matters most.", scores: { distraction: 2 } }
  ] }
];
