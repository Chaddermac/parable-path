# ParablePath Holiday Edition

The separate `/holiday` feature adds a 16-question seasonal reflection to the existing Next.js App Router site. No existing assessment, scoring, result page, dependency manifest, routing middleware, or database is changed. Shared logo, colors, button styles, and calling icons are reused. New result descriptions are seasonal editorial copy; the approved questions and official calling mapping are preserved.

## Preview

Install using the repository's locked dependencies, then use `pnpm dev` and open `/holiday`. Run `pnpm typecheck`, `pnpm test`, and `pnpm build`. The existing root layout fetches Google Fonts at build time and requires network access. Holiday quizzes and results need no database credentials. With a built server running, execute `node tests/holiday-http.mjs http://127.0.0.1:3000` to check the actual framework routes, all cards, ties, and analytics boundaries.

## Behavior

- Four radio answers per question, independently shuffled on each start using Fisher–Yates. The order stays stable when navigating backward.
- Next stays disabled until an answer is selected. All previous selections remain in memory through backward navigation and edits. Refresh starts over; no answers are saved remotely or in local storage.
- Each selected answer adds one point to its separate pattern ID. All eight categories have eight opportunities and a maximum score of eight.
- Every highest-scoring category is a co-leader, with equal presentation and no tie-break. Every category one point below the highest is offered as an additional story.
- `/holiday/results/lost` through `/holiday/results/distraction` are the eight standalone seasonal results. Co-leaders share one route, e.g. `/holiday/results/lost~control`. Optional `also` contains close-secondary story identifiers. These links include no scores, answers, participant identifiers, or assessment IDs.
- Public result pages can be viewed directly; they are story descriptions, not proof someone completed an assessment.
- Native sharing shares the story URL. Copy link remains available. Unsupported/failed clipboard access reveals a selectable URL. Downloads provide 1200×630 PNG cards. Eight cards use the existing eight calling icons; quiz and tied-result preview cards are also generated.
- CTA: `https://parablepath.app/?utm_source=parablepath.com&utm_medium=holiday_quiz&utm_campaign=holiday_edition`. The root destination was verified on November 11, 2026: 308 to `www.parablepath.app`, then 200. No assessment deep link was assumed.

## Analytics

No analytics provider or tracking SDK was present in the inspected repository. This feature adds a same-origin `/api/holiday/events` endpoint that writes JSON events to application logs under `source: holiday`. No new dependency or database was introduced. To report production analytics, use the hosting platform's log retention/export or attach a retained log drain before the pilot. Logs alone are not a persistent analytics dashboard.

Events: `page_view`, `quiz_start`, `question_view`, `question_answered`, `quiz_complete`, `result_view`, `share`, `copy_link`, `download_card`, `app_click`, `quiz_exit`. Completion includes elapsed seconds, co-leader IDs, secondary IDs, and whether it was tied. Question events contain question number only. The endpoint discards unrecognized fields, including raw answers, and honors Do Not Track. No cookies, email, account, participant ID, user agent, or referrer is collected by feature code. Hosting infrastructure may maintain its own request logs. Page-hide exit events are best effort.

Use starts/completions for a rough completion rate, question event counts for aggregate drop-off, `quiz_complete` for result/tie distributions and elapsed time, and `app_click` relative to completed quizzes for a rough conversion measure. Repeat navigation and shared-page visits mean these are event counts, not unique-person metrics. Separate `result_view` from `quiz_complete` when analyzing result distribution.

## Pilot and launch gate

Automated simulation is a scoring check, not psychological validation or human usability testing. Do not describe this promotional quiz as a validated instrument.

Before public launch, recruit 20–30 testers on representative mobile devices, including Facebook/Instagram in-app browsers. Record aggregate completion, completion time, confusing questions, whether results reflect their choices, and whether the experience is fun/easy. Review all tied results, sharing/copy/download, keyboard and screen-reader behavior. Check the host's configured log retention and exclude staff QA traffic from pilot reporting.

Pilot targets from the brief: 75% completion; approximately 3–4 minutes; 75% fun/easy feedback; 20% result-to-app clicks. These are proposed targets, not measured performance. A human pilot cannot be completed by synthetic tests; it remains outstanding.

No deployment, production traffic change, or alteration to full assessment results is required to review this feature.
