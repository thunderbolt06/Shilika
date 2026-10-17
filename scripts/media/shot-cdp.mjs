#!/usr/bin/env node
// Full-page screenshot through the Chrome DevTools protocol, with an optional script run
// first (used to dismiss the homepage intro deck).
//   node scripts/media/shot-cdp.mjs <url> <out.png> [width=1440] [--js "<expression>"] [--wait 1500] [--blocks]
// --blocks writes one image per media block ([data-sjm]) with 90px of context above and below:
//   <out>-block-0.png, <out>-block-1.png ...
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const args = process.argv.slice(2);
const flag = (n, d) => (args.includes(`--${n}`) ? args[args.indexOf(`--${n}`) + 1] : d);
const [url, out, widthArg] = args.filter((a, i) => !a.startsWith('--') && !(i > 0 && args[i - 1].startsWith('--')));
const width = Number(widthArg ?? 1440);
const js = flag('js', '');
const wait = Number(flag('wait', 1500));
const blocksMode = args.includes('--blocks');
const chrome = process.env.CHROME_BIN ?? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const port = 9300 + Math.floor(Math.random() * 600);
const profile = fs.mkdtempSync(path.join(os.tmpdir(), 'sj-cdp-'));
const proc = spawn(chrome, ['--headless=new', '--disable-gpu', '--hide-scrollbars', '--no-first-run', `--user-data-dir=${profile}`, `--remote-debugging-port=${port}`, `--window-size=${width},900`, 'about:blank'], { stdio: 'ignore' });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
try {
  let targets;
  for (let i = 0; i < 50; i++) {
    try { targets = await (await fetch(`http://127.0.0.1:${port}/json`)).json(); if (targets.length) break; } catch {}
    await sleep(200);
  }
  const ws = new WebSocket(targets.find((t) => t.type === 'page').webSocketDebuggerUrl);
  await new Promise((r) => (ws.onopen = r));
  let id = 0;
  const pending = new Map();
  ws.onmessage = (m) => { const d = JSON.parse(m.data); if (d.id && pending.has(d.id)) pending.get(d.id)(d); };
  const call = (method, params = {}) => new Promise((res) => { const i = ++id; pending.set(i, res); ws.send(JSON.stringify({ id: i, method, params })); });
  await call('Page.enable');
  await call('Emulation.setDeviceMetricsOverride', { width, height: 900, deviceScaleFactor: 1, mobile: width < 700 });
  await call('Page.navigate', { url });
  await sleep(wait + 2500);
  if (js) { await call('Runtime.evaluate', { expression: js, awaitPromise: true }); await sleep(600); }
  // scroll through once so lazy images and reveal-on-scroll content load
  const h = (await call('Runtime.evaluate', { expression: 'document.documentElement.scrollHeight', returnByValue: true })).result.result.value;
  for (let y = 0; y < h; y += 700) { await call('Runtime.evaluate', { expression: `window.scrollTo(0, ${y})` }); await sleep(120); }
  await call('Runtime.evaluate', { expression: 'window.scrollTo(0, 0)' });
  await sleep(500);
  const full = (await call('Runtime.evaluate', { expression: 'Math.max(document.documentElement.scrollHeight, document.body.scrollHeight)', returnByValue: true })).result.result.value;
  await call('Emulation.setDeviceMetricsOverride', { width, height: Math.min(full, 16000), deviceScaleFactor: 1, mobile: width < 700 });
  await sleep(500);
  if (blocksMode) {
    const rects = (await call('Runtime.evaluate', { expression: 'JSON.stringify([...document.querySelectorAll("[data-sjm]")].map(e=>{const r=e.getBoundingClientRect();return {kind:e.dataset.sjm,x:0,y:Math.max(0,r.top+scrollY-90),w:innerWidth,h:r.height+180}}))', returnByValue: true })).result.result.value;
    const list = JSON.parse(rects);
    for (let i = 0; i < list.length; i++) {
      const r = list[i];
      // bring the block into view and wait for its lazy images before capturing
      await call('Runtime.evaluate', {
        expression: `(async()=>{const e=document.querySelectorAll('[data-sjm]')[${i}]; e.scrollIntoView({block:'center'}); const t=Date.now(); while(Date.now()-t<6000 && [...e.querySelectorAll('img')].some(i=>!(i.complete&&i.naturalWidth>0))) await new Promise(r=>setTimeout(r,150)); await new Promise(r=>setTimeout(r,250)); return 1})()`,
        awaitPromise: true,
      });
      const shot = await call('Page.captureScreenshot', { format: 'png', captureBeyondViewport: true, clip: { x: 0, y: r.y, width: r.w, height: Math.min(r.h, 4000), scale: 1 } });
      const file = out.replace(/\.png$/, `-block-${i}-${r.kind}.png`);
      fs.writeFileSync(file, Buffer.from(shot.result.data, 'base64'));
      console.log(file);
    }
  } else {
    const shot = await call('Page.captureScreenshot', { format: 'png', captureBeyondViewport: true });
    fs.writeFileSync(out, Buffer.from(shot.result.data, 'base64'));
    console.log(`${out} (${width}x${Math.min(full, 16000)})`);
  }
  ws.close();
} finally {
  const closed = new Promise((r) => proc.once('exit', r));
  proc.kill();
  await Promise.race([closed, sleep(3000)]);
  try { fs.rmSync(profile, { recursive: true, force: true, maxRetries: 8, retryDelay: 200 }); } catch {}
}
