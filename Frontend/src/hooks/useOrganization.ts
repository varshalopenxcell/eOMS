import { useQuery } from '@tanstack/react-query';

async function fetchOrganization() {
  const response = await fetch('/api/organization');
  if (!response.ok) {
    throw new Error('Failed to fetch organization');
  }
  return response.json();
}

export function useOrganization() {
  return useQuery({
    queryKey: ['organization'],
    queryFn: fetchOrganization,
    staleTime: 1000 * 60 * 2
  });
}
