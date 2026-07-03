import { z } from 'zod';

export const billingSchema = z.object({
  currentPlan: z.object({
    name: z.string(),
    tier: z.string(),
    price: z.number(),
    currency: z.string()
  }),
  nextBillingDate: z.string(),
  paymentStatus: z.enum(['active', 'past_due', 'cancelled', 'trialing'])
});

export type Billing = z.infer<typeof billingSchema>;
