#!/usr/bin/env node
// Places the portrait media blocks into the page partials.
//
//   node scripts/media/inject.mjs                  apply every family
//   node scripts/media/inject.mjs --only landing   one family (comma-separated list ok)
//   node scripts/media/inject.mjs --dry            report what would change, write nothing
//   node scripts/media/inject.mjs --revert         strip every <!--sjm:...--> block
//   node scripts/media/inject.mjs --list           list families and how many files each covers
//
// A family is a module in scripts/media/families/ with a default export:
//   { name, describe, files(): string[] /* partial file names */, apply(html, file, ctx): string }
// `ctx` carries the markup builders and placement helpers. Re-run after generating new pages.

import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL, fileURLToPath } from 'node:url';
import { arg } from './lib.mjs';
import * as markup from './markup.mjs';
import * as lib from './inject-lib.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const familiesDir = path.join(HERE, 'families');
const only = arg('only', null);
const wanted = only && only !== true ? new Set(only.split(',')) : null;
const dry = arg('dry', false) === true;
const revert = arg('revert', false) === true;
const list = arg('list', false) === true;

const families = [];
if (fs.existsSync(familiesDir)) {
  for (const f of fs.readdirSync(familiesDir).filter((x) => x.endsWith('.mjs')).sort()) {
    const mod = await import(pathToFileURL(path.join(familiesDir, f)).href);
    families.push(mod.default);
  }
}

if (list) {
  for (const fam of families) console.log(`${fam.name.padEnd(14)} ${String(fam.files().length).padStart(4)} files  ${fam.describe ?? ''}`);
  process.exit(0);
}

const ctx = { ...markup, ...lib };
const claimed = new Map(); // file -> family name, so two families never fight over a partial
let changed = 0;
let blocks = 0;
const problems = [];

for (const fam of families) {
  if (wanted && !wanted.has(fam.name)) continue;
  let famChanged = 0;
  for (const file of fam.files()) {
    if (claimed.has(file) && claimed.get(file) !== fam.name) {
      problems.push(`${file}: claimed by both "${claimed.get(file)}" and "${fam.name}"`);
      continue;
    }
    claimed.set(file, fam.name);
    const original = lib.readPartial(file);
    const base = lib.stripMedia(original);
    let next = base;
    if (!revert) {
      try {
        next = fam.apply(base, file, ctx);
      } catch (err) {
        problems.push(`${file}: ${err.message}`);
        continue;
      }
      if (lib.stripMedia(next) !== base) {
        problems.push(`${file}: family "${fam.name}" changed existing markup (must be additive only)`);
        continue;
      }
    }
    if (next !== original) {
      famChanged += 1;
      if (!dry) lib.writePartial(file, next);
    }
    blocks += lib.blockKeys(next).length;
  }
  changed += famChanged;
  console.log(`${fam.name.padEnd(14)} ${famChanged} file(s) ${dry ? 'would change' : revert ? 'reverted' : 'updated'}`);
}

console.log(`\n${changed} partial(s) ${dry ? 'would change' : 'written'}, ${blocks} media block(s) present.`);
if (problems.length) {
  console.error(`\n${problems.length} problem(s):\n  ${problems.join('\n  ')}`);
  process.exit(1);
}
