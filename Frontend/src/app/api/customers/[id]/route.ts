import { NextResponse } from 'next/server';
import { getAuthedUser } from '@/lib/supabase/server';
import { getSupabaseAdmin, resolveOrganizationId } from '@/lib/supabase/admin';
import { customerInputSchema } from '@/schemas/customer';
import { mapCustomerRow } from '../mapper';

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
    .from('customers')
    .select('*')
    .eq('organization_id', organizationId)
    .eq('id', params.id)
    .maybeSingle();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  if (!data) {
    return NextResponse.json({ error: 'Customer not found' }, { status: 404 });
  }

  return NextResponse.json(mapCustomerRow(data));
}

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  const organizationId = await getOrgId();
  if (!organizationId) {
    return NextResponse.json({ error: 'No organization found' }, { status: 404 });
  }

  const parsed = customerInputSchema.partial().safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const supabaseAdmin = getSupabaseAdmin();
  const { data, error } = await supabaseAdmin
    .from('customers')
    .update({ ...parsed.data, updated_at: new Date().toISOString() })
    .eq('organization_id', organizationId)
    .eq('id', params.id)
    .select('*')
    .maybeSingle();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  if (!data) {
    return NextResponse.json({ error: 'Customer not found' }, { status: 404 });
  }

  return NextResponse.json(mapCustomerRow(data));
}

export async function DELETE(_request: Request, { params }: { params: { id: string } }) {
  const organizationId = await getOrgId();
  if (!organizationId) {
    return NextResponse.json({ error: 'No organization found' }, { status: 404 });
  }

  const supabaseAdmin = getSupabaseAdmin();
  const { error } = await supabaseAdmin
    .from('customers')
    .delete()
    .eq('organization_id', organizationId)
    .eq('id', params.id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
