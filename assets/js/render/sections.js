import { el } from '../lib/dom.js';
import { coinSrc, flipCoin, flipHint } from '../components/coin.js';
import { EVOLUTION, FINDINGS } from '../data/analysis.js';
import { teamBlock } from '../components/team.js';

/** Coins shown on the hero's chapter cards. */
const CARD_COINS = {
  ch1: 'artaxias1-aramaic',
  ch2: 'tigran2-antioch',
  ch3: 'artavazd2-tetradrachm',
  ch4: 'tigran4-erato-jugate',
  rome: 'rome-devicta',
};

export function renderHeroCoin() {
  return el(
    'div',
    {},
    flipCoin({
      img: 'tigran2-antioch',
      label: 'Տիգրան Մեծի տետրադրախմա',
      sides: ['Տիգրան Մեծ', 'Անտիոքի Տյուխե'],
      lazy: false,
    }),
    el('p', { class: 'credit' }, flipHint()),
  );
}

export function renderChapterCards(chapters) {
  return chapters.map((chapter) =>
    el(
      'li',
      {},
      el(
        'a',
        { class: 'chapter-card', href: `#${chapter.id}-cover`, dataset: { tone: chapter.tone } },
        el('span', { class: 'label' }, chapter.num <= 4 ? `Գլ. ${chapter.num}` : 'Վերջաբան'),
        el('span', { class: 'chapter-card__period display' }, chapter.period),
        el('span', { class: 'chapter-card__title' }, chapter.title),
        el('img', { class: 'chapter-card__coin', src: coinSrc(CARD_COINS[chapter.id], 'obv'), alt: '', loading: 'lazy' }),
      ),
    ),
  );
}

export function renderMenu(chapters) {
  return el(
    'div',
    { class: 'menu__grid' },
    chapters.map((chapter) =>
      el(
        'div',
        { class: 'menu__chapter', dataset: { tone: chapter.tone } },
        el('p', { class: 'label' }, chapter.period),
        el('h2', { class: 'display' }, el('a', { href: `#${chapter.id}-cover` }, chapter.title)),
        el(
          'ol',
          {},
          (chapter.panels ?? [{ id: chapter.id, name: chapter.subtitle, reign: '' }]).map((panel) =>
            el('li', {}, el('a', { href: `#${panel.id}` }, el('span', {}, panel.name), el('span', {}, panel.reign))),
          ),
        ),
      ),
    ),
    el(
      'div',
      { class: 'menu__chapter', dataset: { tone: 'ink' } },
      el('p', { class: 'label' }, 'Եզրակացություն'),
      el('h2', { class: 'display' }, el('a', { href: '#findings' }, 'Ի՞նչ ենք իմանում')),
      el(
        'ol',
        {},
        el('li', {}, el('a', { href: '#findings' }, el('span', {}, 'Դրամների վկայությունը'), el('span', {}, ''))),
        el('li', {}, el('a', { href: '#evolution' }, el('span', {}, 'Էվոլյուցիան մեկ աղյուսակում'), el('span', {}, ''))),
        el('li', {}, el('a', { href: 'sources.html' }, el('span', {}, 'Աղբյուրներ'), el('span', {}, '↗'))),
      ),
    ),
  );
}

export const renderTeam = () => teamBlock('hero__team');

/** Full-screen opener between the hero and chapter 01. */
export function renderIntro(intro) {
  return el(
    'section',
    { class: 'intro', id: intro.id, dataset: { tone: 'patina' }, 'aria-labelledby': 'intro-title' },
    el('p', { class: 'label reveal' }, intro.kicker),
    el('h2', { class: 'intro__title display reveal', id: 'intro-title' }, intro.title),
    el('p', { class: 'intro__text reveal' }, intro.text),
    el('a', { class: 'intro__next label reveal', href: '#ch1-cover' }, 'Գլուխ 01 ↓'),
  );
}

export function renderFindings() {
  return el(
    'section',
    { class: 'section section--dark', id: 'findings', 'aria-labelledby': 'findings-title' },
    el(
      'div',
      { class: 'section__head' },
      el(
        'div',
        {},
        el('p', { class: 'label' }, 'Եզրակացություն · հետազոտական հարց'),
        el('h2', { class: 'section__title display', id: 'findings-title' }, 'Ի՞նչ են պատմում դրամները'),
      ),
      el(
        'p',
        { class: 'section__lead' },
        'Մեկ արքայից մյուսը դրամների փոփոխությունը համեմատելով՝ կարող ենք տեսնել, թե ինչպես էին փոխվում թագավորության տնտեսությունը, իշխանության նորմերը և արտաքին ազդեցությունները։',
      ),
    ),
    el(
      'div',
      { class: 'findings' },
      FINDINGS.map((finding) =>
        el(
          'article',
          { class: 'finding reveal', dataset: { theme: finding.theme } },
          el('div', {}, el('h3', { class: 'finding__title display' }, finding.title), el('p', { class: 'finding__claim' }, finding.claim)),
          el(
            'ul',
            {},
            finding.points.map((point) => el('li', {}, point)),
          ),
        ),
      ),
    ),
  );
}

function matrixCell(text, col, level) {
  const disputed = text.startsWith('?');
  return el(
    'td',
    { class: disputed ? 'is-disputed' : null, dataset: { col } },
    el('span', {}, disputed ? text.slice(1) : text),
    level != null && el('i', { class: 'meter', style: { '--level': `${(level / 4) * 100}%` }, 'aria-hidden': 'true' }),
  );
}

export function renderEvolution() {
  const { kings, rows } = EVOLUTION;

  const table = el(
    'table',
    { class: 'matrix' },
    el('caption', { class: 'visually-hidden' }, 'Արտաշեսյան դրամների փոփոխությունը ըստ արքաների'),
    el(
      'thead',
      {},
      el(
        'tr',
        {},
        el('td', {}),
        kings.map((king, col) =>
          el(
            'th',
            { scope: 'col', dataset: { col } },
            el('a', { href: `#${king.id}` }, el('strong', {}, king.label), el('span', {}, `մ.թ.ա. ${king.years}`)),
          ),
        ),
      ),
    ),
    el(
      'tbody',
      {},
      rows.map((row) =>
        el(
          'tr',
          {},
          el('th', { scope: 'row' }, el('strong', {}, row.aspect), el('span', {}, row.hint)),
          row.cells.map((cell, col) => matrixCell(cell, col, row.levels?.[col])),
        ),
      ),
    ),
  );

  // Highlight the whole column under the pointer, so one king can be read top-to-bottom.
  table.addEventListener('pointerover', (event) => {
    const col = event.target.closest('[data-col]')?.dataset.col;
    table.querySelectorAll('.is-hover').forEach((cell) => cell.classList.remove('is-hover'));
    if (col != null) table.querySelectorAll(`[data-col="${col}"]`).forEach((cell) => cell.classList.add('is-hover'));
  });
  table.addEventListener('pointerleave', () => table.querySelectorAll('.is-hover').forEach((cell) => cell.classList.remove('is-hover')));

  return el(
    'section',
    { class: 'section', id: 'evolution', 'aria-labelledby': 'evolution-title' },
    el(
      'div',
      { class: 'section__head' },
      el(
        'div',
        {},
        el('p', { class: 'label' }, 'Մեկ հայացքով'),
        el('h2', { class: 'section__title display', id: 'evolution-title' }, 'Էվոլյուցիա'),
      ),
      el(
        'p',
        { class: 'section__lead' },
        'Կարդացեք տողերով՝ տեսնելու համար, թե ինչպես է փոխվում մեկ հատկանիշը, կամ սյունակներով՝ մեկ արքայի ամբողջական «դիմանկարի» համար։ Ոսկեգույն գիծը ցույց է տալիս մետաղի և տիտղոսի «բարձրությունը»։',
      ),
    ),
    el('div', { class: 'matrix-wrap reveal' }, table),
    el(
      'div',
      { class: 'matrix-legend' },
      el('span', {}, 'Կետագծով ընդգծված՝ վիճելի վերագրում'),
      el('span', {}, 'Սեղմեք արքայի անվանը՝ նրա դրամներին անցնելու համար'),
    ),
  );
}

export function renderFooter() {
  return el(
    'footer',
    { class: 'site-footer' },
    el(
      'div',
      {},
      el('p', { class: 'label' }, 'Հայոց պատմության դասի նախագիծ'),
      el('h2', { class: 'site-footer__title display' }, 'Արտաշեսյանների դրամները'),
      teamBlock('site-footer__team'),
    ),
    el(
      'div',
      { class: 'site-footer__links' },
      el('a', { class: 'btn', href: 'sources.html' }, 'Աղբյուրներ և լուսանկարներ'),
      el('a', { class: 'btn', href: '#top' }, 'Վերև ↑'),
      el(
        'p',
        {},
        'Լուսանկարները՝ թիմի աշխատանքային փաստաթղթից (Bedoukian 1978, Vardanyan 2008 և այլն) և Wikimedia Commons-ի ազատ լիցենզիայով նյութերից։',
      ),
    ),
  );
}
