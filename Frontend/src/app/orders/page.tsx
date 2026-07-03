'use client';

import { useState } from 'react';
import Link from 'next/link';
import { PackageSearch, Plus } from 'lucide-react';
import { Shell } from '@/components/ui/Shell';
import { Card, CardBody } from '@/components/ui/Card';
import { EmptyState } from '@/components/ui/EmptyState';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { OrderForm } from '@/components/orders/OrderForm';
import { useOrdersStore, orderStatusLabel, orderStatusTone, orderTotalCents } from '@/stores/ordersStore';
import { useCustomersStore } from '@/stores/customersStore';
import { formatCents, formatDate } from '@/lib/utils';

export default function OrdersPage() {
  const orders = useOrdersStore((state) => state.orders);
  const addOrder = useOrdersStore((state) => state.addOrder);
  const customers = useCustomersStore((state) => state.customers);
  const [modalOpen, setModalOpen] = useState(false);

  function customerName(customerId: string) {
    return customers.find((customer) => customer.id === customerId)?.name ?? 'Unknown customer';
  }

  return (
    <Shell
      title="Orders"
      description="Track fulfillment, payments, and order lifecycle across every channel."
      actions={
        <Button size="sm" onClick={() => setModalOpen(true)}>
          <Plus className="h-4 w-4" />
          Create order
        </Button>
      }
    >
      <Card>
        <CardBody className="pt-5">
          {orders.length === 0 ? (
            <EmptyState
              icon={PackageSearch}
              title="No orders yet"
              description="Once orders start flowing in from your storefront or integrations, they'll appear here with real-time fulfillment status."
              action={
                <Button variant="outline" size="sm" onClick={() => setModalOpen(true)}>
                  <Plus className="h-4 w-4" />
                  Create your first order
                </Button>
              }
            />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-line text-xs font-semibold uppercase tracking-[0.06em] text-faint">
                    <th className="pb-3 pr-4">Order</th>
                    <th className="pb-3 pr-4">Customer</th>
                    <th className="pb-3 pr-4">Status</th>
                    <th className="pb-3 pr-4">Total</th>
                    <th className="pb-3 pr-4">Created</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {orders.map((order) => (
                    <tr key={order.id}>
                      <td className="py-3 pr-4 font-medium text-fg">
                        <Link href={`/orders/${order.id}`} className="hover:text-brand hover:underline">
                          #{order.id.slice(0, 8)}
                        </Link>
                      </td>
                      <td className="py-3 pr-4 text-muted">{customerName(order.customerId)}</td>
                      <td className="py-3 pr-4">
                        <Badge tone={orderStatusTone[order.status]}>{orderStatusLabel[order.status]}</Badge>
                      </td>
                      <td className="py-3 pr-4 tabular-nums text-muted">
                        {formatCents(orderTotalCents(order), order.currency)}
                      </td>
                      <td className="py-3 pr-4 text-subtle">{formatDate(order.createdAt)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardBody>
      </Card>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Create order" description="Build a new order for a customer.">
        <OrderForm
          submitLabel="Create order"
          onSubmit={(input) => {
            addOrder(input);
            setModalOpen(false);
          }}
        />
      </Modal>
    </Shell>
  );
}
