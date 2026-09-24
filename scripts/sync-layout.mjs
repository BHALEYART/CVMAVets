#!/usr/bin/env node
// Copies the shared header + footer from index.html into every other page.
// Edit the nav/footer ONLY in index.html, then run:  node scripts/sync-layout.mjs
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const src = readFileSync(join(root, 'index.html'), 'utf8');
const blocks = ['HEADER', 'FOOTER'];
const re = (n) => new RegExp(`[ \\t]*<!-- LAYOUT:${n}[\\s\\S]*?<!-- /LAYOUT:${n} -->`);

const parts = Object.fromEntries(blocks.map((n) => {
  const m = src.match(re(n));
  if (!m) throw new Error(`index.html is missing the LAYOUT:${n} markers`);
  return [n, m[0]];
}));

let changed = 0;
for (const f of readdirSync(root).filter((f) => f.endsWith('.html') && f !== 'index.html')) {
  const p = join(root, f);
  let html = readFileSync(p, 'utf8');
  const before = html;
  for (const n of blocks) {
    if (!re(n).test(html)) { console.warn(`skip ${f}: no LAYOUT:${n} markers`); continue; }
    html = html.replace(re(n), () => parts[n]);
  }
  if (html !== before) { writeFileSync(p, html); changed++; console.log(`updated ${f}`); }
}
console.log(`${changed} page(s) updated.`);
