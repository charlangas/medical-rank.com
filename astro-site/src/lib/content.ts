// One place that decides what is live, so pages, hubs, the sitemap and the checks agree.
import { getCollection } from 'astro:content';
import { inBuild, isLive, showDrafts } from './release';
import { topics, topicForKeywords, type Topic } from './topics';

export const ymd = (d: Date) => d.toISOString().slice(0, 10);
export const longDate = (d: Date) =>
  d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' });

export type Item = {
  kind: 'guide' | 'article';
  url: string;
  title: string;
  summary: string;
  date?: Date;
  topic?: Topic;
  live: boolean;
};

export async function guides() {
  return (await getCollection('posts')).filter((p) => inBuild(p.data.internal.status));
}

// Engine articles: never before their pubDate, never when flagged draft (unless previewing drafts).
export async function articles() {
  const now = new Date();
  return (await getCollection('blog'))
    .filter((a) => showDrafts() || (!a.data.draft && a.data.pubDate <= now))
    .sort((a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime());
}

export async function allItems(): Promise<Item[]> {
  const g: Item[] = (await guides()).map((p) => ({
    kind: 'guide',
    url: `/guides/${p.data.slug}/`,
    title: p.data.title,
    summary: p.data.summary,
    date: p.data.published,
    topic: topics.find((t) => t.slug === p.data.topic),
    live: isLive(p.data.internal.status),
  }));
  const a: Item[] = (await articles()).map((x) => ({
    kind: 'article',
    url: `/blog/${x.id}/`,
    title: x.data.title,
    summary: x.data.description,
    date: x.data.pubDate,
    topic: topicForKeywords([x.data.primaryKeyword, ...x.data.tags]),
    live: !x.data.draft,
  }));
  return [...g, ...a].sort((x, y) => (y.date?.getTime() ?? 0) - (x.date?.getTime() ?? 0));
}

export async function itemsForTopic(slug: string) {
  return (await allItems()).filter((i) => i.topic?.slug === slug);
}

export async function liveSpecialties() {
  return (await getCollection('specialties')).filter((s) => inBuild(s.data.status));
}
