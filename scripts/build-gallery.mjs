#!/usr/bin/env node
// Builds the albums on gallery.html from the folders in assets/img/gallery/.
// Each sub-folder = one album. "1-ride-for-freedom-2026" -> "Ride For Freedom 2026" (number = sort order).
// Run after adding/removing photos:  node scripts/build-gallery.mjs
import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const galDir = join(root, 'assets/img/gallery');
const IMG = /\.(jpe?g|png|webp|gif|avif)$/i;
const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
const title = (dir) => dir.replace(/^\d+[-_ ]*/, '').replace(/[-_]+/g, ' ')
  .replace(/\b\w/g, (c) => c.toUpperCase());

const albums = readdirSync(galDir)
  .filter((d) => statSync(join(galDir, d)).isDirectory())
  .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

const blocks = albums.map((dir) => {
  const name = title(dir);
  const files = readdirSync(join(galDir, dir)).filter((f) => IMG.test(f))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
  if (!files.length) return '';
  const items = files.map((f, i) => {
    const src = `assets/img/gallery/${encodeURIComponent(dir)}/${encodeURIComponent(f)}`;
    return `            <a href="${src}"><img src="${src}" alt="${esc(name)} photo ${i + 1}" loading="lazy"></a>`;
  }).join('\n');
  console.log(`${name}: ${files.length} photo(s)`);
  return `        <div class="gallery-block">\n          <h2>${esc(name)}</h2>\n          <div class="gallery">\n${items}\n          </div>\n        </div>`;
}).filter(Boolean);

const p = join(root, 'gallery.html');
const html = readFileSync(p, 'utf8');
const re = /(<!-- GALLERY:ALBUMS -->)[\s\S]*?([ \t]*<!-- \/GALLERY:ALBUMS -->)/;
if (!re.test(html)) throw new Error('gallery.html is missing the GALLERY:ALBUMS markers');
writeFileSync(p, html.replace(re, (_, a, b) => `${a}\n${blocks.join('\n')}${blocks.length ? '\n' : ''}${b}`));
console.log(`gallery.html updated with ${blocks.length} album(s).`);
