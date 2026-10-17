import { isRoomId } from "./parablepath/popular/results.ts";
import type { AssessmentExperience } from "./experience.ts";

// The legacy light result used a story slug; saved formation results use IDs.
export function publicRoute(pathname: string, room: string | null = null, previewExperience: AssessmentExperience = "formation") {
  const path = pathname.replace(/\/$/, "") || "/";
  if (path === "/fun" || path.startsWith("/fun/")) {
    return { experience: "popular" as const, pathname: `/experiences/popular${path.slice(4)}`, redirect: false };
  }
  if (path.startsWith("/experiences/popular")) return { experience: "popular" as const, pathname, redirect: false };
  if (path.startsWith("/experiences/formation")) return { experience: "formation" as const, pathname, redirect: false };
  if (path === "/results" || path.startsWith("/results/")) {
    const suffix = path.slice("/results".length);
    const legacyStory = suffix.slice(1);
    const story = isRoomId(legacyStory) ? legacyStory : !suffix && isRoomId(room ?? undefined) ? room : null;
    if (story) return { experience: "popular" as const, pathname: `/fun/results/${story}`, redirect: true };
    return { experience: "formation" as const, pathname: `/experiences/formation/results${suffix}`, redirect: false };
  }
  if (path === "/assessment") return { experience: previewExperience, pathname: `/experiences/${previewExperience}/assessment`, redirect: false };
  if (path === "/" && previewExperience === "popular") return { experience: "popular" as const, pathname: "/experiences/popular", redirect: false };
  return { experience: "formation" as const, pathname, redirect: false };
}
