import { el } from './lib/dom.js';
import { BIBLIOGRAPHY, CREDITS, TEAM } from './data/sources.js';

function link(url) {
  return el('a', { href: url, target: '_blank', rel: 'noopener' }, url);
}

document.getElementById('bibliography').append(
  ...BIBLIOGRAPHY.map(({ group, items }) => [
    el('h2', { class: 'display' }, group),
    el(
      'ol',
      {},
      items.map((item) => el('li', {}, item.text, item.note && el('small', {}, item.note), item.url && el('small', {}, link(item.url)))),
    ),
  ]).flat(),
  el('h2', { class: 'display' }, 'Թիմ'),
  el('p', { class: 'serif' }, TEAM.join(' · ')),
);

document.getElementById('credits').append(
  ...Object.values(CREDITS)
    .filter((entry) => entry.url)
    .map((entry) => el('li', {}, `${entry.label} · ${entry.license}`, el('small', {}, link(entry.url)))),
);
