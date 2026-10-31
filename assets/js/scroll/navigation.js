import { el, prefersReducedMotion } from '../lib/dom.js';

/** Surfaces with a dark or saturated background; fixed bars switch to light text over them. */
const DARK_SURFACES = '.intro, .panel--cover, [data-tone="ink"], .section--dark, .site-footer';

/**
 * Bottom timeline (years with a dot on the current reign), in-page anchor
 * handling that understands the horizontal tracks, and the full-screen menu.
 */
export function createNavigation({ scroller, navRoot, menu, menuToggle, hero, header }) {
  const targets = [...document.querySelectorAll('[data-nav]')];
  const behavior = () => (prefersReducedMotion() ? 'auto' : 'smooth');
  const background = () => [document.querySelector('main'), navRoot, document.querySelector('.site-footer')];

  const links = targets.map((target) =>
    el(
      'a',
      { href: `#${target.id}`, 'aria-label': target.getAttribute('aria-label') },
      el('span', { class: 'timeline-nav__name', 'aria-hidden': 'true' }, target.dataset.nav),
      el('span', { 'aria-hidden': 'true' }, target.dataset.year),
    ),
  );
  navRoot.replaceChildren(
    el(
      'ol',
      {},
      links.map((link) => el('li', {}, link)),
    ),
  );

  let current = -1;

  /** Is the page surface under the given viewport point dark? Fixed bars themselves are skipped. */
  function isDarkAt(y) {
    const under = document.elementsFromPoint(window.innerWidth / 2, y).find((node) => !node.closest('.site-header, .timeline-nav, .note'));
    return Boolean(under?.closest(DARK_SURFACES));
  }

  function update() {
    const threshold = scroller.isActive() ? window.innerWidth * 0.45 : window.innerHeight * 0.45;
    const y = window.scrollY + threshold;

    let index = -1;
    targets.forEach((target, i) => {
      if (scroller.positionOf(target) <= y) index = i;
    });

    // Past the timeline (findings, evolution, footer) nothing is "current".
    const last = targets[targets.length - 1]?.closest('.chapter');
    if (last && window.scrollY > last.offsetTop + last.offsetHeight - window.innerHeight * 0.5) index = -1;

    if (index !== current) {
      links[current]?.removeAttribute('aria-current');
      links[index]?.setAttribute('aria-current', 'true');
      links[index]?.scrollIntoView({ block: 'nearest', inline: 'nearest' });
      current = index;
    }

    navRoot.classList.toggle('is-shown', hero.getBoundingClientRect().bottom < window.innerHeight * 0.5 && index !== -1);
    if (!menu.classList.contains('is-open')) header.classList.toggle('is-on-dark', isDarkAt(header.offsetHeight / 2));
    navRoot.classList.toggle('is-on-dark', isDarkAt(window.innerHeight - navRoot.offsetHeight / 2));
  }

  function goTo(id, { updateHash = true } = {}) {
    const target = document.getElementById(id);
    if (!target) return false;
    scroller.scrollToElement(target, behavior());
    if (updateHash) history.replaceState(null, '', `#${id}`);
    // Move keyboard / screen-reader focus with the jump.
    if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
    target.focus({ preventScroll: true });
    return true;
  }

  // Delegate every in-page link so jumps land on the right horizontal position.
  document.addEventListener('click', (event) => {
    const link = event.target.closest('a[href^="#"]');
    if (!link) return;
    const id = decodeURIComponent(link.getAttribute('href').slice(1));
    event.preventDefault();
    setMenu(false);
    if (id === 'top') {
      window.scrollTo({ top: 0, behavior: behavior() });
      history.replaceState(null, '', location.pathname);
      menuToggle.focus({ preventScroll: true });
      return;
    }
    goTo(id);
  });

  // ← / → step between reigns while the timeline is pinned horizontally.
  document.addEventListener('keydown', (event) => {
    if (!scroller.isActive() || menu.classList.contains('is-open') || event.altKey || event.metaKey || event.ctrlKey) return;
    if (event.target.closest('input, textarea, dialog[open], .matrix-wrap')) return;
    const step = { ArrowRight: 1, ArrowLeft: -1 }[event.key];
    if (!step || current === -1) return;
    const next = targets[current + step];
    if (next) {
      event.preventDefault();
      goTo(next.id);
    }
  });

  function setMenu(open) {
    if (open === menu.classList.contains('is-open')) return;
    menu.classList.toggle('is-open', open);
    menu.inert = !open;
    // Keep Tab inside the overlay while it is open.
    background().forEach((node) => node && (node.inert = open));
    header.classList.toggle('is-on-dark', open || isDarkAt(header.offsetHeight / 2));
    menuToggle.setAttribute('aria-expanded', String(open));
    document.body.style.overflow = open ? 'hidden' : '';
    if (open) menu.querySelector('a')?.focus();
  }

  menu.inert = true;
  menuToggle.addEventListener('click', () => setMenu(!menu.classList.contains('is-open')));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && menu.classList.contains('is-open')) {
      setMenu(false);
      menuToggle.focus();
    }
  });

  if (location.hash.length > 1) {
    // The browser's own anchor jump can't see horizontal positions; redo it
    // once layout (fonts, track widths) is final.
    history.scrollRestoration = 'manual';
    const jump = () => {
      const target = document.getElementById(decodeURIComponent(location.hash.slice(1)));
      if (!target) return;
      // Older browsers without `overflow: clip` let the native anchor jump scroll the sticky boxes.
      document.querySelectorAll('.chapter__sticky').forEach((sticky) => (sticky.scrollLeft = 0));
      window.scrollTo({ top: scroller.positionOf(target), behavior: 'instant' });
    };
    jump();
    document.fonts?.ready.then(jump);
    window.addEventListener('load', jump, { once: true });
  }

  return { update };
}
