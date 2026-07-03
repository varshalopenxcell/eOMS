import { NextResponse } from 'next/server';
import { organizationSchema } from '@/schemas/organization';
import { getAuthedUser } from '@/lib/supabase/server';
import { getSupabaseAdmin } from '@/lib/supabase/admin';

// Reads per-request cookies and the database; never prerender at build time.
export const dynamic = 'force-dynamic';

export async function GET() {
  const supabaseAdmin = getSupabaseAdmin();

  // AUTH TEMPORARILY DISABLED — 401 guard commented out. When there is no
  // authenticated user we fall back to the first available organization so the
  // app has data to render. Re-enable the guard + user-scoped lookup below.
  const user = await getAuthedUser();

  // if (!user) {
  //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  // }

  const membershipQuery = supabaseAdmin.from('organization_memberships').select('organization_id');
  const membershipResponse = user
    ? await membershipQuery.eq('user_id', user.id).limit(1).single()
    : await membershipQuery.limit(1).single();

  if (membershipResponse.error || !membershipResponse.data) {
    return NextResponse.json({ error: 'Organization membership not found' }, { status: 404 });
  }

  const organizationId = membershipResponse.data.organization_id;

  const organizationResponse = await supabaseAdmin
    .from('organizations')
    .select('id,name,slug,currency,timezone')
    .eq('id', organizationId)
    .limit(1)
    .single();

  if (organizationResponse.error || !organizationResponse.data) {
    return NextResponse.json({ error: 'Organization not found' }, { status: 404 });
  }

  const subscriptionResponse = await supabaseAdmin
    .from('subscriptions')
    .select('plan_id')
    .eq('organization_id', organizationId)
    .limit(1)
    .single();

  const plan = subscriptionResponse.data
    ? (await supabaseAdmin.from('plans').select('name,tier').eq('id', subscriptionResponse.data.plan_id).limit(1).single()).data
    : null;

  const result = organizationSchema.parse({
    ...organizationResponse.data,
    plan: plan ?? undefined
  });

  return NextResponse.json(result);
}
