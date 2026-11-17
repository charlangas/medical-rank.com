// Post-build checks on dist/ (strict production build). Exits 1 on any failure.
import fs from 'node:fs'; import path from 'node:path';
const r = (p) => fs.readFileSync(path.join('dist', p), 'utf8'); let bad = 0; const TARGET = process.argv[2] || 'production';
const ok = (c, m) => { console.log((c ? 'PASS ' : 'FAIL ') + m); if (!c) bad++; };
const G = 'guides/is-google-ads-bringing-in-booked-appointments/', W = 'worksheets/ads-bookings-check/';
const home = r('index.html'), guide = r(G + 'index.html'), ws = r(W + 'index.html'), map = r('sitemap-0.xml');
const main = home.match(/<main[^>]*>([\s\S]*?)<\/main>/)?.[1] || '';
const homeHeadings = [...main.matchAll(/<h1[\s>][\s\S]*?<\/h1>/g)].map((m) => m[0].replace(/<[^>]+>/g, ''));
ok(homeHeadings.length === 1 && /local SEO/i.test(homeHeadings[0]) && /Google Ads/.test(homeHeadings[0]) && /medical practices/i.test(homeHeadings[0]), 'homepage has one H1 naming the services and intended audience');
ok(main.indexOf('href="/contact/"') >= 0 && main.indexOf('href="/contact/"') < main.indexOf('id="resources"'), 'homepage offers a service enquiry before the resource section');
ok(main.includes('href="/services/local-seo/"') && main.includes('href="/services/google-ads/"'), 'homepage has commercial paths for both services');
ok(home.includes(`href="/${G}"`), 'homepage links to the guide');
const contact = r('contact/index.html');
ok(home.includes('href="/contact/"') && home.includes('href="mailto:info@medical-rank.com"'), 'homepage links to the contact page and shows the email address');
ok(/href="mailto:info@medical-rank\.com/.test(contact) || /<form[^>]+data-contact/.test(contact), 'contact page has an email link or the contact form');
ok(!/gtag|googletagmanager|G-HGLQ/.test(home + guide + ws), 'no Google Analytics tag in any page');
ok(home.includes('rel="canonical" href="https://medical-rank.com/"'), 'homepage canonical');
ok(guide.includes(`rel="canonical" href="https://medical-rank.com/${G}"`), 'guide canonical');
ok(ws.includes(`rel="canonical" href="https://medical-rank.com/${W}"`), 'worksheet canonical');
ok(/name="robots" content="noindex,follow"/.test(ws), 'worksheet has noindex,follow');
ok(!/name="robots"[^>]*noindex/.test(guide) && !/name="robots"[^>]*noindex/.test(home), 'guide and homepage are indexable');
ok(!/DRAFT preview/.test(home + guide + ws), 'no draft banner');
const locs = [...map.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
for (const route of ['services/local-seo/', 'services/google-ads/', 'resources/']) {
  const page = r(route + 'index.html'), url = 'https://medical-rank.com/' + route;
  ok(locs.includes(url) && page.includes(`rel="canonical" href="${url}"`) && !/name="robots"[^>]*noindex/.test(page), 'commercial/resource route is indexable, self-canonical and in the sitemap: /' + route);
  ok((page.match(/<h1[\s>]/g) || []).length === 1 && page.includes('href="/contact/"'), 'commercial/resource route has one H1 and an enquiry path: /' + route);
}
const resources = r('resources/index.html');
ok(resources.includes(`href="/${G}"`) && !/sample-benchmark|DRAFT preview|HYPOTHETICAL data/.test(resources), 'resource hub includes the published guide and excludes draft sample content');
ok(locs.includes('https://medical-rank.com/') && locs.includes(`https://medical-rank.com/${G}`), 'sitemap lists the homepage and the guide');
ok(!locs.some((l) => l.includes('/worksheets/') || /\/404\/?$/.test(l)), 'sitemap has no worksheet or 404 URL');
// Every sitemap URL must be a built, indexable, self-canonical page; every indexable page must be in the sitemap.
for (const l of locs) {
  const p = l.replace('https://medical-rank.com/', ''); const f = path.join('dist', p, 'index.html');
  const h = fs.existsSync(f) ? fs.readFileSync(f, 'utf8') : '';
  ok(h && !/name="robots"[^>]*noindex/.test(h) && h.includes(`rel="canonical" href="${l}"`), 'sitemap URL is built, indexable and self-canonical: /' + p);
}
const legacy = ['dental', 'chiropractors', 'audiologists', 'doctors', 'med-spa', 'mental-health', 'nutritionists', 'physical-therapy', 'pricing', 'city-guide'];
ok(!legacy.some((d) => fs.existsSync(path.join('dist', d))), 'no retired legacy path is built (' + legacy.join(', ') + ')');
const blogDir = 'dist/blog'; const posts = fs.existsSync(blogDir) ? fs.readdirSync(blogDir).filter((d) => fs.statSync(path.join(blogDir, d)).isDirectory()) : [];
for (const b of posts) { const h = fs.readFileSync(path.join(blogDir, b, 'index.html'), 'utf8');
  ok((h.match(/<h1[\s>]/g) || []).length === 1 && h.includes('By Medical Rank') && !/DRAFT preview/.test(h), 'article has one H1, a byline and no draft banner: /blog/' + b + '/'); }
if (TARGET === 'production') {
  ok(!/Disallow:\s*\/\s*$/m.test(r('robots.txt')) && r('robots.txt').includes('Sitemap: https://medical-rank.com/sitemap-index.xml'), 'production robots.txt allows crawling and names the sitemap');
  ok(!fs.existsSync('dist/_headers'), 'production build has no _headers file (no inherited preview noindex)');
} else {
  ok(/Disallow:\s*\/\s*$/m.test(r('robots.txt')) && /X-Robots-Tag:\s*noindex/i.test(r('_headers')), 'preview build blocks indexing (robots Disallow + X-Robots-Tag)');
}
ok(/By Carlos Ochoa/.test(guide) && /About the author/.test(guide), 'guide has byline and author note');
const all = []; (function walk(d) { for (const f of fs.readdirSync(d)) { const p = path.join(d, f); fs.statSync(p).isDirectory() ? walk(p) : all.push(p); } })('dist');
// Check the other sitemap direction, plus all local navigation, asset links and fragment targets.
const htmlFiles = all.filter((p) => p.endsWith('.html'));
const linkFailures = [], sitemapFailures = [];
const htmlByFile = new Map(htmlFiles.map((file) => [file, fs.readFileSync(file, 'utf8')]));
for (const [file, html] of htmlByFile) {
  const relative = file.slice('dist/'.length);
  const pathname = '/' + relative.replace(/index\.html$/, '');
  const pageUrl = new URL(pathname, 'https://medical-rank.com');
  if (!/name="robots"[^>]*noindex/.test(html) && !locs.includes(pageUrl.href)) sitemapFailures.push(pathname);
  for (const match of html.matchAll(/\bhref=["']([^"']+)["']/g)) {
    const href = match[1].replace(/&amp;/g, '&');
    let url;
    try { url = new URL(href, pageUrl); } catch { linkFailures.push(`${pathname}: invalid URL ${href}`); continue; }
    if (url.origin !== pageUrl.origin) continue;
    const targetPath = decodeURIComponent(url.pathname);
    const destination = path.join('dist', targetPath.endsWith('/') ? targetPath + 'index.html' : targetPath);
    if (!fs.existsSync(destination) || !fs.statSync(destination).isFile()) {
      linkFailures.push(`${pathname}: missing target ${href}`);
      continue;
    }
    if (url.hash && destination.endsWith('.html')) {
      const targetHtml = htmlByFile.get(destination) ?? fs.readFileSync(destination, 'utf8');
      const id = decodeURIComponent(url.hash.slice(1));
      const ids = [...targetHtml.matchAll(/\bid=["']([^"']+)["']/g)].map((m) => m[1]);
      // The worksheet assigns its agency-message anchor in its inline print setup.
      ids.push(...[...targetHtml.matchAll(/\.id\s*=\s*["']([^"']+)["']/g)].map((m) => m[1]));
      if (!ids.includes(id)) linkFailures.push(`${pathname}: missing anchor ${href}`);
    }
  }
}
ok(sitemapFailures.length === 0, 'every indexable page is included in the sitemap' + (sitemapFailures.length ? ': ' + sitemapFailures.join(', ') : ''));
ok(linkFailures.length === 0, 'all internal links, assets and declared anchors resolve across ' + htmlFiles.length + ' pages' + (linkFailures.length ? ': ' + linkFailures.slice(0, 12).join('; ') : ''));
ok(!all.some((p) => /benchmark|pilot|qa_|mock|frozen|recovery_audit|walkthrough/i.test(p)), 'no benchmark/QA/pilot file names in dist');
ok(!all.some((p) => /\.(html|xml|txt|css)$/.test(p) && /sample-benchmark|qa_notes|mock_set|frozen_v|recovery_audit/.test(fs.readFileSync(p, 'utf8'))), 'no benchmark/QA references inside dist files');
ok(!fs.existsSync('dist/guides/sample-benchmark-cost-per-event'), 'benchmark route not emitted');
ok(/name="robots" content="noindex,follow"/.test(r('404.html')), '404.html is noindex (the /404 URL itself resolves 200 on Workers assets)');
// Optional imagery must never leave an unfinished placeholder in a production release.
const ph = all.filter((p) => p.endsWith('.html')).map((p) => [p.replace(/^dist/, '').replace(/index\.html$/, ''), (fs.readFileSync(p, 'utf8').match(/data-placeholder/g) || []).length]).filter(([, n]) => n);
const phList = ph.map(([p, n]) => `${p} (${n})`).join(', ');
if (TARGET === 'production') ok(ph.length === 0, 'no image placeholders in a production build' + (ph.length ? ': ' + phList : ''));
else console.log('NOTE image placeholders present (allowed in preview): ' + (phList || 'none'));
process.exit(bad ? 1 : 0);
