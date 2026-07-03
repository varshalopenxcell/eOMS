import { describe, expect, it } from 'vitest';
import { isFeatureEnabled } from '../services/featureFlags';

describe('featureFlags', () => {
  it('returns true when feature is enabled', () => {
    const flags = [
      { key: 'advanced_order_workflow', enabled: true },
      { key: 'warehouse_management', enabled: false }
    ];

    expect(isFeatureEnabled(flags, 'advanced_order_workflow')).toBe(true);
    expect(isFeatureEnabled(flags, 'warehouse_management')).toBe(false);
  });
});
