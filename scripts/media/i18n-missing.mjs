#!/usr/bin/env node
// After `pnpm i18n extract`: list the English segments that are missing from at least one
// locale catalogue, de-duplicated by segment id (identical English shares one translation).
//
//   node --experimental-strip-types scripts/media/i18n-missing.mjs [--out missing.json]
import fs from 'node:fs';
import path from 'node:path';

const { LOCALES } = await import('../../lib/i18n/config.ts');
const ROOT = process.cwd();
const I18N = path.join(ROOT, 'app/_partials/i18n');
const SOURCE = path.join(I18N, '_source');
const read = (f) => JSON.parse(fs.readFileSync(f, 'utf8'));

const out = new Map();
for (const file of fs.readdirSync(SOURCE).filter((f) => f.endsWith('.json'))) {
  const key = file.slice(0, -5);
  if (key === 'ui') continue;
  const source = read(path.join(SOURCE, file));
  for (const locale of LOCALES) {
    const target = fs.existsSync(path.join(I18N, locale, file)) ? read(path.join(I18N, locale, file)) : { segments: {} };
    for (const [id, english] of Object.entries(source.segments)) {
      if (id in (target.segments ?? {})) continue;
      const row = out.get(id) ?? { id, english, pages: new Set(), locales: new Set() };
      row.pages.add(key);
      row.locales.add(locale);
      out.set(id, row);
    }
  }
}
const rows = [...out.values()].map((r) => ({ ...r, pages: [...r.pages].sort(), locales: [...r.locales].sort() }));
const result = { count: rows.length, locales: LOCALES, strings: rows.sort((a, b) => a.english.localeCompare(b.english)) };
const outFile = process.argv.includes('--out') ? process.argv[process.argv.indexOf('--out') + 1] : null;
if (outFile) {
  fs.writeFileSync(outFile, JSON.stringify(result, null, 2) + '\n');
  console.log(`${rows.length} unique missing string(s) written to ${outFile}`);
} else {
  console.log(JSON.stringify(result, null, 2));
}
