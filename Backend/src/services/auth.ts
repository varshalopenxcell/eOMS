import { eq } from 'drizzle-orm';
import { db } from '../lib/dbClient';
import { users, organizationMemberships } from '../db/schema';

export async function getUserById(id: string) {
  return await db.select().from(users).where(eq(users.id, id)).limit(1);
}

export async function getUserOrganizations(userId: string) {
  return await db
    .select({
      membershipId: organizationMemberships.id,
      organizationId: organizationMemberships.organizationId,
      role: organizationMemberships.role
    })
    .from(organizationMemberships)
    .where(eq(organizationMemberships.userId, userId));
}
