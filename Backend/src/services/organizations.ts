import { eq } from 'drizzle-orm';
import { db } from './dbClient';
import { organizations, organizationMemberships, subscriptions, plans } from '../db/schema';

export async function getOrganizationById(id: number) {
  return await db.select().from(organizations).where(eq(organizations.id, id)).limit(1);
}

export async function getOrganizationForUser(userId: string) {
  return await db
    .select({
      id: organizations.id,
      name: organizations.name,
      slug: organizations.slug,
      currency: organizations.currency,
      timezone: organizations.timezone,
      planName: plans.name,
      planTier: plans.tier
    })
    .from(organizations)
    .leftJoin(organizationMemberships, eq(organizationMemberships.organizationId, organizations.id))
    .leftJoin(subscriptions, eq(subscriptions.organizationId, organizations.id))
    .leftJoin(plans, eq(plans.id, subscriptions.planId))
    .where(eq(organizationMemberships.userId, userId))
    .limit(1);
}
