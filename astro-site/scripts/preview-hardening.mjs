// Run after a strict build, ONLY for the preview Worker. Adds noindex at the host level.
// The production build never runs this; verify-dist.mjs fails the production build if these files carry a restriction.
import fs from 'node:fs';
fs.writeFileSync('dist/_headers', '/*\n  X-Robots-Tag: noindex, nofollow\n');
fs.writeFileSync('dist/robots.txt', 'User-agent: *\nDisallow: /\n');
console.log('preview hardening applied: dist/_headers (X-Robots-Tag) and Disallow robots.txt');
