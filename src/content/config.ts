import { defineCollection, z, reference } from 'astro:content';

const projects = defineCollection({
  type: 'content',
  schema: ({ image }) => z.object({
    title: z.string(),
    description: z.string().max(280),
    tech: z.array(z.string()).min(1),
    github: z.string().url(),
    demo: z.string().url().optional(),
    featured: z.boolean().default(false),
    date: z.coerce.date(),
    draft: z.boolean().default(false),
    series: z.string().optional(),
    coverImage: image().optional(),
    relatedCertificates: z.array(reference('certificates')).optional(),
  }),
});

const writeups = defineCollection({
  type: 'content',
  schema: ({ image }) => z.object({
    title: z.string(),
    ctf: z.string(),
    category: z.enum(['Web', 'Pwn', 'Crypto', 'Forensics', 'Misc', 'OSINT']),
    difficulty: z.enum(['Easy', 'Medium', 'Hard']),
    date: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    excerpt: z.string().max(280),
    draft: z.boolean().default(false),
    series: z.string().optional(),
    coverImage: image().optional(),
    relatedCertificates: z.array(reference('certificates')).optional(),
  }),
});

const blog = defineCollection({
  type: 'content',
  schema: ({ image }) => z.object({
    title: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    excerpt: z.string().max(280),
    draft: z.boolean().default(false),
    series: z.string().optional(),
    coverImage: image().optional(),
    relatedCertificates: z.array(reference('certificates')).optional(),
  }),
});

const seriesItem = z.object({
  collection: z.enum(['blog', 'writeups', 'projects']),
  slug: z.string(),
});

const series = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().max(280),
    draft: z.boolean().default(false),
    items: z.array(seriesItem).min(1),
    relatedCertificates: z.array(reference('certificates')).optional(),
  }),
});

const certificates = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    issuer: z.string(),
    issueDate: z.coerce.date(),
    credentialId: z.string().optional(),
    credentialUrl: z.string().url().optional(),
    assetPath: z.string(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { projects, writeups, blog, series, certificates };
