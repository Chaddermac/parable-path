import type { HolidayQuestion } from "./scoring.ts";

// Version 4.1: category identifiers are metadata, never participant labels.
export const holidayQuestions: HolidayQuestion[] = [
  {
    "id": 1,
    "title": "The White Elephant Showdown",
    "prompt": "It's White Elephant time. Someone just opened the gift you've had your eye on. What's your move?",
    "answers": [
      {
        "pattern": "lost",
        "text": "I'd consider stealing it, but I don't want everyone thinking I'm that person."
      },
      {
        "pattern": "scarcity",
        "text": "I'm taking it. There are only three decent gifts here, and this is one of them."
      },
      {
        "pattern": "control",
        "text": "I'm already working out the best move so I don't lose it to someone else."
      },
      {
        "pattern": "stalled",
        "text": "I keep weighing whether to steal it. By the time I decide, the game's over."
      },
      {
        "pattern": "no_match",
        "text": "None of these really sounds like me."
      }
    ]
  },
  {
    "id": 2,
    "title": "The Holiday Party",
    "prompt": "You're invited to a holiday party where you know a few people. What's your strategy?",
    "answers": [
      {
        "pattern": "boundary",
        "text": "Find the people I know. Why risk getting trapped in a conversation with a stranger?"
      },
      {
        "pattern": "settling",
        "text": "I already know how this goes: small talk, snacks, and an early exit."
      },
      {
        "pattern": "delay",
        "text": "I keep the invitation open until the last minute. Something better might come up."
      },
      {
        "pattern": "distraction",
        "text": "I start three conversations, visit the snack table twice, and forget where I left my drink."
      },
      {
        "pattern": "no_match",
        "text": "None of these really sounds like me."
      }
    ]
  },
  {
    "id": 3,
    "title": "The Impossible-to-Shop-For Person",
    "prompt": "You need to buy a gift for someone who is notoriously hard to shop for. What happens?",
    "answers": [
      {
        "pattern": "lost",
        "text": "I worry that getting it wrong will make them think I don't really understand them."
      },
      {
        "pattern": "scarcity",
        "text": "I start comparing what everyone else is spending. I don't want to come up short."
      },
      {
        "pattern": "control",
        "text": "I ask enough questions to make sure there won't be any surprises."
      },
      {
        "pattern": "stalled",
        "text": "I keep looking for something better because I'm not confident I've found the right gift."
      },
      {
        "pattern": "no_match",
        "text": "None of these really sounds like me."
      }
    ]
  },
  {
    "id": 4,
    "title": "The Annual Family Reunion",
    "prompt": "It's been a whole year since you've seen your extended family. What's running through your mind?",
    "answers": [
      {
        "pattern": "boundary",
        "text": "I wonder which relatives I'll need to avoid to keep the peace."
      },
      {
        "pattern": "settling",
        "text": "I can already predict the stories, the arguments, and who's going to fall asleep on the couch."
      },
      {
        "pattern": "delay",
        "text": "I tell myself I'll make time for the important conversations later in the visit."
      },
      {
        "pattern": "distraction",
        "text": "I want to catch up with everyone, but I bounce around so much that I barely finish a conversation."
      },
      {
        "pattern": "no_match",
        "text": "None of these really sounds like me."
      }
    ]
  },
  {
    "id": 5,
    "title": "You're Hosting Christmas Dinner",
    "prompt": "You're hosting the big holiday meal. What's most likely to stress you out?",
    "answers": [
      {
        "pattern": "lost",
        "text": "Wondering whether people are coming because they want to—or just because they feel obligated."
      },
      {
        "pattern": "scarcity",
        "text": "Worrying there won't be enough food, even though you've prepared for a small army."
      },
      {
        "pattern": "control",
        "text": "Watching other people help while resisting the urge to tell them exactly how to do everything."
      },
      {
        "pattern": "stalled",
        "text": "Feeling like you still haven't done enough to make the gathering special."
      },
      {
        "pattern": "no_match",
        "text": "None of these really sounds like me."
      }
    ]
  },
  {
    "id": 6,
    "title": "A New Christmas Tradition?",
    "prompt": "Someone suggests changing a beloved holiday tradition. Your reaction?",
    "answers": [
      {
        "pattern": "boundary",
        "text": "I worry that changing our tradition means losing something that makes us us."
      },
      {
        "pattern": "settling",
        "text": "We've tried new traditions before. They usually last about as long as the leftovers."
      },
      {
        "pattern": "delay",
        "text": "It's an interesting idea, but I'd rather discuss it after this Christmas."
      },
      {
        "pattern": "distraction",
        "text": "I love it! Actually, now I'm thinking of four other things we could try, too."
      },
      {
        "pattern": "no_match",
        "text": "None of these really sounds like me."
      }
    ]
  },
  {
    "id": 7,
    "title": "Another Scented Candle",
    "prompt": "A friend gives you a scented candle. Again. Your first private reaction?",
    "answers": [
      {
        "pattern": "lost",
        "text": "I wonder whether they really know what I like."
      },
      {
        "pattern": "scarcity",
        "text": "I start comparing the candle to what I spent on their gift."
      },
      {
        "pattern": "control",
        "text": "Next year I'm taking charge of the gift exchange. No more surprises."
      },
      {
        "pattern": "stalled",
        "text": "I overthink whether I should keep it, exchange it, or say something."
      },
      {
        "pattern": "no_match",
        "text": "None of these really sounds like me."
      }
    ]
  },
  {
    "id": 8,
    "title": "Christmas Dinner Conversation",
    "prompt": "You're sitting at the holiday table, and a conversation starts getting uncomfortable. What do you do?",
    "answers": [
      {
        "pattern": "boundary",
        "text": "I withdraw from the conversation because I assume we won't understand each other anyway."
      },
      {
        "pattern": "settling",
        "text": "I think, “Here we go again. This family never changes.”"
      },
      {
        "pattern": "delay",
        "text": "I know there's something important I should say, but I decide it's better to deal with it another time."
      },
      {
        "pattern": "distraction",
        "text": "I escape into my phone or whatever else is happening around me."
      },
      {
        "pattern": "no_match",
        "text": "None of these really sounds like me."
      }
    ]
  },
  {
    "id": 9,
    "title": "The Family Group Text",
    "prompt": "The family group chat is organizing Christmas plans. You...",
    "answers": [
      {
        "pattern": "lost",
        "text": "Notice that everyone's opinions seem to matter, except maybe yours."
      },
      {
        "pattern": "scarcity",
        "text": "Wonder why you've ended up responsible for the expensive part again."
      },
      {
        "pattern": "control",
        "text": "Start reorganizing the plan because everyone is making it unnecessarily complicated."
      },
      {
        "pattern": "stalled",
        "text": "Type a response, rethink it, change it, and discover the family has already decided."
      },
      {
        "pattern": "no_match",
        "text": "None of these really sounds like me."
      }
    ]
  },
  {
    "id": 10,
    "title": "There's an Unexpected Guest",
    "prompt": "Someone announces they're bringing an unexpected guest to your gathering. What's your reaction?",
    "answers": [
      {
        "pattern": "boundary",
        "text": "I worry about whether this person will fit with our usual group."
      },
      {
        "pattern": "settling",
        "text": "I doubt one new person is going to make much difference to the gathering."
      },
      {
        "pattern": "delay",
        "text": "I intend to introduce myself, but keep waiting for a better moment."
      },
      {
        "pattern": "distraction",
        "text": "I mean to welcome them, but get caught up in everything else and forget."
      },
      {
        "pattern": "no_match",
        "text": "None of these really sounds like me."
      }
    ]
  },
  {
    "id": 11,
    "title": "The Family Christmas Photo",
    "prompt": "Someone says, “Everybody together! Time for the Christmas photo!” You...",
    "answers": [
      {
        "pattern": "lost",
        "text": "Wonder whether you'd be missed if you weren't in the picture."
      },
      {
        "pattern": "scarcity",
        "text": "Start wondering why a simple family photo required buying matching outfits."
      },
      {
        "pattern": "control",
        "text": "Find yourself arranging everyone because the photo won't look right otherwise."
      },
      {
        "pattern": "stalled",
        "text": "Keep asking for another picture because you're afraid the last one wasn't good enough."
      },
      {
        "pattern": "no_match",
        "text": "None of these really sounds like me."
      }
    ]
  },
  {
    "id": 12,
    "title": "Holiday Game Night",
    "prompt": "Someone suggests playing games after dinner. You...",
    "answers": [
      {
        "pattern": "boundary",
        "text": "Try to avoid playing with the relative whose opinions always turn into arguments."
      },
      {
        "pattern": "settling",
        "text": "Figure it'll go like every other year: someone wins, someone complains, and somebody quits."
      },
      {
        "pattern": "delay",
        "text": "Say you'll join after finishing a few things. Somehow, the game ends first."
      },
      {
        "pattern": "distraction",
        "text": "Start playing, get distracted by another conversation, and miss your turn. Twice."
      },
      {
        "pattern": "no_match",
        "text": "None of these really sounds like me."
      }
    ]
  },
  {
    "id": 13,
    "title": "The $25 Gift Exchange",
    "prompt": "Everyone agrees to a $25 gift limit. You...",
    "answers": [
      {
        "pattern": "lost",
        "text": "Worry that your gift might make you look less thoughtful than everyone else."
      },
      {
        "pattern": "scarcity",
        "text": "Wonder whether everyone else will secretly spend more, leaving your gift looking cheap."
      },
      {
        "pattern": "control",
        "text": "I catch myself monitoring everyone's spending because rules only work if people follow them."
      },
      {
        "pattern": "stalled",
        "text": "Spend so long finding the perfect $25 gift that you nearly miss the exchange."
      },
      {
        "pattern": "no_match",
        "text": "None of these really sounds like me."
      }
    ]
  },
  {
    "id": 14,
    "title": "A Holiday Invitation",
    "prompt": "Someone invites you to join a holiday activity with people you don't usually spend time with. You...",
    "answers": [
      {
        "pattern": "boundary",
        "text": "Hesitate because you're not sure you'll connect with people who seem different from you."
      },
      {
        "pattern": "settling",
        "text": "Assume it'll probably be another ordinary holiday event, nothing particularly memorable."
      },
      {
        "pattern": "delay",
        "text": "Think it sounds interesting, but wait to commit until you know how the week will unfold."
      },
      {
        "pattern": "distraction",
        "text": "Say yes enthusiastically, then realize you've already agreed to three other things that evening."
      },
      {
        "pattern": "no_match",
        "text": "None of these really sounds like me."
      }
    ]
  },
  {
    "id": 15,
    "title": "It's December 23",
    "prompt": "You're behind on holiday preparations. What's your response?",
    "answers": [
      {
        "pattern": "lost",
        "text": "Worry that people will feel disappointed in you."
      },
      {
        "pattern": "scarcity",
        "text": "Stress about what finishing everything is going to cost."
      },
      {
        "pattern": "control",
        "text": "Start assigning responsibilities because you're not comfortable leaving things to chance."
      },
      {
        "pattern": "stalled",
        "text": "Keep reorganizing the list because you're not sure which task to tackle first."
      },
      {
        "pattern": "no_match",
        "text": "None of these really sounds like me."
      }
    ]
  },
  {
    "id": 16,
    "title": "Christmas Eve Arrives",
    "prompt": "Christmas Eve is here. What thought hits closest to home?",
    "answers": [
      {
        "pattern": "boundary",
        "text": "I'm already deciding which relatives I'll keep my distance from instead of risking another difficult conversation."
      },
      {
        "pattern": "settling",
        "text": "I wish Christmas felt different, but I've stopped expecting it to change."
      },
      {
        "pattern": "delay",
        "text": "I wish I'd made time for that conversation or connection I kept putting off."
      },
      {
        "pattern": "distraction",
        "text": "Wait, Christmas is tomorrow? How did I manage to be busy all month and still miss half of it?"
      },
      {
        "pattern": "no_match",
        "text": "None of these really sounds like me."
      }
    ]
  }
];
