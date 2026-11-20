import type { Pattern } from "./scoring";
export const premiumGlobeIds: Record<Pattern,string> = {
  lost:"table-maker", boundary:"bridger", control:"healer", stalled:"mentor",
  settling:"innovator", scarcity:"multiplier", delay:"waymaker", distraction:"awakener",
};
export function premiumGlobePath(pattern:Pattern,extension:"webp"|"png"="webp") {
  return `/holiday/globes/${premiumGlobeIds[pattern]}.${extension}`;
}
