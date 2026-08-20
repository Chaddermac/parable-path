export type AssessmentExperience = "popular" | "formation";

const popularHosts = new Set(["parablepath.com", "www.parablepath.com"]);
const formationHosts = new Set(["parablepath.app", "www.parablepath.app"]);

export function normalizeHostname(value: string | null | undefined) {
  const first = value?.split(",")[0]?.trim().toLowerCase() || "";
  if (first.startsWith("[")) return first.slice(1, first.indexOf("]"));
  return first.split(":")[0];
}

export function experienceForHostname(hostname: string): AssessmentExperience | null {
  const normalized = normalizeHostname(hostname);
  if (popularHosts.has(normalized)) return "popular";
  if (formationHosts.has(normalized)) return "formation";
  return null;
}

export function canSimulateExperience(hostname: string) {
  const normalized = normalizeHostname(hostname);
  return normalized === "localhost" || normalized === "127.0.0.1" || normalized === "::1" || normalized.endsWith(".vercel.app");
}

export function requestedExperience(hostname: string, override?: string | null): AssessmentExperience {
  if (canSimulateExperience(hostname) && (override === "popular" || override === "formation")) return override;
  return experienceForHostname(hostname) || "formation";
}
