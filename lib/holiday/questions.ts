import type { HolidayQuestion } from "./scoring.ts";

export const holidayQuestions: HolidayQuestion[] = [
  {
    "id": 1,
    "title": "White Elephant",
    "prompt": "It's White Elephant time. Someone just opens the gift you really wanted. What's your move?",
    "answers": [
      {
        "pattern": "lost",
        "text": "I consider stealing it, but I don't want everyone thinking I'm that person."
      },
      {
        "pattern": "scarcity",
        "text": "I steal it. There are only so many good gifts in this game."
      },
      {
        "pattern": "control",
        "text": "I've studied the rules and know exactly when to make my move."
      },
      {
        "pattern": "stalled",
        "text": "I wait for the perfect opportunity. Unfortunately, someone else takes it home."
      }
    ]
  },
  {
    "id": 2,
    "title": "Company Holiday Party",
    "prompt": "You're invited to your company's holiday party. Your first thought is...",
    "answers": [
      {
        "pattern": "boundary",
        "text": "Which coworkers should I strategically avoid?"
      },
      {
        "pattern": "settling",
        "text": "Same party. Same small talk. Same cheese cubes."
      },
      {
        "pattern": "delay",
        "text": "I'll RSVP once I figure out what else is happening that weekend."
      },
      {
        "pattern": "distraction",
        "text": "Great! Food, music, photos, and 17 conversations I probably won't finish."
      }
    ]
  },
  {
    "id": 3,
    "title": "The Impossible Gift",
    "prompt": "You're shopping for someone who is impossible to buy for. You...",
    "answers": [
      {
        "pattern": "lost",
        "text": "Worry that choosing the wrong gift means you don't really understand them."
      },
      {
        "pattern": "scarcity",
        "text": "Start calculating how much you've already spent on everyone else."
      },
      {
        "pattern": "control",
        "text": "Build a research spreadsheet. There must be an objectively correct gift."
      },
      {
        "pattern": "stalled",
        "text": "Open 38 browser tabs and somehow purchase absolutely nothing."
      }
    ]
  },
  {
    "id": 4,
    "title": "The Annual Family Reunion",
    "prompt": "It's been a whole year since you've seen your extended family. You...",
    "answers": [
      {
        "pattern": "boundary",
        "text": "Check who's coming so you can prepare for the inevitable family debates."
      },
      {
        "pattern": "settling",
        "text": "Assume it will be the same stories, same arguments, and same awkward moments."
      },
      {
        "pattern": "delay",
        "text": "Plan to catch up with everyone individually... eventually."
      },
      {
        "pattern": "distraction",
        "text": "Try to talk to everyone and end up participating in six conversations at once."
      }
    ]
  },
  {
    "id": 5,
    "title": "Hosting Christmas Dinner",
    "prompt": "You're hosting Christmas dinner. What's keeping you awake the night before?",
    "answers": [
      {
        "pattern": "lost",
        "text": "What if everyone is only coming because they feel obligated?"
      },
      {
        "pattern": "scarcity",
        "text": "What if there isn't enough food? (You've prepared enough for 47 people.)"
      },
      {
        "pattern": "control",
        "text": "What if someone moves the serving dishes or changes the seating arrangement?"
      },
      {
        "pattern": "stalled",
        "text": "What if I haven't done enough to make this Christmas special?"
      }
    ]
  },
  {
    "id": 6,
    "title": "Changing Traditions",
    "prompt": "Someone suggests changing a beloved family Christmas tradition. You think...",
    "answers": [
      {
        "pattern": "boundary",
        "text": "But that's not how OUR family does Christmas."
      },
      {
        "pattern": "settling",
        "text": "We've tried new things before. They never last."
      },
      {
        "pattern": "delay",
        "text": "Interesting idea. Let's talk about it next year."
      },
      {
        "pattern": "distraction",
        "text": "Great idea! Wait, I just found three even better ideas on Instagram."
      }
    ]
  },
  {
    "id": 7,
    "title": "The Unexpected Gift",
    "prompt": "A close friend gives you another scented candle. Your first thought is...",
    "answers": [
      {
        "pattern": "lost",
        "text": "Do they even know me anymore?"
      },
      {
        "pattern": "scarcity",
        "text": "Wait, how much did I spend on their gift?"
      },
      {
        "pattern": "control",
        "text": "Smile politely. Make a mental note about next year's exchange."
      },
      {
        "pattern": "stalled",
        "text": "Should I exchange it? Regift it? Keep it? What if they ask about it?"
      }
    ]
  },
  {
    "id": 8,
    "title": "The Family Dinner Table",
    "prompt": "There's one empty seat at Christmas dinner. You...",
    "answers": [
      {
        "pattern": "boundary",
        "text": "Hope it's not beside the relative who always wants to argue."
      },
      {
        "pattern": "settling",
        "text": "Assume it will be another evening of the same old conversations."
      },
      {
        "pattern": "delay",
        "text": "Remember an important conversation you need to have, but decide tonight isn't the night."
      },
      {
        "pattern": "distraction",
        "text": "Sit down, check your phone, and miss half of what people are saying."
      }
    ]
  },
  {
    "id": 9,
    "title": "The Family Group Text",
    "prompt": "The family group chat is organizing Christmas dinner. You...",
    "answers": [
      {
        "pattern": "lost",
        "text": "Notice that several people were asked what they wanted before anyone asked you."
      },
      {
        "pattern": "scarcity",
        "text": "Wonder why you're being asked to bring the expensive main dish again."
      },
      {
        "pattern": "control",
        "text": "Quietly reorganize the entire plan into a more efficient system."
      },
      {
        "pattern": "stalled",
        "text": "Spend so much time composing the perfect response that everyone else has already signed up."
      }
    ]
  },
  {
    "id": 10,
    "title": "The Unexpected Guest",
    "prompt": "Your family announces that someone you've never met is joining Christmas dinner. You...",
    "answers": [
      {
        "pattern": "boundary",
        "text": "Wonder whether this person will fit comfortably into your family gathering."
      },
      {
        "pattern": "settling",
        "text": "Assume another person at the table probably won't change much."
      },
      {
        "pattern": "delay",
        "text": "Think about introducing yourself, but decide you'll find the right moment later."
      },
      {
        "pattern": "distraction",
        "text": "Fully intend to welcome them, then get swept up in everything else happening."
      }
    ]
  },
  {
    "id": 11,
    "title": "The Family Christmas Photo",
    "prompt": "It's time for the annual family Christmas photo. You...",
    "answers": [
      {
        "pattern": "lost",
        "text": "Quietly wonder whether everyone actually wants you in the picture."
      },
      {
        "pattern": "scarcity",
        "text": "Wonder why the matching outfits needed to cost so much."
      },
      {
        "pattern": "control",
        "text": "Begin directing everyone into the perfect arrangement."
      },
      {
        "pattern": "stalled",
        "text": "Keep suggesting another attempt because none of the pictures looks quite right."
      }
    ]
  },
  {
    "id": 12,
    "title": "Christmas Game Night",
    "prompt": "The family announces that everyone is playing games after dinner. You...",
    "answers": [
      {
        "pattern": "boundary",
        "text": "Strategically avoid being partnered with that one hypercompetitive relative."
      },
      {
        "pattern": "settling",
        "text": "Already know who will win, who will complain, and how the evening will end."
      },
      {
        "pattern": "delay",
        "text": "Promise you'll join after finishing a few things. The game ends first."
      },
      {
        "pattern": "distraction",
        "text": "Start playing, notice another game across the room, and wander over to investigate."
      }
    ]
  },
  {
    "id": 13,
    "title": "The Gift Exchange Budget",
    "prompt": "Everyone agrees to a $25 gift exchange limit. You...",
    "answers": [
      {
        "pattern": "lost",
        "text": "Worry your gift will be disappointing compared with what everyone else brings."
      },
      {
        "pattern": "scarcity",
        "text": "Start wondering whether $25 really means $25—or whether everyone else will spend more."
      },
      {
        "pattern": "control",
        "text": "Insist that someone needs to enforce the limit. Rules are rules."
      },
      {
        "pattern": "stalled",
        "text": "Search for the perfect $25 gift until the sale ends and it costs $39."
      }
    ]
  },
  {
    "id": 14,
    "title": "The Christmas Lights Outing",
    "prompt": "Someone suggests driving around to look at Christmas lights. You...",
    "answers": [
      {
        "pattern": "boundary",
        "text": "Prefer staying with people you know rather than joining the unfamiliar neighbors coming along."
      },
      {
        "pattern": "settling",
        "text": "Figure you've seen Christmas lights before. They're probably the same this year."
      },
      {
        "pattern": "delay",
        "text": "Say you'll definitely go once you've finished everything else."
      },
      {
        "pattern": "distraction",
        "text": "Spend the entire drive finding the next display instead of enjoying the one in front of you."
      }
    ]
  },
  {
    "id": 15,
    "title": "Holiday Preparations",
    "prompt": "It's December 23, and Christmas preparations are nowhere near finished. You...",
    "answers": [
      {
        "pattern": "lost",
        "text": "Worry that everyone will be disappointed in what you've done."
      },
      {
        "pattern": "scarcity",
        "text": "Start stressing about the unexpected costs of finishing everything."
      },
      {
        "pattern": "control",
        "text": "Take command and start assigning everyone responsibilities."
      },
      {
        "pattern": "stalled",
        "text": "Make another list because you're still not sure where to begin."
      }
    ]
  },
  {
    "id": 16,
    "title": "Christmas Eve Reflection",
    "prompt": "It's Christmas Eve. What thought sounds most familiar?",
    "answers": [
      {
        "pattern": "boundary",
        "text": "I wish our family could get past the disagreements that keep us apart."
      },
      {
        "pattern": "settling",
        "text": "I wish Christmas could feel different instead of repeating the same patterns."
      },
      {
        "pattern": "delay",
        "text": "I wish I'd made time for that conversation I kept putting off."
      },
      {
        "pattern": "distraction",
        "text": "Wait—how is Christmas already here? Where did December go?"
      }
    ]
  }
];
