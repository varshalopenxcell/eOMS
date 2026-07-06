import { z } from 'zod';

export const orderStatusSchema = z.enum(['draft', 'processing', 'fulfilled', 'cancelled']);
export type OrderStatus = z.infer<typeof orderStatusSchema>;

export const orderItemInputSchema = z.object({
  name: z.string().min(1),
  quantity: z.number().int().positive(),
  priceCents: z.number().int().nonnegative()
});

export const orderInputSchema = z.object({
  customerId: z.string().min(1, 'Customer is required'),
  status: orderStatusSchema.default('draft'),
  currency: z.string().default('USD'),
  items: z.array(orderItemInputSchema)
});

export type OrderInput = z.infer<typeof orderInputSchema>;

// Partial update — the order detail page only mutates status today.
export const orderUpdateSchema = z.object({
  status: orderStatusSchema.optional(),
  customerId: z.string().min(1).optional(),
  currency: z.string().optional(),
  items: z.array(orderItemInputSchema).optional()
});

export type OrderUpdate = z.infer<typeof orderUpdateSchema>;

export const orderItemSchema = orderItemInputSchema.extend({ id: z.string() });
export type OrderItem = z.infer<typeof orderItemSchema>;

export const orderSchema = z.object({
  id: z.string(),
  customerId: z.string(),
  status: orderStatusSchema,
  currency: z.string(),
  items: z.array(orderItemSchema),
  createdAt: z.string()
});

export type Order = z.infer<typeof orderSchema>;
