# Դրամները պատմում են: Արտաշեսյանների դրամները

**Coins during the Artaxiad dynasty.** A presentation site for an Armenian History class project. It follows the coins of the Artaxiad kings of Armenia (189 BC – AD 1) one reign at a time and asks what they tell us about the kingdom's economy, its norms of power and the influence of its neighbours.

Կայքը Հայոց պատմության դասի նախագիծ է։ Հետազոտական հարցը. *ի՞նչ են պատմում դրամները Արտաշեսյանների մասին*։

## What's inside

- **Intro**: a solid green opener explaining *dram ← drachma* before chapter 01.
- **Four chapters, king by king**, in chronological order. Each reign opens with a duotone portrait: an artwork where one exists, otherwise the king's own coin. Each coin is a flip card (click to see the reverse) with:
  - what the coin tells us, tagged by theme (politics, economy and craft, religion and culture, symbols of power, foreign influence, chronology)
  - what it can **not** prove
  - **Technical data** (weight, diameter, catalogue numbers) behind a button
  - a **Dispute** note wherever scholars (Bedoukian 1978, Foss 1986, Kovacs 2016 and others) attribute the coin differently, plus a *disputed attribution* tooltip next to the date
- **Rome's view**: Roman coins that celebrate *Armenia Devicta / Capta / Recepta*.
- **Findings**: the answer to the research question, theme by theme.
- **Evolution matrix**: every king against metal, script, title, tiara, imagery, portrait and political orientation.
- **Sources page** with the bibliography and the photo credits.

The layout follows the reference site [history.jailhouselawyers.org](https://history.jailhouselawyers.org/). Chapters are pinned and scroll sideways on large screens, a year timeline sits at the bottom, and secondary material opens in paper-style note cards. On phones and small windows the chapters stack vertically.

## Run locally

It is a static site with no build step. ES modules need to be served over HTTP:

```bash
python3 -m http.server 4173
```

Then open <http://localhost:4173>.

## Editing the content

All text lives in plain data modules, so you can change content without touching the layout code:

| File | Contents |
| --- | --- |
| `assets/js/data/timeline.js` | Intro, chapters, kings, coins (insights, caveats, technical data, disputes), Roman epilogue |
| `assets/js/data/analysis.js` | Evolution matrix and the findings |
| `assets/js/data/sources.js` | Team, bibliography, photo credits |

A coin's `img: 'name'` points to `assets/img/coins/name-obv.webp` and `name-rev.webp`. A `plate: 'name'` points to a single image `name.webp`, such as a catalogue scan with several coins.

## Project structure

```
index.html            timeline page
sources.html          bibliography and credits
assets/css/           tokens → base → layout → components
assets/js/main.js     entry point
assets/js/lib/        tiny DOM helper
assets/js/components/ flip coin, note dialog
assets/js/render/     chapter and section renderers
assets/js/scroll/     pinned horizontal scroll, bottom timeline and menu
assets/img/coins/     coin photos (WebP, obverse and reverse split, background removed)
assets/img/portraits/ king portraits (artworks)
.claude/agents/       site-reviewer agent for Claude Code (read-only UI/bug review)
```

## Credits

- Team: Ani Shahoyan, Arsen Sogomonyan, Karina Karagyozyan, Sergey Nersesyan and Ashot Zakaryan. The content is drawn from the team's working document.
- Black-and-white catalogue scans come from P. Z. Bedoukian, *Coinage of the Artaxiads of Armenia* (1978), and from R. and K. Vardanyan's articles, via the team document.
- Colour photographs come from Wikimedia Commons: Bibliothèque nationale de France (public domain / CC0), Classical Numismatic Group, Leu Numismatik and Karen Tokhatyan (CC BY-SA). The full per-image list is on the sources page.
- Fonts: Noto Sans Armenian, Noto Serif Armenian and GFS Didot, all from Google Fonts.

The code is released under the MIT License (see `LICENSE`). The images keep their original licences.
