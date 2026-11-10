// Build gate: published posts must have no open gaps, no pending permissions, no PLACEHOLDER text;
// every EvidenceNote source id must exist; required fields are enforced by the content schema at build.
import fs from 'node:fs'; import path from 'node:path'; import { load } from 'js-yaml';
const dir = 'src/content/posts'; let bad = 0;
for (const f of fs.readdirSync(dir).filter((f) => /\.mdx?$/.test(f))) {
  const t = fs.readFileSync(path.join(dir, f), 'utf8');
  const m = t.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/); const fm = load(m[1]); const body = m[2];
  const ids = new Set((fm.sources || []).map((s) => s.id));
  for (const n of body.matchAll(/<EvidenceNote source="([^"]+)"/g)) if (!ids.has(n[1])) { console.error(`${f}: unknown source "${n[1]}"`); bad++; }
  if (process.env.RELEASE_CANDIDATE === '1' && fm.internal?.status === 'review') for (const g of fm.internal.gaps || []) console.warn(`BLOCKER before publish (${f}): ${g}`);
  if (fm.internal?.status === 'published') {
    if (!fm.published) { console.error(`${f}: published without a date`); bad++; }
    else {
      const d = new Date(fm.published).toISOString().slice(0, 10), today = new Date().toISOString().slice(0, 10);
      if (d > today) { console.error(`${f}: published date ${d} is in the future`); bad++; }
      else console.log(`${f}: published date ${d} (set to the go-live date before the deploy build)`);
    }
    if ((fm.internal.gaps || []).length) { console.error(`${f}: published with open gaps`); bad++; }
    if (/pending/i.test(fm.internal.permissions || '')) { console.error(`${f}: pending permissions`); bad++; }
    if ((fm.internal.disclosedLimits || []).length && !/## How we checked this/.test(body)) { console.error(`${f}: disclosed limits but no "How we checked this" section`); bad++; }
    if (/PLACEHOLDER/.test(t)) { console.error(`${f}: PLACEHOLDER text`); bad++; }
  }
}
// Starting-sheet agency questions must match section 4A word for word.
{ const w = fs.readFileSync('src/content/worksheets/ads-bookings-check.md', 'utf8');
  const qs = [...w.matchAll(/^> (\d)\. (.+)$/gm)].map((m) => m[2]);
  const a = w.slice(w.indexOf('*To the agency'), w.indexOf('*To the clinic software provider'));
  if (qs.length !== 5) { console.error('starting message should have 5 questions'); bad++; }
  for (const q of qs) if (!a.includes(q)) { console.error('4A is missing starting-message question: ' + q); bad++; } }
if (bad) process.exit(1); console.log('content checks ok');
