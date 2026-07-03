import { render, screen } from '@testing-library/react';
import { describe, it, vi } from 'vitest';
import { Shell } from './Shell';

vi.mock('@/hooks/useOrganization', () => ({
  useOrganization: () => ({ data: { name: 'Acme Commerce', plan: { name: 'Growth', tier: 'growth' } }, isLoading: false })
}));

describe('Shell', () => {
  it('renders navigation and organization metadata', () => {
    render(
      <Shell>
        <div>Test content</div>
      </Shell>
    );

    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Acme Commerce')).toBeInTheDocument();
    expect(screen.getByText('Growth plan')).toBeInTheDocument();
    expect(screen.getByText('Test content')).toBeInTheDocument();
  });
});
