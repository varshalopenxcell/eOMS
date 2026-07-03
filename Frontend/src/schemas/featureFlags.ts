import { z } from 'zod';

export const featureFlagSchema = z.object({
  key: z.string(),
  enabled: z.boolean(),
  config: z.record(z.any()).optional()
});

export const featureFlagsSchema = z.object({
  featureFlags: z.array(featureFlagSchema)
});

export type FeatureFlagsResponse = z.infer<typeof featureFlagsSchema>;
