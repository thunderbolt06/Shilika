#!/usr/bin/env node
/**
 * Humanization validator.
 *
 *   Usage:
 *     node scripts/check-humanization.js path/to/draft.md
 *     cat draft.md | node scripts/check-humanization.js
 *
 *   Library:
 *     import { findViolations } from './scripts/check-humanization.js';
 *
 *   Exit 0 = clean. Exit 1 = violations (JSON on stdout).
 */

const HARD_RULES = [
  { id: 'em-dash',     pattern: /—/g,                                  message: 'Em-dash. Use periods, commas, or restructure.' },
  { id: 'ellipsis',    pattern: /…/g,                                  message: 'Ellipsis for dramatic effect. Cut or use a period.' },
  { id: 'arrow',       pattern: /→|⇒|←/g,                              message: 'Arrow symbol. Use "means", "leads to", or restructure.' },
  { id: 'heres-why',   pattern: /\bHere'?s\s+(why|how|the thing)\b/gi,  message: '"Here\'s why/how/the thing" opener.' },
  { id: 'lets-dive',   pattern: /\bLet'?s\s+(dive in|break it down|unpack|explore)\b/gi, message: '"Let\'s dive in / break down / unpack."' },
  { id: 'reality-is',  pattern: /\bThe (reality|truth) is\b/gi,         message: '"The reality / truth is." Just state it.' },
  { id: 'in-todays',   pattern: /\bIn today'?s\s+(world|landscape|environment|economy|market)\b/gi, message: '"In today\'s […]" cliché.' },
  { id: 'fluff',       pattern: /\b(game-?changer|game-?changing|cutting-?edge|seamless|robust|navigate|navigates|navigating)\b/gi, message: 'Corporate AI fluff word.' },
  { id: 'delve',       pattern: /\b(delve|delves|delving|delved)\b/gi,  message: '"Delve". Use "look at" or restructure.' },
  { id: 'tapestry',    pattern: /\btapestr(y|ies)\b/gi,                 message: 'Tapestry metaphor. Cut.' },
  { id: 'in-essence',  pattern: /\bIn essence\b/gi,                     message: '"In essence." Skip.' },
  { id: 'conclude',    pattern: /\b(In conclusion|To sum up|The bottom line is)\b/gi, message: 'AI summary opener.' },
  { id: 'hr-divider',  pattern: /^\s*---\s*$/gm,                        message: 'Horizontal-rule divider in prose. Use a header instead.' },
  { id: 'as-an-ai',    pattern: /\bAs an AI\b/gi,                       message: 'AI self-reference.' },
];

function findLineInfo(text, idx) {
  let lineNo = 1;
  let lineStart = 0;
  for (let i = 0; i < idx; i++) {
    if (text[i] === '\n') {
      lineNo += 1;
      lineStart = i + 1;
    }
  }
  return { line: lineNo, column: idx - lineStart + 1 };
}

export function findViolations(text) {
  if (!text) return [];
  const violations = [];
  const lines = text.split('\n');
  for (const rule of HARD_RULES) {
    rule.pattern.lastIndex = 0;
    let m;
    while ((m = rule.pattern.exec(text)) !== null) {
      const { line, column } = findLineInfo(text, m.index);
      violations.push({
        rule: rule.id,
        message: rule.message,
        line,
        column,
        match: m[0],
        snippet: (lines[line - 1] || '').trim().slice(0, 240),
      });
      if (!rule.pattern.global) break;
    }
  }
  return violations;
}

async function readAllStdin() {
  return new Promise((resolve, reject) => {
    let data = '';
    process.stdin.setEncoding('utf8');
    process.stdin.on('data', (chunk) => (data += chunk));
    process.stdin.on('end', () => resolve(data));
    process.stdin.on('error', reject);
  });
}

async function main() {
  const file = process.argv[2];
  const fs = await import('node:fs/promises');
  const text = file ? await fs.readFile(file, 'utf8') : await readAllStdin();
  const violations = findViolations(text);
  if (violations.length === 0) {
    console.log(JSON.stringify({ status: 'clean', violations: [] }));
    process.exit(0);
  }
  console.log(JSON.stringify({ status: 'violations', count: violations.length, violations }, null, 2));
  process.exit(1);
}

const isCli = import.meta.url === `file://${process.argv[1]}`;
if (isCli) {
  main().catch((err) => {
    console.error(err.stack || err.message || err);
    process.exit(2);
  });
}
