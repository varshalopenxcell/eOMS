import { NextResponse } from 'next/server';
import { getAuthedUser } from '@/lib/supabase/server';
import { getSupabaseAdmin, resolveOrganizationId } from '@/lib/supabase/admin';
import { productInputSchema } from '@/schemas/product';
import { mapProductRow, toProductRow } from './mapper';

export const dynamic = 'force-dynamic';

export async function GET() {
  const user = await getAuthedUser();
  const organizationId = await resolveOrganizationId(user?.id);
  if (!organizationId) {
    return NextResponse.json({ error: 'No organization found' }, { status: 404 });
  }

  const supabaseAdmin = getSupabaseAdmin();
  const { data, error } = await supabaseAdmin
    .from('products')
    .select('*')
    .eq('organization_id', organizationId)
    .order('created_at', { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json((data ?? []).map(mapProductRow));
}

export async function POST(request: Request) {
  const user = await getAuthedUser();
  const organizationId = await resolveOrganizationId(user?.id);
  if (!organizationId) {
    return NextResponse.json({ error: 'No organization found' }, { status: 404 });
  }

  const parsed = productInputSchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const supabaseAdmin = getSupabaseAdmin();
  const { data, error } = await supabaseAdmin
    .from('products')
    .insert({ organization_id: organizationId, ...toProductRow(parsed.data) })
    .select('*')
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(mapProductRow(data), { status: 201 });
}
