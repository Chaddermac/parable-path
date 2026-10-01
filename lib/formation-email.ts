import { roomById } from "./content.ts";
import { formationResultByRoom, formationStoryInvitation } from "./parablepath/popular/results.ts";
import type { AiResult, RoomId } from "./types.ts";

const safetyDisclaimer = "ParablePath is a spiritual reflection aid, not a fixed label, personality test, clinical diagnosis, prophecy, counseling, or crisis care. Hold this result lightly. You may recognize more than one story, or different stories in different seasons.";
const escapeHtml = (value: string) => value.replace(/[&<>"']/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" }[character] || character));
const paragraphs = (value: string) => escapeHtml(value).replaceAll("\n", "<br>");

function numbered(items: readonly string[], accent: string) {
  return items.map((item, index) => `<tr><td width="38" valign="top"><span style="display:inline-block;width:28px;height:28px;line-height:28px;border-radius:50%;background:${accent};color:#fff;text-align:center;font-weight:700">${index + 1}</span></td><td style="padding:2px 0 10px;font-size:15px;line-height:1.55;color:#092745">${escapeHtml(item)}</td></tr>`).join("");
}

export function renderFormationResultEmail(input: { responseId: string; primary: RoomId; secondary: RoomId; third: RoomId; reflection: AiResult; origin?: string }) {
  const { responseId, primary, secondary, third, reflection } = input;
  const origin = input.origin || "https://www.parablepath.app";
  const profile = formationResultByRoom[primary];
  const resultUrl = `${origin}/results/${responseId}`;
  const cardUrl = `${origin}/api/formation-card/${primary}`;
  const story = roomById[primary];
  const panel = "background:#ffffff;border:1px solid #ded7ca;border-radius:16px;padding:24px;margin:16px 0";
  return `<!doctype html><html><head><meta name="viewport" content="width=device-width,initial-scale=1"><title>Your ParablePath reflection: ${escapeHtml(profile.callingName)}</title></head><body style="margin:0;background:#f3efe6;color:#092745;font-family:Arial,sans-serif"><div style="display:none;max-height:0;overflow:hidden">You may be living in the ${escapeHtml(profile.storyName)} Story. You are invited to become a ${escapeHtml(profile.callingName)}.</div><main style="max-width:720px;margin:0 auto;padding:24px 12px 44px">
  <header style="padding:18px 10px;text-align:center"><div style="font-family:Georgia,serif;font-size:38px;font-weight:700">ParablePath</div><div style="margin-top:5px;font-size:11px;letter-spacing:4px">HOUSE OF STORIES</div></header>
  <section style="background:#fbf8ef;border:1px solid #d9d0bc;border-top:8px solid ${profile.accent};border-radius:22px;padding:28px 24px;box-shadow:0 12px 34px rgba(24,45,34,.09)">
    <p style="margin:0;color:${profile.accent};font-size:12px;font-weight:700;letter-spacing:2px">YOUR PARABLEPATH RESULT</p>
    <h1 style="font-family:Georgia,serif;font-size:38px;line-height:1.05;color:#0b3b29;margin:12px 0">You may be living in the ${escapeHtml(profile.storyName)} Story.</h1>
    <p style="font-family:Georgia,serif;font-size:26px;line-height:1.2;color:${profile.accent};margin:0 0 24px">You are invited to become a ${escapeHtml(profile.callingName)}.</p>
    <h2 style="font-family:Georgia,serif;font-size:26px;margin:0 0 8px">Your Redemptive Calling</h2><p style="font-size:15px;line-height:1.65;margin:0">${escapeHtml(profile.callingDescription)}</p>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-top:1px solid #d9d0bc;margin-top:22px;padding-top:20px"><tr><td width="46%" valign="top" style="padding-right:18px"><b style="font-size:11px;letter-spacing:2px;color:${profile.accent}">FALSE STORY</b><p style="font-family:Georgia,serif;font-size:24px;line-height:1.15;margin:8px 0">“${escapeHtml(profile.falseStory)}”</p></td><td valign="top" style="border-left:1px solid #d9d0bc;padding-left:18px"><b style="font-size:11px;letter-spacing:2px;color:${profile.accent}">SHADOW SIDE: ${escapeHtml(profile.shadowName.toUpperCase())}</b><p style="font-size:14px;line-height:1.55;margin:8px 0">${escapeHtml(profile.shadowDescription)}</p></td></tr></table>
    <div style="background:${profile.accentSoft};border-radius:14px;padding:20px;margin-top:18px"><h2 style="font-family:Georgia,serif;font-size:25px;margin:0 0 12px">Ways to live into your true story</h2><table role="presentation" width="100%">${numbered(profile.practices, profile.accent)}</table></div>
    <div style="border-bottom:1px solid #d9d0bc;padding:20px 0"><h2 style="font-family:Georgia,serif;font-size:25px;margin:0 0 7px">Read the parable</h2><p style="font-size:14px;line-height:1.55;margin:0"><b>STORY Invitation:</b> ${escapeHtml(formationStoryInvitation)}<br><b>Parable references:</b> ${escapeHtml(profile.parableReferences)}</p></div>
    <div style="padding-top:18px"><h2 style="font-family:Georgia,serif;font-size:25px;margin:0 0 12px">Next Steps</h2><table role="presentation" width="100%">${numbered(profile.nextSteps, profile.accent)}</table></div>
  </section>
  <section style="${panel}"><p style="margin:0;color:#a15c3b;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase">Your Story Landscape</p><h2 style="font-family:Georgia,serif;font-size:28px;margin:10px 0 14px">Several stories can be present at once.</h2><p style="font-size:14px;line-height:1.6;color:#596a60">These are interacting story patterns, not fixed personality types. You may recognize them differently in different seasons.</p><table role="presentation" width="100%" cellspacing="0" cellpadding="9" style="font-size:14px"><tr><td><b>Primary story</b></td><td>${escapeHtml(story.name)}</td></tr><tr style="background:#f7f3eb"><td><b>Secondary story</b></td><td>${escapeHtml(roomById[secondary].name)}</td></tr><tr><td><b>Nearby pattern</b></td><td>${escapeHtml(roomById[third].name)}</td></tr></table></section>
  <section style="${panel}"><p style="margin:0;color:#a15c3b;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase">AI-assisted combined-story reflection</p><h2 style="font-family:Georgia,serif;font-size:25px;margin:20px 0 8px">Why this may fit</h2><p style="font-size:15px;line-height:1.7;margin:0">${paragraphs(reflection.whyThisMayFit)}</p><h2 style="font-family:Georgia,serif;font-size:25px;margin:24px 0 8px">How these stories may interact</h2><p style="font-size:15px;line-height:1.7;margin:0">${paragraphs(reflection.storyInteraction)}</p><h2 style="font-family:Georgia,serif;font-size:25px;margin:24px 0 8px">What Jesus disrupts</h2><p style="font-size:15px;line-height:1.7;margin:0">${paragraphs(reflection.whatJesusDisrupts)}</p></section>
  <section style="${panel}"><p style="margin:0;color:#a15c3b;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase">Metanoia question</p><p style="font-family:Georgia,serif;font-size:23px;line-height:1.4;margin:12px 0 24px">${paragraphs(reflection.metanoiaQuestion)}</p><p style="margin:0;color:#a15c3b;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase">One next faithful step</p><p style="font-size:15px;line-height:1.7;margin:12px 0 0">${paragraphs(reflection.nextFaithfulStep)}</p></section>
  <div style="text-align:center;padding:12px 0"><a href="${resultUrl}" style="display:inline-block;background:#0b3b29;color:#fff;text-decoration:none;border-radius:999px;padding:15px 24px;font-weight:700;margin:5px">Reopen my result</a><a href="${cardUrl}" style="display:inline-block;background:#fff;color:#0b3b29;text-decoration:none;border:1px solid #0b3b29;border-radius:999px;padding:14px 24px;font-weight:700;margin:5px">Download full-size card</a></div>
  <footer style="padding:24px 12px;text-align:center;font-size:12px;line-height:1.65;color:#68736d"><p>${escapeHtml(safetyDisclaimer)}</p><p>This email was requested from the ParablePath result page. The delivery email address is not attached to the anonymous assessment record.</p></footer>
  </main></body></html>`;
}

export { safetyDisclaimer };
