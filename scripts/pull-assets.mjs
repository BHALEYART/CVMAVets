#!/usr/bin/env node
// Downloads every image/PDF still hot-linked from the old GoDaddy site (img1.wsimg.com)
// into assets/, then rewrites the HTML to use the local copies.
// Run ONCE before cancelling GoDaddy:  node scripts/pull-assets.mjs   (Node 18+)
import { readFileSync, writeFileSync, readdirSync, mkdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const pages = readdirSync(root).filter((f) => f.endsWith('.html'));
const re = /https:\/\/img1\.wsimg\.com\/[^"'\s)]+/g;
const map = new Map();

for (const f of pages) for (const u of readFileSync(join(root, f), 'utf8').match(re) || []) map.set(u.replace(/&amp;/g, '&'), null);

const safe = (s) => decodeURIComponent(s).replace(/[^\w.-]+/g, '-');
for (const url of map.keys()) {
  const isDoc = url.includes('/blobby/');
  const path = new URL(url).pathname;
  let name;
  if (isDoc) name = safe(path.split('/').pop());
  else {
    const [file, opts = ''] = path.split('/:/');           // .../IMG_2109.jpeg/:/rs=w:1200,cg:true
    const base = safe(file.split('/').pop());
    const w = (opts.match(/rs=w:(\d+)/) || [])[1];
    name = w ? base.replace(/(\.\w+)$/, `-${w}$1`) : base;
  }
  const dir = isDoc ? 'assets/docs' : 'assets/img/site';
  mkdirSync(join(root, dir), { recursive: true });
  const out = `${dir}/${name}`;
  if (!existsSync(join(root, out))) {
    const res = await fetch(url);
    if (!res.ok) { console.warn(`FAILED ${res.status}: ${url}`); continue; }
    writeFileSync(join(root, out), Buffer.from(await res.arrayBuffer()));
    console.log(`saved ${out}`);
  }
  map.set(url, out);
}

for (const f of pages) {
  const p = join(root, f);
  const html = readFileSync(p, 'utf8');
  const next = html.replace(re, (u) => map.get(u.replace(/&amp;/g, '&')) || u);
  if (next !== html) { writeFileSync(p, next); console.log(`rewrote ${f}`); }
}
console.log('Done. Commit the new assets/ files and the updated pages.');
