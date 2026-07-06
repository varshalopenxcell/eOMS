import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '@/lib/api';
import type { Product, ProductInput } from '@/schemas/product';

const KEY = ['products'];

export function useProducts() {
  return useQuery({
    queryKey: KEY,
    queryFn: () => apiRequest<Product[]>('/api/products')
  });
}

export function useProduct(id: string | undefined) {
  return useQuery({
    queryKey: [...KEY, id],
    queryFn: () => apiRequest<Product>(`/api/products/${id}`),
    enabled: Boolean(id)
  });
}

export function useCreateProduct() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: ProductInput) =>
      apiRequest<Product>('/api/products', { method: 'POST', body: JSON.stringify(input) }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: KEY })
  });
}

export function useUpdateProduct(id: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: ProductInput) =>
      apiRequest<Product>(`/api/products/${id}`, { method: 'PATCH', body: JSON.stringify(input) }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: KEY });
      queryClient.invalidateQueries({ queryKey: [...KEY, id] });
    }
  });
}

export function useDeleteProduct() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => apiRequest(`/api/products/${id}`, { method: 'DELETE' }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: KEY })
  });
}
