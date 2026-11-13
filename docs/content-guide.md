# Updating the portfolio

Keep the homepage centered on Full-Stack Software Engineering. Use specific project contributions and evidence to show technical ability and attention to detail. Teaching and coaching support the background story and live mostly on the Achievements page.

## Where to edit

| Content | File |
| --- | --- |
| Name, professional title, location, social links, résumé URL | `src/data/portfolio.ts` → `profile` |
| Projects and their modals | `src/data/portfolio.ts` → `projects` |
| Career timeline | `src/data/portfolio.ts` → `experience` |
| Education | `src/data/portfolio.ts` → `education` |
| Homepage tech stack groups and technology label/logo registry | `src/data/technologies.ts` |
| Student research and robotics results, and homepage highlights | `src/data/achievements.ts` |
| Achievement photos | `src/assets/achievements/` |
| Homepage introduction | `src/pages/index.astro` |
| Project card and modal layout | `src/components/ProjectCard.astro`, `src/components/ProjectModal.astro` |
| Downloadable résumé | `public/Grado_Resume.pdf` |

## Projects

Each project appears as a photo on the homepage and opens in a modal. A record uses the `Project` interface in `portfolio.ts`:

- `slug`: unique, stable name, such as `bu-csm`. The modal opens at `/#bu-csm`, so this is also the project's shareable link.
- `title`, `category`, and `summary`: a readable project name, software category, and concise explanation.
- `role` and `contribution`: your personal responsibilities. Distinguish your work from the rest of a team’s work.
- `technologies`: tools actually used on that project. These are historical facts, independent of the tools featured in the homepage toolkit.
- `image` and `imageAlt`: public asset URL and a useful description.
- `imageWidth` and `imageHeight`: optional intrinsic dimensions when a cover differs from the retained screenshots.
- `imageMobile`: optional 4:3 cover selected at viewport widths up to 600px. Current responsive covers use a 2:1 desktop composition and a 1448 × 1086 mobile composition.
- `liveUrl`: optional real public project URL, shown as **Try it** in the modal. Omit it if there is no suitable destination; the action is omitted rather than replaced by a disabled link or filler text. BrownoutBaga and BU CSM currently have public URLs.

All projects use a balanced two-column desktop grid and one column on mobile. Put the projects you most want seen first in the data list. Clicking a card opens its native dialog; there are no individual project pages and no automatic redirects to external demos.

To replace a screenshot, save the file in `public/images/projects/` and use a URL beginning `/images/projects/`. The older images are **1126 × 562**; the BrownoutBaga screenshot is 1408 × 704. The BU-CSM sample uses optimized WebP covers with a separate mobile composition; its captures, provenance, and generation prompts are in `docs/project-previews/bu-csm/README.md`. Original images are preserved. Update the image dimensions and the `<source>` dimensions in `ProjectCard.astro` and `ProjectModal.astro` if a future cover uses another format.

Do not use `#` links, fictional client results, invented performance metrics, or technologies you cannot explain. Back any outcomes you add with evidence. Where numeric results are unavailable, explain observable behavior or what you learned.

Preserve existing slugs when possible, because changing one breaks links that were already shared.

## Tech stack and technology logos

The homepage tech stack is the `toolkit` list in `src/data/technologies.ts`: six groups, each a title and an ordered list of names. Every name must match a `label` in the `technologies` registry in the same file. The shared `TechBadges.astro` component renders the tech stack, project cards, and project dialogs.

List only tools you have used and can discuss in an interview. Put a tool in the group that describes what it is: a language under Languages, a mobile framework under Mobile, and so on.

Keep a project's `technologies` array tied to how that specific project was built. Adding a tool to the homepage does not change what an older project used.

HTML, CSS, and JavaScript badges are hidden globally through the shared display filter. Other badges show a readable label next to a local SVG logo. A tool with no logo, such as Onshape, shows its label only. Store logo assets in `public/icons/technologies/`, record their source in `docs/technology-icons.md`, and avoid runtime CDN dependencies.

## Dialog behavior

Shareable project links use `/#<slug>`. With JavaScript enabled, the native dialog contains the photo, summary, role, recorded stack, contributions, and optional **Try it** action. Close, Escape, and backdrop clicks return to the card without losing the page's scroll position. Browser Back/Forward follows modal history, while navigation to a different page must still work. Ctrl/Cmd-click retains normal new-tab behavior.

Without JavaScript, the hash link still reveals the project details and a close anchor returns to `#work`. Keep that fallback when changing the modal template. A modal's regular close control should remain a labeled button, with a usable touch target.

## Achievements

Results are in `src/data/achievements.ts`, in two lists: `research` and `robotics`, newest first. A third list, `highlights`, holds the five lines shown on the homepage.

Each record has:

- `title`: the project name for research, or the event name for a competition.
- `event` and `date`: the category or venue, and the month and year or just the year.
- `results`: one line per result, exactly as awarded.
- `role`: your own part, such as Coach, Adult Sponsor, or competitor. Use the role the organiser or school published.
- `summary`: optional, at most two sentences. Cut an abstract down to what the project does and one figure.
- `photos`: one or two images from `src/assets/achievements/`, each with alt text.

Do not name students in the text or in alt text. Attribute a team's award to the team and state your contribution separately. Photos are resized at build time, so save the original file and import it at the top of `achievements.ts`.

There is no Certifications page. If you earn a credential worth showing, add a short section to the homepage rather than a page with one entry.

## Biography, résumé, and availability

The published background is BS Information Technology (Cum Laude) at Bicol University, DOST JLSS Scholar, and DepEd return of service beginning July 2025. The site uses **July 2025–Present** for the service timeline.

Two years from July 2025 suggests July 2027. Confirm the actual contractual completion date before adding an end date or employment-availability statement. Keep employment status current; an earlier job listing alone does not establish that a role is still ongoing.

The existing résumé has been retained at `public/Grado_Resume.pdf`. Review and replace its content before sending the portfolio to employers. Keep the filename to preserve existing download links, or change `profile.resume` when renaming it.

## Check an update

```sh
npm run check
npm run build
npm run test:site
npm run preview
```

Review the changed pages at 320, 390, 640, 768, 1024, and 1440px. Check image proportions, readable logo labels, text wrapping, keyboard focus, résumé downloads, and project dialogs. Run `python scripts/browser-check.py` against a running local server for the interaction checks, including direct links, refresh, Back/Forward across page changes, modified clicks, focus restoration, normal/reduced motion, and the no-JavaScript fallback. The generated-site checks do not establish that an external website, credential, or résumé content is current; inspect those destinations separately.

To refresh the social preview after changing the introductory content, run `python scripts/browser-check.py --social-only` while the local server is running, then rebuild so the new `public/images/social-preview.png` is copied into `dist/`.

## Legacy credential action

The removed Telegram demo previously exposed a bot credential in `projects/tgmsg/lowes.js`. It must be revoked or rotated externally. Deleting the demo from the current source does not erase earlier commits; treat any historical credential as exposed. No credential value belongs in this guide, project content, or frontend code.
