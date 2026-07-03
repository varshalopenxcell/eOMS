'use client';

import { FormEvent, useState } from 'react';
import { TextField, TextAreaField } from '@/components/ui/Field';
import { Button } from '@/components/ui/Button';
import type { CustomerInput } from '@/stores/customersStore';

interface CustomerFormProps {
  initialValues?: CustomerInput;
  submitLabel: string;
  onSubmit: (input: CustomerInput) => void;
}

const emptyValues: CustomerInput = { name: '', email: '', phone: '', company: '', notes: '' };

export function CustomerForm({ initialValues = emptyValues, submitLabel, onSubmit }: CustomerFormProps) {
  const [values, setValues] = useState<CustomerInput>(initialValues);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSubmit(values);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <TextField
        label="Full name"
        required
        value={values.name}
        onChange={(event) => setValues((prev) => ({ ...prev, name: event.target.value }))}
        placeholder="Jordan Lee"
      />
      <TextField
        label="Email"
        type="email"
        required
        value={values.email}
        onChange={(event) => setValues((prev) => ({ ...prev, email: event.target.value }))}
        placeholder="jordan@company.com"
      />
      <div className="grid grid-cols-2 gap-4">
        <TextField
          label="Phone"
          value={values.phone}
          onChange={(event) => setValues((prev) => ({ ...prev, phone: event.target.value }))}
          placeholder="+1 555 010 2200"
        />
        <TextField
          label="Company"
          value={values.company}
          onChange={(event) => setValues((prev) => ({ ...prev, company: event.target.value }))}
          placeholder="Acme Inc."
        />
      </div>
      <TextAreaField
        label="Notes"
        rows={3}
        value={values.notes}
        onChange={(event) => setValues((prev) => ({ ...prev, notes: event.target.value }))}
        placeholder="Optional context about this customer"
      />
      <Button type="submit" className="w-full">
        {submitLabel}
      </Button>
    </form>
  );
}
