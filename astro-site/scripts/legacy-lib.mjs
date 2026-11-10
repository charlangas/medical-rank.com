// Classifies an old-site URL path into a family and the status the NEW site gives it.
// New site serves only: / , the guide, the worksheet, sitemap/robots/assets. Everything else is a real 404.
export const KEEP = new Map([
  ['/', { status: 200, why: 'same URL, new homepage' }],
  ['/index', { status: 301, why: '301 to / (_redirects)' }],
  ['/sitemap.xml', { status: 301, why: '301 to /sitemap-index.xml (_redirects)' }],
]);
export function classify(p) {
  p = p.replace(/\/+$/, '') || '/';
  const seg = p.split('/').filter(Boolean);
  if (KEEP.has(p)) return { family: p === '/' ? 'homepage' : 'alias', ...KEEP.get(p) };
  if (p === '/404') return { family: 'stub/template:404', status: 200, why: '/404 resolves 200 on Workers assets (maps to 404.html); the page is noindex' };
  let family;
  if (seg.length === 1) family = ['pricing', 'city-guide', '404'].includes(seg[0]) ? 'stub/template:' + seg[0] : 'specialty hub';
  else if (seg[0] === 'blog') family = 'blog post';
  else if (seg[0] === 'physical-therapy' && seg[1] === 'pod') family = 'podcast page';
  else if (seg.length === 2) family = /^how-to-/.test(seg[1]) ? 'state guide' : 'state hub';
  else if (/-seo$/.test(seg[2]) && !/^how-to/.test(seg[2])) family = 'city landing';
  else if (/^how-to-do-seo/.test(seg[2])) family = 'city guide (SEO)';
  else if (/^how-to-get-more/.test(seg[2])) family = 'city guide (patients)';
  else family = 'other';
  return { family, status: 404, why: 'retired: no relevant replacement on the new site' };
}
