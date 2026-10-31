import { el, svg } from '../lib/dom.js';
import { THEMES } from '../data/timeline.js';
import { credit, flipCoin, flipHint, missingCoin, plate, sideCaption } from '../components/coin.js';
import { disputeBody, factsList, openNote } from '../components/note.js';

const METALS = { silver: 'Արծաթ', copper: 'Պղինձ' };

const SWOOSH =
  '<svg class="king__swoosh" viewBox="0 0 300 24" fill="none" aria-hidden="true"><path d="M4 16c40-9 86-13 140-10 52 3 98 8 152-2" stroke="currentColor" stroke-width="3" stroke-linecap="round"/></svg>';

/* ───────── Coin panel ───────── */

function renderStage(coin) {
  const stage = el('div', { class: 'stage reveal' });

  if (coin.missing) {
    stage.append(missingCoin(coin.missingNote));
    if (coin.sides) stage.append(sideCaption(coin.sides).node);
    return stage;
  }

  if (Array.isArray(coin.img)) {
    stage.append(
      el(
        'div',
        { class: 'stage__multi' },
        coin.img.map((name, i) =>
          el('figure', {}, flipCoin({ img: name, label: coin.imgLabels[i] }), el('figcaption', {}, coin.imgLabels[i])),
        ),
      ),
      flipHint(),
      credit(coin.credit),
    );
    return stage;
  }

  if (coin.img) {
    const caption = coin.sides ? sideCaption(coin.sides) : null;
    stage.append(
      el('div', { class: 'stage__coin' }, flipCoin({ img: coin.img, label: coin.title, sides: coin.sides, onFlip: caption?.setActive })),
      flipHint(),
      caption?.node,
      credit(coin.credit),
    );
  }

  if (coin.gallery) {
    stage.append(
      el(
        'div',
        { class: 'gallery' },
        coin.gallery.map((item) =>
          el('figure', {}, el('img', { src: `assets/img/coins/${item.plate}.webp`, alt: item.label, loading: 'lazy' }), item.label),
        ),
      ),
      credit('bedoukian'),
    );
  }

  if (coin.plate) {
    stage.append(plate({ name: coin.plate, alt: coin.plateAlt, creditKey: coin.img ? coin.plateCredit : coin.credit }));
  }

  return stage;
}

function renderInscription({ text, script, meaning }) {
  const isGreekOrLatin = /[Ͱ-Ͽ]|^[A-Z\s·]+$/.test(text);
  return el(
    'div',
    { class: 'inscription reveal' },
    el('p', { class: 'inscription__script label' }, script),
    el('p', { class: `inscription__text ${isGreekOrLatin ? 'greek' : ''}`, lang: isGreekOrLatin ? 'grc' : null }, text),
    el('p', { class: 'inscription__meaning' }, meaning),
  );
}

function renderActions(coin) {
  const actions = [];

  if (coin.tech) {
    actions.push(
      el(
        'button',
        {
          class: 'btn',
          type: 'button',
          onclick: () => openNote({ kicker: 'Տեխնիկական տվյալներ', title: coin.title, body: factsList(coin.tech) }),
        },
        'Տեխնիկական տվյալներ',
      ),
    );
  }

  if (coin.dispute) {
    actions.push(
      el(
        'button',
        {
          class: 'btn btn--dispute',
          type: 'button',
          onclick: () => openNote({ kicker: 'Վեճ · տարբեր տեսակետներ', title: coin.dispute.title, body: disputeBody(coin.dispute) }),
        },
        'Վեճ',
      ),
    );
  }

  return actions.length ? el('div', { class: 'actions reveal' }, actions) : null;
}

export function renderCoinPanel(coin) {
  const titleId = `title-${coin.id}`;

  return el(
    'article',
    { class: `panel panel--coin${coin.featured ? ' is-featured' : ''}`, id: coin.id, 'aria-labelledby': titleId },
    renderStage(coin),
    el(
      'div',
      { class: 'info' },
      el(
        'p',
        { class: 'info__kicker reveal' },
        el('span', { class: 'info__date' }, coin.date),
        el('span', { class: `metal metal--${coin.metal} label` }, METALS[coin.metal]),
        coin.related && el('span', { class: 'related' }, `→ ${coin.related}`),
      ),
      el('h4', { class: 'info__title display reveal', id: titleId }, coin.title),
      coin.inscription && renderInscription(coin.inscription),
      el(
        'ul',
        { class: 'insights reveal', 'aria-label': 'Ինչ է պատմում դրամը' },
        coin.insights.map(({ theme, text }) =>
          el('li', { class: 'insight', dataset: { theme } }, el('span', { class: 'insight__theme label' }, THEMES[theme]), text),
        ),
      ),
      coin.caveat && el('p', { class: 'caveat reveal' }, coin.caveat),
      renderActions(coin),
    ),
  );
}

/* ───────── King / interlude header ───────── */

function renderKingPanel(panel) {
  const count = panel.coins.length;
  return el(
    'section',
    { class: 'panel panel--king', id: panel.id, dataset: { nav: panel.short, year: panel.navYear }, 'aria-label': panel.name },
    el('p', { class: 'king__kind label reveal' }, panel.kind === 'interlude' ? 'Ընդմիջում' : 'Գահակալություն'),
    el('p', { class: 'king__reign reveal' }, panel.reign),
    el('h3', { class: 'king__name display reveal' }, panel.name),
    svg(SWOOSH),
    el('p', { class: 'king__tagline reveal' }, panel.tagline),
    el('p', { class: 'king__summary reveal' }, panel.summary),
    el('p', { class: 'king__count label reveal' }, `${count} ցուցանմուշ →`),
  );
}

/* ───────── Chapter ───────── */

function renderCover(chapter, label = `Գլուխ ${chapter.num}`) {
  return el(
    'header',
    { class: 'panel panel--cover', id: `${chapter.id}-cover` },
    el(
      'div',
      {},
      el('p', { class: 'label reveal' }, label),
      el('p', { class: 'cover__num display reveal', 'aria-hidden': 'true' }, String(chapter.num).padStart(2, '0')),
    ),
    el(
      'div',
      {},
      el('p', { class: 'cover__period display reveal' }, chapter.period),
      el('h2', { class: 'cover__title display reveal' }, chapter.title),
      el('p', { class: 'cover__subtitle reveal' }, chapter.subtitle),
    ),
    el('p', { class: 'cover__intro reveal' }, chapter.intro),
  );
}

function chapterShell(chapter, panels) {
  return el(
    'section',
    { class: 'chapter', id: chapter.id, dataset: { tone: chapter.tone }, 'aria-label': `${chapter.title}, ${chapter.period}` },
    el('div', { class: 'chapter__sticky' }, el('div', { class: 'chapter__track' }, panels)),
  );
}

export function renderChapter(chapter) {
  return chapterShell(chapter, [
    renderCover(chapter),
    chapter.panels.map((panel) => [renderKingPanel(panel), panel.coins.map(renderCoinPanel)]),
  ]);
}

export function renderEpilogue(epilogue, afterword) {
  const navAnchor = el(
    'section',
    { class: 'panel panel--king', id: epilogue.id, dataset: { nav: epilogue.period, year: 'Հռոմ' }, 'aria-label': epilogue.title },
    el('p', { class: 'king__kind label reveal' }, 'Վերջաբան'),
    el('p', { class: 'king__reign reveal' }, epilogue.period),
    el('h3', { class: 'king__name display reveal' }, epilogue.title),
    svg(SWOOSH),
    el('p', { class: 'king__tagline reveal' }, epilogue.subtitle),
    el('p', { class: 'king__summary reveal' }, epilogue.intro),
  );

  const end = el(
    'section',
    { class: 'panel panel--end', 'aria-label': 'Ավարտ' },
    el('p', { class: 'label reveal' }, 'Ավարտ'),
    el('h3', { class: 'end__title display reveal' }, 'Արտաշեսյանների վերջը'),
    el('p', { class: 'reveal' }, afterword),
  );

  return chapterShell(epilogue, [renderCover(epilogue, 'Վերջաբան'), navAnchor, epilogue.coins.map(renderCoinPanel), end]);
}
