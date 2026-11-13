import { readdir, readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';

// Validate the generated site itself, including nested Pages routes and assets.
const root = path.resolve('dist');
async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  return (await Promise.all(entries.map(entry => entry.isDirectory() ? walk(path.join(directory, entry.name)) : path.join(directory, entry.name)))).flat();
}
const files = await walk(root);
const pages = files.filter(file => file.endsWith('.html'));
assert(pages.length >= 3,'Expected all portfolio pages in dist; run npm run build first.');
const failures = [];
let internalLinks = 0;
for (const file of pages) {
  const html = await readFile(file, 'utf8');
  const route = '/' + path.relative(root, file).split(path.sep).join('/').replace(/index\.html$/, '');
  const label = path.relative(root, file);
  if ((html.match(/<h1(?:\s|>)/g) || []).length !== 1) failures.push(`${label}: expected exactly one h1`);
  if (!/<title>[^<]+<\/title>/.test(html)) failures.push(`${label}: missing page title`);
  if (!/<meta\s[^>]*name="description"/.test(html)) failures.push(`${label}: missing description`);
  for (const match of html.matchAll(/\b(?:href|src)="([^"]+)"/g)) {
    const raw = match[1].replaceAll('&amp;', '&');
    if (/^(?:https?:|data:|mailto:|tel:|javascript:|\/\/)/.test(raw)) continue;
    const url = new URL(raw, `https://portfolio.test${route}`);
    let target = path.join(root, decodeURIComponent(url.pathname));
    try {
      let info = await stat(target);
      if (info.isDirectory()) { target = path.join(target, 'index.html'); info = await stat(target); }
      if (!info.isFile()) throw new Error('Not a file');
      if (url.hash && target.endsWith('.html')) {
        const targetHtml = await readFile(target, 'utf8');
        const id = decodeURIComponent(url.hash.slice(1));
        if (!targetHtml.includes(`id="${id}"`)) failures.push(`${label}: missing anchor ${raw}`);
      }
      internalLinks++;
    } catch { failures.push(`${label}: broken internal URL ${raw}`); }
  }
  for (const match of html.matchAll(/<img\b[^>]*>/g)) {
    if (!/\balt=/.test(match[0]) || !/\bwidth=/.test(match[0]) || !/\bheight=/.test(match[0])) failures.push(`${label}: image missing alt or dimensions`);
  }
}
assert.equal(failures.length, 0, failures.join('\n'));
assert(files.some(file => file.endsWith('sitemap.xml')), 'Sitemap is missing.');
assert(files.some(file => file.endsWith('Grado_Resume.pdf')), 'Resume is missing.');
console.log(`Passed: ${pages.length} pages, ${internalLinks} internal links/assets, image metadata, résumé, and sitemap.`);
