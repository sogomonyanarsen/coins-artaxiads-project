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
  const button = el(
    'button',
    {
      class: 'coin',
      type: 'button',
      'aria-pressed': 'false',
      'aria-label': `${label}. Սեղմեք՝ դրամը շրջելու համար`,
    },
    el(
      'span',
      { class: 'coin__inner' },
      el('img', {
        class: 'coin__face coin__face--obv',
        src: coinSrc(img, 'obv'),
        alt: `Դիմերես. ${obvText}`,
        loading: lazy ? 'lazy' : null,
        decoding: 'async',
      }),
      el('img', {
        class: 'coin__face coin__face--rev',
        src: coinSrc(img, 'rev'),
        alt: `Դարձերես. ${revText}`,
        loading: lazy ? 'lazy' : null,
        decoding: 'async',
      }),
    ),
  );

  button.addEventListener('click', () => {
    const reversed = button.getAttribute('aria-pressed') !== 'true';
    button.setAttribute('aria-pressed', String(reversed));
    onFlip?.(reversed);
  });

  return button;
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

export function credit(key) {
  const entry = CREDITS[key];
  if (!entry) return null;
  const text = entry.license ? `${entry.label} · ${entry.license}` : entry.label;
  return el(
    'p',
    { class: 'credit' },
    'Լուսանկար՝ ',
    entry.url ? el('a', { href: entry.url, target: '_blank', rel: 'noopener' }, text) : text,
  );
}

export function plate({ name, alt, creditKey }) {
  return el(
    'figure',
    { class: 'plate' },
    el('img', { src: coinSrc(name), alt, loading: 'lazy', decoding: 'async' }),
    creditKey && el('figcaption', {}, credit(creditKey)),
  );
}

export function missingCoin(note) {
  return el('div', { class: 'coin-missing', role: 'img', 'aria-label': note }, el('div', {}, el('span', {}, '?'), el('p', {}, note)));
}
