import type { CSSProperties } from "react";
import type { RoomId } from "@/lib/types";
import { websiteStory } from "@/lib/website";
export function StorySymbol({ room, decorative = false }: { room: RoomId; decorative?: boolean }) {
  const story = websiteStory(room), [x, y, size] = story.crop;
  const style = { backgroundSize: `${1254 / size * 100}%`, backgroundPosition: `${x / (1254 - size) * 100}% ${y / (1254 - size) * 100}%` } as CSSProperties;
  return <span className="website-story-symbol" style={style} role={decorative ? undefined : "img"} aria-label={decorative ? undefined : `${story.label} symbol`} aria-hidden={decorative || undefined} />;
}
