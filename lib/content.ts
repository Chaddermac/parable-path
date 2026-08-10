import type { RoomId } from "./types";

export interface Room {
  id: RoomId;
  name: string;
  falseStory: string;
  parables: string;
  trueStory: string;
  calling: string;
  prompt: string;
  nextSteps: string[];
}

export const rooms: Room[] = [
  { id: "lost", name: "Lost", falseStory: "I do not belong.", parables: "Lost Sheep, Lost Coin, Lost Sons — Luke 15", trueStory: "You are sought, found, and welcomed home.", calling: "Heavenly Host", prompt: "Where has absence or shame become an identity, and how might being welcomed form me into a Heavenly Host?", nextSteps: ["Read Luke 15 slowly and notice who searches, waits, and welcomes.", "Offer a concrete welcome to someone who may feel unseen."] },
  { id: "scarcity", name: "Scarcity", falseStory: "There will never be enough.", parables: "Rich Fool — Luke 12; Laborers — Matthew 20", trueStory: "Life is received as gift, not secured by accumulation.", calling: "Planetary Trustee", prompt: "What am I storing, comparing, or controlling because I do not trust that life is gift?", nextSteps: ["Name three gifts you received today but did not secure for yourself.", "Release or share one thing you have been holding tightly."] },
  { id: "control", name: "Control", falseStory: "I must stay in control.", parables: "Unforgiving Servant — Matthew 18; Pharisee and Tax Collector — Luke 18", trueStory: "Grace frees us to forgive and release control.", calling: "Healer", prompt: "What debt, judgment, or comparison has become part of the architecture of my identity?", nextSteps: ["Name one outcome you cannot control and practice releasing it.", "Take one step toward mercy without demanding a particular response."] },
  { id: "stalled", name: "Stalled", falseStory: "I am not ready yet.", parables: "Talents — Matthew 25; Growing Seed — Mark 4", trueStory: "Faithfulness means participating before everything is clear.", calling: "Mentor & Coach", prompt: "What gift or next step have I buried while waiting to feel fully ready?", nextSteps: ["Give fifteen minutes to the gift or task you have postponed.", "Tell a trusted person the next small step you intend to take."] },
  { id: "boundary", name: "Boundary", falseStory: "Some people are outside God’s concern.", parables: "Good Samaritan — Luke 10; Great Banquet — Luke 14", trueStory: "Neighbor-love crosses the lines fear tries to protect.", calling: "Bridger", prompt: "Whom has my current story placed outside the reach of my responsibility, table, or compassion?", nextSteps: ["Listen to one person you usually encounter through assumptions.", "Make one practical gesture that widens your table or concern."] },
  { id: "settling", name: "Settling", falseStory: "This is all life can be.", parables: "Mustard Seed, Leaven, Hidden Treasure — Matthew 13", trueStory: "God’s kingdom awakens possibilities we stopped imagining.", calling: "Innovator & Imagineer", prompt: "What kingdom possibility have I stopped imagining because I am protecting an arrangement that feels safe?", nextSteps: ["Write down one kingdom possibility you have stopped naming.", "Try one low-risk experiment that makes room for new life."] },
  { id: "delay", name: "Delay", falseStory: "I will respond later.", parables: "Wise Virgins — Matthew 25; Two Sons — Matthew 21", trueStory: "God’s kingdom calls for faithful response today.", calling: "WayMaker", prompt: "What faithful response am I postponing, and what path could today’s yes open for others?", nextSteps: ["Complete one faithful action today in under twenty minutes.", "Remove one obstacle that keeps a needed path closed for others."] },
  { id: "distraction", name: "Distraction", falseStory: "My attention belongs everywhere else.", parables: "Sower — Luke 8; Hidden Treasure — Matthew 13", trueStory: "Attention is discipleship; what we notice shapes who we become.", calling: "Awakener", prompt: "What repeatedly captures my attention, and how might disciplined noticing form me into an Awakener?", nextSteps: ["Choose ten minutes of undivided attention without a device.", "Write what takes your attention and what you want to notice instead."] }
];

export const roomById = Object.fromEntries(rooms.map((room) => [room.id, room])) as Record<RoomId, Room>;

export const questions: { id: string; room: RoomId; text: string }[] = [
  { id: "lost-1", room: "lost", text: "I feel as though I am on the outside, even when others include me." },
  { id: "lost-2", room: "lost", text: "Absence, rejection, or shame can feel like part of who I am." },
  { id: "lost-3", room: "lost", text: "I find it difficult to trust that there is a place where I am truly welcomed." },
  { id: "scarcity-1", room: "scarcity", text: "I worry that there will not be enough time, money, opportunity, or care to go around." },
  { id: "scarcity-2", room: "scarcity", text: "I compare what I have or receive with what others have or receive." },
  { id: "scarcity-3", room: "scarcity", text: "I hold resources tightly because the future feels uncertain." },
  { id: "control-1", room: "control", text: "I feel safest when people and outcomes follow the plan I have in mind." },
  { id: "control-2", room: "control", text: "I keep an internal record of wrongs, debts, or disappointments." },
  { id: "control-3", room: "control", text: "Releasing judgment or comparison feels like losing something important." },
  { id: "stalled-1", room: "stalled", text: "I postpone meaningful action until I feel more prepared or certain." },
  { id: "stalled-2", room: "stalled", text: "I hesitate to offer my gifts because they do not feel ready enough." },
  { id: "stalled-3", room: "stalled", text: "I spend more time planning a faithful step than taking it." },
  { id: "boundary-1", room: "boundary", text: "Some people feel too different or distant to be my responsibility." },
  { id: "boundary-2", room: "boundary", text: "I protect familiar lines even when compassion might ask me to cross them." },
  { id: "boundary-3", room: "boundary", text: "My concern is usually reserved for people I understand or identify with." },
  { id: "settling-1", room: "settling", text: "I have stopped imagining that an important part of life could be different." },
  { id: "settling-2", room: "settling", text: "A familiar arrangement feels safer than a hopeful possibility." },
  { id: "settling-3", room: "settling", text: "Small beginnings seem too insignificant to change anything." },
  { id: "delay-1", room: "delay", text: "I know a faithful response is needed, but I expect to make it later." },
  { id: "delay-2", room: "delay", text: "Good intentions sometimes take the place of present action for me." },
  { id: "delay-3", room: "delay", text: "I wait for a better moment even when I could take a small step today." },
  { id: "distraction-1", room: "distraction", text: "My attention is regularly captured by what feels urgent rather than what matters." },
  { id: "distraction-2", room: "distraction", text: "I find it difficult to remain present to one person, task, or invitation." },
  { id: "distraction-3", room: "distraction", text: "Noise and competing demands keep me from noticing what gives life." }
];

export const scaleLabels = ["Not at all true", "Slightly true", "Sometimes true", "Often true", "Very true"];
