import { NextResponse } from 'next/server';
import { billingSchema } from '@/schemas/billing';
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

  const subscriptionResponse = await supabaseAdmin
    .from('subscriptions')
    .select('status,current_period_end,plan_id')
    .eq('organization_id', organizationId)
    .limit(1)
    .single();

  const planResponse = subscriptionResponse.data
    ? await supabaseAdmin.from('plans').select('name,tier,price_id').eq('id', subscriptionResponse.data.plan_id).limit(1).single()
    : null;

  const result = billingSchema.parse({
    currentPlan: {
      name: planResponse?.data?.name ?? 'Free',
      tier: planResponse?.data?.tier ?? 'free',
      price: 0,
      currency: 'USD'
    },
    nextBillingDate: subscriptionResponse.data?.current_period_end ?? new Date().toISOString().split('T')[0],
    paymentStatus: subscriptionResponse.data?.status ?? 'active'
  });

  return NextResponse.json(result);
}
