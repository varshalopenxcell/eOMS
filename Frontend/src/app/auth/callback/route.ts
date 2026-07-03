import { NextResponse } from 'next/server';
import { createSupabaseServerClient } from '@/lib/supabase/server';

/**
 * Completes the magic-link / email-confirmation / OAuth PKCE flow: Supabase
 * redirects here with a `code` param that gets exchanged for a session,
 * whose cookies are then written to the response.
 */
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const next = searchParams.get('next') ?? '/dashboard';
  const redirectTo = next.startsWith('/') ? next : '/dashboard';

  if (code) {
    const supabase = createSupabaseServerClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      return NextResponse.redirect(`${origin}${redirectTo}`);
    }

    return NextResponse.redirect(`${origin}/auth?error=${encodeURIComponent(error.message)}`);
  }

  return NextResponse.redirect(`${origin}/auth?error=${encodeURIComponent('Missing or invalid sign-in code.')}`);
}
