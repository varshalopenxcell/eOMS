import { randomUUID } from 'crypto';
import { NextResponse } from 'next/server';
import { getAuthedUser } from '@/lib/supabase/server';
import { getSupabaseAdmin, resolveOrganizationId } from '@/lib/supabase/admin';
import { orderInputSchema } from '@/schemas/order';
import { mapOrderRow, itemsTotalCents } from './mapper';

export const dynamic = 'force-dynamic';

export async function GET() {
  const user = await getAuthedUser();
  const organizationId = await resolveOrganizationId(user?.id);
  if (!organizationId) {
    return NextResponse.json({ error: 'No organization found' }, { status: 404 });
  }

  const supabaseAdmin = getSupabaseAdmin();
  const { data, error } = await supabaseAdmin
    .from('orders')
    .select('*')
    .eq('organization_id', organizationId)
    .order('created_at', { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json((data ?? []).map(mapOrderRow));
}

export async function POST(request: Request) {
  const user = await getAuthedUser();
  const organizationId = await resolveOrganizationId(user?.id);
  if (!organizationId) {
    return NextResponse.json({ error: 'No organization found' }, { status: 404 });
  }

  const parsed = orderInputSchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const { customerId, status, currency, items } = parsed.data;
  // Line items are stored inline as JSONB, each with a stable id for React keys.
  const itemsWithIds = items.map((item) => ({ id: randomUUID(), ...item }));

  const supabaseAdmin = getSupabaseAdmin();
  const { data, error } = await supabaseAdmin
    .from('orders')
    .insert({
      organization_id: organizationId,
      customer_id: customerId ? Number(customerId) : null,
      status,
      currency,
      items: itemsWithIds,
      total_amount_cents: itemsTotalCents(items)
    })
    .select('*')
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(mapOrderRow(data), { status: 201 });
}
