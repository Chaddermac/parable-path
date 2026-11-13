# ParablePath: Find Your Room

A mobile-responsive spiritual reflection MVP built with Next.js, TypeScript, and Tailwind CSS. Content and guardrails live in [`PROJECT_BRIEF.md`](./PROJECT_BRIEF.md).

## Local development

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Routes

- `/` — landing page
- `/start` — instructions and informed consent
- `/assessment` — 24 Likert items and one forced-choice item
- `/reflect` — open reflection
- `/results/[id]` — deterministic result and next step
- `/feedback/[id]` — local feedback form

## Data and scoring

The formation assessment contains 40 statements across eight rooms and five dimensions. Browser storage retains drafts, results, and pending response saves. With consent, server routes save anonymous responses to Supabase and generate an OpenAI-assisted reflection that is reused in the result and optional email. Configuration remains server-side. The separate `/fun` experience has 16 prompts and its own deterministic scoring; see the scoring tests and route documentation below.


## Public web routes (October 2026)

- `https://parablepath.com/`: the deeper formation experience previously hosted on `.app`.
- `/start`, `/assessment`, `/reflect`, `/results/<saved-id>`, `/feedback/<saved-id>`: formation journey.
- `/fun`, `/fun/assessment`, `/fun/results/<story-slug>`: the lighter 16-question experience.
- Old `/results/<story-slug>` and `/results?room=<story-slug>` links redirect to `/fun/results/<story-slug>`.
- Explicit `/experiences/formation/...` paths remain available for compatibility with legacy `.app` result and assessment links.

The public app retains its existing server-side Supabase configuration and assessment version markers. No data or schema migration is part of this routing change. The separate StoryLab pilot at `parablepath.app` uses a separate Vercel project and Supabase project; never copy its configuration into this app.

New formation emails link to `.com`; previously sent `.app` links continue through the pilot site's legacy compatibility routes. Light-result sharing and retakes use `/fun`, and the deeper invitation opens `.com/start`.

## Public website design

The `.com` website shares the app's cream/navy/gold identity, locally hosted Plus Jakarta Sans fonts, and exact medallion artwork. `lib/website.ts` maps public story slugs to the existing canonical room/result data; the app's shorter wheel labels do not rename stored rooms or callings. The balanced, keyboard-accessible wheel links to all eight public story pages.

Public routes include `/how-it-works`, `/story-types`, `/story-types/[slug]`, `/parables`, `/parables/[slug]`, `/about`, `/privacy`, `/terms`, and `/contact`. They use website navigation and a footer rather than the app's bottom tabs, installation prompts, or account controls. Public pages have canonical URLs and a sitemap; assessment and saved-result routes are excluded from the sitemap.

The main 40-statement assessment and `/fun` remain separate. `StoryProfileCard` renders the canonical formation card as selectable HTML on the website. Existing PNG downloads, stored AI reflections, email generation, and Supabase API routes remain in place. The separate `.app` deployment and its Supabase configuration are unchanged by this redesign.
