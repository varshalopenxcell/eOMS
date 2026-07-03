'use client';

import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, PackageSearch, Trash2 } from 'lucide-react';
import { Shell } from '@/components/ui/Shell';
import { Card, CardBody, CardHeader } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { SelectField } from '@/components/ui/Field';
import { EmptyState } from '@/components/ui/EmptyState';
import { useOrdersStore, orderStatusLabel, orderStatusTone, orderTotalCents, type OrderStatus } from '@/stores/ordersStore';
import { useCustomersStore } from '@/stores/customersStore';
import { formatCents, formatDate } from '@/lib/utils';

export default function OrderDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const order = useOrdersStore((state) => state.orders.find((o) => o.id === params.id));
  const updateOrderStatus = useOrdersStore((state) => state.updateOrderStatus);
  const removeOrder = useOrdersStore((state) => state.removeOrder);
  const customer = useCustomersStore((state) => state.customers.find((c) => c.id === order?.customerId));

  if (!order) {
    return (
      <Shell title="Order not found">
        <Card>
          <CardBody className="pt-5">
            <EmptyState
              icon={PackageSearch}
              title="This order no longer exists"
              description="It may have been deleted. Head back to the orders list."
              action={
                <Link href="/orders">
                  <Button variant="outline" size="sm">
                    Back to orders
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
    if (!order) return;
    if (window.confirm(`Delete order #${order.id.slice(0, 8)}? This cannot be undone.`)) {
      removeOrder(order.id);
      router.push('/orders');
    }
  }

  return (
    <Shell
      title={`Order #${order.id.slice(0, 8)}`}
      description={`Placed ${formatDate(order.createdAt)}`}
      actions={
        <Button variant="destructive" size="sm" onClick={handleDelete}>
          <Trash2 className="h-4 w-4" />
          Delete
        </Button>
      }
    >
      <Link href="/orders" className="mb-2 inline-flex items-center gap-1.5 text-sm text-muted hover:text-fg">
        <ArrowLeft className="h-3.5 w-3.5" />
        Back to orders
      </Link>

      <div className="grid gap-4 xl:grid-cols-[1fr_1.4fr]">
        <Card>
          <CardHeader>
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-subtle">Summary</p>
            <Badge tone={orderStatusTone[order.status]}>{orderStatusLabel[order.status]}</Badge>
          </CardHeader>
          <CardBody className="space-y-4 pt-0 text-sm">
            <div>
              <p className="text-xs text-faint">Customer</p>
              {customer ? (
                <Link href={`/customers/${customer.id}`} className="mt-1 block font-medium text-brand hover:underline">
                  {customer.name}
                </Link>
              ) : (
                <p className="mt-1 font-medium text-muted">Unknown customer</p>
              )}
            </div>
            <div>
              <p className="text-xs text-faint">Total</p>
              <p className="mt-1 text-lg font-semibold tabular-nums text-fg">
                {formatCents(orderTotalCents(order), order.currency)}
              </p>
            </div>
            <SelectField
              label="Update status"
              value={order.status}
              onChange={(event) => updateOrderStatus(order.id, event.target.value as OrderStatus)}
            >
              {Object.entries(orderStatusLabel).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </SelectField>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-subtle">Line items</p>
          </CardHeader>
          <CardBody className="pt-0">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-line text-xs font-semibold uppercase tracking-[0.06em] text-faint">
                    <th className="pb-3 pr-4">Item</th>
                    <th className="pb-3 pr-4">Qty</th>
                    <th className="pb-3 pr-4">Price</th>
                    <th className="pb-3 pr-4">Subtotal</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {order.items.map((item) => (
                    <tr key={item.id}>
                      <td className="py-3 pr-4 font-medium text-fg">{item.name}</td>
                      <td className="py-3 pr-4 text-muted">{item.quantity}</td>
                      <td className="py-3 pr-4 tabular-nums text-muted">{formatCents(item.priceCents, order.currency)}</td>
                      <td className="py-3 pr-4 tabular-nums font-medium text-fg">
                        {formatCents(item.priceCents * item.quantity, order.currency)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardBody>
        </Card>
      </div>
    </Shell>
  );
}
