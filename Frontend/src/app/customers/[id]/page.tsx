'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Mail, Phone, Building2, PackageSearch, Pencil, Trash2 } from 'lucide-react';
import { Shell } from '@/components/ui/Shell';
import { Card, CardBody, CardHeader } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { EmptyState } from '@/components/ui/EmptyState';
import { CustomerForm } from '@/components/customers/CustomerForm';
import { useCustomersStore } from '@/stores/customersStore';
import { useOrdersStore, orderStatusLabel, orderStatusTone, orderTotalCents } from '@/stores/ordersStore';
import { formatCents, formatDate } from '@/lib/utils';

export default function CustomerDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const customer = useCustomersStore((state) => state.customers.find((c) => c.id === params.id));
  const updateCustomer = useCustomersStore((state) => state.updateCustomer);
  const removeCustomer = useCustomersStore((state) => state.removeCustomer);
  const orders = useOrdersStore((state) => state.orders.filter((order) => order.customerId === params.id));
  const [editOpen, setEditOpen] = useState(false);

  if (!customer) {
    return (
      <Shell title="Customer not found">
        <Card>
          <CardBody className="pt-5">
            <EmptyState
              icon={PackageSearch}
              title="This customer no longer exists"
              description="It may have been deleted. Head back to the customer directory."
              action={
                <Link href="/customers">
                  <Button variant="outline" size="sm">
                    Back to customers
                  </Button>
                </Link>
              }
            />
          </CardBody>
        </Card>
      </Shell>
    );
  }

  function handleDelete() {
    if (!customer) return;
    if (window.confirm(`Delete ${customer.name}? This cannot be undone.`)) {
      removeCustomer(customer.id);
      router.push('/customers');
    }
  }

  return (
    <Shell
      title={customer.name}
      description={customer.company || customer.email}
      actions={
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => setEditOpen(true)}>
            <Pencil className="h-4 w-4" />
            Edit
          </Button>
          <Button variant="destructive" size="sm" onClick={handleDelete}>
            <Trash2 className="h-4 w-4" />
            Delete
          </Button>
        </div>
      }
    >
      <Link href="/customers" className="mb-2 inline-flex items-center gap-1.5 text-sm text-muted hover:text-fg">
        <ArrowLeft className="h-3.5 w-3.5" />
        Back to customers
      </Link>

      <div className="grid gap-4 xl:grid-cols-[1fr_1.4fr]">
        <Card>
          <CardHeader>
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-subtle">Profile</p>
          </CardHeader>
          <CardBody className="space-y-3 pt-0 text-sm">
            <div className="flex items-center gap-2.5 text-fg">
              <Mail className="h-4 w-4 text-faint" />
              {customer.email}
            </div>
            {customer.phone ? (
              <div className="flex items-center gap-2.5 text-fg">
                <Phone className="h-4 w-4 text-faint" />
                {customer.phone}
              </div>
            ) : null}
            {customer.company ? (
              <div className="flex items-center gap-2.5 text-fg">
                <Building2 className="h-4 w-4 text-faint" />
                {customer.company}
              </div>
            ) : null}
            <p className="pt-2 text-xs text-faint">Added {formatDate(customer.createdAt)}</p>
            {customer.notes ? <p className="rounded-lg bg-surface-2 p-3 text-sm text-muted">{customer.notes}</p> : null}
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.08em] text-subtle">Orders</p>
              <h2 className="mt-1 text-base font-semibold text-fg">Order history</h2>
            </div>
          </CardHeader>
          <CardBody className="pt-0">
            {orders.length === 0 ? (
              <p className="rounded-lg border border-dashed border-line bg-surface-2 px-4 py-6 text-center text-sm text-muted">
                No orders yet for this customer.
              </p>
            ) : (
              <div className="divide-y divide-line">
                {orders.map((order) => (
                  <Link
                    key={order.id}
                    href={`/orders/${order.id}`}
                    className="flex items-center justify-between gap-3 py-3 text-sm hover:bg-surface-2"
                  >
                    <div>
                      <p className="font-medium text-fg">Order #{order.id.slice(0, 8)}</p>
                      <p className="text-xs text-faint">{formatDate(order.createdAt)}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-medium tabular-nums text-fg">
                        {formatCents(orderTotalCents(order), order.currency)}
                      </span>
                      <Badge tone={orderStatusTone[order.status]}>{orderStatusLabel[order.status]}</Badge>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </CardBody>
        </Card>
      </div>

      <Modal open={editOpen} onClose={() => setEditOpen(false)} title="Edit customer">
        <CustomerForm
          initialValues={customer}
          submitLabel="Save changes"
          onSubmit={(input) => {
            updateCustomer(customer.id, input);
            setEditOpen(false);
          }}
        />
      </Modal>
    </Shell>
  );
}
