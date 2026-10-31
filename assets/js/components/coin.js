import { el, svg } from '../lib/dom.js';
import { CREDITS } from '../data/sources.js';

const COIN_DIR = 'assets/img/coins';

export const coinSrc = (name, side) => `${COIN_DIR}/${name}${side ? `-${side}` : ''}.webp`;

const FLIP_ICON =
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M3 12a9 9 0 0 1 15.5-6.2L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-15.5 6.2L3 16"/><path d="M3 21v-5h5"/></svg>';

/**
 * A coin that flips between obverse and reverse on click / Enter / Space.
 * `onFlip(isReverse)` lets a caption follow the visible side.
 */
export function flipCoin({ img, label, sides = [], lazy = true, onFlip }) {
  const [obvText = 'Դիմերես', revText = 'Դարձերես'] = sides;
  const face = (side, text) =>
    el('img', {
      class: `coin__face coin__face--${side}`,
      src: coinSrc(img, side),
      alt: `${side === 'obv' ? 'Դիմերես' : 'Դարձերես'}. ${text}`,
      loading: lazy ? 'lazy' : null,
      decoding: 'async',
    });
  return flipButton({ label, faces: [face('obv', obvText), face('rev', revText)], onFlip });
}

/** Same interaction for a drawn coin (legend around the rim), used when no free photo exists. */
export function schematicCoin({ label, obv, rev, onFlip }) {
  return flipButton({
    label,
    faces: [schematicFace(obv, 'obv'), schematicFace(rev, 'rev')],
    onFlip,
  });
}

function flipButton({ label, faces, onFlip }) {
  const button = el(
    'button',
    {
      class: 'coin',
      type: 'button',
      'aria-pressed': 'false',
      'aria-label': `${label}. Սեղմեք՝ դրամը շրջելու համար`,
    },
    el('span', { class: 'coin__inner' }, faces),
  );

  button.addEventListener('click', () => {
    const reversed = button.getAttribute('aria-pressed') !== 'true';
    button.setAttribute('aria-pressed', String(reversed));
    onFlip?.(reversed);
  });

  return button;
}

const SVG_NS = 'http://www.w3.org/2000/svg';
let schematicCount = 0;

function svgEl(tag, attrs, ...children) {
  const node = document.createElementNS(SVG_NS, tag);
  for (const [key, value] of Object.entries(attrs)) node.setAttribute(key, value);
  node.append(...children);
  return node;
}

function schematicFace({ legend, center }, side) {
  const pathId = `rim-${(schematicCount += 1)}`;
  return svgEl(
    'svg',
    {
      class: `coin__face coin__face--${side} coin__face--drawn`,
      viewBox: '0 0 200 200',
      role: 'img',
      'aria-label': `${legend}. ${center}`,
    },
    svgEl('circle', { cx: 100, cy: 100, r: 96, class: 'drawn__disc' }),
    svgEl('circle', { cx: 100, cy: 100, r: 88, class: 'drawn__dots' }),
    svgEl('path', { id: pathId, d: 'M100 100 m-74 0 a74 74 0 1 1 148 0 a74 74 0 1 1 -148 0', fill: 'none' }),
    svgEl('text', { class: 'drawn__legend' }, svgEl('textPath', { href: `#${pathId}`, startOffset: '8%' }, legend)),
    svgEl('text', { x: 100, y: 104, class: 'drawn__center', 'text-anchor': 'middle' }, center),
  );
}

export function flipHint() {
  return el('span', { class: 'coin-hint label' }, svg(FLIP_ICON), 'Սեղմեք դրամին՝ շրջելու համար');
}

/** Caption listing both sides; the visible one is highlighted. */
export function sideCaption(sides) {
  const [obv, rev] = sides;
  const obvRow = [el('dt', { 'data-active': 'true' }, 'Դիմերես'), el('dd', { 'data-active': 'true' }, obv)];
  const revRow = [el('dt', {}, 'Դարձերես'), el('dd', {}, rev)];
  const list = el('dl', { class: 'stage__caption' }, obvRow, revRow);

  const setActive = (reversed) => {
    obvRow.forEach((node) => node.setAttribute('data-active', String(!reversed)));
    revRow.forEach((node) => node.setAttribute('data-active', String(reversed)));
  };

  return { node: list, setActive };
}

export function credit(key, prefix = 'Լուսանկար՝ ') {
  const entry = CREDITS[key];
  if (!entry) return null;
  const text = entry.license ? `${entry.label} · ${entry.license}` : entry.label;
  return el('p', { class: 'credit' }, prefix, entry.url ? el('a', { href: entry.url, target: '_blank', rel: 'noopener' }, text) : text);
}

export function plate({ name, alt, creditKey }) {
  return el(
    'figure',
    { class: 'plate' },
    el('img', { src: coinSrc(name), alt, loading: 'lazy', decoding: 'async' }),
    creditKey && el('figcaption', {}, credit(creditKey)),
  );
}

let tipCount = 0;
const openFlags = new Set();

// One listener for every flag: a press outside an open flag closes it.
document.addEventListener('pointerdown', (event) => {
  openFlags.forEach((flag) => {
    if (!flag.wrapper.contains(event.target)) flag.close();
  });
});

/**
 * "Disputed attribution" flag with a tooltip in the note-card style.
 * Visible while hovered (on devices that hover), while focused from the
 * keyboard, or after a tap/click; Esc, a second tap or a press elsewhere
 * closes it. The `is-open` / `is-dismissed` classes are the single source of truth.
 */
export function contestedFlag(text) {
  const id = `tip-${(tipCount += 1)}`;
  const wrapper = el('span', { class: 'contested' });
  const trigger = el(
    'button',
    { class: 'contested__trigger label', type: 'button', 'aria-describedby': id },
    el('span', { class: 'contested__icon', 'aria-hidden': 'true' }, '!'),
    'Վիճելի վերագրում',
  );
  const tip = el('span', { class: 'contested__tip', role: 'tooltip', id }, text);

  const flag = {
    wrapper,
    close() {
      wrapper.classList.remove('is-open');
      wrapper.classList.add('is-dismissed');
      openFlags.delete(flag);
    },
    open() {
      wrapper.classList.add('is-open');
      wrapper.classList.remove('is-dismissed');
      openFlags.add(flag);
    },
  };

  trigger.addEventListener('click', () => (wrapper.classList.contains('is-open') ? flag.close() : flag.open()));
  trigger.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') return;
    event.stopPropagation();
    flag.close();
  });
  // Dismissal only lasts until the pointer leaves or focus moves on.
  const reset = () => {
    if (!wrapper.classList.contains('is-open')) wrapper.classList.remove('is-dismissed');
  };
  wrapper.addEventListener('pointerleave', reset);
  trigger.addEventListener('blur', () => {
    flag.close();
    reset();
  });

  wrapper.append(trigger, tip);
  return wrapper;
}

/** King portrait: an artwork, or the king's own coin when no other image exists. */
export function portrait({ src, coin, caption, credit: creditKey }) {
  // The visible caption describes the image, so the <img> itself is decorative.
  const image = src
    ? el('img', { src: `assets/img/portraits/${src}.webp`, alt: '', loading: 'lazy', decoding: 'async' })
    : el('img', { src: coinSrc(coin, 'obv'), alt: '', loading: 'lazy', decoding: 'async' });

  return el(
    'figure',
    { class: `portrait${src ? '' : ' portrait--coin'}` },
    el('div', { class: 'portrait__frame' }, image),
    el('figcaption', {}, caption, creditKey && credit(creditKey, src ? 'Պատկեր՝ ' : 'Լուսանկար՝ ')),
  );
}
