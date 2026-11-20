import type { Pattern } from "./scoring";
// Short recognition hooks for social graphics; the full approved reveal copy stays intact.
export const holidayShareHooks: Record<Pattern,string> = {
  lost:"There’s always room for one more. I’m just checking whether there’s room for me.",
  scarcity:"Christmas isn’t a competition. I’m just curious what everyone spent.",
  control:"I just want everyone to enjoy Christmas. Preferably correctly.",
  stalled:"I researched the perfect gift so long that shipping is now the problem.",
  boundary:"I love my family. I also have a strategic seating plan.",
  settling:"“We’ve always done it this way” sounds suspiciously like an invitation.",
  delay:"Every year I say, “We should do that.” Apparently this is the year I’m supposed to actually do it.",
  distraction:"Christmas music. Three group texts. Cookies in the oven. Wait—is Christmas tomorrow already?",
};
export const holidaySocialGifts: Record<Pattern, {tell:string;gift:string;prompt:string}> = {
  lost:{tell:"You notice who has nowhere to sit before you notice whether you have a seat yourself.",gift:"Making people feel like they were genuinely wanted there.",prompt:"Send this to the person already adding another chair to the table."},
  scarcity:{tell:"You brought extra food, an extra gift, and somehow still know exactly what everything cost.",gift:"Turning what you have into something other people can enjoy.",prompt:"Send this to the person who somehow always brought enough for everyone."},
  control:{tell:"You can sense tension in the room before anyone else has realized there is tension in the room.",gift:"Making room for grace when everyone else is keeping score.",prompt:"Send this to whoever is quietly keeping Christmas dinner from becoming a family summit."},
  stalled:{tell:"You have three thoughtful ideas, two backup plans, and one lingering concern that none of them is quite ready yet.",gift:"Helping people take the next imperfect step.",prompt:"Send this to the person who has been “almost ready” to start since Thanksgiving."},
  boundary:{tell:"You are mentally arranging the seating chart before anyone else has found a parking spot.",gift:"Creating connection across difference.",prompt:"Send this to your family’s unofficial diplomat."},
  settling:{tell:"You hear “annual tradition” and immediately start imagining three ways it could be more interesting.",gift:"Seeing possibility inside familiar traditions.",prompt:"Send this to the person who just suggested completely changing Christmas dinner."},
  delay:{tell:"Someone says, “We should go see the lights,” and you already have the tickets open on your phone.",gift:"Turning good intentions into an actual path forward.",prompt:"Send this to whoever already made the spreadsheet."},
  distraction:{tell:"You can be in the middle of a great moment while mentally answering the next three things on your list.",gift:"Helping people notice what matters before the moment passes.",prompt:"Send this to the person with 37 unread holiday notifications."},
};
