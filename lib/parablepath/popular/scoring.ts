import type { RoomId } from "@/lib/types";

export function scorePopularAssessment(answers: RoomId[]): RoomId {
  if (!answers.length) return "lost";
  const counts = answers.reduce<Partial<Record<RoomId, number>>>((scores, room) => {
    scores[room] = (scores[room] || 0) + 1;
    return scores;
  }, {});
  return [...answers].sort((a, b) => (counts[b] || 0) - (counts[a] || 0))[0];
}
