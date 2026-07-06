import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '@/lib/api';
import type { Order, OrderInput, OrderStatus } from '@/schemas/order';

const KEY = ['orders'];

export function useOrders() {
  return useQuery({
    queryKey: KEY,
    queryFn: () => apiRequest<Order[]>('/api/orders')
  });
}

export function useOrder(id: string | undefined) {
  return useQuery({
    queryKey: [...KEY, id],
    queryFn: () => apiRequest<Order>(`/api/orders/${id}`),
    enabled: Boolean(id)
  });
}

export function useCreateOrder() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: OrderInput) =>
      apiRequest<Order>('/api/orders', { method: 'POST', body: JSON.stringify(input) }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: KEY })
  });
}

export function useUpdateOrderStatus() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: OrderStatus }) =>
      apiRequest<Order>(`/api/orders/${id}`, { method: 'PATCH', body: JSON.stringify({ status }) }),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: KEY });
      queryClient.invalidateQueries({ queryKey: [...KEY, variables.id] });
    }
  });
}

export function useDeleteOrder() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => apiRequest(`/api/orders/${id}`, { method: 'DELETE' }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: KEY })
  });
}
