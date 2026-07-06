import { NextResponse } from 'next/server';
import { featureFlagsSchema } from '@/schemas/featureFlags';
import { getAuthedUser } from '@/lib/supabase/server';

export async function GET() {
  const user = await getAuthedUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const result = featureFlagsSchema.parse({
    featureFlags: [
      { key: 'advanced_order_workflow', enabled: true, config: {} },
      { key: 'warehouse_management', enabled: false, config: {} }
    ]
  });

  return NextResponse.json(result);
}
