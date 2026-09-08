import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const apps = defineCollection({
  loader: glob({ pattern: '*/index.md', base: './src/content/apps' }),
  schema: z.object({
    name: z.string(),
    slug: z.string(),
    tagline: z.string(),
    appStoreUrl: z.string().url(),
    platforms: z.array(z.string()),
    minimumOS: z.string(),
    price: z.string(),
    version: z.string(),
    releaseDate: z.coerce.date(),
    status: z.enum(['released', 'in-progress']),
    order: z.number(),
  }),
});

const appPrivacy = defineCollection({
  loader: glob({ pattern: '*/privacy.md', base: './src/content/apps' }),
});

export const collections = { apps, appPrivacy };
