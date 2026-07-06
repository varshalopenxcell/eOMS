import { randomUUID } from 'crypto';
import { NextResponse } from 'next/server';
import { getAuthedUser } from '@/lib/supabase/server';
import { getSupabaseAdmin, resolveOrganizationId } from '@/lib/supabase/admin';
import { orderUpdateSchema } from '@/schemas/order';
import { mapOrderRow, itemsTotalCents } from '../mapper';

export const dynamic = 'force-dynamic';

async function getOrgId() {
  const user = await getAuthedUser();
  return resolveOrganizationId(user?.id);
}

export async function GET(_request: Request, { params }: { params: { id: string } }) {
  const organizationId = await getOrgId();
  if (!organizationId) {
    return NextResponse.json({ error: 'No organization found' }, { status: 404 });
  }

  const supabaseAdmin = getSupabaseAdmin();
  const { data, error } = await supabaseAdmin
    .from('orders')
    .select('*')
    .eq('organization_id', organizationId)
    .eq('id', params.id)
    .maybeSingle();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  if (!data) {
    return NextResponse.json({ error: 'Order not found' }, { status: 404 });
  }

  return NextResponse.json(mapOrderRow(data));
}

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  const organizationId = await getOrgId();
  if (!organizationId) {
    return NextResponse.json({ error: 'No organization found' }, { status: 404 });
  }

  const parsed = orderUpdateSchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const { status, customerId, currency, items } = parsed.data;
  const update: Record<string, unknown> = { updated_at: new Date().toISOString() };
  if (status !== undefined) update.status = status;
  if (customerId !== undefined) update.customer_id = customerId ? Number(customerId) : null;
  if (currency !== undefined) update.currency = currency;
  if (items !== undefined) {
    update.items = items.map((item) => ({ id: randomUUID(), ...item }));
    update.total_amount_cents = itemsTotalCents(items);
  }

  const supabaseAdmin = getSupabaseAdmin();
  const { data, error } = await supabaseAdmin
    .from('orders')
    .update(update)
    .eq('organization_id', organizationId)
    .eq('id', params.id)
    .select('*')
    .maybeSingle();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  if (!data) {
    return NextResponse.json({ error: 'Order not found' }, { status: 404 });
  }

  return NextResponse.json(mapOrderRow(data));
}

export async function DELETE(_request: Request, { params }: { params: { id: string } }) {
  const organizationId = await getOrgId();
  if (!organizationId) {
    return NextResponse.json({ error: 'No organization found' }, { status: 404 });
  }

  const supabaseAdmin = getSupabaseAdmin();
  const { error } = await supabaseAdmin
    .from('orders')
    .delete()
    .eq('organization_id', organizationId)
    .eq('id', params.id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
