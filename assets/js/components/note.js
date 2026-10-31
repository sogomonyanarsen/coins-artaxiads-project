import { el } from '../lib/dom.js';

/**
 * One shared <dialog> styled as a paper note card. It holds the secondary
 * material — technical data and scholarly disputes — so the timeline itself
 * stays focused on what the coins tell.
 */
let dialog;

function ensureDialog() {
  if (dialog) return dialog;
  dialog = document.getElementById('note');
  dialog.addEventListener('click', (event) => {
    // A click on the backdrop lands on the dialog element itself.
    if (event.target === dialog) dialog.close();
  });
  return dialog;
}

export function openNote({ kicker, title, body }) {
  const note = ensureDialog();
  const closeButton = el('button', { class: 'note__close', type: 'button', 'aria-label': 'Փակել', onclick: () => note.close() }, '×');

  note.replaceChildren(
    el(
      'div',
      { class: 'note__inner' },
      el(
        'header',
        { class: 'note__head' },
        el('div', {}, el('p', { class: 'note__kicker label' }, kicker), el('h2', { class: 'note__title', id: 'note-title' }, title)),
        closeButton,
      ),
      body,
    ),
  );
  note.setAttribute('aria-labelledby', 'note-title');
  note.showModal();
  closeButton.focus();
}

export function factsList(rows) {
  return el(
    'dl',
    { class: 'facts' },
    rows.map(([label, value]) => [el('dt', {}, label), el('dd', {}, value)]),
  );
}

export function disputeBody({ table, views }) {
  return el(
    'div',
    {},
    table &&
      el(
        'table',
        {},
        el(
          'thead',
          {},
          el(
            'tr',
            {},
            table.head.map((cell) => el('th', { scope: 'col' }, cell)),
          ),
        ),
        el(
          'tbody',
          {},
          table.rows.map((row) =>
            el(
              'tr',
              {},
              row.map((cell) => el('td', {}, cell)),
            ),
          ),
        ),
      ),
    el(
      'ul',
      { class: 'views' },
      views.map(({ who, says }) => el('li', {}, el('strong', {}, who), says)),
    ),
  );
}
