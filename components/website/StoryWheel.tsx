import Link from "next/link";
import Image from "next/image";
import { storyLinks } from "@/lib/website";
import { StorySymbol } from "./StorySymbol";
const point = (angle: number, radius: number) => ({ x: 240 + Math.cos(angle * Math.PI / 180) * radius, y: 240 + Math.sin(angle * Math.PI / 180) * radius });
function sector(index: number) {
  const start = -112.5 + index * 45, end = start + 45;
  const a = point(start, 220), b = point(end, 220), c = point(end, 78), d = point(start, 78);
  return `M${a.x},${a.y}A220,220 0 0 1 ${b.x},${b.y}L${c.x},${c.y}A78,78 0 0 0 ${d.x},${d.y}Z`;
}
export function StoryWheel() {
  return <div className="website-wheel" aria-label="Explore the eight ParablePath stories">
    <svg viewBox="0 0 480 480" className="website-wheel-segments" role="group" aria-label="Story Wheel">
      {storyLinks.map((story, index) => <Link href={`/story-types/${story.slug}`} key={story.room} aria-label={`Explore the ${story.label} story`}><path d={sector(index)} fill={story.field} stroke="#fffaf2" strokeWidth="3" /></Link>)}
      <circle cx="240" cy="240" r="78" fill="#fffaf2" stroke="#062c6615" />
    </svg>
    <Link href="/story-types" className="website-wheel-center" aria-label="Explore all eight stories"><Image src="/parablepath-logo.png" alt="" width={150} height={150} /></Link>
    {storyLinks.map((story, index) => { const pos = point(-90 + index * 45, 150); return <div key={story.room} className="website-wheel-unit" aria-hidden="true" style={{ left: `${pos.x / 480 * 100}%`, top: `${pos.y / 480 * 100}%` }}><StorySymbol room={story.room} decorative /><span>{story.label}</span></div>; })}
  </div>;
}
