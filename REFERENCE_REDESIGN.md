# Image-reference redesign

This revision uses the two user-attached files `ChatGPT Image Nov 11, 2026 at 04_58_31 PM-1.png` and `ChatGPT Image Nov 11, 2026 at 04_58_31 PM-2.png` as visual references.

## Implementation

- Reference one guides the serif official wordmark, lavender Holiday Edition capsule, navy/gold top CTA, dark navy hero headline, gold hero CTA, navy/gold globe, glossy colored orbit badges, snowflakes, snowfall, snowbanks, pines, feature highlights, and the embedded frosted questionnaire with pastel letter pills.
- Reference two guides the compact eight-globe typology row and the result-page composition: a meaningful-season hero, official calling globe, horizontal frosted result panel, practical invitation/challenge, and restrained coral actions.
- Navigation, copy, counters, progress, questions, answers, previews, result articles, challenges, and sharing/download controls are native React/HTML. No mockup screenshot is a background or a flattened interface.
- The exact approved question bank, answer mappings, independent scoring, tied-leader handling, close-secondary handling, and deeper-app destination are unchanged. Mockup example questions and sample parable claims were not substituted for approved content. No sign-in or authentication was added to this account-free experience.
- The first real question is rendered below the hero. Starting scrolls to it. Answer shuffling happens once on hydration. Beginning again through a CTA while answering does not reset progress. The first actual interaction starts completion timing and analytics. Back and editing remain available. Keyboard focus stays on the radio during the first selection, and moves to the question after navigation.
- All eight official typology images remain unchanged. Updated generic trees, snowflakes, stars, and heart icons are seasonal decoration only.

## Assets

Built-in ImageGen produced isolated illustrations using the supplied mockups as references. They were optimized with alpha to WebP and saved in the project:

- `public/holiday/reference-globe.webp`: chapel and lit pines inside glass, navy pedestal with gold trim, evergreen sprigs and berries. The official emblem is a separate image over the blank medallion.
- `public/holiday/reference-trees.webp`: foreground pine-and-gift decoration beside the questionnaire.
- `public/holiday/reference-wordmark.png`: trimmed/resized from the existing official `public/parablepath-full-logo.png`. Its symbol and serif lettering are preserved. Social exports use this same official wordmark.

The existing generic globe/village asset is retained in source history/assets; the current landing page uses the new reference-derived illustration.

### Globe prompt

Use case: precise-object-edit / illustration-story. These two images are visual references for a website. Create ONLY a production illustration asset: isolate and faithfully reproduce the hero snow globe from the FIRST reference in its same polished simplified illustrated Christmas style, with visual lighting and soft snow treatment from both references. Transparent background, no website layout. A large spherical icy blue glass globe with white rim and delicate sparkles, a warm eight-point Christmas star above a small snow-covered chapel and two evergreen Christmas trees with subtle warm lights. The globe rests on a short dark NAVY pedestal, warm GOLD rim at the top, small blank circular gold medallion at the front to receive the existing official emblem in HTML. Evergreen sprigs with red berries flank the pedestal; a small mound of snow beneath it. Entire asset centered, fully visible, generous transparent margins. Match reference 1's proportions, pale lavender/blue glass, clean painterly dimensional illustration, not a realistic photo. No floating icon badges, no surrounding webpage, no text, no headings, no buttons, no labels, no mockup, no generated logo. Genuine transparent cutout only.

### Tree prompt

Use case: illustration-story. Create a standalone transparent decorative illustration matching the bottom LEFT Christmas tree-and-gift cluster in this reference, not the website. Two elegant snow-covered evergreen Christmas trees of different heights, restrained warm golden fairy lights, two gift boxes in white and frosted lavender with warm gold and lavender ribbon bows, a few evergreen sprigs and red berries, all resting on a small soft white snow mound. Faithfully match the reference's clean painterly dimensional winter storybook illustration and pale icy blue/lavender shadows. Tall narrow composition, fully visible, transparent margins, genuinely transparent background. No snow globe, no text, no labels, no UI, no logo, no screenshot. Only this small decorative cluster for use beside a native HTML quiz card.

## Verification and launch

Use `node --experimental-strip-types --test tests/*.test.ts`, TypeScript, the production build, and `node tests/holiday-http.mjs http://127.0.0.1:3117` against a running server. The HTTP suite now checks that the landing page contains the actual first question and four native radio inputs below the hero, in addition to all outcomes, ties, PNG formats, and analytics boundaries.

The original real-device pilot, native share-sheet / in-app-browser review, screen-reader audit, and production analytics retention remain launch checks. This visual revision does not merge or launch production.

The coral action gradient was darkened slightly after contrast measurement: white text on its lightest endpoint is approximately 4.66:1.
