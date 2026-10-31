import { el } from '../lib/dom.js';
import { TEAM } from '../data/sources.js';

/** The same labelled team list is used in the hero, the footer and on the sources page. */
export function teamBlock(className = '') {
  return el(
    'div',
    { class: `team ${className}`.trim() },
    el('p', { class: 'team__label label', id: `team-label-${className || 'default'}` }, 'Նախագիծը պատրաստեցին'),
    el(
      'ul',
      { class: 'team__names', 'aria-labelledby': `team-label-${className || 'default'}` },
      TEAM.map((name) => el('li', {}, name)),
    ),
  );
}
