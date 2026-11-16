# Portfolio design direction

Audience: recruiters and engineering hiring teams evaluating a Full-Stack Software Engineer. The first screen should establish the role and identity, with a clear path to experience, software evidence, and the résumé.

## Tokens

Black and white only, in a light and a dark theme. The values are custom properties at the top of `src/styles/global.css`.

| Token | Light | Dark | Used for |
| --- | --- | --- | --- |
| `--bg` | `#ffffff` | `#000000` | Page background |
| `--side-bg` | `#f5f5f7` | `#161617` | Sidebar |
| `--card` | `#f5f5f7` | `#1c1c1e` | Grouped panels |
| `--surface` | `#ffffff` | `#1c1c1e` | Project dialog |
| `--ink` | `#1d1d1f` | `#f5f5f7` | Text, buttons, the current-role dot |
| `--muted` | `#6e6e73` | `#a1a1a6` | Secondary text |
| `--line` | `#d9d9de` | `#333336` | Hairlines |
| `--fill` | black at 6% | white at 10% | Badges, the sidebar highlight |

There is no accent colour. Emphasis comes from weight, the solid ink badge, and the solid ink button. Technology logos and photos are turned gray with CSS filters; the source files keep their colours.

Apple devices use their system font. Everything else uses the bundled Manrope. No fabricated product UI, skill percentages, rotating job titles, or employment availability.

## Layout

The look follows a Mac settings window: a sidebar pinned to the left edge, and content in a centred column up to 760px wide beside it.

```
+------------------+--------------------------------------------+
| (portrait)       |  Two-sentence introduction                 |
| Luis Anthony     |                                            |
| Grado            |  At a glance                               |
| Full-Stack ...   |  [ Now        role, employer, badges     ] |
|                  |  [ Also       ...                        ] |
|  Experience      |  [ Works with tools                      ] |
|  Projects        |  [ Education  degree, honors             ] |
|  Tech stack      |                                            |
|  Achievements    |  Career so far                             |
|                  |  [ role          2022  2023  2024  Now   ] |
| [Light Dark Auto]|  [ role                      ======      ] |
| (Schedule)       |                                            |
| GitHub LinkedIn  |  Recent projects      Recognition          |
+------------------+--------------------------------------------+
```

- **Sidebar:** portrait, name, role, one link per page, the appearance switch, and contact links. A rounded highlight rests on the current page's link. The name leads back to the homepage, which has no link of its own.
- **Homepage:** a summary. A two-sentence introduction, an "At a glance" panel set out like a spec sheet, a chart with one bar per software role on a shared time axis, two recent projects, and the top results. Each part links to its full page. The chart is the homepage's one distinctive element; keep the rest quiet.
- **Experience, Projects, Tech stack, Achievements:** one page each.
- **Grouped panels:** the "At a glance" rows, the career chart, the tech stack, results, and education sit in rounded panels with hairlines between rows. The experience timeline and project photos sit directly on the page.
- **Badges:** small pills carry short facts such as employment type, place, role, category, and tools. Do not use them for sentences.
- **Below 960px:** the sidebar becomes a fixed top bar with a full-screen menu. On the homepage the portrait, name, and role open the page.

Keep it plain: no numbered headings, all-caps labels, gradients, or shadows on content. Contrast, focus indicators, mobile navigation, image dimensions, and reduced motion are part of the base implementation.

## Projects

Projects have no pages of their own. On the Projects page a card opens a dialog at `/projects/#slug`, so a project can be shared by link and the Back button closes it. Old `/#slug` links are redirected there. Dialogs show the photo in colour, the description, role, tools, and contributions; a Try it action is rendered only for a supplied public URL. The Close button, Escape, and backdrop restore focus and the previous scroll position. Native modified-click behavior is retained. Without JavaScript the same link shows the details through `:target` with a close anchor. The photo moving between the card and the dialog is the site's one big gesture, so keep other motion quiet.

## Motion

Astro's `ClientRouter` handles route changes without a page reload. The sidebar holds still while the page fades through the background colour, and the sidebar highlight slides from the old page's link to the new one. On small screens the menu opens as a full-screen panel: it fades in while its links slide up one after another, and the page behind is held still. The first block rises 12px into place, sections below the fold fade in the first time they are reached, and the dot beside a current role sends out a slow ring. Animate only opacity and transform, keep durations under about 600ms, and do not hide content that is already on screen. Nothing is hidden without JavaScript, and `prefers-reduced-motion` turns the motion off.

Page behaviour lives in `src/scripts/site.ts`, because bundled scripts run once and the router replaces the body on each navigation. Set up new behaviour from `initPage()` rather than in a page-level script.

## Achievements

My own results come first, as rows without photos. Each coached entry puts one photo beside the event, the result, my role, and at most two sentences. Photos are shown whole, never cropped, because several have the result printed on them. Text does not name students. Newest results come first, research before robotics.

The site uses the existing portrait, real project images, and real event photos instead of decorative illustration. This keeps the portfolio personal and presents evidence of work.
