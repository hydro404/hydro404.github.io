# Luis Anthony Grado — Portfolio

A Full-Stack Software Engineer portfolio built with Astro 7 and TypeScript. It has five pages: a summary homepage, then Experience, Projects, Tech stack, and Achievements. A sidebar holds the portrait, name, a link to each page, contact links, and a Light, Dark, or Auto appearance switch whose choice is kept in the browser; the name leads back to the homepage. The sidebar stays in place on wide screens and becomes a top bar with a full-screen menu below 960px. The homepage is a summary: a short introduction, an "At a glance" panel, a chart of the software roles over time, two recent projects, and the top results, each with a link to the full page. On the Projects page, project photos open native dialogs rather than separate pages. The interface is black and white, with one blue accent for the check beside the name. Photos and technology logos keep their own colours. Achievement photos open full screen in a photo viewer. The site generates static files for GitHub Pages.

## Local development

Use Node.js 24 LTS (the package requires Node.js 22.12 or later).

```sh
npm install
npm run dev
```

Open the local address printed by Astro. To check the production output:

```sh
npm run check
npm run build
npm run test:site
npm run preview
```

`check` validates Astro and TypeScript. `build` creates `dist/`. `test:site` checks the generated site and local links, so run it after a successful build. `preview` serves that production build locally. CI uses `npm ci` with the committed lockfile.

For the optional browser checks, install Python Playwright (`python -m pip install playwright`) and keep the development server running. Run `python scripts/browser-check.py`. The script uses installed Chrome on Windows; on other setups, first run `python -m playwright install chromium`. It checks six viewport widths, the sidebar and its page highlight, the light and dark themes, experience entries, labeled local logos, achievement photos, all eight dialogs, direct links and browser history, keyboard focus and scroll restoration, modified clicks, mobile navigation, résumé downloads, normal/reduced motion, and the no-JavaScript fallback. Screenshots go to ignored `.cache/browser-review/`. Add `--make-social` to regenerate the committed social preview while running the checks, or `--social-only` to regenerate just that image.

## Content

- `src/data/portfolio.ts`: profile links and tagline, project records, the featured projects on the homepage, the two experience lists (with the months the career chart uses), and education.
- `src/data/achievements.ts`: my own results, student research and robotics results with their photos, and the homepage coaching highlights.
- `src/data/technologies.ts`: typed labels, local logo paths, the grouped tech stack, the short homepage list, and display filtering.
- `src/components/TechBadges.astro`: shared labeled technology presentation.
- `src/components/ExperienceEntry.astro`: one employer on the experience timeline.
- `src/components/AwardRow.astro`: one dated result, used on both pages.
- `src/layouts/SiteLayout.astro`: the sidebar, section links, and footer.
- `src/pages/index.astro`: the homepage introduction, "At a glance" panel, career chart, and previews.
- `src/pages/experience.astro`, `projects.astro`, `tech-stack.astro`: one page per sidebar link.
- `src/pages/achievements.astro`: the Achievements page.
- `src/assets/achievements/`: achievement photos, resized at build time.
- `public/images/projects/`: existing project previews.
- `public/Grado_Resume.pdf`: downloadable résumé.

Eight projects have factual details in their modals, and a project shows a **Try it** link only when its record has a `liveUrl`. Achievement text names the event, the result, and my role, and does not name students. See [the content guide](docs/content-guide.md) before adding records or updating availability.

The Tech stack page has six groups: languages, frontend, backend and databases, mobile, cloud and DevOps, and automation and 3D design. It is independent of each project's actual stack. HTML, CSS, and JavaScript remain in historical records where accurate but are filtered out of visible badges. Logos are served locally; provenance and license notes are in [the icon source record](docs/technology-icons.md). Showcasing a framework does not install that framework into the portfolio.

## GitHub Pages

The site URL is configured as `https://hydro404.github.io` in `astro.config.mjs`. This is an account Pages repository, so it does not use a repository-name base path.

1. In the GitHub repository, open **Settings → Pages** and select **GitHub Actions** as the source.
2. Commit the source and `package-lock.json`, then push to `main`.
3. The workflow in `.github/workflows/deploy.yml` checks, builds, validates, and deploys `dist/`. Pull requests run the build checks without deploying.

Local development and builds do not publish the site. Do not commit `node_modules/`, `.astro/`, or `dist/`. `Portfolio.docx` and `Portfolio Images/` are ignored too, because the source material lists students by name.

## Before using the portfolio for applications

Update the retained résumé, verify employment dates and links, and complete the project evidence you want employers to review. DepEd service is shown as **July 2025–Present**. A two-year period suggests July 2027, but the contractual end date and hiring availability must be confirmed before publishing availability claims.

Legacy experiments and template assets have been retired from the current source tree; earlier tracked versions remain in Git history. The legacy `projects/tgmsg/lowes.js` exposed a Telegram bot credential. Revoke or rotate that credential through Telegram. Removing its source file does not remove the credential from Git history.
