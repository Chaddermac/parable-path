export const holidayEvents = ["page_view", "quiz_start", "question_view", "question_answered", "quiz_complete", "result_view", "share", "copy_link", "download_card", "app_click", "quiz_exit"] as const;
export type HolidayEvent = typeof holidayEvents[number];
export function trackHoliday(event: HolidayEvent, data: Record<string, unknown> = {}) {
  // No cookies, IDs, answers, referrers, or participant profiles.
  if (typeof navigator === "undefined" || navigator.doNotTrack === "1") return;
  const body = JSON.stringify({ event, ...data });
  void fetch("/api/holiday/events", { method: "POST", headers: { "Content-Type": "application/json" }, body, keepalive: true }).catch(() => {});
}
