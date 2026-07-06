'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Plus, Search, Users } from 'lucide-react';
import { Shell } from '@/components/ui/Shell';
import { Card, CardBody } from '@/components/ui/Card';
import { EmptyState } from '@/components/ui/EmptyState';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { CustomerForm } from '@/components/customers/CustomerForm';
import { useCustomersStore } from '@/stores/customersStore';
import { formatDate } from '@/lib/utils';

export default function CustomersPage() {
  const customers = useCustomersStore((state) => state.customers);
  const addCustomer = useCustomersStore((state) => state.addCustomer);
  const [modalOpen, setModalOpen] = useState(false);
  const [query, setQuery] = useState('');

  const q = query.trim().toLowerCase();
  const filtered = customers.filter((customer) => {
    if (!q) return true;
    return (
      customer.name.toLowerCase().includes(q) ||
      customer.email.toLowerCase().includes(q) ||
      (customer.company ?? '').toLowerCase().includes(q)
    );
  });

  const addButton = (
    <Button size="sm" onClick={() => setModalOpen(true)}>
      <Plus className="h-4 w-4" />
      Add customer
    </Button>
  );

  return (
    <Shell
      title="Customers"
      description="A unified directory of every buyer across your organization."
      actions={addButton}
    >
      <Card>
        <CardBody className="pt-5">
          {customers.length === 0 ? (
            <EmptyState
              icon={Users}
              title="No customers yet"
              description="Customer profiles, order history, and lifetime value will show up here as soon as your first order comes in."
              action={
                <Button variant="outline" size="sm" onClick={() => setModalOpen(true)}>
                  <Plus className="h-4 w-4" />
                  Add your first customer
                </Button>
              }
            />
          ) : (
            <>
              <div className="mb-4">
                <div className="relative">
                  <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-faint" />
                  <input
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Search by name, email, or company…"
                    className="w-full rounded-lg border border-line bg-field py-2 pl-9 pr-3 text-sm text-fg outline-none transition placeholder:text-faint focus:border-brand/60 focus:shadow-focus"
                  />
                </div>
              </div>

              <p className="mb-2 text-xs text-subtle">
                Showing {filtered.length} of {customers.length} customers
              </p>

              {filtered.length === 0 ? (
                <p className="rounded-lg border border-dashed border-line bg-surface-2 px-4 py-8 text-center text-sm text-muted">
                  No customers match your search.
                </p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead>
                      <tr className="border-b border-line text-xs font-semibold uppercase tracking-[0.06em] text-faint">
                        <th className="pb-3 pr-4">Name</th>
                        <th className="pb-3 pr-4">Email</th>
                        <th className="pb-3 pr-4">Company</th>
                        <th className="pb-3 pr-4">Added</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-line">
                      {filtered.map((customer) => (
                        <tr key={customer.id} className="group">
                          <td className="py-3 pr-4 font-medium text-fg">
                            <Link href={`/customers/${customer.id}`} className="hover:text-brand hover:underline">
                              {customer.name}
                            </Link>
                          </td>
                          <td className="py-3 pr-4 text-muted">{customer.email}</td>
                          <td className="py-3 pr-4 text-muted">{customer.company || '—'}</td>
                          <td className="py-3 pr-4 text-subtle">{formatDate(customer.createdAt)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </>
          )}
        </CardBody>
      </Card>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Add customer" description="Create a new customer profile.">
        <CustomerForm
          submitLabel="Add customer"
          onSubmit={(input) => {
            addCustomer(input);
            setModalOpen(false);
          }}
        />
      </Modal>
    </Shell>
  );
}
