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
