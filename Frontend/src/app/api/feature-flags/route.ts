import { NextResponse } from 'next/server';
import { featureFlagsSchema } from '@/schemas/featureFlags';
// AUTH TEMPORARILY DISABLED — re-import when re-enabling the guard below.
// import { getAuthedUser } from '@/lib/supabase/server';

export async function GET() {
  // AUTH TEMPORARILY DISABLED — 401 guard commented out so the app is
  // accessible without a session. Re-enable to restore auth gating.
  // const user = await getAuthedUser();
  // if (!user) {
  //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  // }

  const result = featureFlagsSchema.parse({
    featureFlags: [
      { key: 'advanced_order_workflow', enabled: true, config: {} },
      { key: 'warehouse_management', enabled: false, config: {} }
    ]
  });

  return NextResponse.json(result);
}
