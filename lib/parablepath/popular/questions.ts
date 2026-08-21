import type { PopularOption, PopularQuestion } from "./types";

export const POPULAR_ASSESSMENT_VERSION = "popular-v2";

export const popularQuestions: PopularQuestion[] = [
  { id: "popular_01", round: "Just a Normal Day", prompt: "You walk into Costco for three things. What happens?", options: [
    { label: "I have a list, an efficient route through the store, and no intention of being seduced by seasonal merchandise.", scores: { control: 2, scarcity: 1 } },
    { label: "I leave with twelve things, including something I did not know existed 45 minutes ago.", scores: { distraction: 2 } },
    { label: "I buy the giant version because technically it costs less per ounce, and that is basically earning money.", scores: { scarcity: 2 } },
    { label: "I wander around wondering what we actually need and text someone at home for clarification.", scores: { lost: 2 } },
    { label: "I get the same five things I always get. Costco is not where I go to reinvent myself.", scores: { settling: 2 } }
  ] },
  { id: "popular_02", round: "Just a Normal Day", prompt: "You have been watching the same streaming series for three years. Why?", options: [
    { label: "I already know I like it. Why gamble 48 minutes on something terrible?", scores: { settling: 2 } },
    { label: "I start new shows constantly. Finishing them is apparently a separate hobby.", scores: { distraction: 2, delay: 1 } },
    { label: "I spend longer choosing what to watch than actually watching anything.", scores: { lost: 2, distraction: 1 } },
    { label: "I’m waiting until I have enough time to really get into the new series everyone recommended.", scores: { delay: 2 } },
    { label: "I need to know whether the ending is terrible before committing ten hours of my life.", scores: { control: 2 } }
  ] },
  { id: "popular_03", round: "Just a Normal Day", prompt: "You get an Amazon notification: “Your package has been delivered.” Which response is most like you?", options: [
    { label: "Excellent. Exactly on schedule.", scores: { control: 2 } },
    { label: "Wait...what did I order?", scores: { distraction: 2 } },
    { label: "I already checked the photo to make sure it is actually at my house.", scores: { boundary: 2, control: 1 } },
    { label: "I probably had it sitting in my cart for two weeks before finally buying it.", scores: { delay: 2 } },
    { label: "I bought two because I might need another one someday.", scores: { scarcity: 2 } }
  ] },
  { id: "popular_04", round: "Just a Normal Day", prompt: "Someone asks where you want to eat tonight. Your contribution to the conversation is:", options: [
    { label: "“I don’t care.” Then I reject four suggestions.", scores: { lost: 2, control: 1 } },
    { label: "I already checked menus, reviews, drive times, and whether they take reservations.", scores: { control: 2 } },
    { label: "Let's go to our usual place. Everyone likes it. Problem solved.", scores: { settling: 2 } },
    { label: "I suggest somewhere nobody has heard of because apparently dinner needs an element of adventure.", scores: { distraction: 2 } },
    { label: "First question: Who exactly is coming?", scores: { boundary: 2 } }
  ] },
  { id: "popular_05", round: "When Life Gets Weird", prompt: "Your flight gets canceled. Your first move?", options: [
    { label: "I am already in the airline app looking for alternatives before the gate agent finishes speaking.", scores: { control: 2 } },
    { label: "I start calculating hotel costs, meal costs, rental cars, and whether this trip has now become financially irresponsible.", scores: { scarcity: 2 } },
    { label: "I text the group: “Well...maybe we weren't supposed to go.”", scores: { stalled: 2, lost: 1 } },
    { label: "I start exploring the airport. We live here now.", scores: { distraction: 2 } },
    { label: "I quietly hope somebody else figures out what we are doing next.", scores: { lost: 2 } }
  ] },
  { id: "popular_06", round: "When Life Gets Weird", prompt: "You get a text that says only: “Hey, can we talk later?” Your brain responds:", options: [
    { label: "“Later? Define later.”", scores: { control: 2 } },
    { label: "I mentally review every conversation we've had since approximately 2019.", scores: { boundary: 2, lost: 1 } },
    { label: "I assume they are upset with me.", scores: { lost: 2 } },
    { label: "I decide not to answer until I have had sufficient time to emotionally prepare, which apparently means tomorrow.", scores: { delay: 2 } },
    { label: "I open Instagram to calm down and emerge 37 minutes later knowing a surprising amount about celebrity kitchens.", scores: { distraction: 2 } }
  ] },
  { id: "popular_07", round: "When Life Gets Weird", prompt: "You make a mistake at work, school, church, or home and everyone knows it. Which instinct arrives first?", options: [
    { label: "Fix it before this becomes a whole thing.", scores: { control: 2 } },
    { label: "I want to know who is annoyed with me.", scores: { boundary: 2 } },
    { label: "This feels like further evidence that everyone else has life figured out better than I do.", scores: { lost: 2 } },
    { label: "I need a minute. Or several. Preferably before discussing it.", scores: { delay: 2 } },
    { label: "I start wondering whether I should be doing something completely different with my life anyway.", scores: { stalled: 2 } }
  ] },
  { id: "popular_08", round: "When Life Gets Weird", prompt: "A major opportunity appears, but you have to decide quickly. Your internal monologue:", options: [
    { label: "“Give me the details. I can build a plan.”", scores: { control: 2 } },
    { label: "“What if I say yes and regret it?”", scores: { lost: 2 } },
    { label: "“What if I say no and never get another chance?”", scores: { scarcity: 2 } },
    { label: "“Could I maybe decide next Tuesday?”", scores: { delay: 2 } },
    { label: "“Interesting. But what about these four other things I could also do?”", scores: { distraction: 2 } }
  ] },
  { id: "popular_09", round: "Other Humans", prompt: "Your family is trying to get everyone out the door for a trip. Which character are you?", options: [
    { label: "“Shoes on. Bags loaded. Bathroom now. We leave in six minutes.”", scores: { control: 2 } },
    { label: "I am still looking for something I definitely had five minutes ago.", scores: { distraction: 2 } },
    { label: "I have been ready for 20 minutes and am silently forming opinions about everyone else.", scores: { boundary: 2 } },
    { label: "I have not packed yet because somehow packing became Future Me's responsibility.", scores: { delay: 2 } },
    { label: "I packed extras because someone will forget sunscreen, medicine, chargers, snacks, or basic survival skills.", scores: { scarcity: 2, control: 1 } }
  ] },
  { id: "popular_10", round: "Other Humans", prompt: "The group chat suddenly gets spicy. What do you do?", options: [
    { label: "Enter the conversation because apparently somebody needs to bring order to this nonsense.", scores: { control: 2 } },
    { label: "Read everything. Say nothing. Remember all of it.", scores: { boundary: 2 } },
    { label: "Send the perfect meme at exactly the wrong moment.", scores: { distraction: 2 } },
    { label: "Mute notifications and hope civilization repairs itself.", scores: { settling: 2 } },
    { label: "Start wondering whether everyone secretly dislikes one another and I somehow missed it.", scores: { lost: 2 } }
  ] },
  { id: "popular_11", round: "Other Humans", prompt: "A friend tells you about the same problem for the fifth time. Your least-filtered reaction is:", options: [
    { label: "“I love you, but we have already identified the solution.”", scores: { control: 2 } },
    { label: "I start wondering whether I need some distance from this relationship.", scores: { boundary: 2 } },
    { label: "I listen, but I've mostly stopped believing anything is going to change.", scores: { stalled: 2, settling: 1 } },
    { label: "I have strong thoughts but don't know whether saying them will make things worse.", scores: { lost: 2 } },
    { label: "I give a surprisingly inspiring speech and then forget to check on them for nine days.", scores: { distraction: 2, delay: 1 } }
  ] },
  { id: "popular_12", round: "Other Humans", prompt: "Someone new joins your friend group, team, church, office, or class. Your first instinct:", options: [
    { label: "“Come sit here. Let me introduce you to everybody.”", scores: { control: 2 } },
    { label: "Welcome. I will determine whether you are safe sometime during fiscal year 2027.", scores: { boundary: 2 } },
    { label: "I hope they like me.", scores: { lost: 2 } },
    { label: "Cool, as long as this doesn't somehow change everything.", scores: { settling: 2 } },
    { label: "I have already discovered three things we have in common and invited them somewhere.", scores: { distraction: 2 } }
  ] },
  { id: "popular_13", round: "The Stuff Underneath", prompt: "You unexpectedly get $1,000. Be honest. Your brain goes where first?", options: [
    { label: "Savings. Obviously. We do not know what chaos awaits us.", scores: { scarcity: 2 } },
    { label: "I already know exactly which problem this money is going to solve.", scores: { control: 2 } },
    { label: "I can think of eight exciting ways to spend it and suddenly $1,000 seems insufficient.", scores: { distraction: 2 } },
    { label: "I'll decide later. It may remain untouched for six months.", scores: { delay: 2 } },
    { label: "Honestly, I mostly wonder whether I should be using it for something more meaningful.", scores: { lost: 2 } }
  ] },
  { id: "popular_14", round: "The Stuff Underneath", prompt: "Imagine your life looks basically the same five years from now. Your gut reaction?", options: [
    { label: "Absolutely not. We are making a plan.", scores: { control: 2 } },
    { label: "That sounds a little too believable.", scores: { stalled: 2 } },
    { label: "If everyone is healthy and things are okay, I'm not sure that sounds terrible.", scores: { settling: 2 } },
    { label: "Suddenly I want to start a business, learn Italian, and live in an Airstream.", scores: { distraction: 2 } },
    { label: "My fear is that I will have missed the moment when I could have changed things.", scores: { scarcity: 2, delay: 1 } }
  ] },
  { id: "popular_15", round: "The Stuff Underneath", prompt: "Which thought has the best chance of showing up at 2:13 a.m.?", options: [
    { label: "“I need to figure out what I'm doing with my life.”", scores: { lost: 2 } },
    { label: "“What if something happens and we're not prepared?”", scores: { scarcity: 2 } },
    { label: "“Why did they say it like that?”", scores: { boundary: 2 } },
    { label: "“I really need to finally deal with that thing.”", scores: { delay: 2 } },
    { label: "“I cannot believe we're still dealing with the same stuff.”", scores: { stalled: 2 } }
  ] },
  { id: "popular_16", round: "The Stuff Underneath", prompt: "Which one feels uncomfortably close to home?", options: [
    { label: "Sometimes I work so hard to keep everything together that I forget not everything is mine to control.", scores: { control: 2 } },
    { label: "Sometimes keeping people at a safe distance also keeps me lonely.", scores: { boundary: 2 } },
    { label: "Sometimes waiting for the right moment is how I avoid beginning.", scores: { delay: 2 } },
    { label: "Sometimes “things are fine” keeps me from asking whether they could actually be better.", scores: { settling: 2 } },
    { label: "Sometimes I stay so busy, interested, entertained, or distracted that I never have to decide what matters most.", scores: { distraction: 2 } }
  ] }
];

function seededValue(value: string) {
  return [...value].reduce((hash, character) => ((hash * 31) + character.charCodeAt(0)) >>> 0, 2166136261);
}

export function orderedPopularOptions(question: PopularQuestion): PopularOption[] {
  const options = [...question.options];
  let seed = seededValue(question.id);
  for (let index = options.length - 1; index > 0; index -= 1) {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    const swapIndex = seed % (index + 1);
    [options[index], options[swapIndex]] = [options[swapIndex], options[index]];
  }
  return options;
}
