#!/usr/bin/env node
// Load pages in headless Chrome and report what screenshots cannot: horizontal overflow,
// broken images, failed requests, console errors, and how many media blocks rendered.
//
//   node scripts/media/sweep.mjs --width 390 /about /korea /pages/ai-pr-agency
//   node scripts/media/sweep.mjs --width 1440 --file urls.txt [--base http://localhost:3000]
//
// Exits 1 when any page has a problem. Needs the dev server (or any server) at --base.
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const args = process.argv.slice(2);
const opt = (n, d) => (args.includes(`--${n}`) ? args[args.indexOf(`--${n}`) + 1] : d);
const width = Number(opt('width', 1440));
const base = opt('base', 'http://localhost:3000');
const file = opt('file', null);
const skipValues = new Set(['--width', '--base', '--file'].flatMap((f) => (args.includes(f) ? [args[args.indexOf(f) + 1]] : [])));
let urls = args.filter((a) => a.startsWith('/') && !skipValues.has(a));
if (file) urls = urls.concat(fs.readFileSync(file, 'utf8').split('\n').map((s) => s.trim()).filter(Boolean));

const chrome = process.env.CHROME_BIN ?? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const port = 9800 + Math.floor(Math.random() * 150);
const profile = fs.mkdtempSync(path.join(os.tmpdir(), 'sj-sweep-'));
const proc = spawn(chrome, ['--headless=new', '--disable-gpu', '--no-first-run', `--user-data-dir=${profile}`, `--remote-debugging-port=${port}`, `--window-size=${width},900`, 'about:blank'], { stdio: 'ignore' });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

let targets;
for (let i = 0; i < 60; i++) {
  try { targets = await (await fetch(`http://127.0.0.1:${port}/json`)).json(); if (targets.length) break; } catch {}
  await sleep(200);
}
const ws = new WebSocket(targets.find((t) => t.type === 'page').webSocketDebuggerUrl);
await new Promise((r) => (ws.onopen = r));
let id = 0;
const pending = new Map();
const events = [];
ws.onmessage = (m) => {
  const d = JSON.parse(m.data);
  if (d.id && pending.has(d.id)) pending.get(d.id)(d);
  else if (d.method) events.push(d);
};
const call = (method, params = {}) => new Promise((res) => { const i = ++id; pending.set(i, res); ws.send(JSON.stringify({ id: i, method, params })); });
await call('Page.enable'); await call('Runtime.enable'); await call('Log.enable'); await call('Network.enable');
await call('Emulation.setDeviceMetricsOverride', { width, height: 900, deviceScaleFactor: 1, mobile: width < 700 });

const probe = `(async () => {
  const h = document.documentElement.scrollHeight;
  for (let y = 0; y < h; y += 600) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 90)); }
  await new Promise(r => setTimeout(r, 900));
  window.scrollTo(0, 0);
  const vw = document.documentElement.clientWidth;
  const over = [];
  for (const el of document.querySelectorAll('body *')) {
    const r = el.getBoundingClientRect();
    if (r.width > 0 && r.right > vw + 2 && getComputedStyle(el).position !== 'fixed') {
      let p = el.parentElement, clipped = false;
      while (p && p !== document.body) { const o = getComputedStyle(p).overflowX; if (o === 'hidden' || o === 'auto' || o === 'scroll' || o === 'clip') { clipped = true; break; } p = p.parentElement; }
      if (!clipped) over.push((el.className && typeof el.className === 'string' ? '.' + el.className.split(' ')[0] : el.tagName.toLowerCase()) + ' +' + Math.round(r.right - vw));
    }
    if (over.length > 4) break;
  }
  const broken = [...document.images].filter(i => i.currentSrc && i.complete && i.naturalWidth === 0).map(i => i.currentSrc.split('/').pop());
  const blocks = document.querySelectorAll('[data-sjm]').length;
  const sjmImgs = [...document.querySelectorAll('[data-sjm] img')];
  const noDims = sjmImgs.filter(i => !i.getAttribute('width') || !i.getAttribute('height')).length;
  // Is any overflow caused by the media blocks? Hide them and measure again.
  const withBlocks = document.documentElement.scrollWidth;
  const style = document.createElement('style');
  style.textContent = '[data-sjm]{display:none!important}';
  document.head.appendChild(style);
  await new Promise(r => setTimeout(r, 150));
  const withoutBlocks = document.documentElement.scrollWidth;
  style.remove();
  return JSON.stringify({ scrollW: withBlocks, withoutBlocks, vw, over, broken, blocks, imgs: sjmImgs.length, noDims });
})()`;

const rows = [];
for (const u of urls) {
  events.length = 0;
  await call('Page.navigate', { url: base + u });
  await sleep(2600);
  let r;
  try { r = JSON.parse((await call('Runtime.evaluate', { expression: probe, awaitPromise: true, returnByValue: true })).result.result.value); }
  catch (e) { rows.push({ u, problems: ['probe failed: ' + e.message] }); continue; }
  const problems = [];
  const notes = [];
  const main = events.find((e) => e.method === 'Network.responseReceived' && e.params.type === 'Document');
  if (main && main.params.response.status >= 400) problems.push(`HTTP ${main.params.response.status}`);
  for (const e of events) {
    if (e.method === 'Network.responseReceived' && e.params.response.status >= 400 && e.params.response.url.includes('/assets/')) problems.push(`HTTP ${e.params.response.status} ${e.params.response.url.split('/').slice(-2).join('/')}`);
    if (e.method === 'Runtime.exceptionThrown') problems.push('exception: ' + (e.params.exceptionDetails.exception?.description ?? e.params.exceptionDetails.text).split('\n')[0].slice(0, 120));
  }
  if (r.scrollW > r.vw + 2) {
    if (r.scrollW > r.withoutBlocks + 2) problems.push(`overflow ${r.scrollW}>${r.vw} caused by media blocks (page is ${r.withoutBlocks} without them) (${r.over.join(', ')})`);
    else notes.push(`page overflow ${r.scrollW}>${r.vw} exists without the media blocks (${r.over.slice(0, 2).join(', ')})`);
  }
  if (r.broken.length) problems.push('broken images: ' + r.broken.join(', '));
  if (r.noDims) problems.push(`${r.noDims} block image(s) without width/height`);
  rows.push({ u, blocks: r.blocks, imgs: r.imgs, problems, notes });
}
ws.close();
const closed = new Promise((r) => proc.once('exit', r));
proc.kill();
await Promise.race([closed, sleep(3000)]);
try { fs.rmSync(profile, { recursive: true, force: true, maxRetries: 8, retryDelay: 200 }); } catch {}

let bad = 0;
for (const r of rows) {
  if (r.problems.length) bad += 1;
  console.log(`${r.problems.length ? 'FAIL' : 'ok  '} ${String(r.blocks ?? '-').padStart(2)} blocks ${String(r.imgs ?? '-').padStart(2)} imgs  ${r.u}${r.problems.length ? '\n       ' + r.problems.join('\n       ') : ''}${r.notes?.length && !process.env.QUIET ? '\n       note: ' + r.notes.join('; ') : ''}`);
}
console.log(`\n${rows.length} page(s) at ${width}px, ${bad} with problems`);
process.exit(bad ? 1 : 0);
