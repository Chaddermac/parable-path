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

All assessment responses, result records, chosen next steps, and feedback are saved to `localStorage`; nothing is transmitted. Each room has three questions scored from 1–5, producing a range of 3–15. Rooms are ranked by total score. The false-story forced choice breaks an exact score tie but never adds points. No AI API or database is connected in this version.


## Public web routes (October 2026)

- `https://parablepath.com/`: the deeper formation experience previously hosted on `.app`.
- `/start`, `/assessment`, `/reflect`, `/results/<saved-id>`, `/feedback/<saved-id>`: formation journey.
- `/fun`, `/fun/assessment`, `/fun/results/<story-slug>`: the lighter 16-question experience.
- Old `/results/<story-slug>` and `/results?room=<story-slug>` links redirect to `/fun/results/<story-slug>`.
- Explicit `/experiences/formation/...` paths remain available for compatibility with legacy `.app` result and assessment links.

The public app retains its existing server-side Supabase configuration and assessment version markers. No data or schema migration is part of this routing change. The separate StoryLab pilot at `parablepath.app` uses a separate Vercel project and Supabase project; never copy its configuration into this app.

New formation emails link to `.com`; previously sent `.app` links continue through the pilot site's legacy compatibility routes. Light-result sharing and retakes use `/fun`, and the deeper invitation opens `.com/start`.
