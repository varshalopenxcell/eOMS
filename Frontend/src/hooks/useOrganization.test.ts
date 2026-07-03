import { renderHook } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { useOrganization } from './useOrganization';

vi.stubGlobal('fetch', vi.fn(() =>
  Promise.resolve({ ok: true, json: () => Promise.resolve({ id: 1, name: 'Acme Commerce' }) }) as unknown as Response
));

describe('useOrganization', () => {
  it('fetches organization data', async () => {
    const { result, waitFor } = renderHook(() => useOrganization());

    await waitFor(() => result.current.isSuccess);

    expect(result.current.data).toEqual({ id: 1, name: 'Acme Commerce' });
  });
});
