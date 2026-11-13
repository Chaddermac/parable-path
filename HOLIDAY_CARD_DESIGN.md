# Holiday reveal and download designs

The native reveal cards use story-tinted winter gradients, snow, gold stars and pine silhouettes. Official typology artwork and the approved result descriptions stay unchanged. Body font sizes stay unchanged. Extra leading is reduced 40%: a 1.6 line height becomes 1 + (0.6 × 0.6) = 1.36, rather than shrinking the entire line box below the glyph height. Bullet margins change from 20px to 12px on mobile; section gaps change from 24px to 14.4px on mobile and 40px to 24px on desktop. Related margins and card padding also use the 0.6 factor. Touch targets retain their usable sizes.

Download graphics are rendered as real PNGs using the existing Next ImageResponse endpoint. They include the official icon in a snow globe, the seasonal result and calling, a concise recognition hook, the approved short gift line and challenge, and a quiz invitation/address. The palette matches the website: icy blue and lavender backgrounds, navy text, muted teal labels, warm gold, snow and trees. Official story colors remain in the globe icons. Ties show every tied icon equally; tentative graphics remain explicitly exploratory. The no-clear-match result still assigns no story.

Formats: 1200×630 social preview, 1080×1080 square, 1080×1350 portrait, 1080×1920 social story, and 1440×3120 phone wallpaper. The wallpaper reserves 520px above content for the lock-screen clock and 200px below content for phone controls. Exact placement can vary with device settings and cropping. The preview follows the selected format, and downloads have descriptive story filenames. Versioned URLs replace old cached graphics.

The export renderer loads bundled static Inter Latin regular/bold WOFF files, sourced from @fontsource/inter 5.3.0. Its SIL Open Font License is included in `public/holiday/fonts/OFL.txt`. No runtime external font requests are required. The Node image route allows up to 30 seconds for the larger wallpaper render.

Questions, scoring, pilot thresholds, optional feedback, anonymous analytics and the full ParablePath assessment are unchanged.
