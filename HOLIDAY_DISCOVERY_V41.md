# Holiday discovery questions and scoring — Version 4.1

The live route remains `/holidayedition`; `/holiday` redirects for compatibility. Version 4.1 replaces all 16 question titles, prompts, and responses with the approved brief. The first four responses are shuffled once per page load; `no_match` stays fifth and awards zero. Selection and backward edits stay in component memory. No answer-history array is transmitted or persisted.

Scoring uses category identifiers, validates every question (including sparse unanswered arrays), and returns eight category totals, scored/no-match counts, the highest and second-highest scores, their difference, all tied leaders, and all positive alternatives one point behind. A zero-point quiz has no leaders. Counts 12–16 show ordinary results, 8–11 show tentative suggestions, and 0–7 show a neutral no-clear-match screen with the full-assessment CTA. These are provisional pilot interpretation rules, not confidence statistics. Qualified shared links preserve the response count; tentative share graphics use an explicit exploratory label.

Results, questions and standard assessment code are separate: official artwork, Version 2 descriptions, the winter design, and the full ParablePath scoring system remain intact. Result-fit feedback is optional, submitted once per mounted result page, and never changes the score. Tied categories receive the same feedback attribution.

## Privacy-conscious pilot reporting

The existing `/api/holiday/events` handler writes allowlisted structured events to Vercel runtime logs using the existing retention/drain configuration. There is no new database, cookie, participant identifier, contact field, or tracking service. Do Not Track and same-origin checks remain active. Completion summaries contain category totals rather than individual story-answer histories. Final question-level no-match booleans are emitted separately, once at completion, so going back and editing does not inflate question rates. Thus question-level rates cover completed quizzes, not abandoned sessions.

The server recomputes the completion summary from validated totals and rejects impossible opportunity counts. It discards raw answers and unknown fields. It cannot verify that an anonymous client is a unique person or prevent synthetic events; pilot numbers are event counts, not unique-person estimates.

Export retained structured log messages as NDJSON, then run:

```sh
node scripts/holiday-pilot-report.mjs < holiday-events.ndjson > holiday-pilot-report.json
```

The report filters to Version 4.1 and shows starts, completions, no-match totals and their distribution per completed quiz, story distribution (all ties counted equally), ties, close alternatives, tentative/insufficient totals, category-level result-fit feedback, app click events, and per-question no-match rates. A rate at or above 25% marks `editorialReview: true`; it does not exclude or reweight a question. No observations yield a null rate and no flag. Small samples require editorial judgment. Aggregation requires exported logs retained by the existing deployment; this change does not create a persistent analytics dashboard or modify retention.

## Validation

Run `npm test` (or the equivalent Node test command), a production build, and `node tests/holiday-http.mjs http://127.0.0.1:PORT` against the built server. The HTTP suite includes all eight results, ties, tentative/no-clear-match boundaries, five native answers, existing PNG formats, redirects, feedback/input validation, DNT and origin checks. Browser review covers keyboard radios, backward edits, no-match completion, tentative feedback, and mobile widths.
