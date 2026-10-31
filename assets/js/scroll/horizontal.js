import { clamp } from '../lib/dom.js';

/**
 * Pinned horizontal scrolling, as on the reference site: while a chapter is in
 * view its track is held in place (position: sticky) and vertical scroll is
 * translated into horizontal movement.
 *
 * Only enabled on screens large enough for side-by-side panels; elsewhere the
 * chapters fall back to a normal vertical flow.
 */
const QUERY = '(min-width: 1000px) and (min-height: 680px)';

export function createHorizontalScroll(chapters, { onUpdate } = {}) {
  const media = window.matchMedia(QUERY);
  let items = [];
  let frame = 0;

  const isActive = () => media.matches;

  function measure() {
    document.documentElement.classList.toggle('is-horizontal', isActive());

    items = chapters.map((section) => {
      const sticky = section.querySelector('.chapter__sticky');
      const track = section.querySelector('.chapter__track');

      if (!isActive()) {
        section.style.height = '';
        track.style.transform = '';
        return { section, track, sticky, top: 0, distance: 0 };
      }

      // Measure the sticky box itself: 100vh and innerHeight differ on many devices.
      const distance = Math.max(0, track.scrollWidth - sticky.clientWidth);
      section.style.height = `${distance + sticky.offsetHeight}px`;
      const top = section.getBoundingClientRect().top + window.scrollY;
      return { section, track, sticky, top, distance };
    });

    update();
  }

  function update() {
    frame = 0;
    if (isActive()) {
      const y = window.scrollY;
      for (const item of items) {
        const progress = clamp(y - item.top, 0, item.distance);
        item.track.style.transform = `translate3d(${-progress}px, 0, 0)`;
      }
    }
    onUpdate?.();
  }

  const requestUpdate = () => {
    if (!frame) frame = requestAnimationFrame(update);
  };

  /** Absolute window scroll position at which `element` is aligned to the viewport start. */
  function positionOf(element) {
    const item = items.find(({ section }) => section.contains(element));
    if (item && isActive()) {
      const panel = element.closest('.panel') ?? element;
      return item.top + Math.min(panel.offsetLeft, item.distance);
    }
    return element.getBoundingClientRect().top + window.scrollY;
  }

  /**
   * Long jumps would fly through whole chapters sideways, so anything further
   * than a few screens is instant; short hops stay smooth.
   */
  function scrollToElement(element, behavior = 'smooth') {
    const top = positionOf(element);
    const far = Math.abs(top - window.scrollY) > window.innerHeight * 3;
    window.scrollTo({ top, behavior: far ? 'instant' : behavior });
  }

  // Keyboard users tab into off-screen panels: bring them into view instead of
  // letting the browser scroll the clipped sticky container sideways.
  for (const section of chapters) {
    section.addEventListener('focusin', (event) => {
      if (!isActive()) return;
      const sticky = section.querySelector('.chapter__sticky');
      sticky.scrollLeft = 0;
      const panel = event.target.closest('.panel');
      // Programmatic focus after a link jump (tabindex=-1): the jump already scrolled there.
      if (!panel || (event.target === panel && panel.getAttribute('tabindex') === '-1')) return;
      const rect = panel.getBoundingClientRect();
      if (rect.left < 0 || rect.right > window.innerWidth) scrollToElement(panel, 'auto');
    });
  }

  window.addEventListener('scroll', requestUpdate, { passive: true });
  window.addEventListener('resize', measure);
  media.addEventListener('change', measure);
  // Fonts and lazy images change panel widths after first layout.
  document.fonts?.ready.then(measure);
  window.addEventListener('load', measure);

  measure();

  return { measure, positionOf, scrollToElement, isActive };
}
