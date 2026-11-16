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
    topic: z.enum(['medical-seo', 'google-ads', 'website-conversion', 'marketing-measurement']).optional(),
    specialty: z.string().optional(),
    image: z.string().optional(),
    imageAlt: z.string().optional(),
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

// Articles written by the SEO engine (seo-engine/configs/medical-rank.yaml). The engine owns this
// frontmatter; `draft: true` files are held out of production builds.
const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    primaryKeyword: z.string(),
    secondaryKeywords: z.array(z.string()).default([]),
    schemaType: z.string().default('Article'),
    faq: z.array(z.object({ question: z.string(), answer: z.string() })).default([]),
    draft: z.boolean().default(false),
    image: z.string().optional(),
    imageAlt: z.string().optional(),
  }),
});

// Specialty hubs (/specialties/<id>/). Hand-written; a hub is built only when its file exists.
const specialties = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/specialties' }),
  schema: z.object({
    title: z.string(),
    name: z.string(),
    summary: z.string(),
    match: z.array(z.string()).default([]),
    status: z.enum(['draft', 'review', 'published']).default('draft'),
  }),
});

export const collections = { posts, worksheets, blog, specialties };
