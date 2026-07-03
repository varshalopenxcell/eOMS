'use client';

import { FormEvent, useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { SelectField } from '@/components/ui/Field';
import { Button } from '@/components/ui/Button';
import { useCustomersStore } from '@/stores/customersStore';
import { orderStatusLabel, type OrderInput, type OrderStatus } from '@/stores/ordersStore';

interface DraftItem {
  name: string;
  quantity: number;
  price: string;
}

interface OrderFormProps {
  onSubmit: (input: OrderInput) => void;
  submitLabel: string;
}

export function OrderForm({ onSubmit, submitLabel }: OrderFormProps) {
  const customers = useCustomersStore((state) => state.customers);
  const [customerId, setCustomerId] = useState(customers[0]?.id ?? '');
  const [status, setStatus] = useState<OrderStatus>('draft');
  const [items, setItems] = useState<DraftItem[]>([{ name: '', quantity: 1, price: '' }]);

  function updateItem(index: number, patch: Partial<DraftItem>) {
    setItems((prev) => prev.map((item, i) => (i === index ? { ...item, ...patch } : item)));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSubmit({
      customerId,
      status,
      currency: 'USD',
      items: items
        .filter((item) => item.name.trim().length > 0)
        .map((item) => ({
          name: item.name,
          quantity: Number(item.quantity) || 1,
          priceCents: Math.round(Number(item.price) * 100) || 0
        }))
    });
  }

  if (customers.length === 0) {
    return <p className="text-sm text-muted">Add a customer first before creating an order.</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <SelectField label="Customer" required value={customerId} onChange={(event) => setCustomerId(event.target.value)}>
          {customers.map((customer) => (
            <option key={customer.id} value={customer.id}>
              {customer.name}
            </option>
          ))}
        </SelectField>
        <SelectField label="Status" value={status} onChange={(event) => setStatus(event.target.value as OrderStatus)}>
          {Object.entries(orderStatusLabel).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </SelectField>
      </div>

      <div>
        <p className="text-sm font-medium text-fg">Items</p>
        <div className="mt-2 space-y-2">
          {items.map((item, index) => (
            <div key={index} className="flex items-end gap-2">
              <input
                value={item.name}
                onChange={(event) => updateItem(index, { name: event.target.value })}
                placeholder="Item name"
                className="flex-1 rounded-lg border border-line bg-field px-3 py-2 text-sm text-fg outline-none focus:border-brand/60 focus:shadow-focus"
              />
              <input
                type="number"
                min="1"
                value={item.quantity}
                onChange={(event) => updateItem(index, { quantity: Number(event.target.value) })}
                placeholder="Qty"
                className="w-20 rounded-lg border border-line bg-field px-3 py-2 text-sm text-fg outline-none focus:border-brand/60 focus:shadow-focus"
              />
              <input
                type="number"
                min="0"
                step="0.01"
                value={item.price}
                onChange={(event) => updateItem(index, { price: event.target.value })}
                placeholder="Price"
                className="w-24 rounded-lg border border-line bg-field px-3 py-2 text-sm text-fg outline-none focus:border-brand/60 focus:shadow-focus"
              />
              <button
                type="button"
                onClick={() => setItems((prev) => prev.filter((_, i) => i !== index))}
                disabled={items.length === 1}
                aria-label="Remove item"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-faint transition hover:bg-surface-2 hover:text-danger disabled:pointer-events-none disabled:opacity-40"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={() => setItems((prev) => [...prev, { name: '', quantity: 1, price: '' }])}
          className="mt-2 inline-flex items-center gap-1.5 text-sm font-medium text-brand hover:text-brand-strong"
        >
          <Plus className="h-3.5 w-3.5" />
          Add item
        </button>
      </div>

      <Button type="submit" className="w-full">
        {submitLabel}
      </Button>
    </form>
  );
}
