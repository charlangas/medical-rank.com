// Post-build checks on dist/ (strict production build). Exits 1 on any failure.
import fs from 'node:fs'; import path from 'node:path';
const r = (p) => fs.readFileSync(path.join('dist', p), 'utf8'); let bad = 0; const TARGET = process.argv[2] || 'production';
const ok = (c, m) => { console.log((c ? 'PASS ' : 'FAIL ') + m); if (!c) bad++; };
const G = 'guides/is-google-ads-bringing-in-booked-appointments/', W = 'worksheets/ads-bookings-check/';
const home = r('index.html'), guide = r(G + 'index.html'), ws = r(W + 'index.html'), map = r('sitemap-0.xml');
ok(home.includes(`href="/${G}"`), 'homepage links to the guide');
ok(/href="mailto:info@medical-rank\.com\?/.test(home) && home.includes('href="mailto:info@medical-rank.com"'), 'homepage contact links are mailto info@medical-rank.com');
ok(!/gtag|googletagmanager|G-HGLQ/.test(home + guide + ws), 'no Google Analytics tag in any page');
ok(home.includes('rel="canonical" href="https://medical-rank.com/"'), 'homepage canonical');
ok(guide.includes(`rel="canonical" href="https://medical-rank.com/${G}"`), 'guide canonical');
ok(ws.includes(`rel="canonical" href="https://medical-rank.com/${W}"`), 'worksheet canonical');
ok(/name="robots" content="noindex,follow"/.test(ws), 'worksheet has noindex,follow');
ok(!/name="robots"[^>]*noindex/.test(guide) && !/name="robots"[^>]*noindex/.test(home), 'guide and homepage are indexable');
ok(!/DRAFT preview/.test(home + guide + ws), 'no draft banner');
const locs = [...map.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
ok(JSON.stringify(locs) === JSON.stringify(['https://medical-rank.com/', `https://medical-rank.com/${G}`]), 'sitemap lists only homepage and guide: ' + locs.join(', '));
if (TARGET === 'production') {
  ok(!/Disallow:\s*\/\s*$/m.test(r('robots.txt')) && r('robots.txt').includes('Sitemap: https://medical-rank.com/sitemap-index.xml'), 'production robots.txt allows crawling and names the sitemap');
  ok(!fs.existsSync('dist/_headers'), 'production build has no _headers file (no inherited preview noindex)');
} else {
  ok(/Disallow:\s*\/\s*$/m.test(r('robots.txt')) && /X-Robots-Tag:\s*noindex/i.test(r('_headers')), 'preview build blocks indexing (robots Disallow + X-Robots-Tag)');
}
ok(/By Carlos Ochoa/.test(guide) && /About the author/.test(guide), 'guide has byline and author note');
const all = []; (function walk(d) { for (const f of fs.readdirSync(d)) { const p = path.join(d, f); fs.statSync(p).isDirectory() ? walk(p) : all.push(p); } })('dist');
ok(!all.some((p) => /benchmark|pilot|qa_|mock|frozen|recovery_audit|walkthrough/i.test(p)), 'no benchmark/QA/pilot file names in dist');
ok(!all.some((p) => /\.(html|xml|txt|css)$/.test(p) && /sample-benchmark|qa_notes|mock_set|frozen_v|recovery_audit/.test(fs.readFileSync(p, 'utf8'))), 'no benchmark/QA references inside dist files');
ok(!fs.existsSync('dist/guides/sample-benchmark-cost-per-event'), 'benchmark route not emitted');
process.exit(bad ? 1 : 0);
