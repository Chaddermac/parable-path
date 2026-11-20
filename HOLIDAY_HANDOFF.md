# Holiday Edition engagement handoff

## Current scope

The Next.js website sends participants straight to the live app's existing public `/story-types/<slug>` pages. The app is a separate Expo deployment/repository; this change does not alter it. No account or second assessment is required by the website. The receiving app's contextual welcome remains a separate app task, not a completed feature in this PR.

Verified app slugs: table-maker, multiplier, healer, mentor, bridger, innovator, waymaker, awakener. Holiday names and calling relationships remain unchanged. Character comparisons are text-only editorial illustrations, not official typologies or affiliated film content.

## Receiving query contract

Example: `https://www.parablepath.app/story-types/awakener?source=holiday&utm_source=parablepath.com&utm_medium=holiday_quiz&utm_campaign=holiday_edition&utm_content=awakener&placement=result&holiday_result=distraction&holiday_calling=awakener`

- `source=holiday`: opt into the contextual welcome, not authentication.
- `holiday_result`: canonical room ID, one of lost/scarcity/control/stalled/boundary/settling/delay/distraction.
- `holiday_calling` and `utm_content`: corresponding route slug.
- `placement`: result, challenge, or parable.
- Never send answers, scores, names, email addresses, participant IDs, or account state.
- No-match uses `/story-types`, `utm_content=no-match`, and no claimed result.

The app should validate the room/slug pair against its canonical data, ignore unknown or conflicting values, and render a dismissible welcome: “You came here as The Moment Maker. Holiday Edition connected your result with the Awakener story. Want to see where this story shows up beyond Christmas?” Offer the existing story screen, full assessment, and that calling's practice. Do not infer a full-assessment score or overwrite a saved story from these public query parameters. No mandatory reassessment.

## Measurement

Existing anonymous same-origin log events and Do Not Track handling are preserved. New view events fire on actual section visibility, not merely server rendering; challenge content is optional. App clicks include an allowlisted story and placement. The log endpoint continues to discard unknown fields, including PII. `scripts/holiday-pilot-report.mjs` summarizes funnel event counts, placements, story breakdowns, feedback, and event ratios from retained log exports.

The desired *percentage of completed users* who continue to the app cannot be measured exactly without identifiers. This release reports anonymous app-click events / completion events as a proxy, clearly labeled. Shared results, repeat clicks, incomplete log retention and DNT can skew ratios or make them exceed 100%. No participant tracking is added to claim a more precise metric. Configure adequate existing host log retention/export for longitudinal reporting; this PR does not create a durable analytics database.

## Preserved behavior

## Share and Keep exports

Result controls now distinguish Share Cards (recognition, text-only movie energy, calling, superpower, CTA) from Keep Cards (the Survival Guide). `mode=share|keep` is validated by the existing image route. Default square/story/landscape cards are social; portrait Share Cards add just a Watch Out and Try This. All wallpaper requests resolve to a minimal Keep Card with one practice and no promotional CTA, with generous clock/control margins. Device-specific crops still need a lock-screen preview. Multiway-tie image URLs retain an equal-weight summary; result-page controls let each tied story be downloaded individually in either mode. No tied result is promoted to a sole winner.

Image URLs are versioned `winter-9`; download names include mode and format. Share Cards use the approved recognition, movie-energy, Holiday Tell, superpower, and social-prompt copy set for all eight stories. Anonymous share/copy/download events include allowlisted `format` and `card_mode`, and the report groups download counts by these values. No new identity tracking is introduced. The website Survival Guide remains available regardless of export choice.

The 16 questions already include White Elephant, scented candles, family group texts, holiday photos, and December 23. Questions, answer mappings, shuffle behavior, scoring, all co-leaders, one-point secondary stories, no-match choices, and tentative/insufficient thresholds are untouched. Reduced-motion users skip the 1.45-second reveal. All five image sizes remain supported; versioned URLs invalidate old social graphics. Existing official artwork remains unchanged.
