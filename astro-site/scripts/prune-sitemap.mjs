// After the build: a page that carries a robots noindex tag must not be in the sitemap.
// Covers hubs with nothing published yet and empty index pages, without a second list to maintain.
import fs from 'node:fs'; import path from 'node:path';
const file = 'dist/sitemap-0.xml';
if (!fs.existsSync(file)) { console.error('prune-sitemap: dist/sitemap-0.xml not found'); process.exit(1); }
let xml = fs.readFileSync(file, 'utf8'); let dropped = 0;
xml = xml.replace(/<url><loc>https:\/\/medical-rank\.com(\/[^<]*)<\/loc>.*?<\/url>/g, (m, p) => {
  const html = path.join('dist', p, 'index.html');
  if (fs.existsSync(html) && /<meta name="robots" content="noindex/.test(fs.readFileSync(html, 'utf8'))) { dropped++; console.log('sitemap: dropped noindex page ' + p); return ''; }
  return m;
});
fs.writeFileSync(file, xml); console.log(`sitemap: ${dropped} noindex page(s) removed`);
