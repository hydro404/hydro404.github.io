# Luis Anthony Grado — Portfolio

A Full-Stack Software Engineer portfolio built with Astro 7 and TypeScript. It has two pages. The homepage reads top to bottom: introduction, seven software projects, tech stack, experience, education, coaching highlights, and contact. Project photos open native dialogs rather than separate project pages. The Achievements page lists student research and robotics competition results with photos. The site generates static files for GitHub Pages.

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

For the optional browser checks, install Python Playwright (`python -m pip install playwright`) and keep the development server running. Run `python scripts/browser-check.py`. The script uses installed Chrome on Windows; on other setups, first run `python -m playwright install chromium`. It checks six viewport widths, labeled local logos, achievement photos, all seven dialogs, direct links and browser history, keyboard focus and scroll restoration, modified clicks, mobile navigation, résumé downloads, normal/reduced motion, and the no-JavaScript fallback. Screenshots go to ignored `.cache/browser-review/`. Add `--make-social` to regenerate the committed social preview while running the checks, or `--social-only` to regenerate just that image.

## Content

- `src/data/portfolio.ts`: profile links, project records, experience, and education.
- `src/data/achievements.ts`: student research and robotics results, their photos, and the five homepage highlights.
- `src/data/technologies.ts`: typed labels, local logo paths, the grouped homepage tech stack, and display filtering.
- `src/components/TechBadges.astro`: shared labeled technology presentation.
- `src/pages/index.astro`: homepage copy.
- `src/pages/achievements.astro`: the Achievements page.
- `src/assets/achievements/`: achievement photos, resized at build time.
- `public/images/projects/`: existing project previews.
- `public/Grado_Resume.pdf`: downloadable résumé.

Seven projects have factual details in their modals, and a project shows a **Try it** link only when its record has a `liveUrl`. Achievement text names the event, the result, and my role, and does not name students. See [the content guide](docs/content-guide.md) before adding records or updating availability.

The homepage tech stack has six groups: languages, frontend, backend and databases, mobile, cloud and DevOps, and automation and 3D design. It is independent of each project's actual stack. HTML, CSS, and JavaScript remain in historical records where accurate but are filtered out of visible badges. Logos are served locally; provenance and license notes are in [the icon source record](docs/technology-icons.md). Showcasing a framework does not install that framework into the portfolio.

## GitHub Pages

The site URL is configured as `https://hydro404.github.io` in `astro.config.mjs`. This is an account Pages repository, so it does not use a repository-name base path.

1. In the GitHub repository, open **Settings → Pages** and select **GitHub Actions** as the source.
2. Commit the source and `package-lock.json`, then push to `main`.
3. The workflow in `.github/workflows/deploy.yml` checks, builds, validates, and deploys `dist/`. Pull requests run the build checks without deploying.

Local development and builds do not publish the site. Do not commit `node_modules/`, `.astro/`, or `dist/`. `Portfolio.docx` and `Portfolio Images/` are ignored too, because the source material lists students by name.

## Before using the portfolio for applications

Update the retained résumé, verify employment dates and links, and complete the project evidence you want employers to review. DepEd service is shown as **July 2025–Present**. A two-year period suggests July 2027, but the contractual end date and hiring availability must be confirmed before publishing availability claims.

Legacy experiments and template assets have been retired from the current source tree; earlier tracked versions remain in Git history. The legacy `projects/tgmsg/lowes.js` exposed a Telegram bot credential. Revoke or rotate that credential through Telegram. Removing its source file does not remove the credential from Git history.
