// Builds .pptx decks for every course program from data/courses (the single source of truth).
// Per program: one masterclass deck, one 3-day workshop facilitator deck, six module decks.
// Output: decks/courses/<slug>/. See README.md in this folder for how to run it.
import pptxgen from 'pptxgenjs';
import { mkdirSync } from 'node:fs';
import path from 'node:path';
import { PROGRAMS, BOOKING_URL, type Program } from '../../../data/courses';

const { applyTheme } = require('./apply_theme.js');

const REPO = path.resolve(__dirname, '../../..');
const OUT = path.join(REPO, 'decks/courses');
const IMG = path.join(__dirname, '.img');
const PHOTOS = {
  'stage-a': { path: `${IMG}/stage-a.jpg`, alt: 'Shilika Jain speaking on stage with a microphone in front of a presentation screen' },
  'stage-b': { path: `${IMG}/stage-b.jpg`, alt: 'Shilika Jain smiling mid-talk on stage, microphone in hand' },
  library: { path: `${IMG}/library.jpg`, alt: 'Shilika Jain seated in a wood-panelled library lounge lined with leather-bound books' },
} as const;
type PhotoId = keyof typeof PHOTOS;

// Site tokens (app/globals.css), converted from oklch.
const HEX = { ink: '100D09', ink2: '1D1A15', paper: 'F4F2EA', cream: 'F4E6CA', lime: 'E1F250', limeDeep: 'CBDB00', muted: '75716B', line: 'D1CDC7', lineDark: '302D28', white: 'FFFFFF' };
const THEME = {
  name: 'Shilika Jain',
  headFontFace: 'Georgia',
  bodyFontFace: 'Arial',
  colors: {
    dk1: HEX.ink, lt1: HEX.white, dk2: HEX.lineDark, lt2: HEX.paper,
    accent1: HEX.lime, accent2: HEX.cream, accent3: HEX.muted, accent4: HEX.line, accent5: HEX.limeDeep, accent6: HEX.ink2,
    hlink: HEX.lineDark, folHlink: HEX.muted,
  },
};

const W = 13.333;
const M = 0.6; // side margin
const FOOTER = 'Shilika Jain  ·  shilikajain.com';

// MAPPING: which masterclass slides (M index) and workshop sessions ("day.index") teach each module.
const MODULE_MAP: Record<string, { m: number[]; d: string[] }[]> = {
  'public-relations-workshop-for-students': [
    { m: [0, 1, 2], d: ['1.0', '1.1'] }, { m: [4, 5], d: ['1.2', '1.3'] }, { m: [3, 6], d: ['2.0', '2.1'] },
    { m: [7], d: ['2.2', '2.3'] }, { m: [9, 10], d: ['3.0', '3.1'] }, { m: [8, 11, 12], d: ['3.2', '3.3'] },
  ],
  'practical-pr-workshop-for-students': [
    { m: [0, 2, 3, 4], d: ['1.0', '1.1', '1.2', '1.3'] }, { m: [1, 5, 6], d: ['2.0', '2.1'] }, { m: [7, 8], d: ['2.2', '2.3'] },
    { m: [9], d: ['3.0'] }, { m: [10], d: ['3.1'] }, { m: [11, 12], d: ['3.2', '3.3'] },
  ],
  'pr-guest-speaker': [
    { m: [0, 1, 2, 4], d: ['1.0', '1.3'] }, { m: [3, 9, 10], d: ['1.1', '2.2'] }, { m: [8, 11], d: ['2.0'] },
    { m: [6], d: ['2.1', '2.3'] }, { m: [5, 7], d: ['1.2'] }, { m: [12, 13], d: ['3.0', '3.1', '3.2', '3.3'] },
  ],
  'media-training-for-executives': [
    { m: [0, 1], d: ['1.0', '1.3'] }, { m: [2, 3], d: ['1.1', '1.2'] }, { m: [4, 5, 6, 7, 8], d: ['2.0', '2.1', '2.2'] },
    { m: [9], d: ['3.0', '3.1'] }, { m: [10, 11], d: ['3.2', '3.3'] }, { m: [12, 13], d: ['2.3'] },
  ],
  'founder-pr-course': [
    { m: [0, 1], d: ['1.0'] }, { m: [2, 3, 4], d: ['1.1', '1.2'] }, { m: [5, 9, 10], d: ['1.3'] },
    { m: [6, 7], d: ['2.0', '2.1', '2.2', '2.3'] }, { m: [8], d: ['3.0'] }, { m: [11, 12], d: ['3.1', '3.2', '3.3'] },
  ],
  'pr-workshop-for-ai-founders': [
    { m: [0, 1], d: ['1.0', '1.1'] }, { m: [2, 3, 4, 7], d: ['1.2', '1.3'] }, { m: [5], d: ['2.0'] },
    { m: [6, 9], d: ['2.1', '2.3'] }, { m: [8], d: ['2.2'] }, { m: [10, 11, 12], d: ['3.0', '3.1', '3.2', '3.3'] },
  ],
  'pr-workshop-for-web3-founders': [
    { m: [0, 1, 2, 3], d: ['1.0', '1.3'] }, { m: [4, 8], d: ['1.1', '1.2'] }, { m: [5, 6], d: ['2.0', '2.1'] },
    { m: [7, 11], d: ['2.2', '2.3'] }, { m: [9, 10], d: ['3.0', '3.1'] }, { m: [12, 13, 14], d: ['3.2', '3.3'] },
  ],
  'international-pr-masterclass': [
    { m: [0, 1, 2, 8], d: ['1.0', '1.1', '1.2', '1.3'] }, { m: [3, 4], d: ['2.0'] }, { m: [5, 6], d: ['2.1'] },
    { m: [7], d: ['2.1'] }, { m: [9, 10], d: ['2.2', '2.3'] }, { m: [11, 12, 13], d: ['3.0', '3.1', '3.2', '3.3'] },
  ],
};

const pad2 = (n: number) => String(n).padStart(2, '0');
const stripModule = (s: string) => s.replace(/^Module \d+:\s*/, '');
const stripDeck = (s: string) => s.replace(/^Deck \d+:\s*/, '');
const LETTERS = ['A', 'B', 'C', 'D'];
const shadow = () => ({ type: 'outer' as const, color: HEX.ink, opacity: 0.1, blur: 8, offset: 2, angle: 90 });
const minutesBetween = (t: string) => {
  const [a, b] = t.split(' to ').map((x) => x.trim());
  const toMin = (x: string) => Number(x.slice(0, 2)) * 60 + Number(x.slice(3, 5));
  return a && b ? toMin(b) - toMin(a) : 0;
};

/* ------------------------------------------------------------------ deck scaffold */

function newDeck(p: Program, title: string) {
  const pres = new pptxgen();
  pres.layout = 'LAYOUT_WIDE';
  pres.theme = { headFontFace: THEME.headFontFace, bodyFontFace: THEME.bodyFontFace };
  pres.author = 'Shilika Jain';
  pres.title = title;
  pres.subject = p.title;
  const C = pres.SchemeColor;

  const footer = (dark: boolean) => ({
    text: { text: FOOTER, options: { x: M, y: 6.92, w: 7, h: 0.3, fontSize: 10, color: dark ? C.accent4 : C.accent3, margin: 0 } },
  });
  const kicker = (dark: boolean, y = 0.45) => ({
    placeholder: {
      options: { name: 'kicker', type: 'body' as const, x: M, y, w: 9, h: 0.35, fontSize: 12, bold: true, charSpacing: 2, color: dark ? C.accent1 : C.accent3, margin: 0, valign: 'top' as const },
      text: '',
    },
  });

  pres.defineSlideMaster({
    title: 'COVER',
    background: { color: C.text1 },
    objects: [
      kicker(true, 0.7),
      { placeholder: { options: { name: 'title', type: 'title', align: 'left', x: M, y: 1.4, w: 7.3, h: 3.3, fontSize: 46, color: C.background1, valign: 'bottom', margin: 0 }, text: '' } },
      { placeholder: { options: { name: 'sub', type: 'body', align: 'left', x: M, y: 4.95, w: 7.3, h: 1.3, fontSize: 18, color: C.background2, valign: 'top', margin: 0 }, text: '' } },
      footer(true),
    ],
  });
  pres.defineSlideMaster({
    title: 'DIVIDER',
    background: { color: C.text1 },
    objects: [
      kicker(true, 2.0),
      { placeholder: { options: { name: 'title', type: 'title', align: 'left', x: M, y: 2.5, w: 11.5, h: 1.9, fontSize: 50, color: C.background1, valign: 'top', margin: 0 }, text: '' } },
      { placeholder: { options: { name: 'body', type: 'body', align: 'left', x: M, y: 4.6, w: 10.5, h: 1.6, fontSize: 18, color: C.background2, valign: 'top', margin: 0 }, text: '' } },
      footer(true),
    ],
    slideNumber: { x: 12.1, y: 6.92, w: 0.65, h: 0.3, fontSize: 10, color: C.accent4, align: 'right' },
  });
  pres.defineSlideMaster({
    title: 'DARK',
    background: { color: C.text1 },
    objects: [footer(true)],
    slideNumber: { x: 12.1, y: 6.92, w: 0.65, h: 0.3, fontSize: 10, color: C.accent4, align: 'right' },
  });
  pres.defineSlideMaster({
    title: 'CONTENT',
    background: { color: C.background2 },
    objects: [
      kicker(false),
      { placeholder: { options: { name: 'title', type: 'title', align: 'left', x: M, y: 0.85, w: 12.1, h: 1.15, fontSize: 36, color: C.text1, valign: 'top', margin: 0 }, text: '' } },
      footer(false),
    ],
    slideNumber: { x: 12.1, y: 6.92, w: 0.65, h: 0.3, fontSize: 10, color: C.accent3, align: 'right' },
  });
  pres.defineSlideMaster({
    title: 'PHOTO_LEFT',
    background: { color: C.background2 },
    objects: [
      { placeholder: { options: { name: 'kicker', type: 'body', x: 5.4, y: 0.45, w: 7.3, h: 0.35, fontSize: 12, bold: true, charSpacing: 2, color: C.accent3, margin: 0, valign: 'top' }, text: '' } },
      { placeholder: { options: { name: 'title', type: 'title', align: 'left', x: 5.4, y: 0.85, w: 7.3, h: 1.15, fontSize: 36, color: C.text1, valign: 'top', margin: 0 }, text: '' } },
      { text: { text: FOOTER, options: { x: 5.4, y: 6.92, w: 6, h: 0.3, fontSize: 10, color: C.accent3, margin: 0 } } },
    ],
    slideNumber: { x: 12.1, y: 6.92, w: 0.65, h: 0.3, fontSize: 10, color: C.accent3, align: 'right' },
  });

  return { pres, C };
}

type Deck = ReturnType<typeof newDeck>;

async function save(d: Deck, file: string) {
  mkdirSync(path.dirname(file), { recursive: true });
  await d.pres.writeFile({ fileName: file });
  await applyTheme(file, THEME);
}

/* ------------------------------------------------------------------ slide builders */

function cover(d: Deck, section: string, kicker: string, title: string, sub: string, photo: PhotoId, notes: string) {
  const { pres } = d;
  const s = pres.addSlide({ masterName: 'COVER', sectionTitle: section });
  s.addText(kicker.toUpperCase(), { placeholder: 'kicker' });
  s.addText(title, { placeholder: 'title' });
  s.addText(sub, { placeholder: 'sub' });
  const ph = PHOTOS[photo];
  s.addImage({ path: ph.path, x: 8.6, y: 0, w: W - 8.6, h: 7.5, sizing: { type: 'cover', w: W - 8.6, h: 7.5 }, altText: ph.alt, objectName: 'Cover photo' });
  s.addNotes(notes);
  return s;
}

function divider(d: Deck, section: string, kicker: string, title: string, body: string, notes: string) {
  const s = d.pres.addSlide({ masterName: 'DIVIDER', sectionTitle: section });
  s.addText(kicker.toUpperCase(), { placeholder: 'kicker' });
  s.addText(title, { placeholder: 'title' });
  if (body) s.addText(body, { placeholder: 'body' });
  s.addNotes(notes);
  return s;
}

function content(d: Deck, section: string, kicker: string, title: string) {
  const s = d.pres.addSlide({ masterName: 'CONTENT', sectionTitle: section });
  s.addText(kicker.toUpperCase(), { placeholder: 'kicker' });
  s.addText(title, { placeholder: 'title' });
  return s;
}

/** Ink tile with a lime number: the deck's repeated motif. */
function tile(d: Deck, s: pptxgen.Slide, big: string, small: string, caption: string) {
  const { pres, C } = d;
  const x = 9.25, y = 2.2, w = 3.45, h = 3.6;
  s.addShape(pres.ShapeType.roundRect, { x, y, w, h, fill: { color: C.text1 }, rectRadius: 0.18, line: { type: 'none' }, objectName: 'Number tile' });
  s.addText(small.toUpperCase(), { x: x + 0.35, y: y + 0.35, w: w - 0.7, h: 0.35, fontSize: 12, bold: true, charSpacing: 2, color: C.accent1, margin: 0, isTextBox: true, objectName: 'Tile label' });
  s.addText(big, { x: x + 0.35, y: y + 0.8, w: w - 0.7, h: 1.6, fontFace: THEME.headFontFace, fontSize: big.length > 3 ? 64 : 88, color: C.accent1, margin: 0, valign: 'middle', isTextBox: true, objectName: 'Tile number' });
  s.addText(caption, { x: x + 0.35, y: y + 2.55, w: w - 0.7, h: 0.75, fontSize: 14, color: C.background2, margin: 0, valign: 'top', isTextBox: true, objectName: 'Tile caption' });
}

/** One teaching slide: a headline, its single point, and the number tile. */
function ideaSlide(d: Deck, section: string, kicker: string, title: string, point: string, tileBig: string, tileSmall: string, tileCaption: string, notes: string) {
  const s = content(d, section, kicker, title);
  s.addText(point, { x: M, y: 2.3, w: 8.0, h: 3.5, fontSize: 28, color: d.C.text1, margin: 0, valign: 'top', paraSpaceAfter: 6, isTextBox: true, objectName: 'Point' });
  tile(d, s, tileBig, tileSmall, tileCaption);
  s.addNotes(notes);
  return s;
}

/** A workshop exercise: detail on a cream card, time or label on the tile. */
function exerciseSlide(d: Deck, section: string, kicker: string, title: string, detail: string, tileBig: string, tileSmall: string, tileCaption: string, notes: string) {
  const { pres, C } = d;
  const s = content(d, section, kicker, title);
  s.addShape(pres.ShapeType.roundRect, { x: M, y: 2.2, w: 8.25, h: 3.6, fill: { color: C.accent2 }, rectRadius: 0.18, line: { type: 'none' }, objectName: 'Exercise card' });
  s.addText(detail, { x: M + 0.4, y: 2.55, w: 7.45, h: 2.9, fontSize: 24, color: C.text1, margin: 0, valign: 'top', isTextBox: true, objectName: 'Exercise detail' });
  tile(d, s, tileBig, tileSmall, tileCaption);
  s.addNotes(notes);
  return s;
}

function numberedCards(d: Deck, s: pptxgen.Slide, items: string[], y0 = 2.05) {
  const { pres, C } = d;
  const cols = 3, gap = 0.3, w = (W - 2 * M - gap * (cols - 1)) / cols, h = 2.2;
  if (items.length > 6) throw new Error(`numberedCards holds 6 items, got ${items.length}`);
  items.forEach((t, i) => {
    const x = M + (i % cols) * (w + gap), y = y0 + Math.floor(i / cols) * (h + gap);
    s.addShape(pres.ShapeType.roundRect, { x, y, w, h, fill: { color: C.background1 }, rectRadius: 0.14, line: { type: 'none' }, shadow: shadow(), objectName: `Card ${i + 1}` });
    s.addShape(pres.ShapeType.ellipse, { x: x + 0.3, y: y + 0.28, w: 0.5, h: 0.5, fill: { color: C.text1 }, line: { type: 'none' }, objectName: `Card ${i + 1} badge` });
    s.addText(String(i + 1), { x: x + 0.3, y: y + 0.28, w: 0.5, h: 0.5, fontSize: 14, bold: true, color: C.accent1, align: 'center', valign: 'middle', margin: 0, isTextBox: true, objectName: `Card ${i + 1} number` });
    s.addText(t, { x: x + 0.3, y: y + 0.9, w: w - 0.6, h: h - 1.02, fontSize: t.length > 115 ? 14 : 15, color: C.text1, margin: 0, valign: 'top', isTextBox: true, objectName: `Card ${i + 1} text` });
  });
}

function photoProofSlide(d: Deck, section: string, p: Program, photo: PhotoId) {
  const { pres, C } = d;
  const s = pres.addSlide({ masterName: 'PHOTO_LEFT', sectionTitle: section });
  const ph = PHOTOS[photo];
  s.addImage({ path: ph.path, x: 0, y: 0, w: 4.8, h: 7.5, sizing: { type: 'cover', w: 4.8, h: 7.5 }, altText: ph.alt, objectName: 'Photo' });
  s.addText('WHY LEARN THIS FROM SHILIKA', { placeholder: 'kicker' });
  s.addText('Taught from live campaigns', { placeholder: 'title' });
  const items = p.proof;
  if (items.length > 5) throw new Error(`${p.slug}: proof slide holds 5 items, got ${items.length}`);
  const rowH = items.length > 4 ? 0.92 : 1.12;
  items.forEach((it, i) => {
    const y = 2.2 + i * rowH;
    s.addShape(pres.ShapeType.ellipse, { x: 5.4, y: y + 0.06, w: 0.22, h: 0.22, fill: { color: C.accent5 }, line: { type: 'none' }, objectName: `Proof ${i + 1} dot` });
    s.addText(it.text, { x: 5.85, y, w: 6.85, h: rowH - 0.12, fontSize: items.length > 4 ? 15 : 16, color: C.text1, margin: 0, valign: 'top', isTextBox: true, objectName: `Proof ${i + 1}` });
  });
  s.addNotes(`Proof points, all on record:\n${items.map((i) => `- ${i.text}`).join('\n')}`);
  return s;
}

function quoteSlide(d: Deck, section: string, p: Program) {
  if (!p.quote) return;
  const { pres, C } = d;
  const s = pres.addSlide({ masterName: 'DARK', sectionTitle: section });
  s.addText('“', { x: M, y: 0.7, w: 1.5, h: 1.4, fontFace: THEME.headFontFace, fontSize: 120, color: C.accent1, margin: 0, isTextBox: true, objectName: 'Quote mark' });
  s.addText(p.quote.text, { x: M, y: 2.0, w: 11.2, h: 3.2, fontFace: THEME.headFontFace, italic: true, fontSize: 32, color: C.background1, margin: 0, valign: 'top', isTextBox: true, objectName: 'Quote' });
  s.addText(`Paraphrased from Shilika Jain's post on X, ${p.quote.date}`, { x: M, y: 5.5, w: 11, h: 0.4, fontSize: 14, color: C.accent1, margin: 0, isTextBox: true, objectName: 'Quote source' });
  s.addNotes(`Source: ${p.quote.href}`);
}

function closingSlide(d: Deck, section: string, p: Program, kicker: string, title: string, photo: PhotoId) {
  const url = `shilikajain.com/courses/${p.slug}`;
  cover(
    d, section, kicker, title,
    `Book a workshop, masterclass or course for your cohort:\n${BOOKING_URL.replace('https://', '').replace(/\/$/, '')}\n${url}`,
    photo,
    `Close with questions. Booking link: ${BOOKING_URL}. Program page: https://www.${url}`,
  );
}

/* ------------------------------------------------------------------ masterclass deck */

async function masterclassDeck(p: Program) {
  const label = p.kind === 'Guest lecture' ? 'One-hour guest lecture' : 'One-hour masterclass';
  const d = newDeck(p, `${p.cardTitle}: ${label}`);
  const { pres, C } = d;
  const slides = p.masterclass.slides;
  const total = slides.reduce((a, s) => a + s.minutes, 0);

  pres.addSection({ title: 'Opening' });
  cover(d, 'Opening', `${label} · ${total} minutes`, p.cardTitle, p.deck, 'stage-b', `${p.masterclass.summary}\n\nRuns ${total} minutes across ${slides.length} teaching slides.`);

  const o = content(d, 'Opening', 'What you leave with', 'By the end of the hour you can');
  numberedCards(d, o, p.outcomes);
  o.addNotes('Read the outcomes aloud. Ask the room which one they need most, and come back to it at the end.');

  // Agenda: two columns of numbered rows with minutes.
  const a = content(d, 'Opening', 'The hour at a glance', `${slides.length} ideas, ${total} minutes`);
  const perCol = Math.ceil(slides.length / 2), colW = 5.85, rowH = 0.56;
  slides.forEach((sl, i) => {
    const col = Math.floor(i / perCol), row = i % perCol;
    const x = M + col * (colW + 0.4), y = 2.15 + row * rowH;
    a.addText(pad2(i + 1), { x, y, w: 0.55, h: rowH - 0.08, fontSize: 13, bold: true, color: C.accent3, margin: 0, valign: 'middle', isTextBox: true, objectName: `Agenda ${i + 1} number` });
    a.addText(sl.title, { x: x + 0.6, y, w: colW - 1.5, h: rowH - 0.08, fontSize: sl.title.length > 42 ? 13 : 15, color: C.text1, margin: 0, valign: 'middle', isTextBox: true, objectName: `Agenda ${i + 1} title` });
    a.addText(`${sl.minutes} min`, { x: x + colW - 0.85, y, w: 0.85, h: rowH - 0.08, fontSize: 13, color: C.accent3, margin: 0, align: 'right', valign: 'middle', isTextBox: true, objectName: `Agenda ${i + 1} minutes` });
    a.addShape(pres.ShapeType.line, { x, y: y + rowH - 0.04, w: colW, h: 0, line: { color: C.accent4, width: 0.75 }, objectName: `Agenda ${i + 1} rule` });
  });
  a.addNotes(`Agenda. Total ${total} minutes; leave Q&A inside the last slide.`);

  pres.addSection({ title: 'The talk' });
  let run = 0;
  slides.forEach((sl, i) => {
    const from = run;
    run += sl.minutes;
    ideaSlide(
      d, 'The talk', `Idea ${pad2(i + 1)} of ${pad2(slides.length)}`, sl.title, sl.point,
      pad2(i + 1), `${sl.minutes} min`, `Minutes ${from} to ${run} of ${total}`,
      `${sl.point}\n\nTiming: ${sl.minutes} minutes (minute ${from} to ${run} of ${total}).`,
    );
  });

  pres.addSection({ title: 'Close' });
  photoProofSlide(d, 'Close', p, 'stage-a');
  quoteSlide(d, 'Close', p);
  closingSlide(d, 'Close', p, 'Questions', 'Thank you', 'library');

  await save(d, path.join(OUT, p.slug, `${p.slug}-masterclass.pptx`));
}

/* ------------------------------------------------------------------ workshop deck */

async function workshopDeck(p: Program) {
  const d = newDeck(p, `${p.cardTitle}: three-day workshop`);
  const { pres, C } = d;
  const days = p.workshop.days;

  pres.addSection({ title: 'Overview' });
  cover(d, 'Overview', 'Three-day workshop · Facilitator deck', p.cardTitle, p.deck, 'stage-a', p.workshop.summary);

  const o = content(d, 'Overview', 'Three days at a glance', 'Every day ends with finished work');
  const colW = (W - 2 * M - 0.6) / 3;
  days.forEach((day, i) => {
    const x = M + i * (colW + 0.3), y = 2.15, h = 4.5;
    o.addShape(pres.ShapeType.roundRect, { x, y, w: colW, h, fill: { color: C.background1 }, rectRadius: 0.14, line: { type: 'none' }, shadow: shadow(), objectName: `Day ${day.day} card` });
    o.addShape(pres.ShapeType.roundRect, { x: x + 0.3, y: y + 0.3, w: 1.0, h: 0.36, fill: { color: C.accent1 }, rectRadius: 0.18, line: { type: 'none' }, objectName: `Day ${day.day} pill` });
    o.addText(`DAY ${day.day}`, { x: x + 0.3, y: y + 0.3, w: 1.0, h: 0.36, fontSize: 11, bold: true, charSpacing: 2, color: C.text1, align: 'center', valign: 'middle', margin: 0, isTextBox: true, objectName: `Day ${day.day} label` });
    o.addText(day.theme, { x: x + 0.3, y: y + 0.8, w: colW - 0.6, h: 1.05, fontFace: THEME.headFontFace, fontSize: day.theme.length > 40 ? 18 : 22, color: C.text1, margin: 0, valign: 'top', isTextBox: true, objectName: `Day ${day.day} theme` });
    o.addText(
      day.sessions.map((se, j) => ({ text: se.title, options: { bullet: true, breakLine: j < day.sessions.length - 1 } })),
      { x: x + 0.3, y: y + 2.0, w: colW - 0.6, h: 2.3, fontSize: 15, color: C.text1, margin: 0, valign: 'top', paraSpaceAfter: 8, isTextBox: true, objectName: `Day ${day.day} sessions` },
    );
  });
  o.addNotes(days.map((day) => `Day ${day.day}, ${day.theme}. Deliverable: ${day.deliverable}`).join('\n'));

  for (const day of days) {
    const sec = `Day ${day.day}`;
    pres.addSection({ title: sec });
    divider(d, sec, `Day ${day.day} of ${days.length}`, day.theme, `By the end of the day: ${day.deliverable}`, `Open day ${day.day}. Name the deliverable first so the room knows what they are building toward.`);
    day.sessions.forEach((se, j) => {
      const mins = minutesBetween(se.time);
      const [from, to] = se.time.split(' to ');
      exerciseSlide(
        d, sec, `Day ${day.day} · Session ${j + 1} of ${day.sessions.length}`, se.title, se.detail,
        from ?? se.time, 'Session time', to ? `to ${to}${mins ? `, ${mins} minutes` : ''}` : '',
        `${se.detail}\n\nTime: ${se.time}.`,
      );
    });
    const w = content(d, sec, `End of day ${day.day}`, 'Before anyone leaves, they hold');
    w.addShape(pres.ShapeType.roundRect, { x: M, y: 2.3, w: W - 2 * M, h: 3.2, fill: { color: C.accent1 }, rectRadius: 0.18, line: { type: 'none' }, objectName: 'Deliverable card' });
    w.addText(day.deliverable, { x: M + 0.5, y: 2.6, w: W - 2 * M - 1.0, h: 2.6, fontFace: THEME.headFontFace, fontSize: 30, color: C.text1, margin: 0, valign: 'middle', isTextBox: true, objectName: 'Deliverable' });
    w.addNotes(`Check every participant has the day ${day.day} deliverable before close: ${day.deliverable}`);
  }

  pres.addSection({ title: 'Close' });
  const c = content(d, 'Close', 'Three days, three deliverables', 'What the room takes home');
  days.forEach((day, i) => {
    const y = 2.2 + i * 1.45;
    c.addShape(pres.ShapeType.roundRect, { x: M, y, w: W - 2 * M, h: 1.25, fill: { color: C.background1 }, rectRadius: 0.14, line: { type: 'none' }, shadow: shadow(), objectName: `Takeaway ${i + 1} card` });
    c.addShape(pres.ShapeType.roundRect, { x: M + 0.3, y: y + 0.42, w: 1.0, h: 0.4, fill: { color: C.text1 }, rectRadius: 0.2, line: { type: 'none' }, objectName: `Takeaway ${i + 1} pill` });
    c.addText(`DAY ${day.day}`, { x: M + 0.3, y: y + 0.42, w: 1.0, h: 0.4, fontSize: 11, bold: true, charSpacing: 2, color: C.accent1, align: 'center', valign: 'middle', margin: 0, isTextBox: true, objectName: `Takeaway ${i + 1} label` });
    c.addText(day.deliverable, { x: M + 1.6, y: y + 0.15, w: W - 2 * M - 1.9, h: 0.95, fontSize: 16, color: C.text1, margin: 0, valign: 'middle', isTextBox: true, objectName: `Takeaway ${i + 1}` });
  });
  c.addNotes('Recap the three deliverables, then agree on the first thing each participant will send or publish next week.');
  photoProofSlide(d, 'Close', p, 'stage-b');
  closingSlide(d, 'Close', p, 'Workshop close', 'Thank you', 'library');

  await save(d, path.join(OUT, p.slug, `${p.slug}-workshop.pptx`));
}

/* ------------------------------------------------------------------ module decks */

async function moduleDeck(p: Program, mi: number) {
  const mod = p.course.modules[mi];
  const map = MODULE_MAP[p.slug]?.[mi];
  if (!map) throw new Error(`No module map for ${p.slug} module ${mi + 1}`);
  const n = mi + 1, total = p.course.modules.length;
  const title = stripModule(mod.title);
  const d = newDeck(p, `${p.cardTitle}: Module ${n}, ${title}`);
  const { pres, C } = d;
  const photos: PhotoId[] = ['stage-b', 'stage-a', 'library'];

  const ideas = map.m.map((i) => p.masterclass.slides[i]);
  const sessions = map.d.map((key) => {
    const [dayN, idx] = key.split('.').map(Number);
    const se = p.workshop.days.find((x) => x.day === dayN)?.sessions[idx];
    if (!se) throw new Error(`Bad session ${key} in ${p.slug}`);
    return se;
  });
  if (ideas.some((x) => !x)) throw new Error(`Bad masterclass index in ${p.slug} module ${n}`);

  pres.addSection({ title: 'Opening' });
  cover(d, 'Opening', `Module ${n} of ${total} · ${p.cardTitle}`, title, stripDeck(mod.deck), photos[mi % 3], `${mod.summary}\n\nCadence: ${p.course.cadence}`);

  const ov = content(d, 'Opening', `Module ${n} overview`, 'In this module');
  ov.addText(mod.summary, { x: M, y: 2.2, w: 6.6, h: 3.9, fontSize: 22, color: C.text1, margin: 0, valign: 'top', isTextBox: true, objectName: 'Summary' });
  const listItems = [...ideas.map((x) => x.title), ...sessions.map((x) => `Exercise: ${x.title}`), 'Activity', 'Quiz: 3 questions'];
  ov.addShape(pres.ShapeType.roundRect, { x: 7.75, y: 2.1, w: 4.98, h: 4.4, fill: { color: C.background1 }, rectRadius: 0.14, line: { type: 'none' }, shadow: shadow(), objectName: 'Contents card' });
  const fs = listItems.length > 9 ? 13 : 15;
  ov.addText(
    listItems.map((t, i) => ({ text: t, options: { bullet: { type: 'number' as const }, breakLine: i < listItems.length - 1 } })),
    { x: 8.05, y: 2.35, w: 4.4, h: 3.95, fontSize: fs, color: C.text1, margin: 0, valign: 'top', paraSpaceAfter: 5, isTextBox: true, objectName: 'Contents' },
  );
  ov.addNotes(`Module ${n}: ${mod.summary}`);

  pres.addSection({ title: 'Teaching' });
  ideas.forEach((sl, i) => {
    ideaSlide(d, 'Teaching', `Module ${n} · Key idea ${i + 1} of ${ideas.length}`, sl.title, sl.point, pad2(i + 1), 'Key idea', `Module ${n}: ${title}`, sl.point);
  });
  sessions.forEach((se, i) => {
    exerciseSlide(d, 'Teaching', `Module ${n} · Exercise ${i + 1} of ${sessions.length}`, se.title, se.detail, `E${i + 1}`, 'In-class exercise', 'Run live, then debrief as a group', se.detail);
  });

  pres.addSection({ title: 'Activity' });
  const act = content(d, 'Activity', `Module ${n} activity`, 'Your activity for this week');
  act.addShape(pres.ShapeType.roundRect, { x: M, y: 2.2, w: W - 2 * M, h: 3.4, fill: { color: C.accent2 }, rectRadius: 0.18, line: { type: 'none' }, objectName: 'Activity card' });
  act.addText(mod.activity, { x: M + 0.5, y: 2.5, w: W - 2 * M - 1.0, h: 2.8, fontFace: THEME.headFontFace, fontSize: 26, color: C.text1, margin: 0, valign: 'middle', isTextBox: true, objectName: 'Activity' });
  act.addText(n < total ? `Bring it to Module ${n + 1}. It is the first thing we review.` : 'It feeds straight into your capstone.', { x: M, y: 5.85, w: 10, h: 0.4, fontSize: 15, color: C.accent3, margin: 0, isTextBox: true, objectName: 'Activity follow-up' });
  act.addNotes(`Activity: ${mod.activity}`);

  pres.addSection({ title: 'Quiz' });
  divider(d, 'Quiz', 'Check your understanding', `Quiz: ${mod.quiz.length} questions`, 'Pick one answer for each question. The answer and the reason follow each one.', 'Give the room 30 seconds per question, take a show of hands for A to D, then reveal.');
  mod.quiz.forEach((q, qi) => {
    for (const reveal of [false, true]) {
      const s = d.pres.addSlide({ masterName: 'CONTENT', sectionTitle: 'Quiz' });
      s.addText(`QUIZ · QUESTION ${qi + 1} OF ${mod.quiz.length}${reveal ? ' · ANSWER' : ''}`, { placeholder: 'kicker' });
      s.addText(q.q, { x: M, y: 0.85, w: 12.1, h: 1.35, fontFace: THEME.headFontFace, fontSize: 28, color: C.text1, margin: 0, valign: 'top', isTextBox: true, objectName: 'Question' });
      const cw = (W - 2 * M - 0.3) / 2, ch = 1.25;
      q.options.forEach((opt, oi) => {
        const x = M + (oi % 2) * (cw + 0.3), y = 2.45 + Math.floor(oi / 2) * (ch + 0.25);
        const correct = oi === q.answer;
        const fill = reveal && correct ? C.accent1 : C.background1;
        const faded = reveal && !correct;
        s.addShape(pres.ShapeType.roundRect, { x, y, w: cw, h: ch, fill: { color: fill }, rectRadius: 0.14, line: { type: 'none' }, shadow: shadow(), objectName: `Option ${LETTERS[oi]} card` });
        s.addShape(pres.ShapeType.ellipse, { x: x + 0.28, y: y + (ch - 0.5) / 2, w: 0.5, h: 0.5, fill: { color: faded ? C.accent4 : C.text1 }, line: { type: 'none' }, objectName: `Option ${LETTERS[oi]} badge` });
        s.addText(LETTERS[oi], { x: x + 0.28, y: y + (ch - 0.5) / 2, w: 0.5, h: 0.5, fontSize: 14, bold: true, color: faded ? C.background1 : C.accent1, align: 'center', valign: 'middle', margin: 0, isTextBox: true, objectName: `Option ${LETTERS[oi]} letter` });
        s.addText(opt, { x: x + 1.0, y: y + 0.1, w: cw - 1.3, h: ch - 0.2, fontSize: 16, color: faded ? C.accent3 : C.text1, margin: 0, valign: 'middle', isTextBox: true, objectName: `Option ${LETTERS[oi]}` });
      });
      if (reveal) {
        s.addText([{ text: `Answer ${LETTERS[q.answer]}.  `, options: { bold: true } }, { text: q.why }], { x: M, y: 5.35, w: 12.1, h: 1.3, fontSize: 17, color: C.text1, margin: 0, valign: 'top', isTextBox: true, objectName: 'Why' });
        s.addNotes(`Answer ${LETTERS[q.answer]}: ${q.options[q.answer]}\n\nWhy: ${q.why}`);
      } else {
        s.addText('Take 30 seconds. Commit to one letter before the reveal.', { x: M, y: 5.45, w: 12.1, h: 0.4, fontSize: 15, color: C.accent3, margin: 0, isTextBox: true, objectName: 'Prompt' });
        s.addNotes(`Answer (do not show yet): ${LETTERS[q.answer]}, ${q.options[q.answer]}`);
      }
    }
  });

  pres.addSection({ title: 'Recap' });
  const r = content(d, 'Recap', `Module ${n} recap`, 'What to remember');
  const recap = [...ideas.map((x) => x.title), ...sessions.map((x) => `Practised: ${x.title}`)];
  r.addText(
    recap.map((t, i) => ({ text: t, options: { bullet: true, breakLine: i < recap.length - 1 } })),
    { x: M, y: 2.25, w: 6.6, h: 3.9, fontSize: recap.length > 7 ? 16 : 20, color: C.text1, margin: 0, valign: 'top', paraSpaceAfter: 12, isTextBox: true, objectName: 'Recap list' },
  );
  const next = p.course.modules[mi + 1];
  r.addShape(pres.ShapeType.roundRect, { x: 7.75, y: 2.1, w: 4.98, h: 4.4, fill: { color: C.text1 }, rectRadius: 0.18, line: { type: 'none' }, objectName: 'Next card' });
  r.addText(next ? `NEXT: MODULE ${n + 1}` : 'NEXT: THE CAPSTONE', { x: 8.1, y: 2.45, w: 4.3, h: 0.35, fontSize: 12, bold: true, charSpacing: 2, color: C.accent1, margin: 0, isTextBox: true, objectName: 'Next label' });
  r.addText(next ? stripModule(next.title) : p.course.capstone, {
    x: 8.1, y: 2.95, w: 4.3, h: 3.3, fontFace: next ? THEME.headFontFace : THEME.bodyFontFace, fontSize: next ? 26 : 15, color: C.background1, margin: 0, valign: 'top', isTextBox: true, objectName: 'Next',
  });
  r.addNotes(next ? `Preview Module ${n + 1}: ${next.summary}` : `Capstone brief: ${p.course.capstone}`);

  await save(d, path.join(OUT, p.slug, `${p.slug}-module-${n}.pptx`));
}

/* ------------------------------------------------------------------ main */

// Portrait photos come from the site's media library as WebP; PowerPoint needs JPEG.
async function preparePhotos() {
  const sharp = require(require.resolve('sharp', { paths: [REPO] }));
  mkdirSync(IMG, { recursive: true });
  for (const id of Object.keys(PHOTOS)) {
    await sharp(path.join(REPO, `public/assets/media/photos/${id}-port-1080.webp`)).jpeg({ quality: 82 }).toFile(path.join(IMG, `${id}.jpg`));
  }
}

async function main() {
  await preparePhotos();
  const only = process.argv.slice(2);
  const targets = only.length ? PROGRAMS.filter((p) => only.includes(p.slug)) : PROGRAMS;
  for (const p of targets) {
    await masterclassDeck(p);
    await workshopDeck(p);
    for (let i = 0; i < p.course.modules.length; i++) await moduleDeck(p, i);
    console.log(`built ${p.slug}: 1 masterclass, 1 workshop, ${p.course.modules.length} module decks`);
  }
}
main().catch((e) => { console.error(e); process.exit(1); });
