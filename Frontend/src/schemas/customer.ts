import { z } from 'zod';

export const customerInputSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('A valid email is required'),
  phone: z.string().optional().default(''),
  company: z.string().optional().default(''),
  notes: z.string().optional().default('')
});

export type CustomerInput = z.infer<typeof customerInputSchema>;

export const customerSchema = customerInputSchema.extend({
  id: z.string(),
  createdAt: z.string()
});

export type Customer = z.infer<typeof customerSchema>;
