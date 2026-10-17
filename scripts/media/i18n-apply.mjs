#!/usr/bin/env node
// Writes translations for the missing segments into every locale catalogue.
//
//   node --experimental-strip-types scripts/media/i18n-apply.mjs translations.json
//
// translations.json: { "<segmentId>": { "zh": "...", "ko": "...", "ja": "...", "es": "...", "ru": "..." } }
// A row is rejected (and reported) when its <n> placeholders do not match the English source.
import fs from 'node:fs';
import path from 'node:path';

const { LOCALES } = await import('../../lib/i18n/config.ts');
const { placeholdersMatch } = await import('../../lib/i18n/segment.ts');
const ROOT = process.cwd();
const I18N = path.join(ROOT, 'app/_partials/i18n');
const SOURCE = path.join(I18N, '_source');
const table = JSON.parse(fs.readFileSync(process.argv[2], 'utf8'));
const read = (f) => JSON.parse(fs.readFileSync(f, 'utf8'));

let written = 0;
const rejected = [];
const unresolved = new Set();
for (const file of fs.readdirSync(SOURCE).filter((f) => f.endsWith('.json'))) {
  const key = file.slice(0, -5);
  if (key === 'ui') continue;
  const source = read(path.join(SOURCE, file));
  for (const locale of LOCALES) {
    const target = read(path.join(I18N, locale, file));
    target.segments ??= {};
    let changed = false;
    for (const [id, english] of Object.entries(source.segments)) {
      if (id in target.segments) continue;
      const text = table[id]?.[locale];
      if (typeof text !== 'string' || !text.trim()) {
        unresolved.add(`${locale}:${id}`);
        continue;
      }
      if (!placeholdersMatch(english, text)) {
        rejected.push(`${locale}/${key} ${id}: placeholders differ\n    en: ${english}\n    ${locale}: ${text}`);
        continue;
      }
      target.segments[id] = text;
      changed = true;
      written += 1;
    }
    if (changed) fs.writeFileSync(path.join(I18N, locale, file), JSON.stringify(target, null, 2) + '\n');
  }
}
console.log(`${written} translation(s) written, ${rejected.length} rejected, ${unresolved.size} still missing`);
if (rejected.length) console.error(rejected.join('\n'));
process.exit(rejected.length || unresolved.size ? 1 : 0);
