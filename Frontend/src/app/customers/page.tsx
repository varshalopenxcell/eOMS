'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Plus, Users } from 'lucide-react';
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
                  {customers.map((customer) => (
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
