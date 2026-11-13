# Portfolio design direction

Audience: recruiters and engineering hiring teams evaluating a Full-Stack Software Engineer. The first screen should establish the role and identity, with a clear path to software evidence and the résumé.

## Tokens

- Paper `#f8f9f5`: light, quiet canvas.
- Ink `#18201e`: headings and primary text.
- Muted `#59615f`: readable secondary text.
- Cobalt `#2949db`: navigation emphasis and primary actions.
- Line `#d9ddd6`: meaningful separation.
- Surface `#ffffff`: image and content surfaces.

Manrope is the single type family: the person's name, a stable professional title, quiet section names, and comfortable body copy. The content hierarchy takes inspiration from 800k.dev, while keeping this portfolio's margin labels, light palette, cobalt accent, and original project photography. No fabricated product UI, skill percentages, rotating job titles, award counts, or employment availability.

## Layout

A margin column runs down every page. It holds the portrait at the top, then each section's name, which stays in view while its section scrolls. Content reads down the right.

```
luis grado.                   Work  Experience  Achievements  Let's talk

[portrait]   Luis Anthony Grado
             Full-Stack Software Engineer
             Short statement covering applications, systems, automation
             GitHub  LinkedIn  Download résumé
             Based in the Philippines

Work         [ photo ]     [ photo   ]
             [ photo ]     [ photo   ]   (seven projects)
Tech stack   Category      Logos with labels, six rows
Experience   Date          Role, organization, one line
Education    Degree, school, scholarship
Coaching     Date          Result, event, my role (five highlights)
Let's talk   One statement, then ways to reach me
```

The site has two pages: this homepage and Achievements. The homepage leads with software work. All seven projects have equal visual weight, with two columns on desktop and one on mobile. Keep it plain: no cards around text, numbered headings, all-caps labels, or stat tiles. Contrast, focus indicators, mobile navigation, image dimensions, and reduced motion are part of the base implementation. The tech stack is grouped into six categories from the owner's own list; each project's badges reflect its actual recorded technologies. HTML, CSS, and JavaScript are omitted from badge presentation while historical descriptions remain accurate.

## Projects

Projects have no pages of their own. A card opens a modal at `/#slug`, so a project can be shared by link and the Back button closes it. Modals show larger photos, descriptions, roles, readable technology logos, and contributions; a Try it action is rendered only for a supplied public URL. The sticky Close button, Escape, and backdrop restore focus and the previous scroll position. Native modified-click behavior is retained. Without JavaScript the same link shows the details through `:target` with a close anchor. The photo moving between the card and the modal is the site's one big gesture, so keep other motion quiet.

## Motion

Astro's `ClientRouter` handles route changes without a page reload. The header holds still while the page fades through the paper colour. On small screens the menu opens as a full-screen panel: it fades in while its links slide up one after another, and the page behind is held still. The first screen rises 12px into place, sections below the fold fade in the first time they are reached, and hover states stay small. Animate only opacity and transform, keep durations under about 600ms, and do not hide content that is already on screen. Nothing is hidden without JavaScript, and `prefers-reduced-motion` turns the motion off.

Page behaviour lives in `src/scripts/site.ts`, because bundled scripts run once and the router replaces the body on each navigation. Set up new behaviour from `initPage()` rather than in a page-level script.

## Achievements

Each entry puts one photo beside the event, the result, my role, and at most two sentences. Photos are shown whole, never cropped, because several have the result printed on them. Text does not name students. Newest results come first, research before robotics.

The site uses the existing portrait, real project images, and real event photos instead of decorative illustration. This keeps the portfolio personal and presents evidence of work.
