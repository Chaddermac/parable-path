import type { RoomId } from "../../types.ts";
import { popularQuestions } from "./questions.ts";
import type { PopularOption, PopularScoreResult } from "./types.ts";

export const popularRoomOrder: RoomId[] = ["lost", "boundary", "control", "stalled", "settling", "scarcity", "delay", "distraction"];

function emptyScores(): Record<RoomId, number> {
  return Object.fromEntries(popularRoomOrder.map((room) => [room, 0])) as Record<RoomId, number>;
}

export function maximumPopularScores() {
  const maximums = emptyScores();
  for (const question of popularQuestions) {
    for (const room of popularRoomOrder) {
      maximums[room] += Math.max(...question.options.map((option) => option.scores[room] || 0));
    }
  }
  return maximums;
}

export function scorePopularAssessment(answers: PopularOption[]): PopularScoreResult {
  const rawScores = emptyScores();
  for (const answer of answers) {
    for (const room of popularRoomOrder) rawScores[room] += answer.scores[room] || 0;
  }

  const maximums = maximumPopularScores();
  const normalizedScores = Object.fromEntries(popularRoomOrder.map((room) => [
    room,
    maximums[room] ? (rawScores[room] / maximums[room]) * 100 : 0
  ])) as Record<RoomId, number>;
  const ranked = [...popularRoomOrder].sort((a, b) => normalizedScores[b] - normalizedScores[a] || popularRoomOrder.indexOf(a) - popularRoomOrder.indexOf(b));

  return {
    primary: ranked[0],
    secondary: ranked[1],
    normalizedScores,
    rawScores,
    nearTie: normalizedScores[ranked[0]] - normalizedScores[ranked[1]] <= 7
  };
}
