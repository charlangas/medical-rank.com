// Inventory the OLD site's sitemap (../sitemap.xml) against the new site.
// usage: node scripts/legacy-inventory.mjs [--csv out.csv] [--probe https://host --sample 150]
import fs from 'node:fs';
import { classify } from './legacy-lib.mjs';
const a = process.argv.slice(2), opt = (k) => (a.includes(k) ? a[a.indexOf(k) + 1] : null);
const urls = [...fs.readFileSync('../sitemap.xml', 'utf8').matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
const rows = urls.map((u) => ({ url: u, path: new URL(u).pathname, ...classify(new URL(u).pathname) }));
const count = {}; for (const r of rows) { const k = `${r.family} -> ${r.status}`; count[k] = (count[k] || 0) + 1; }
console.log(`old sitemap URLs: ${rows.length}`); for (const [k, v] of Object.entries(count).sort((x, y) => y[1] - x[1])) console.log(String(v).padStart(6), k);
if (opt('--csv')) { fs.writeFileSync(opt('--csv'), 'url,family,expected_new_status,reason\n' + rows.map((r) => [r.url, r.family, r.status, r.why].join(',')).join('\n') + '\n'); console.log('wrote ' + opt('--csv')); }
if (opt('--probe')) {
  const base = opt('--probe'), n = +(opt('--sample') || 150); let s = 12345; const rnd = () => (s = (s * 1103515245 + 12345) % 2147483648) / 2147483648;
  const byFam = {}; for (const r of rows) (byFam[r.family] ||= []).push(r);
  const pick = []; for (const list of Object.values(byFam)) { const k = Math.min(list.length, Math.max(3, Math.round(n * list.length / rows.length))); for (let i = 0; i < k; i++) pick.push(list[Math.floor(rnd() * list.length)]); }
  let bad = 0, got = {};
  for (const r of pick) { const res = await fetch(base + r.path, { redirect: 'manual' }); const ok = res.status === r.status; if (!ok) { bad++; console.log(`MISMATCH ${r.path} expected ${r.status} got ${res.status}`); } const k = `${r.family}: ${res.status}`; got[k] = (got[k] || 0) + 1; }
  console.log(`probed ${pick.length} URLs on ${base}, ${bad} mismatches`); console.log(got);
  process.exit(bad ? 1 : 0);
}
