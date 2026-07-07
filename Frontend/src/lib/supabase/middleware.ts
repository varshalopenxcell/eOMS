import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

// Any route starting with one of these requires an authenticated session.
// '/dashboard' is intentionally excluded so it's reachable without login.
const protectedRoutes = [
  '/orders',
  '/customers',
  '/products',
  '/inventory',
  '/warehouses',
  '/shipping',
  '/returns',
  '/analytics',
  '/reports',
  '/workflows',
  '/rules',
  '/integrations',
  '/users',
  '/billing',
  '/settings'
];

/**
 * Refreshes the Supabase session on every request (per the official
 * @supabase/ssr middleware pattern) and redirects based on real auth state
 * rather than the mere presence of a cookie.
 */
export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({ request });

  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet: { name: string; value: string; options: CookieOptions }[]) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        response = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options));
      }
    }
  });

  const {
    data: { user }
  } = await supabase.auth.getUser();

  const { pathname } = request.nextUrl;

  if (protectedRoutes.some((route) => pathname.startsWith(route)) && !user) {
    const url = request.nextUrl.clone();
    url.pathname = '/auth';
    url.searchParams.set('next', pathname);
    return NextResponse.redirect(url);
  }

  if (pathname === '/auth' && user) {
    const url = request.nextUrl.clone();
    url.pathname = '/dashboard';
    url.searchParams.delete('next');
    return NextResponse.redirect(url);
  }

  return response;
}
