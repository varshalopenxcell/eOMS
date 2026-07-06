import { NextResponse } from 'next/server';
import { getAuthedUser } from '@/lib/supabase/server';
import { getSupabaseAdmin, resolveOrganizationId } from '@/lib/supabase/admin';
import { customerInputSchema } from '@/schemas/customer';
import { mapCustomerRow } from './mapper';

// Reads per-request auth cookies and the database; never prerender at build time.
export const dynamic = 'force-dynamic';

export async function GET() {
  const user = await getAuthedUser();
  const organizationId = await resolveOrganizationId(user?.id);
  if (!organizationId) {
    return NextResponse.json({ error: 'No organization found' }, { status: 404 });
  }

  const supabaseAdmin = getSupabaseAdmin();
  const { data, error } = await supabaseAdmin
    .from('customers')
    .select('*')
    .eq('organization_id', organizationId)
    .order('created_at', { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json((data ?? []).map(mapCustomerRow));
}

export async function POST(request: Request) {
  const user = await getAuthedUser();
  const organizationId = await resolveOrganizationId(user?.id);
  if (!organizationId) {
    return NextResponse.json({ error: 'No organization found' }, { status: 404 });
  }

  const parsed = customerInputSchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const supabaseAdmin = getSupabaseAdmin();
  const { data, error } = await supabaseAdmin
    .from('customers')
    .insert({ organization_id: organizationId, ...parsed.data })
    .select('*')
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(mapCustomerRow(data), { status: 201 });
}
