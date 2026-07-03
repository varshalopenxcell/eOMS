import { eq } from 'drizzle-orm';
import { db } from '../lib/dbClient';
import { feature_flags } from '../db/schema';

export function isFeatureEnabled(flags: Array<{ key: string; enabled: boolean }>, key: string) {
  return flags.some((flag) => flag.key === key && flag.enabled);
}

export async function getFeatureFlagsForOrganization(organizationId: number) {
  return await db.select().from(feature_flags).where(eq(feature_flags.organizationId, organizationId));
}

export async function setFeatureFlag(
  organizationId: number,
  key: string,
  enabled: boolean,
  config: Record<string, unknown> = {}
) {
  return await db.insert(feature_flags).values({ organizationId, key, enabled, config }).onConflictDoUpdate({
    target: feature_flags.organizationId,
    set: { enabled, config }
  });
}
