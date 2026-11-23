// One-off codemod (D13): wrap static metadata titles that overflow 60 chars with the brand suffix
// in { absolute: '...' } so the layout template skips the suffix. Dry run unless --write.
import fs from 'node:fs';
import path from 'node:path';
const write = process.argv.includes('--write');
const walk = (d) => fs.readdirSync(d, { withFileTypes: true }).flatMap((e) =>
  e.isDirectory() ? walk(path.join(d, e.name)) : e.name === 'page.tsx' ? [path.join(d, e.name)] : []);
let n = 0;
for (const f of walk('app/(site)')) {
  let src = fs.readFileSync(f, 'utf8');
  const i = src.indexOf('export const metadata');
  if (i < 0) continue;
  const re = /(\n\s*title: )('(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*")(,)/;
  const rest = src.slice(i);
  const m = re.exec(rest);
  if (!m) continue;
  const text = Function(`return ${m[2]}`)();
  if (/\|\s*Shilika Jain\s*$/.test(text) || text.length + 15 <= 60) continue;
  n++;
  console.log(text.length, f, text);
  if (write) src = src.slice(0, i) + rest.replace(re, `$1{ absolute: $2 }$3`) ;
  if (write) fs.writeFileSync(f, src);
}
console.log('files', n);
