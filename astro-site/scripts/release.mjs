// Reproducible release: clean tree -> strict build -> verify -> deploy, tagged with the git commit.
// usage: node scripts/release.mjs preview|production [--dry-run]
import { execSync } from 'node:child_process';
const [target, flag] = process.argv.slice(2), dry = flag === '--dry-run';
if (!['preview', 'production'].includes(target)) { console.error('target must be preview or production'); process.exit(2); }
const sh = (c) => { console.log('$ ' + c); return execSync(c, { stdio: 'inherit' }); };
const out = (c) => execSync(c).toString().trim();
if (out('git status --porcelain -- .')) { console.error('working tree under astro-site/ is not clean: commit first so the deploy matches a revision'); process.exit(1); }
const sha = out('git rev-parse --short=12 HEAD'), branch = out('git rev-parse --abbrev-ref HEAD');
sh('npm ci');
sh(target === 'preview' ? 'npm run build:host-preview' : 'npm run build');
sh(`node scripts/verify-dist.mjs ${target}`);
const cfg = target === 'preview' ? '-c wrangler.preview.jsonc' : '';
const cmd = `npx wrangler deploy ${cfg} --tag ${sha} --message "${target} ${branch}@${sha}"`;
if (dry) { console.log('DRY RUN, would run: ' + cmd); process.exit(0); }
sh(cmd);
