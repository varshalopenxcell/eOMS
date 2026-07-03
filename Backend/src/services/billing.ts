import { eq } from 'drizzle-orm';
import { db } from '../lib/dbClient';
import { plans, subscriptions } from '../db/schema';

export async function listPlans() {
  return await db.select().from(plans);
}

export async function getSubscriptionByOrg(organizationId: number) {
  return await db.select().from(subscriptions).where(eq(subscriptions.organizationId, organizationId)).limit(1);
}
