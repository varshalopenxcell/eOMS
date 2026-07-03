import { cookies } from 'next/headers';
import { createServerClient, type CookieOptions } from '@supabase/ssr';

/**
 * Reads and validates the public Supabase config. Kept out of module scope so
 * that importing this file has no side effects — throwing at import time breaks
 * the Next.js build's "collect page data" step when env vars are absent.
 */
function getSupabaseConfig() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Missing Supabase environment variables.');
  }

  return { supabaseUrl, supabaseAnonKey };
}

/**
 * Supabase client for Server Components, Route Handlers, and Server Actions.
 * Reads/writes the auth cookies set by the browser client so the session
 * stays in sync across server and client rendering.
 */
export function createSupabaseServerClient() {
  const { supabaseUrl, supabaseAnonKey } = getSupabaseConfig();
  const cookieStore = cookies();

  return createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet: { name: string; value: string; options: CookieOptions }[]) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options);
          });
        } catch {
          // Called from a Server Component render (not a Route Handler/Action) —
          // middleware already refreshes the session, so this can be ignored.
        }
      }
    }
  });
}

/**
 * Resolves the authenticated user for the current request using the
 * user's session cookies. Returns null when unauthenticated.
 */
export async function getAuthedUser() {
  const supabase = createSupabaseServerClient();
  const {
    data: { user },
    error
  } = await supabase.auth.getUser();

  if (error || !user) {
    return null;
  }

  return user;
}
