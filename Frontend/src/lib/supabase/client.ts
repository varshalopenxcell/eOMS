import { createBrowserClient } from '@supabase/ssr';

type BrowserClient = ReturnType<typeof createBrowserClient>;

let client: BrowserClient | undefined;

/**
 * Lazily constructs the browser Supabase client on first use. Deferring
 * construction (instead of doing it at module scope) keeps importing this file
 * side-effect free, so it never throws during the Next.js build/prerender when
 * env vars are unavailable — it only runs in the browser, where the
 * NEXT_PUBLIC_* values are inlined.
 */
function getSupabaseBrowserClient(): BrowserClient {
  if (client) {
    return client;
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Missing Supabase environment variables.');
  }

  client = createBrowserClient(supabaseUrl, supabaseAnonKey);
  return client;
}

/**
 * Proxy that resolves to the real browser client on first property access, so
 * existing `import { supabase }` call sites keep working unchanged.
 */
export const supabase = new Proxy({} as BrowserClient, {
  get(_target, prop) {
    const resolved = getSupabaseBrowserClient() as unknown as Record<string | symbol, unknown>;
    const value = resolved[prop];
    return typeof value === 'function' ? value.bind(resolved) : value;
  }
});
