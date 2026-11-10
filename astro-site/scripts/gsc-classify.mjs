// Applies the retirement rules to Search Console exports (CSV).
// usage: node scripts/gsc-classify.mjs --pages Pages.csv [--links "Top linked pages.csv"]
// Any URL with clicks, >=10 impressions or an external link is listed for an individual decision.
import fs from 'node:fs';
import { classify } from './legacy-lib.mjs';
const a = process.argv.slice(2), opt = (k) => (a.includes(k) ? a[a.indexOf(k) + 1] : null);
function csv(f) { const [h, ...ls] = fs.readFileSync(f, 'utf8').trim().split(/\r?\n/); const split = (l) => l.match(/("([^"]|"")*"|[^,]*)(,|$)/g).map((c) => c.replace(/,$/, '').replace(/^"|"$/g, '').replace(/""/g, '"')); const hd = split(h); return ls.map((l) => Object.fromEntries(split(l).map((v, i) => [hd[i], v]))); }
const col = (r, re) => Object.keys(r).find((k) => re.test(k));
const per = {};
const add = (url, f, n) => { const p = (() => { try { return new URL(url).pathname; } catch { return url; } })(); (per[p] ||= { clicks: 0, impressions: 0, links: 0 })[f] += n; };
if (opt('--pages')) for (const r of csv(opt('--pages'))) { const u = r[Object.keys(r)[0]]; add(u, 'clicks', +r[col(r, /click/i)] || 0); add(u, 'impressions', +r[col(r, /impress/i)] || 0); }
if (opt('--links')) for (const r of csv(opt('--links'))) { const u = r[Object.keys(r)[0]]; add(u, 'links', +r[col(r, /(external|incoming|links)/i)] || 0); }
const hits = Object.entries(per).filter(([, v]) => v.clicks > 0 || v.impressions >= 10 || v.links > 0);
console.log(`URLs with data: ${Object.keys(per).length}; needing an individual decision: ${hits.length}`);
for (const [p, v] of hits.sort((x, y) => y[1].clicks - x[1].clicks)) { const c = classify(p); console.log([p, `clicks=${v.clicks}`, `impr=${v.impressions}`, `links=${v.links}`, c.family, `new:${c.status}`, c.status === 404 ? 'DECIDE: 404 unless a genuinely relevant new page exists' : 'covered'].join(' | ')); }
