import type { Order, OrderItem, OrderStatus } from '@/schemas/order';

export type OrderRow = {
  id: number;
  customer_id: number | null;
  status: string;
  currency: string;
  items: OrderItem[] | null;
  total_amount_cents: number | null;
  created_at: string;
};

/** Maps a database row to the camelCased shape the UI consumes. */
export function mapOrderRow(row: OrderRow): Order {
  return {
    id: String(row.id),
    customerId: row.customer_id != null ? String(row.customer_id) : '',
    status: row.status as OrderStatus,
    currency: row.currency,
    items: Array.isArray(row.items) ? row.items : [],
    createdAt: row.created_at
  };
}

export function itemsTotalCents(items: { quantity: number; priceCents: number }[]) {
  return items.reduce((sum, item) => sum + item.priceCents * item.quantity, 0);
}
