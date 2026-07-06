import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '@/lib/api';
import type { Customer, CustomerInput } from '@/schemas/customer';

const KEY = ['customers'];

export function useCustomers() {
  return useQuery({
    queryKey: KEY,
    queryFn: () => apiRequest<Customer[]>('/api/customers')
  });
}

export function useCustomer(id: string | undefined) {
  return useQuery({
    queryKey: [...KEY, id],
    queryFn: () => apiRequest<Customer>(`/api/customers/${id}`),
    enabled: Boolean(id)
  });
}

export function useCreateCustomer() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: CustomerInput) =>
      apiRequest<Customer>('/api/customers', { method: 'POST', body: JSON.stringify(input) }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: KEY })
  });
}

export function useUpdateCustomer(id: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: CustomerInput) =>
      apiRequest<Customer>(`/api/customers/${id}`, { method: 'PATCH', body: JSON.stringify(input) }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: KEY });
      queryClient.invalidateQueries({ queryKey: [...KEY, id] });
    }
  });
}

export function useDeleteCustomer() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => apiRequest(`/api/customers/${id}`, { method: 'DELETE' }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: KEY })
  });
}
