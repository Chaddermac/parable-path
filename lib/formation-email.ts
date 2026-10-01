import { roomById } from "./content.ts";
import { formationResultByRoom } from "./parablepath/popular/results.ts";
import type { AiResult, RoomId } from "./types.ts";

const safetyDisclaimer = "ParablePath is a spiritual reflection aid, not a fixed label, personality test, clinical diagnosis, prophecy, counseling, or crisis care. Hold this result lightly. You may recognize more than one story, or different stories in different seasons.";
const escapeHtml = (value: string) => value.replace(/[&<>"']/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" }[character] || character));
const paragraphs = (value: string) => escapeHtml(value).replaceAll("\n", "<br>");

export function renderFormationResultEmail(input: { responseId: string; primary: RoomId; secondary: RoomId; third: RoomId; reflection: AiResult; origin?: string }) {
  const { responseId, primary, secondary, third, reflection } = input;
  const origin = input.origin || "https://www.parablepath.app";
  const profile = formationResultByRoom[primary];
  const resultUrl = `${origin}/results/${responseId}`;
  const cardUrl = `${origin}/api/formation-card/${primary}`;
  const cardAlt = `ParablePath ${profile.storyName} Story formation card. You may be living in the ${profile.storyName} Story. You are invited to become a ${profile.callingName}.`;
  const panel = "background:#ffffff;border:1px solid #ded7ca;border-radius:16px;padding:24px;margin:16px 0";
  return `<!doctype html><html><head><meta name="viewport" content="width=device-width,initial-scale=1"><title>Your ParablePath reflection: ${escapeHtml(profile.callingName)}</title></head><body style="margin:0;background:#f3efe6;color:#092745;font-family:Arial,sans-serif"><div style="display:none;max-height:0;overflow:hidden">${escapeHtml(cardAlt)}</div><main style="max-width:760px;margin:0 auto;padding:24px 12px 44px">
  <header style="padding:18px 10px;text-align:center"><img src="${origin}/parablepath-full-logo.png" width="360" alt="ParablePath — House of Stories" style="display:block;width:100%;max-width:360px;height:auto;margin:0 auto"></header>
  <section aria-label="Your full primary formation card"><img src="${cardUrl}" width="736" alt="${escapeHtml(cardAlt)}" style="display:block;width:100%;height:auto;border:0;border-radius:18px"></section>
  <section style="${panel}"><p style="margin:0;color:#a15c3b;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase">Your Story Landscape</p><h2 style="font-family:Georgia,serif;font-size:28px;margin:10px 0 14px">Several stories can be present at once.</h2><p style="font-size:14px;line-height:1.6;color:#596a60">These are interacting story patterns, not fixed personality types. You may recognize them differently in different seasons.</p><table role="presentation" width="100%" cellspacing="0" cellpadding="9" style="font-size:14px"><tr><td><b>Primary story</b></td><td>${escapeHtml(roomById[primary].name)}</td></tr><tr style="background:#f7f3eb"><td><b>Secondary story</b></td><td>${escapeHtml(roomById[secondary].name)}</td></tr><tr><td><b>Nearby pattern</b></td><td>${escapeHtml(roomById[third].name)}</td></tr></table></section>
  <section style="${panel}"><p style="margin:0;color:#a15c3b;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase">AI-assisted combined-story reflection</p><h2 style="font-family:Georgia,serif;font-size:25px;margin:20px 0 8px">Why this may fit</h2><p style="font-size:15px;line-height:1.7;margin:0">${paragraphs(reflection.whyThisMayFit)}</p><h2 style="font-family:Georgia,serif;font-size:25px;margin:24px 0 8px">How these stories may interact</h2><p style="font-size:15px;line-height:1.7;margin:0">${paragraphs(reflection.storyInteraction)}</p><h2 style="font-family:Georgia,serif;font-size:25px;margin:24px 0 8px">What Jesus disrupts</h2><p style="font-size:15px;line-height:1.7;margin:0">${paragraphs(reflection.whatJesusDisrupts)}</p></section>
  <section style="${panel}"><p style="margin:0;color:#a15c3b;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase">Metanoia question</p><p style="font-family:Georgia,serif;font-size:23px;line-height:1.4;margin:12px 0 24px">${paragraphs(reflection.metanoiaQuestion)}</p><p style="margin:0;color:#a15c3b;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase">One next faithful step</p><p style="font-size:15px;line-height:1.7;margin:12px 0 0">${paragraphs(reflection.nextFaithfulStep)}</p></section>
  <div style="text-align:center;padding:12px 0"><a href="${resultUrl}" style="display:inline-block;background:#0b3b29;color:#fff;text-decoration:none;border-radius:999px;padding:15px 24px;font-weight:700;margin:5px">Reopen my result</a><a href="${cardUrl}" style="display:inline-block;background:#fff;color:#0b3b29;text-decoration:none;border:1px solid #0b3b29;border-radius:999px;padding:14px 24px;font-weight:700;margin:5px">Download full-size card</a></div>
  <footer style="padding:24px 12px;text-align:center;font-size:12px;line-height:1.65;color:#68736d"><p>${escapeHtml(safetyDisclaimer)}</p><p>This email was requested from the ParablePath result page. The delivery email address is not attached to the anonymous assessment record.</p></footer>
  </main></body></html>`;
}

export { safetyDisclaimer };
