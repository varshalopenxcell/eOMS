'use client';

import { useQuery } from '@tanstack/react-query';
import { CreditCard } from 'lucide-react';
import { Card, CardBody, CardHeader } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import type { BadgeTone } from '@/components/ui/Badge';

async function fetchBilling() {
  const response = await fetch('/api/billing');
  if (!response.ok) {
    throw new Error('Unable to load billing configuration.');
  }
  return response.json();
}

const statusTone: Record<string, BadgeTone> = {
  active: 'success',
  trialing: 'primary',
  past_due: 'warning',
  cancelled: 'danger'
};

export function BillingPanel() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['billing'],
    queryFn: fetchBilling
  });

  if (isLoading) {
    return (
      <Card>
        <CardBody className="space-y-3 pt-5">
          <div className="h-3 w-16 animate-pulse rounded bg-surface-2" />
          <div className="h-6 w-32 animate-pulse rounded bg-surface-2" />
          <div className="h-3 w-40 animate-pulse rounded bg-surface-2" />
        </CardBody>
      </Card>
    );
  }

  if (error || !data) {
    return (
      <Card>
        <CardBody className="pt-5 text-sm text-danger-fg">Billing data is not available.</CardBody>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.08em] text-subtle">Billing</p>
          <h2 className="mt-1 text-base font-semibold text-fg">{data.currentPlan.name} plan</h2>
        </div>
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-soft text-brand">
          <CreditCard className="h-4 w-4" />
        </span>
      </CardHeader>
      <CardBody className="space-y-3 pt-0">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted">Payment status</span>
          <Badge tone={statusTone[data.paymentStatus] ?? 'neutral'}>{data.paymentStatus.replace('_', ' ')}</Badge>
        </div>
        <div className="flex items-center justify-between border-t border-line pt-3 text-sm text-muted">
          <span>Next billing date: {data.nextBillingDate}</span>
        </div>
      </CardBody>
    </Card>
  );
}
