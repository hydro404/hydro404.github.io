# BU-CSM portfolio preview

Sample cover treatment for the portfolio, created on November 5, 2026 with the built-in image generation tool.

Reference: https://survey.bicol-u.edu.ph/

- `source-desktop.jpg`: live survey captured at a 1440 × 900 viewport.
- `source-mobile.jpg`: live survey captured at a 390 × 844 viewport.
- `public/images/projects/bu-csm-portfolio.webp`: desktop cover, 1774 × 887 (2:1), approximately 108 KB.
- `public/images/projects/bu-csm-portfolio-mobile.webp`: mobile cover, 1448 × 1086 (4:3), approximately 115 KB, selected at viewport widths up to 600px.

The covers are AI-composited presentations based on the real screens. They are portfolio artwork, rather than unaltered screenshots. The original `public/images/projects/bu-csm.png` is preserved. No other project preview was changed.

## Verification

- `npm run check`: 0 errors, warnings, or hints.
- `npm run build`: 12 pages generated.
- `npm run test:site`: 227 internal links/assets passed.
- Browser review: desktop and mobile detail views, plus project cards at widths from 320px to 1440px. Mobile artwork and 4:3 sizing selected through 600px; larger widths selected the 2:1 artwork. No horizontal overflow at the reviewed widths. Legacy project images retained their original sources.
- `portfolio-desktop.jpg` and `portfolio-mobile.jpg` show the integrated cover in the portfolio.

## Desktop prompt

+Use case: compositing / ui-mockup.
Create a premium portfolio project cover for Bicol University's iBU-CSM survey, landscape exactly 2:1, ideally 2400x1200.
Input image 1 is the actual desktop website screenshot; input image 2 is the actual mobile website screenshot. These are supporting screen inserts, not inspiration for redesign. Preserve their real UI, logo, illustration, blue wave header, text, campus and office dropdowns, and orange Proceed button. Do not invent dashboards or features.
Composition: polished, nearly front-facing floating desktop browser window filling most of the frame, from x~6% to x~85%, with a slim elegant dark-silver smartphone overlapping the lower-right corner from x~77% to x~94%. Main browser shows input 1, phone shows input 2. No laptop keyboard. Screens large and sharp; actual form and heading left of the desktop remain unobscured. Keep full phone and browser inside canvas with safe margins. Browser chrome is thin, quiet, light gray with three tiny neutral controls; no big address bar text. Very gentle depth/perspective, restrained realistic shadows, refined hardware edges.
Backdrop: very pale glacial blue #EAF4FD with a subtle cool blue falloff and quiet studio lighting. White and soft blue, original vivid azure and orange only inside real screens. No extra titles, captions, floating UI, decorative blobs, badges, charts or watermarks. The screen content is the hero. Balanced full-frame composition with little dead space. Professional software portfolio art direction, crisp high-resolution finish.

## Mobile prompt

+Use case: compositing / ui-mockup.
Create a compact responsive portfolio cover for Bicol University's iBU-CSM survey, landscape 4:3, ideally 1600x1200.
Input image 1 is the actual desktop website screenshot; input image 2 is the actual mobile website screenshot. Preserve the actual interface, logo, illustration, blue wave header, survey heading, campus and office dropdowns and orange Proceed button. Use the actual screen content faithfully, no redesigned interface, no invented dashboard.
Art direction matches a premium pale glacial blue #EAF4FD studio product showcase: a very large nearly front-facing desktop browser behind, anchored on the left and occupying about 85% of the width, with a slim dark-silver phone in front on the right. The phone should be around 36% of total canvas width and about 87% of canvas height so its full real mobile screenshot is easy to recognize at a 360px portfolio-card width. The desktop's left survey heading/form remain visible; the phone may overlap the desktop's illustration at right. Use minimal browser chrome, barely any perspective and subtle realistic shadows. Keep devices fully inside a compact balanced canvas, generous enough edge safety but no large empty area. Phone screen uses input image 2 exactly. Desktop screen uses input image 1. No laptop keyboard, no outside text, no labels, no decorations or watermarks. Crisp, polished portfolio presentation focused on the real product.
