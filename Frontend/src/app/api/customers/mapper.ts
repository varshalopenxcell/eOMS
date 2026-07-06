import type { Customer } from '@/schemas/customer';

export type CustomerRow = {
  id: number;
  name: string | null;
  email: string | null;
  phone: string | null;
  company: string | null;
  notes: string | null;
  created_at: string;
};

/** Maps a database row to the camelCased shape the UI consumes. */
export function mapCustomerRow(row: CustomerRow): Customer {
  return {
    id: String(row.id),
    name: row.name ?? '',
    email: row.email ?? '',
    phone: row.phone ?? '',
    company: row.company ?? '',
    notes: row.notes ?? '',
    createdAt: row.created_at
  };
}
