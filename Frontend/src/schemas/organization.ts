import { z } from 'zod';

export const organizationSchema = z.object({
  id: z.number(),
  name: z.string(),
  slug: z.string(),
  currency: z.string(),
  timezone: z.string(),
  plan: z.object({
    name: z.string(),
    tier: z.string()
  }).optional()
});

export type Organization = z.infer<typeof organizationSchema>;
