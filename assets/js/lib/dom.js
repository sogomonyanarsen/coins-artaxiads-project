/**
 * Tiny element factory. Children may be nodes, strings, arrays or null/false (skipped).
 * Text is always inserted as text nodes, so content is never parsed as HTML.
 *
 *   el('a', { class: 'btn', href: '#x', onclick: fn }, 'Label')
 */
export function el(tag, props = {}, ...children) {
  const node = document.createElement(tag);

  for (const [key, value] of Object.entries(props)) {
    if (value == null || value === false) continue;

    if (key === 'class') node.className = value;
    else if (key === 'dataset') Object.assign(node.dataset, value);
    else if (key === 'style' && typeof value === 'object') setStyles(node, value);
    else if (key.startsWith('on') && typeof value === 'function') node.addEventListener(key.slice(2), value);
    else node.setAttribute(key, value === true ? '' : String(value));
  }

  node.append(...children.flat(Infinity).filter((child) => child != null && child !== false));
  return node;
}

/** Accepts camelCase properties and CSS custom properties (`--name`). */
function setStyles(node, styles) {
  for (const [prop, value] of Object.entries(styles)) {
    const name = prop.startsWith('--') ? prop : prop.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`);
    node.style.setProperty(name, value);
  }
}

/** Build an inline SVG from markup we author ourselves (icons, decorative strokes). */
export function svg(markup) {
  const template = document.createElement('template');
  template.innerHTML = markup.trim();
  return template.content.firstElementChild;
}

export const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

export const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
