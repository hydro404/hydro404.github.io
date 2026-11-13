import { navigate } from 'astro:transitions/client';

// Page behaviour for the whole site. This module runs once, while the client
// router replaces the page body on every navigation, so setup re-runs per page.
// It runs on astro:after-swap rather than astro:page-load because that event can
// fire after the new page's snapshot, which would flash the un-initialised page.

const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function initMenu(signal: AbortSignal) {
  const toggle = document.querySelector<HTMLButtonElement>('.menu-toggle');
  const nav = document.querySelector<HTMLElement>('#site-nav');
  if (!toggle || !nav) return;

  toggle.hidden = false;
  const setOpen = (open: boolean) => {
    toggle.setAttribute('aria-expanded', String(open));
    nav.dataset.collapsed = String(!open);
    // The open menu covers the page on small screens, so hold the page still behind it.
    document.documentElement.classList.toggle('menu-open', open);
    document.querySelectorAll<HTMLElement>('main, .site-footer').forEach((region) => { region.inert = open; });
    const label = toggle.querySelector('.menu-label');
    if (label) label.textContent = open ? 'Close' : 'Menu';
  };
  setOpen(false);
  toggle.addEventListener('click', () => setOpen(toggle.getAttribute('aria-expanded') !== 'true'), { signal });
  nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => setOpen(false), { signal }));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
      setOpen(false);
      toggle.focus();
    }
  }, { signal });
  window.matchMedia('(min-width: 761px)').addEventListener('change', () => setOpen(false), { signal });
}

// Moves the photo between its card and the modal. Falls back to an instant change.
function morphPhoto(from: HTMLElement | null, to: HTMLElement | null, update: () => void) {
  if (!document.startViewTransition || prefersReducedMotion() || !from || !to) {
    update();
    return;
  }
  const root = document.documentElement;
  let finished = false;
  const cleanUp = () => {
    if (finished) return;
    finished = true;
    from.style.viewTransitionName = '';
    to.style.viewTransitionName = '';
    root.classList.remove('is-modal-transition');
  };
  root.classList.add('is-modal-transition');
  from.style.viewTransitionName = 'project-photo';
  const transition = document.startViewTransition(() => {
    // A newer history event may have superseded this snapshot before it ran.
    if (finished) return;
    from.style.viewTransitionName = '';
    to.style.viewTransitionName = 'project-photo';
    update();
  });
  transition.finished.then(cleanUp, cleanUp);
  return () => {
    if (finished) return;
    transition.skipTransition();
    cleanUp();
  };
}

// Keep Astro's current location and history index in sync with the browser.
// This lets Back and Forward traverse project fragments without replacing the page.
function initProjectModals(signal: AbortSignal) {
  const dialogs = new Map(
    Array.from(document.querySelectorAll<HTMLDialogElement>('dialog.project-modal')).map((dialog) => [dialog.id, dialog]),
  );
  if (!dialogs.size) return;

  const pagePath = location.pathname;
  const pageSearch = location.search;
  const isCurrentPage = () => location.pathname === pagePath && location.search === pageSearch;
  const linkedDialog = () => dialogs.get(location.hash.slice(1));
  const cards = document.querySelectorAll<HTMLAnchorElement>('[data-project-open]');
  const triggers = new Map(Array.from(cards, (card) => [card.dataset.projectOpen, card]));
  let selected: HTMLDialogElement | undefined;
  let waitingForBack = false;
  let cancelPhoto: (() => void) | undefined;
  let returnX = 0;
  let returnY = 0;

  const showProject = (next: HTMLDialogElement | undefined, animate = false) => {
    if (selected === next) return;
    const previous = selected;
    // Record the desired state synchronously, even when the DOM change is animated.
    selected = next;
    cancelPhoto?.();
    cancelPhoto = undefined;
    const visible = Array.from(dialogs.values()).find((dialog) => dialog.open);
    if (next && !previous && !visible) {
      returnX = window.scrollX;
      returnY = window.scrollY;
      const root = document.documentElement;
      root.style.setProperty('--scrollbar-width', `${window.innerWidth - root.clientWidth}px`);
    }
    const update = () => {
      if (visible && visible !== next && visible.open) visible.close();
      if (next) {
        if (!next.open) next.showModal();
      } else if (previous) {
        // Native history traversal can clear focus after popstate returns.
        requestAnimationFrame(() => {
          if (signal.aborted || selected || !isCurrentPage()) return;
          triggers.get(previous.id)?.focus({ preventScroll: true });
          window.scrollTo({ left: returnX, top: returnY, behavior: 'instant' });
        });
      }
    };

    const project = next ?? previous;
    if (animate && project && (next ? !visible : visible === previous && previous?.open)) {
      const cardPhoto = triggers.get(project.id)?.querySelector<HTMLElement>('.project-photo') ?? null;
      const modalPhoto = project.querySelector<HTMLElement>('.project-photo');
      cancelPhoto = next ? morphPhoto(cardPhoto, modalPhoto, update) : morphPhoto(modalPhoto, cardPhoto, update);
    } else {
      update();
    }
  };

  const requestClose = (dialog: HTMLDialogElement) => {
    if (selected !== dialog || waitingForBack) return;
    if (history.state?.portfolioProject === dialog.id) {
      // The matching gallery entry is immediately behind a card-opened project.
      // Marking the entry also survives reloads and browser Forward navigation.
      waitingForBack = true;
      history.back();
    } else {
      // A shared link may be the first visit. Close in place and keep the page.
      const url = new URL(location.href);
      url.hash = '';
      history.replaceState(history.state, '', url);
      showProject(undefined, true);
    }
  };

  cards.forEach((card) => {
    card.addEventListener('click', async (event) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const dialog = dialogs.get(card.dataset.projectOpen ?? '');
      if (!dialog) return;
      event.preventDefault();
      if (selected || waitingForBack) return;
      triggers.set(dialog.id, card);
      const url = new URL(location.href);
      url.hash = dialog.id;
      const galleryScroll = { scrollX, scrollY };
      showProject(dialog, true);
      await navigate(url.href, { state: { portfolioProject: dialog.id } });
      if (!signal.aborted && isCurrentPage() && linkedDialog() === dialog && history.state?.portfolioProject === dialog.id) {
        history.replaceState({ ...history.state, ...galleryScroll }, '');
      }
    }, { signal });
  });

  for (const dialog of dialogs.values()) {
    const closeButton = dialog.querySelector<HTMLButtonElement>('button[data-modal-close]');
    if (closeButton) {
      closeButton.hidden = false;
      closeButton.addEventListener('click', () => requestClose(dialog), { signal });
    }
    dialog.addEventListener('click', (event) => {
      if (event.target === dialog) requestClose(dialog);
    }, { signal });
    dialog.addEventListener('cancel', (event) => {
      event.preventDefault();
      requestClose(dialog);
    }, { signal });
  }

  window.addEventListener('popstate', () => {
    waitingForBack = false;
    // Only handle project entries on this document. Astro owns other routes,
    // including a Back navigation from a shared project URL to another page.
    if (!isCurrentPage()) return;
    const target = linkedDialog();
    if (!target && !selected) return;
    showProject(target, true);
  }, { signal });
  signal.addEventListener('abort', () => cancelPhoto?.(), { once: true });
  showProject(linkedDialog());
}

// Content that starts on screen is left alone, because the page transition already
// covers it. Sections below the fold fade in once, the first time they are reached.
// Without JavaScript nothing is ever hidden.
let revealObserver: IntersectionObserver | undefined;

function initReveal() {
  revealObserver?.disconnect();
  revealObserver = undefined;
  if (prefersReducedMotion()) return;

  const targets = Array.from(document.querySelectorAll<HTMLElement>('.rail-section, .site-footer'))
    .filter((element) => element.getBoundingClientRect().top > window.innerHeight);
  if (!targets.length) return;

  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      const element = entry.target as HTMLElement;
      observer.unobserve(element);
      element.classList.add('is-visible');
      const finish = (event: TransitionEvent) => {
        if (event.target !== element) return; // A child's hover transition bubbling up.
        element.removeEventListener('transitionend', finish);
        element.classList.remove('reveal', 'is-visible');
      };
      element.addEventListener('transitionend', finish);
    }
  }, { rootMargin: '0px 0px -6% 0px' });

  for (const target of targets) {
    target.classList.add('reveal');
    observer.observe(target);
  }
  revealObserver = observer;
}

let pageListeners: AbortController | undefined;

function initPage() {
  pageListeners?.abort();
  pageListeners = new AbortController();
  initMenu(pageListeners.signal);
  initProjectModals(pageListeners.signal);
  initReveal();
}

document.addEventListener('astro:after-swap', initPage);
initPage();
