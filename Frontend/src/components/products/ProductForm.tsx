'use client';

import { FormEvent, useState } from 'react';
import { TextField, TextAreaField } from '@/components/ui/Field';
import { Button } from '@/components/ui/Button';
import type { ProductInput } from '@/stores/productsStore';

interface ProductFormProps {
  initialValues?: ProductInput;
  submitLabel: string;
  onSubmit: (input: ProductInput) => void;
}

const emptyValues: ProductInput = { sku: '', name: '', priceCents: 0, stockQuantity: 0, description: '' };

export function ProductForm({ initialValues = emptyValues, submitLabel, onSubmit }: ProductFormProps) {
  const [values, setValues] = useState({
    ...initialValues,
    price: (initialValues.priceCents / 100).toFixed(2)
  });

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSubmit({
      sku: values.sku,
      name: values.name,
      description: values.description,
      stockQuantity: Number(values.stockQuantity) || 0,
      priceCents: Math.round(Number(values.price) * 100) || 0
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <TextField
          label="Product name"
          required
          value={values.name}
          onChange={(event) => setValues((prev) => ({ ...prev, name: event.target.value }))}
          placeholder="Wireless Keyboard"
        />
        <TextField
          label="SKU"
          required
          value={values.sku}
          onChange={(event) => setValues((prev) => ({ ...prev, sku: event.target.value }))}
          placeholder="SKU-1042"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <TextField
          label="Price (USD)"
          type="number"
          min="0"
          step="0.01"
          required
          value={values.price}
          onChange={(event) => setValues((prev) => ({ ...prev, price: event.target.value }))}
          placeholder="49.99"
        />
        <TextField
          label="Stock quantity"
          type="number"
          min="0"
          step="1"
          required
          value={values.stockQuantity}
          onChange={(event) => setValues((prev) => ({ ...prev, stockQuantity: Number(event.target.value) }))}
          placeholder="120"
        />
      </div>
      <TextAreaField
        label="Description"
        rows={3}
        value={values.description}
        onChange={(event) => setValues((prev) => ({ ...prev, description: event.target.value }))}
        placeholder="Optional product description"
      />
      <Button type="submit" className="w-full">
        {submitLabel}
      </Button>
    </form>
  );
}
