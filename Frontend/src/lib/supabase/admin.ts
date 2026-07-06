import { createClient } from '@supabase/supabase-js';

/**
 * Builds the service-role Supabase client. Wrapping the `createClient` call in a
 * concrete function lets `ReturnType` below infer the real client type (matching
 * an inline `createClient(...)` call) instead of the generic defaults, which
 * would otherwise collapse query results to `never`.
 */
function createAdminClient() {
  const supabaseUrl = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error('Missing Supabase admin environment variables.');
  }

  return createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false
    }
  });
}

let adminClient: ReturnType<typeof createAdminClient> | undefined;

/**
 * Lazily constructs the service-role Supabase client on first call. Deferring
 * construction (rather than doing it at module scope) keeps route modules
 * side-effect free, so importing them during the Next.js build's "collect page
 * data" step never throws when the server env vars are absent — it only runs at
 * request time.
 *
 * NOTE: the service-role key bypasses row-level security. Only ever use this on
 * the server; never expose it to the client.
 */
export function getSupabaseAdmin() {
  if (!adminClient) {
    adminClient = createAdminClient();
  }

  return adminClient;
}

/**
 * Resolves which organization the current request operates on.
 *
 * With auth enabled, pass the authenticated user's id to scope to the org they
 * belong to. While auth is disabled (see middleware), `userId` is undefined and
 * we fall back to the first organization in the database so the app still has a
 * tenant to read from and write to. Returns null when no organization exists.
 */
export async function resolveOrganizationId(userId?: string | null): Promise<number | null> {
  const supabaseAdmin = getSupabaseAdmin();

  if (userId) {
    const membership = await supabaseAdmin
      .from('organization_memberships')
      .select('organization_id')
      .eq('user_id', userId)
      .limit(1)
      .maybeSingle();

    if (membership.data?.organization_id) {
      return membership.data.organization_id as number;
    }
  }

  const organization = await supabaseAdmin
    .from('organizations')
    .select('id')
    .order('id', { ascending: true })
    .limit(1)
    .maybeSingle();

  return (organization.data?.id as number | undefined) ?? null;
}
