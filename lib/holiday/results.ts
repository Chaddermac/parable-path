import type { ResultIconName } from "../parablepath/popular/results";
import type { Pattern } from "./scoring";
export type HolidayResult = {
  name: string; calling: string; icon: ResultIconName; line: string; description: string;
  shadowPatterns: [string, string, string]; gifts: [string, string, string]; challenge: string;
};
export const holidayResults: Record<Pattern, HolidayResult> = {
  "lost": {
    "name": "The Holiday Host",
    "calling": "Table-Maker",
    "icon": "table",
    "line": "There’s always room for one more.",
    "description": "You can find room for three more chairs at a table designed for six. But when someone forgets to ask what you want for Christmas, you start wondering whether you're even on the guest list.",
    "challenge": "Invite someone who might feel left out to share a meal—and let yourself enjoy being there, too.",
    "shadowPatterns": [
      "You notice when someone gets left out—and you feel it when it's you.",
      "An unanswered family group text can leave you wondering where you stand.",
      "You sometimes work so hard to make others feel welcome that you forget you belong, too."
    ],
    "gifts": [
      "You have an instinct for noticing who's missing from the table.",
      "You can turn an ordinary gathering into a place where people feel known.",
      "Your gift isn't hosting a perfect Christmas. It's helping people discover they have a place."
    ]
  },
  "scarcity": {
    "name": "The Generous Giver",
    "calling": "Multiplier",
    "icon": "multiplier",
    "line": "Make a little kindness go a long way.",
    "description": "You know the gift budget, the price of the main dish, and exactly who got the fancy wrapping paper. You're pretty sure Christmas isn't supposed to be a competition, but someone forgot to tell the family gift exchange.",
    "challenge": "Give someone an hour of your undivided attention, without keeping score.",
    "shadowPatterns": [
      "You sometimes compare what you've given with what others are giving.",
      "Unexpected holiday expenses can make generosity feel stressful rather than joyful.",
      "When someone gives you something extravagant, you immediately wonder how to return the favor."
    ],
    "gifts": [
      "You understand that thoughtful generosity matters more than an impressive price tag.",
      "You can help others discover abundance in time, creativity, kindness, and shared experiences.",
      "Your gift is recognizing that generosity isn't a competition—and helping others experience the freedom of giving."
    ]
  },
  "control": {
    "name": "The Peace Restorer",
    "calling": "Healer",
    "icon": "healer",
    "line": "Make room for grace, not perfection.",
    "description": "All you want is a peaceful Christmas. Preferably one where everyone arrives on time, follows the plan, and avoids bringing up Thanksgiving 2019. You're discovering that peace and getting your way are not always the same thing.",
    "challenge": "Let go of one small expectation this Christmas. Choose connection over correction.",
    "shadowPatterns": [
      "When family plans change unexpectedly, you can feel responsible for putting everything back together.",
      "Old disagreements have a way of returning to your mind before the relatives even arrive.",
      "You sometimes believe that if everyone would just do things correctly, the holidays would finally be peaceful."
    ],
    "gifts": [
      "You can become someone who makes room for grace when things don't go as planned.",
      "You understand that healing often begins when people are heard rather than corrected.",
      "Your gift is helping relationships move toward mercy, honesty, and repair—not demanding a perfect family Christmas."
    ]
  },
  "stalled": {
    "name": "The Encourager",
    "calling": "Mentor",
    "icon": "mentor",
    "line": "A small, imperfect step can be a gift.",
    "description": "You've researched the perfect gift, watched six decorating tutorials, and planned a Christmas activity everyone will love. There's just one small problem: you're still getting ready to begin.",
    "challenge": "Do one holiday activity you've been overthinking. Make it good enough—and enjoy it.",
    "shadowPatterns": [
      "You can turn a simple gift purchase into a major research project.",
      "You sometimes hesitate to invite people over because the house isn't quite ready.",
      "You have good ideas for creating meaningful moments, but fear of getting them wrong can keep them from happening."
    ],
    "gifts": [
      "You understand the doubts that keep people from taking the next step.",
      "You can encourage others to begin before everything is perfect.",
      "Your gift is helping people recognize their potential and discover that meaningful things often begin imperfectly."
    ]
  },
  "boundary": {
    "name": "The Family Connector",
    "calling": "Bridger",
    "icon": "bridge",
    "line": "A little curiosity can open a door.",
    "description": "You love your family. You really do. But you've also carefully studied the seating chart to avoid certain conversations. There's a reason Christmas dinner sometimes feels like an international diplomatic summit.",
    "challenge": "Have one genuine conversation with someone you usually avoid. Ask a question, listen well, and don't try to win an argument.",
    "shadowPatterns": [
      "You know which family members are safe conversation partners and which ones require strategic seating.",
      "You sometimes avoid connecting with people whose opinions or lifestyles are different from yours.",
      "Familiar traditions and relationships can feel more comfortable than making room for someone new."
    ],
    "gifts": [
      "You can recognize that meaningful relationships don't require everyone to agree.",
      "You have the opportunity to create connections across generations, personalities, and differences.",
      "Your gift is helping people move beyond their familiar circles without ignoring healthy boundaries."
    ]
  },
  "settling": {
    "name": "The Tradition Reimaginer",
    "calling": "Innovator",
    "icon": "innovator",
    "line": "Old traditions can hold a new possibility.",
    "description": "Same decorations. Same menu. Same cousin telling the same story for the fourteenth year. You've learned exactly what to expect from Christmas—which might be why a little holiday surprise could be good for you.",
    "challenge": "Create one new tradition this Christmas—even something simple—that brings people together in a different way.",
    "shadowPatterns": [
      "You sometimes expect family gatherings to repeat the same disappointments.",
      "New holiday ideas can feel like more effort than they're worth.",
      "Keeping expectations low can seem easier than hoping this year might be different."
    ],
    "gifts": [
      "You can help people see fresh possibilities in familiar traditions.",
      "You understand that meaningful change often begins with one small idea.",
      "Your gift is inviting others to imagine that the best parts of your family's story may still be ahead."
    ]
  },
  "delay": {
    "name": "The Holiday Pathfinder",
    "calling": "WayMaker",
    "icon": "waymaker",
    "line": "The right moment can start with you.",
    "description": "Every year you promise to start Christmas shopping earlier, reach out to old friends, and finally organize that family gathering. And every year December 23 arrives with a few surprises. The road to a meaningful holiday might begin sooner than you think.",
    "challenge": "Do one meaningful thing today that you've been putting off. Make the call, send the invitation, or begin the conversation.",
    "shadowPatterns": [
      "You often intend to reconnect with someone, but the holidays pass before you do.",
      "Important conversations get pushed aside because there never seems to be a good time.",
      "You sometimes believe there will be more room for meaningful moments once the busy season is over."
    ],
    "gifts": [
      "You can help turn good intentions into meaningful action.",
      "You have the opportunity to make the first move toward connection, reconciliation, or a new tradition.",
      "Your gift is opening a path forward when everyone else is still waiting for the right moment."
    ]
  },
  "distraction": {
    "name": "The Moment Maker",
    "calling": "Awakener",
    "icon": "awakener",
    "line": "The best part might be right here.",
    "description": "You've got Christmas music playing, three group texts going, cookies in the oven, and a shopping cart full of things you forgot to buy. Somewhere in the middle of all that excitement, Christmas itself is trying to get your attention.",
    "challenge": "Choose one holiday gathering to experience without multitasking or checking your phone. Be fully present.",
    "shadowPatterns": [
      "You can be surrounded by people you love while thinking about everything you still need to do.",
      "Holiday activities sometimes become a checklist instead of experiences to enjoy.",
      "You may arrive at December 26 wondering how the entire season went by so quickly."
    ],
    "gifts": [
      "You can help others slow down and notice the moments they might otherwise miss.",
      "You understand that meaningful memories often happen in ordinary conversations and unexpected interruptions.",
      "Your gift is reminding people that presence matters more than having a perfectly packed holiday calendar."
    ]
  }
};
export const holidayDestination = "https://parablepath.app/?utm_source=parablepath.com&utm_medium=holiday_quiz&utm_campaign=holiday_edition";
