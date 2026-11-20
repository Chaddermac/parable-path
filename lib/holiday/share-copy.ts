import type { Pattern } from "./scoring";
// Short recognition hooks for social graphics; the full approved reveal copy stays intact.
export const holidayShareHooks: Record<Pattern,string> = {
  lost:"There’s always room for one more. I’m just checking whether there’s room for me.",
  scarcity:"Christmas isn’t a competition. I’m just curious what everyone spent.",
  control:"I just want everyone to enjoy Christmas. Preferably correctly.",
  stalled:"I researched the perfect gift for so long that shipping is now the problem.",
  boundary:"I love my family. I also have a strategic seating plan.",
  settling:"‘We’ve always done it this way’ sounds suspiciously like an invitation.",
  delay:"Every year I say, ‘We should do that.’ Apparently this year I’m supposed to actually do it.",
  distraction:"Christmas music. Three group texts. Cookies in the oven. Wait—is Christmas tomorrow already?",
};
export const holidaySocialGifts: Record<Pattern, {gift:string;prompt:string}> = {
  lost:{gift:"Making people feel like there is room for them.",prompt:"Send this to the person who always finds another chair."},
  scarcity:{gift:"Turning what you have into something others can enjoy.",prompt:"Send this to your group chat’s thoughtful gift-giver."},
  control:{gift:"Making room for grace when tension rises.",prompt:"Send this to the person keeping dinner from becoming a debate."},
  stalled:{gift:"Helping people take the next imperfect step.",prompt:"Send this to the friend with six perfectly researched gift lists."},
  boundary:{gift:"Creating connection across difference.",prompt:"Send this to your family’s unofficial diplomat."},
  settling:{gift:"Seeing possibility inside familiar traditions.",prompt:"Send this to whoever says, ‘Hear me out…’"},
  delay:{gift:"Turning good intentions into an actual path forward.",prompt:"Send this to the friend making December 23 count."},
  distraction:{gift:"Helping people notice what matters before the moment passes.",prompt:"Send this to the person with 37 unread holiday notifications."},
};
