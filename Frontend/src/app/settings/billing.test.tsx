import { render, screen } from '@testing-library/react';
import { describe, it, vi } from 'vitest';
import { BillingPanel } from './billing';

vi.stubGlobal('fetch', vi.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({
      currentPlan: { name: 'Growth', tier: 'growth', price: 19900, currency: 'USD' },
      nextBillingDate: '2026-08-01',
      paymentStatus: 'active'
    })
  }) as unknown as Response
));

describe('BillingPanel', () => {
  it('renders billing details after fetch', async () => {
    render(<BillingPanel />);

    expect(await screen.findByText('Growth plan')).toBeInTheDocument();
    expect(screen.getByText('Next billing date: 2026-08-01')).toBeInTheDocument();
  });
});
