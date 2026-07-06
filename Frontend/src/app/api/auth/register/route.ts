import { NextResponse } from 'next/server';
import { z } from 'zod';
import { getSupabaseAdmin, resolveOrganizationId } from '@/lib/supabase/admin';

// Uses the service-role key; must run at request time, never at build.
export const dynamic = 'force-dynamic';

const registerSchema = z.object({
  email: z.string().email('A valid email is required'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  name: z.string().optional().default('')
});

/**
 * Self-serve registration. Creates an email-confirmed Supabase auth user (so the
 * account is immediately usable regardless of the project's email-confirmation
 * setting), mirrors it into public.users, and grants membership to the demo
 * organization. The client then signs in with the same credentials.
 */
export async function POST(request: Request) {
  const parsed = registerSchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? 'Invalid input' }, { status: 400 });
  }

  const { email, password, name } = parsed.data;
  const admin = getSupabaseAdmin();

  const { data: created, error: createError } = await admin.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: { name }
  });

  if (createError || !created?.user) {
    const message = /already/i.test(createError?.message ?? '')
      ? 'An account with this email already exists. Try signing in.'
      : createError?.message ?? 'Could not create account.';
    return NextResponse.json({ error: message }, { status: 400 });
  }

  const userId = created.user.id;

  // Mirror into public.users (FK target for memberships).
  const { error: usersError } = await admin
    .from('users')
    .upsert({ id: userId, email, name: name || null }, { onConflict: 'id' });
  if (usersError) {
    return NextResponse.json({ error: usersError.message }, { status: 500 });
  }

  // Grant access to the demo organization so the new account sees data.
  const organizationId = await resolveOrganizationId();
  if (organizationId) {
    const { data: existing } = await admin
      .from('organization_memberships')
      .select('id')
      .eq('user_id', userId)
      .eq('organization_id', organizationId)
      .limit(1)
      .maybeSingle();

    if (!existing) {
      await admin
        .from('organization_memberships')
        .insert({ organization_id: organizationId, user_id: userId, role: 'member', is_default: true });
    }
  }

  return NextResponse.json({ ok: true }, { status: 201 });
}
