import { NextResponse } from 'next/server';
import { featureFlagsSchema } from '@/schemas/featureFlags';

export async function GET() {
  const result = featureFlagsSchema.parse({
    featureFlags: [
      { key: 'advanced_order_workflow', enabled: true, config: {} },
      { key: 'warehouse_management', enabled: false, config: {} }
    ]
  });

  return NextResponse.json(result);
}
