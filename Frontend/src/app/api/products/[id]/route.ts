import { NextResponse } from 'next/server';
import { getAuthedUser } from '@/lib/supabase/server';
import { getSupabaseAdmin, resolveOrganizationId } from '@/lib/supabase/admin';
import { productInputSchema } from '@/schemas/product';
import { mapProductRow } from '../mapper';

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
    .from('products')
    .select('*')
    .eq('organization_id', organizationId)
    .eq('id', params.id)
    .maybeSingle();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  if (!data) {
    return NextResponse.json({ error: 'Product not found' }, { status: 404 });
  }

  return NextResponse.json(mapProductRow(data));
}

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  const organizationId = await getOrgId();
  if (!organizationId) {
    return NextResponse.json({ error: 'No organization found' }, { status: 404 });
  }

  const parsed = productInputSchema.partial().safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const { sku, name, priceCents, stockQuantity, description } = parsed.data;
  const update: Record<string, unknown> = { updated_at: new Date().toISOString() };
  if (sku !== undefined) update.sku = sku;
  if (name !== undefined) update.name = name;
  if (priceCents !== undefined) update.price_cents = priceCents;
  if (stockQuantity !== undefined) update.stock_quantity = stockQuantity;
  if (description !== undefined) update.description = description;

  const supabaseAdmin = getSupabaseAdmin();
  const { data, error } = await supabaseAdmin
    .from('products')
    .update(update)
    .eq('organization_id', organizationId)
    .eq('id', params.id)
    .select('*')
    .maybeSingle();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  if (!data) {
    return NextResponse.json({ error: 'Product not found' }, { status: 404 });
  }

  return NextResponse.json(mapProductRow(data));
}

export async function DELETE(_request: Request, { params }: { params: { id: string } }) {
  const organizationId = await getOrgId();
  if (!organizationId) {
    return NextResponse.json({ error: 'No organization found' }, { status: 404 });
  }

  const supabaseAdmin = getSupabaseAdmin();
  const { error } = await supabaseAdmin
    .from('products')
    .delete()
    .eq('organization_id', organizationId)
    .eq('id', params.id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
