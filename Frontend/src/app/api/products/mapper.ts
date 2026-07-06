import type { Product } from '@/schemas/product';

export type ProductRow = {
  id: number;
  sku: string;
  name: string;
  price_cents: number | null;
  stock_quantity: number | null;
  description: string | null;
  created_at: string;
};

/** Maps a database row to the camelCased shape the UI consumes. */
export function mapProductRow(row: ProductRow): Product {
  return {
    id: String(row.id),
    sku: row.sku,
    name: row.name,
    priceCents: row.price_cents ?? 0,
    stockQuantity: row.stock_quantity ?? 0,
    description: row.description ?? '',
    createdAt: row.created_at
  };
}

/** Maps a UI product input to database column names. */
export function toProductRow(input: {
  sku: string;
  name: string;
  priceCents: number;
  stockQuantity: number;
  description?: string;
}) {
  return {
    sku: input.sku,
    name: input.name,
    price_cents: input.priceCents,
    stock_quantity: input.stockQuantity,
    description: input.description ?? ''
  };
}
