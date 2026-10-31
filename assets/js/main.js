import { AFTERWORD, CHAPTERS, EPILOGUE, INTRO } from './data/timeline.js';
import { renderChapter, renderEpilogue } from './render/chapters.js';
import {
  renderChapterCards,
  renderEvolution,
  renderFindings,
  renderFooter,
  renderHeroCoin,
  renderIntro,
  renderMenu,
  renderTeam,
} from './render/sections.js';
import { createHorizontalScroll } from './scroll/horizontal.js';
import { createNavigation } from './scroll/navigation.js';

function observeReveals() {
  const targets = document.querySelectorAll('.panel, .reveal');
  if (!('IntersectionObserver' in window)) {
    targets.forEach((node) => node.classList.add('is-visible'));
    return;
  }
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    },
    { threshold: 0.15 },
  );
  targets.forEach((node) => observer.observe(node));
}

function init() {
  const allChapters = [...CHAPTERS, EPILOGUE];

  document.getElementById('hero-coin').append(renderHeroCoin());
  document.querySelector('.hero__aside').append(renderTeam());
  document.getElementById('chapter-cards').append(...renderChapterCards(allChapters));
  document.getElementById('menu').append(renderMenu(allChapters));

  const chapterSections = [...CHAPTERS.map(renderChapter), renderEpilogue(EPILOGUE, AFTERWORD)];
  document.getElementById('timeline').append(renderIntro(INTRO), ...chapterSections, renderFindings(), renderEvolution());
  document.body.append(renderFooter());

  let navigation;
  const scroller = createHorizontalScroll(chapterSections, { onUpdate: () => navigation?.update() });
  navigation = createNavigation({
    scroller,
    navRoot: document.getElementById('timeline-nav'),
    menu: document.getElementById('menu'),
    menuToggle: document.getElementById('menu-toggle'),
    hero: document.querySelector('.hero'),
    header: document.querySelector('.site-header'),
  });
  navigation.update();

  observeReveals();
}

init();
