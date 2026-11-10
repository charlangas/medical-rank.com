import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const source = z.object({
  id: z.string(),
  title: z.string(),
  publisher: z.string(),
  url: z.string().url(),
  checked: z.coerce.date(),
  supports: z.string(),
});

const posts = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/posts' }),
  schema: z.object({
    slug: z.string().regex(/^[a-z0-9-]+$/),
    title: z.string(),
    summary: z.string(),
    author: z.string(),
    published: z.coerce.date().optional(),
    updated: z.coerce.date().optional(),
    shortAnswer: z.string().optional(),
    worksheet: z.string().optional(),
    review: z.string().optional(),
    related: z.array(z.string()).optional(),
    sources: z.array(source).default([]),
    internal: z.object({
      status: z.enum(['draft', 'review', 'published']),
      permissions: z.string(),
      evidenceNotes: z.array(z.string()).default([]),
      gaps: z.array(z.string()).default([]),
      disclosedLimits: z.array(z.string()).default([]),
    }),
  }),
});

const worksheets = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/worksheets' }),
  schema: z.object({ id: z.string(), title: z.string(), description: z.string(), status: z.enum(['draft', 'review', 'published']).default('draft') }),
});

export const collections = { posts, worksheets };
