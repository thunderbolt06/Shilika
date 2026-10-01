#!/usr/bin/env node
/**
 * FAQ schema-to-visible parity audit (repo-wide).
 *
 * Google requires that FAQPage structured data only mark up content that is
 * visible on the page (https://developers.google.com/search/docs/appearance/structured-data/faqpage).
 * FAQ rich results were deprecated on 7 May 2026, but the visible-content rule
 * still stands: Google's generative-AI search guidance says any structured data
 * you ship should match the visible page, and AI engines (AI Overviews, AI Mode,
 * ChatGPT, Perplexity, Claude) extract answers from the visible FAQ. A schema
 * question with no matching visible question is a policy risk and a wasted GEO/AEO
 * signal.
 *
 * This scans EVERY partial pair in app/_partials (cornerstone articles, service,
 * work, regional, glossary, homepage, and the programmatic pages__ landing pages),
 * not just article-N, and understands all three visible-FAQ markup variants used
 * across the site:
 *   1. <div class="faq-q">Question</div>        cornerstone articles
 *   2. <p class="faq-q">Question</p>            service / work / regional pages
 *   3. <details><summary>Question</summary>...  programmatic pages__ landing pages
 *
 * It reports any page where the FAQPage schema questions and the visible questions
 * do not match, both by count and by normalized text.
 *
 * Usage:  node scripts/faq-parity-audit.mjs
 * Exit code 0 if every page is in parity, 1 if any drift is found. Wire into
 * pre-push or CI to keep the whole FAQ library at exact schema-to-visible parity.
 */
import fs from 'node:fs';
import path from 'node:path';

const PARTIALS = path.join(process.cwd(), 'app/_partials');

// Collapse whitespace, decode the handful of entities used in the content,
// drop trailing sentence punctuation (a bare "?" difference is cosmetic, not a
// real parity defect), and lowercase for comparison.
function normalize(s) {
  return s
    .replace(/&amp;/g, '&')
    .replace(/&#39;/g, "'")
    .replace(/&rsquo;/g, "'")
    .replace(/&lsquo;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&ldquo;/g, '"')
    .replace(/&rdquo;/g, '"')
    .replace(/&nbsp;/g, ' ')
    .replace(/<[^>]+>/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/[?.!]+$/, '')
    .trim()
    .toLowerCase();
}

// Pull every FAQPage question name out of a JSON-LD blob, following @graph and
// arrays of nodes. Returns an array preserving document order.
function schemaQuestions(jsonText) {
  let data;
  try {
    data = JSON.parse(jsonText);
  } catch (e) {
    return { error: `JSON parse error: ${e.message}`, questions: [] };
  }
  const out = [];
  const visit = (node) => {
    if (Array.isArray(node)) return node.forEach(visit);
    if (node && typeof node === 'object') {
      const t = node['@type'];
      const isFaq = t === 'FAQPage' || (Array.isArray(t) && t.includes('FAQPage'));
      if (isFaq && Array.isArray(node.mainEntity)) {
        for (const q of node.mainEntity) {
          if (q && q.name) out.push(String(q.name));
        }
      }
      for (const v of Object.values(node)) visit(v);
    }
  };
  visit(data);
  return { error: null, questions: out };
}

// Pull every visible FAQ question from the body HTML across all three markup
// variants. faq-q can close on </div>, </p> or </h3>; summaries close on
// </summary>.
function visibleQuestions(html) {
  const out = [];
  const faqQ = /class="faq-q"[^>]*>([\s\S]*?)<\/(?:div|p|h2|h3|h4|dt|summary)>/g;
  const summary = /<summary[^>]*>([\s\S]*?)<\/summary>/g;
  let m;
  while ((m = faqQ.exec(html)) !== null) out.push(m[1]);
  while ((m = summary.exec(html)) !== null) out.push(m[1]);
  return out;
}

// Some pages carry their FAQPage as inline microdata (itemscope /
// itemtype="schema.org/FAQPage" with itemprop="name" on each Question) instead
// of JSON-LD. Microdata wraps the visible HTML, so it is parity-matched by
// construction, but we still extract the question names so the page is counted
// as "has schema" rather than false-flagged as visible-only.
function microdataQuestions(html) {
  if (!/schema\.org\/FAQPage/.test(html)) return [];
  const out = [];
  const re = /itemprop="name"[^>]*>([\s\S]*?)<\/(?:h2|h3|h4|p|div|span|dt)>/g;
  let m;
  while ((m = re.exec(html)) !== null) out.push(m[1]);
  return out;
}

const bodies = fs
  .readdirSync(PARTIALS)
  .filter((f) => /-body\.html$/.test(f))
  .sort();

let drift = 0;
let missingSchema = 0;
let clean = 0;
const problems = [];

for (const bodyFile of bodies) {
  const base = bodyFile.replace(/-body\.html$/, '');
  const jsonFile = `${base}-jsonld.json`;
  const bodyPath = path.join(PARTIALS, bodyFile);
  const jsonPath = path.join(PARTIALS, jsonFile);

  const html = fs.readFileSync(bodyPath, 'utf8');
  const visible = visibleQuestions(html);
  const micro = microdataQuestions(html);

  if (!fs.existsSync(jsonPath)) {
    if (micro.length > 0) {
      // FAQ expressed as inline microdata (no JSON-LD file). Parity is checked
      // below against the visible questions.
    } else if (visible.length > 0) {
      // Visible FAQ with no schema of any kind. Missed GEO/AEO signal, not a
      // policy violation.
      missingSchema++;
      problems.push({ base, kind: 'visible-only', msg: `${visible.length} visible Q, no schema (jsonld or microdata)`, warn: true });
      continue;
    } else {
      clean++;
      continue;
    }
  }

  let error = null;
  let jsonldSchema = [];
  if (fs.existsSync(jsonPath)) {
    ({ error, questions: jsonldSchema } = schemaQuestions(fs.readFileSync(jsonPath, 'utf8')));
  }
  if (error) {
    problems.push({ base, kind: 'json-error', msg: error });
    drift++;
    continue;
  }

  // Prefer JSON-LD questions; fall back to microdata questions when a page
  // ships its FAQPage as inline microdata instead.
  const schema = jsonldSchema.length > 0 ? jsonldSchema : micro;
  const hasFaqSchema = schema.length > 0;
  const hasVisibleFaq = visible.length > 0;

  if (!hasFaqSchema && !hasVisibleFaq) {
    clean++;
    continue;
  }
  if (hasFaqSchema && !hasVisibleFaq) {
    problems.push({ base, kind: 'schema-only', msg: `${schema.length} schema Q, 0 visible` });
    drift++;
    continue;
  }
  if (!hasFaqSchema && hasVisibleFaq) {
    missingSchema++;
    problems.push({ base, kind: 'visible-only', msg: `${visible.length} visible Q, 0 schema`, warn: true });
    continue;
  }

  const vNorm = visible.map(normalize);
  const sNorm = schema.map(normalize);
  const vSet = new Set(vNorm);
  const sSet = new Set(sNorm);
  const schemaOnly = sNorm.filter((q) => !vSet.has(q));
  const visOnly = vNorm.filter((q) => !sSet.has(q));

  if (visible.length !== schema.length || schemaOnly.length || visOnly.length) {
    problems.push({
      base,
      kind: 'mismatch',
      msg: `visible=${visible.length} schema=${schema.length}`,
      schemaOnly: schemaOnly.map((q) => schema[sNorm.indexOf(q)]).filter(Boolean),
      visOnly: visOnly.map((q) => visible[vNorm.indexOf(q)]).filter(Boolean),
    });
    drift++;
  } else {
    clean++;
  }
}

console.log(`FAQ parity audit — ${bodies.length} partial pairs scanned (repo-wide)`);
console.log(`  in parity (or no FAQ): ${clean}`);
console.log(`  visible FAQ but no schema (warning): ${missingSchema}`);
console.log(`  parity DEFECTS: ${drift}`);
console.log('');

if (problems.length === 0) {
  console.log('No problems found. Every FAQPage schema matches its visible FAQ exactly.');
} else {
  for (const p of problems) {
    const tag = p.warn ? 'WARN ' : 'FAIL ';
    console.log(`${tag}${p.base} [${p.kind}] ${p.msg}`);
    if (p.schemaOnly && p.schemaOnly.length) {
      for (const q of p.schemaOnly) console.log(`        schema-only (not visible): ${q}`);
    }
    if (p.visOnly && p.visOnly.length) {
      for (const q of p.visOnly) console.log(`        visible-only (not in schema): ${q}`);
    }
  }
}

process.exit(drift > 0 ? 1 : 0);
