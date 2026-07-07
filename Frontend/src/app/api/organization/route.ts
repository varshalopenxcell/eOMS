import { NextResponse } from 'next/server';
import { organizationSchema } from '@/schemas/organization';
import { getAuthedUser } from '@/lib/supabase/server';
import { getSupabaseAdmin, resolveOrganizationId } from '@/lib/supabase/admin';

// Reads per-request cookies and the database; never prerender at build time.
export const dynamic = 'force-dynamic';

export async function GET() {
  const supabaseAdmin = getSupabaseAdmin();

  const user = await getAuthedUser();
  const organizationId = await resolveOrganizationId(user?.id);
  if (!organizationId) {
    return NextResponse.json({ error: 'No organization found' }, { status: 404 });
  }

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
