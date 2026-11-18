export const holidayEvents = ["page_view", "quiz_start", "question_view", "question_answered", "quiz_complete", "result_view", "result_feedback", "share", "copy_link", "download_card", "app_click", "quiz_exit"] as const;
export type HolidayEvent = typeof holidayEvents[number];
export const resultFitOptions = [
  { value:"yes", label:"Yes, that's definitely me." },
  { value:"mostly", label:"Mostly." },
  { value:"a_little", label:"A little." },
  { value:"not_really", label:"Not really." },
] as const;
export function trackHoliday(event: HolidayEvent, data: Record<string, unknown> = {}) {
  // No cookies, participant IDs, raw story answers, or answer-history arrays.
  if (typeof navigator === "undefined" || navigator.doNotTrack === "1") return;
  const body = JSON.stringify({ ...data, event, questionVersion:"4.1" });
  void fetch("/api/holiday/events", { method:"POST", headers:{ "Content-Type":"application/json" }, body, keepalive:true }).catch(() => {});
}
