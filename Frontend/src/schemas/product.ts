import { z } from 'zod';

export const productInputSchema = z.object({
  sku: z.string().min(1, 'SKU is required'),
  name: z.string().min(1, 'Name is required'),
  priceCents: z.number().int().nonnegative(),
  stockQuantity: z.number().int().nonnegative(),
  description: z.string().optional().default('')
});

export type ProductInput = z.infer<typeof productInputSchema>;

export const productSchema = productInputSchema.extend({
  id: z.string(),
  createdAt: z.string()
});

export type Product = z.infer<typeof productSchema>;
