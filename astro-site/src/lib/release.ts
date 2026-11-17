// Release-candidate switch. Production (`npm run build`) emits only status "published".
// `npm run build:rc` (RELEASE_CANDIDATE=1) also emits items marked "review" and renders them as live pages,
// so canonicals, sitemap and routes can be checked. Open gaps are listed by check-content as blockers, not hidden.
export const RC = process.env.RELEASE_CANDIDATE === '1';
export const showDrafts = () => (import.meta.env.DEV || process.env.SHOW_DRAFTS === '1');
export const isLive = (status: string) => status === 'published' || (RC && status === 'review');
export const inBuild = (status: string) => showDrafts() || isLive(status);
