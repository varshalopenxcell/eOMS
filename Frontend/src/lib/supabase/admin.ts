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
