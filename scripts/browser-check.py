"""Check a running portfolio with Python Playwright; optional --make-social.

Usage: python scripts/browser-check.py --url http://127.0.0.1:4321
"""
import argparse
import json
import os
import sys
from pathlib import Path

from playwright.sync_api import sync_playwright

parser = argparse.ArgumentParser()
parser.add_argument('--url', default='http://127.0.0.1:4321')
parser.add_argument('--artifacts', default='.cache/browser-review')
parser.add_argument('--make-social', action='store_true')
parser.add_argument('--social-only', action='store_true')
args = parser.parse_args()
base = args.url.rstrip('/')
artifacts = Path(args.artifacts)
artifacts.mkdir(parents=True, exist_ok=True)
routes = ['/', '/experience/', '/projects/', '/tech-stack/', '/achievements/', '/404/']
widths = [320, 390, 640, 768, 1024, 1440]
slugs = ['brownout-baga', 'bu-csm', 'pasubli', 'java-pos', 'nadira', 'bu-e-receipt', 'curio-4502']
live_urls = {'brownout-baga': 'https://brownoutbaga.online', 'bu-csm': 'https://survey.bicol-u.edu.ph'}
home_stack = [
    'TypeScript', 'Python', 'Java', 'VB.NET',
    'React', 'Vue', 'Next.js', 'Astro', 'Tailwind CSS',
    'Laravel', 'Node.js', '.NET', 'MySQL', 'PostgreSQL',
    'React Native', 'Expo',
    'AWS', 'Microsoft Azure', 'Google Cloud', 'Docker', 'Nginx', 'Apache', 'Linux', 'GitHub',
    'n8n', 'Tinkercad', 'Onshape',
]
without_logo = set()  # Every listed technology has a local logo.
issues = []


def visit(page, path):
    response = page.goto(base + path)
    page.wait_for_load_state('networkidle')
    page.evaluate('document.fonts.ready')
    return response


def wait_images(page, selector):
    # A full-page capture does not itself activate lazy-loaded images.
    page.locator(selector).evaluate_all('(images) => images.forEach(image => image.loading = "eager")')
    page.wait_for_function('(selector) => [...document.querySelectorAll(selector)].every(image => image.complete)', arg=selector)
    broken = page.locator(selector).evaluate_all('(images) => images.filter(image => image.naturalWidth === 0).map(image => image.src)')
    assert not broken, f'Broken images at {page.url}: {broken}'


def wait_modal(page, slug):
    page.wait_for_function('(slug) => document.getElementById(slug)?.open === true', arg=slug)
    page.wait_for_function('!document.documentElement.classList.contains("is-modal-transition")')
    wait_images(page, f'dialog#{slug} img')
    toolbar_text = page.locator(f'dialog#{slug} .modal-toolbar').inner_text()
    assert '<a' not in toolbar_text and 'href=' not in toolbar_text, 'Fallback HTML should not be visible when JavaScript runs'
    return page.locator(f'dialog#{slug}')


def wait_closed(page):
    page.wait_for_function('!document.querySelector("dialog[open]")')
    page.wait_for_function('!document.documentElement.classList.contains("is-modal-transition")')


def assert_focus(page, slug):
    page.wait_for_function('(slug) => document.querySelector(`[data-project-open="${slug}"]`) === document.activeElement', arg=slug)


with sync_playwright() as p:
    chrome = Path(os.environ.get('PROGRAMFILES', 'C:/Program Files')) / 'Google/Chrome/Application/chrome.exe'
    browser = p.chromium.launch(headless=True, executable_path=str(chrome) if chrome.exists() else None)
    context = browser.new_context(viewport={'width': 1440, 'height': 1000}, device_scale_factor=1, reduced_motion='reduce')
    page = context.new_page()
    page.on('pageerror', lambda error: issues.append(f'JavaScript: {error}'))

    if args.make_social or args.social_only:
        # Establish a local origin before loading the self-hosted font/portrait.
        visit(page, '/')
        page.set_viewport_size({'width': 1200, 'height': 630})
        page.set_content(f'''<style>
          @font-face{{font-family:Manrope;src:url({base}/fonts/manrope-latin.ttf);font-weight:200 800}}
          *{{box-sizing:border-box}}body{{margin:0;background:#ffffff;font-family:Manrope,Arial,sans-serif;color:#1d1d1f}}
          .canvas{{height:630px;padding:68px 70px;display:flex;align-items:center;justify-content:space-between;gap:58px;border-bottom:10px solid #1d1d1f}}
          .copy{{max-width:650px}}h1{{font-size:47px;line-height:1.13;letter-spacing:-2.4px;margin:0 0 24px;font-weight:650}}
          .role{{font-size:35px;line-height:1.25;letter-spacing:-1.1px;font-weight:550;margin-bottom:23px;color:#6e6e73}}
          .summary{{font-size:20px;line-height:1.65;max-width:43ch;color:#6e6e73;margin:0 0 37px}}
          .url{{font-size:18px}}img{{width:280px;height:315px;object-fit:cover;border-radius:14px;filter:grayscale(1)}}
          </style><div class="canvas"><div class="copy"><h1>Luis Anthony Grado</h1><div class="role">Full-Stack<br>Software Engineer</div><p class="summary">SaaS products, business systems, and automation.</p><div class="url">hydro404.github.io</div></div><img src="{base}/images/luis.jpg" alt="Portrait of Luis Anthony Grado"></div>''')
        page.wait_for_load_state('networkidle')
        page.evaluate('document.fonts.ready')
        wait_images(page, 'img')
        assert page.evaluate('document.fonts.check("650 20px Manrope")'), 'Social preview font did not load'
        page.screenshot(path='public/images/social-preview.png')
        if args.social_only:
            browser.close()
            print('PASS: compact social preview rendered with the local portrait and font.')
            raise SystemExit(0)

    # Reduced motion leaves every section visible for full-page captures.
    for width in widths:
        page.set_viewport_size({'width': width, 'height': 1000})
        for route in routes:
            response = visit(page, route)
            if response.status >= 400 and route != '/404/':
                issues.append(f'{width}px {route}: HTTP {response.status}')
            assert page.locator('h1').count() == 1, f'{route}: expected one h1'
            if page.evaluate('document.documentElement.scrollWidth > innerWidth + 1'):
                offending = page.evaluate('''() => [...document.querySelectorAll('body *')].filter(element => element.getBoundingClientRect().right > innerWidth + 1 && getComputedStyle(element).position !== 'fixed').slice(0,5).map(element => element.tagName+'.'+element.className)''')
                issues.append(f'{width}px {route}: horizontal overflow {offending}')
            wait_images(page, '.project-card img, .identity img, .technology-list img, .achievement img')
            assert page.evaluate('document.fonts.check("500 16px Manrope")'), f'{route}: custom font did not load'
            labels = page.locator('[data-technology]').evaluate_all('(items) => items.map(item => item.dataset.technology.toLowerCase())')
            assert not set(labels).intersection({'html', 'html5', 'css', 'css3', 'js', 'javascript'}), 'Foundational badges should be hidden'
            if route == '/':
                assert page.locator('h1').inner_text() == 'Luis Anthony Grado'
                assert page.locator('.sidebar .portrait').is_visible(), 'The homepage always shows the portrait'
                assert page.locator('[data-summary="glance"] > div').count() == 5
                assert page.locator('[data-summary="glance"] [data-technology]').count() == 6
                assert page.locator('.career-rows > li').count() == 4, 'The career chart has one row per software role'
                bars = page.locator('.career-bar').evaluate_all('(bars) => bars.map(bar => { const track = bar.parentElement.getBoundingClientRect(); const box = bar.getBoundingClientRect(); return box.left >= track.left - 1 && box.right <= track.right + 1 && box.width >= 8; })')
                assert all(bars), 'Every career bar sits inside its track'
                assert page.locator('.career-bar.is-current').count() == 1
                assert page.locator('.project-card').count() == 2, 'The homepage shows two featured projects'
                assert page.locator('[data-summary="achievements"] > li').count() == 3
                links = page.locator('main .row-link, main .more-link').evaluate_all('(links) => links.map(link => link.getAttribute("href"))')
                assert links == ['/tech-stack/', '/experience/', '/projects/', '/achievements/']
                assert page.locator('dialog').count() == 0, 'Project dialogs live on the Projects page'
            if route == '/experience/':
                assert page.locator('h1').inner_text() == 'Experience'
                assert page.locator('.xp').count() == 7, 'Experience lists seven employers'
                assert page.locator('.xp.is-current').count() == 2
            if route == '/projects/':
                assert page.locator('.project-card').count() == len(slugs)
                assert page.locator('dialog.project-modal').count() == len(slugs)
            if route == '/tech-stack/':
                assert page.locator('#toolkit [data-technology]').evaluate_all('(items) => items.map(item => item.dataset.technology)') == home_stack
                for item in page.locator('#toolkit [data-technology]').all():
                    assert item.inner_text().strip(), 'Every technology needs a visible label'
                    if item.get_attribute('data-technology') not in without_logo:
                        assert item.locator('img').count() >= 1, 'Every technology needs a logo'
                assert page.locator('#toolkit .toolkit-list > li').count() == 6, 'Tech stack has six categories'
            if route == '/achievements/':
                assert page.locator('.achievement').count() == 9
                assert page.locator('#personal [data-awards="personal"] > li').count() == 2
                for entry in page.locator('.achievement').all():
                    assert entry.locator('img').count() >= 1, 'Every achievement needs a photo'
                    assert entry.locator('.achievement-results li').count() >= 1
                if width == 390:
                    page.screenshot(path=str(artifacts / 'achievements-mobile.png'), full_page=True)
            if width == 1440 and route != '/404/':
                name = route.strip('/') or 'home'
                page.screenshot(path=str(artifacts / f'{name}-desktop.png'), full_page=True)
                if route == '/': page.screenshot(path=str(artifacts / 'home-first-screen.png'))
            if width == 390 and route == '/':
                page.screenshot(path=str(artifacts / 'home-mobile.png'), full_page=True)
        print(f'Checked {len(routes)} routes at {width}px', flush=True)

    # Mobile menu and repeated route swaps must retain their page behavior.
    page.set_viewport_size({'width': 390, 'height': 844})
    visit(page, '/')
    menu = page.locator('.menu-toggle')
    assert menu.get_attribute('aria-expanded') == 'false'
    assert not page.get_by_role('navigation', name='Main navigation').is_visible()
    menu.click()
    assert menu.get_attribute('aria-expanded') == 'true'
    panel = page.locator('#site-nav').bounding_box()
    assert panel['x'] == 0 and panel['width'] == 390 and abs(panel['y'] + panel['height'] - 844) < 2, 'Open menu should fill the screen below the header'
    assert page.evaluate('document.documentElement.classList.contains("menu-open") && document.querySelector("main").inert'), 'Page should be held still behind the menu'
    page.keyboard.press('Escape')
    assert page.evaluate('!document.documentElement.classList.contains("menu-open") && !document.querySelector("main").inert')
    assert menu.get_attribute('aria-expanded') == 'false'
    assert menu.evaluate('(element) => element === document.activeElement')
    menu.click()
    page.evaluate('window.__sameDocument = true')
    page.get_by_role('navigation', name='Main navigation').get_by_role('link', name='Achievements', exact=True).click()
    page.wait_for_function('location.pathname === "/achievements/" && document.title.startsWith("Achievements")')
    assert page.evaluate('window.__sameDocument === true'), 'Astro route changes should retain the document'
    menu.click()
    assert menu.get_attribute('aria-expanded') == 'true', 'Menu should work after a route change'
    page.keyboard.press('Escape')
    page.set_viewport_size({'width': 1440, 'height': 1000})
    nav = page.get_by_role('navigation', name='Main navigation')
    assert nav.get_by_role('link', name='Achievements', exact=True).get_attribute('aria-current') == 'page'
    nav.get_by_role('link', name='Experience', exact=True).click()
    page.wait_for_function('location.pathname === "/experience/" && document.querySelector(".xp")')
    assert page.evaluate('window.__sameDocument === true')
    # The sidebar marks the current page, and an experience entry opens its project on the Projects page.
    assert page.locator('#site-nav a[aria-current]').count() == 1, 'Only one sidebar link is current'
    assert nav.get_by_role('link', name='Experience', exact=True).get_attribute('aria-current') == 'page'
    page.locator('[data-project-link="bu-csm"]').click()
    page.wait_for_function('location.pathname === "/projects/"')
    wait_modal(page, 'bu-csm')
    page.go_back()
    page.wait_for_function('location.pathname === "/experience/" && document.querySelector(".xp")')
    assert not page.locator('dialog[open]').count()
    page.locator('.wordmark:visible').first.click()
    page.wait_for_function('location.pathname === "/" && document.querySelector(".career")')
    assert page.locator('#site-nav a[aria-current]').count() == 0, 'No sidebar link is current on the homepage'
    page.locator('.more-link', has_text='See every result').click()
    page.wait_for_function('location.pathname === "/achievements/" && document.querySelector(".achievement")')
    page.locator('.wordmark:visible').first.click()
    page.wait_for_function('location.pathname === "/" && document.querySelector(".career")')
    assert page.evaluate('window.__sameDocument === true')

    # The appearance switch changes the theme, and the choice survives a reload and a route change.
    visit(page, '/')
    page.locator('[data-theme-set="dark"]').click()
    assert page.evaluate('document.documentElement.dataset.theme') == 'dark'
    assert page.evaluate('getComputedStyle(document.body).backgroundColor') in ('rgba(0, 0, 0, 0)', 'rgb(0, 0, 0)')
    assert page.evaluate('getComputedStyle(document.documentElement).backgroundColor') == 'rgb(0, 0, 0)', 'Dark theme uses a black page'
    page.reload()
    page.wait_for_load_state('networkidle')
    assert page.evaluate('document.documentElement.dataset.theme') == 'dark', 'Theme choice should survive a reload'
    assert page.locator('[data-theme-set="dark"]').get_attribute('aria-pressed') == 'true'
    page.get_by_role('navigation', name='Main navigation').get_by_role('link', name='Achievements', exact=True).click()
    page.wait_for_function('location.pathname === "/achievements/"')
    assert page.evaluate('document.documentElement.dataset.theme') == 'dark', 'Theme choice should survive a route change'
    page.locator('[data-theme-set="light"]').click()
    assert page.evaluate('getComputedStyle(document.documentElement).backgroundColor') == 'rgb(255, 255, 255)'
    page.locator('[data-theme-set="auto"]').click()
    assert page.evaluate('document.documentElement.dataset.themeChoice') == 'auto'

    # Check every project's actual image, labels, demo availability and keyboard
    # behavior in both a desktop dialog and a mobile sheet.
    for width in [1440, 390]:
        page.set_viewport_size({'width': width, 'height': 1000 if width == 1440 else 844})
        visit(page, '/projects/')
        for index, slug in enumerate(slugs):
            card = page.locator(f'[data-project-open="{slug}"]')
            card.scroll_into_view_if_needed()
            scroll_y = page.evaluate('scrollY')
            card.click()
            dialog = wait_modal(page, slug)
            assert page.url.endswith('/projects/#' + slug)
            assert dialog.locator('button[data-modal-close]').is_visible()
            assert dialog.locator('[data-technology]').count() >= 1
            assert dialog.evaluate('(element) => element.scrollWidth <= element.clientWidth + 1'), f'{slug}: modal overflow at {width}px'
            demo = dialog.get_by_role('link', name='Try it')
            if slug in live_urls:
                assert demo.get_attribute('href') == live_urls[slug]
                assert demo.get_attribute('target') == '_blank'
                if slug == 'brownout-baga':
                    page.screenshot(path=str(artifacts / ('modal-desktop.png' if width == 1440 else 'modal-mobile.png')))
            else:
                assert demo.count() == 0, f'{slug}: project without a URL must not produce a demo link'
            if width == 390:
                can_scroll = dialog.evaluate('(element) => element.scrollHeight > element.clientHeight + 1')
                dialog.evaluate('(element) => element.scrollTop = element.scrollHeight')
                if can_scroll:
                    assert dialog.evaluate('(element) => element.scrollTop > 0'), f'{slug}: mobile details must scroll'
                dialog.evaluate('(element) => element.scrollTop = 0')
            page.keyboard.press('Tab')
            assert dialog.evaluate('(element) => element.contains(document.activeElement)'), f'{slug}: focus escaped dialog'
            if index % 2: page.keyboard.press('Escape')
            else: dialog.locator('button[data-modal-close]').click()
            wait_closed(page)
            page.wait_for_function('!location.hash')
            assert_focus(page, slug)
            assert abs(page.evaluate('scrollY') - scroll_y) < 3, f'{slug}: closing moved the document'

    page.set_viewport_size({'width': 1440, 'height': 1000})
    visit(page, '/projects/')
    card = page.locator('[data-project-open="bu-csm"]')
    card.click()
    wait_modal(page, 'bu-csm')
    page.mouse.click(8, 500)
    wait_closed(page)
    page.wait_for_function('!location.hash')
    assert_focus(page, 'bu-csm')
    card.click()
    wait_modal(page, 'bu-csm')
    page.go_back()
    wait_closed(page)
    page.go_forward()
    wait_modal(page, 'bu-csm')
    page.go_back()
    wait_closed(page)

    # A direct-link refresh reopens the correct modal. Close restores the card.
    visit(page, '/projects/#nadira')
    wait_modal(page, 'nadira')
    page.reload()
    page.wait_for_load_state('networkidle')
    wait_modal(page, 'nadira')
    page.keyboard.press('Escape')
    wait_closed(page)
    page.wait_for_function('!location.hash')
    assert_focus(page, 'nadira')

    # Follow an old homepage project link (/#slug) from another page. It should land on the
    # Projects page with the dialog open, and Back should return to the page before it.
    visit(page, '/achievements/')
    page.evaluate('window.__sameDocument = true')
    home_link = page.locator('.wordmark:visible').first
    home_link.evaluate('(link) => link.href = "/#pasubli"')
    home_link.click()
    page.wait_for_function('location.pathname === "/projects/" && document.querySelector("#work")')
    wait_modal(page, 'pasubli')
    assert page.evaluate('window.__sameDocument === true')
    page.go_back()
    page.wait_for_function('location.pathname === "/achievements/" && document.title.startsWith("Achievements")')
    assert not page.locator('dialog[open]').count(), 'Back from a shared project must reach the preceding page'

    visit(page, '/projects/')
    with context.expect_page() as popup_info:
        page.locator('[data-project-open="java-pos"]').click(modifiers=['Meta' if sys.platform == 'darwin' else 'Control'])
    popup = popup_info.value
    popup.wait_for_load_state('networkidle')
    wait_modal(popup, 'java-pos')
    assert page.locator('dialog[open]').count() == 0, 'Modified click must preserve native new-tab behavior'
    popup.close()

    with page.expect_download() as download_info:
        page.get_by_role('link', name='Download résumé').click()
    assert download_info.value.suggested_filename.endswith('.pdf')
    page.get_by_role('link', name='Skip to content').focus()
    page.keyboard.press('Enter')
    assert page.locator('#main').evaluate('(element) => element === document.activeElement')
    assert page.evaluate('getComputedStyle(document.documentElement).scrollBehavior') == 'auto'

    # Also exercise the asynchronous photo transition with normal motion.
    normal = browser.new_context(viewport={'width': 1440, 'height': 1000}, reduced_motion='no-preference')
    normal_page = normal.new_page()
    normal_page.on('pageerror', lambda error: issues.append(f'Normal motion JavaScript: {error}'))
    visit(normal_page, '/projects/')
    normal_page.locator('[data-project-open="bu-csm"]').click()
    wait_modal(normal_page, 'bu-csm')
    normal_page.locator('dialog#bu-csm button[data-modal-close]').click()
    wait_closed(normal_page)
    normal_page.wait_for_function('!location.hash')
    assert_focus(normal_page, 'bu-csm')
    normal.close()

    nojs = browser.new_context(java_script_enabled=False, viewport={'width': 390, 'height': 844})
    fallback = nojs.new_page()
    visit(fallback, '/projects/')
    assert fallback.locator('.project-card:visible').count() == len(slugs)
    visit(fallback, '/achievements/')
    assert fallback.locator('.achievement:visible').count() == 9
    visit(fallback, '/projects/')
    assert fallback.get_by_role('navigation', name='Main navigation').is_visible()
    fallback.locator('[data-project-open="bu-csm"]').click()
    assert fallback.locator('#bu-csm').is_visible(), 'Project details should open without JavaScript'
    assert fallback.locator('#bu-csm').get_by_role('link', name='Try it').is_visible()
    fallback.locator('#bu-csm a[href="#work"]').click()
    assert not fallback.locator('#bu-csm').is_visible(), 'No-JavaScript details need a close link'
    nojs.close()
    browser.close()

(artifacts / 'results.json').write_text(json.dumps({'routes': len(routes), 'widths': widths, 'projects': len(slugs), 'issues': issues}, indent=2), encoding='utf-8')
assert not issues, '\n'.join(issues)
print('PASS: six responsive pages, sidebar and page highlight, light and dark themes, experience entries, labeled local logos, achievements with photos, seven modals, direct links/history, focus and scroll restoration, modified clicks, résumé, motion preferences, and no-JS fallback.')
