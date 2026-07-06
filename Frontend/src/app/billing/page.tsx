import { CreditCard, Download, Receipt, Wallet, Calendar, TrendingUp } from 'lucide-react';
import { Shell } from '@/components/ui/Shell';
import { Card, CardBody, CardHeader } from '@/components/ui/Card';
import { Badge, type BadgeTone } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { StatCard } from '@/components/ui/StatCard';
import { BillingPanel } from '../settings/billing';

type InvoiceStatus = 'paid' | 'due' | 'refunded';

const invoices: { id: string; date: string; description: string; amount: string; status: InvoiceStatus }[] = [
  { id: 'INV-2026-007', date: 'Jul 1, 2026', description: 'Growth plan — monthly', amount: '$299.00', status: 'due' },
  { id: 'INV-2026-006', date: 'Jun 1, 2026', description: 'Growth plan — monthly', amount: '$299.00', status: 'paid' },
  { id: 'INV-2026-005', date: 'May 1, 2026', description: 'Growth plan — monthly', amount: '$299.00', status: 'paid' },
  { id: 'INV-2026-004', date: 'Apr 1, 2026', description: 'Growth plan — monthly', amount: '$299.00', status: 'paid' },
  { id: 'INV-2026-003', date: 'Mar 1, 2026', description: 'Growth plan + overage', amount: '$341.50', status: 'paid' },
  { id: 'INV-2026-002', date: 'Feb 1, 2026', description: 'Growth plan — monthly', amount: '$299.00', status: 'paid' },
  { id: 'INV-2026-001', date: 'Jan 12, 2026', description: 'Proration credit', amount: '−$42.00', status: 'refunded' }
];

const invoiceStatusMeta: Record<InvoiceStatus, { label: string; tone: BadgeTone }> = {
  paid: { label: 'Paid', tone: 'success' },
  due: { label: 'Due', tone: 'warning' },
  refunded: { label: 'Refunded', tone: 'neutral' }
};

const usage = [
  { label: 'Orders', used: 8420, limit: 15000 },
  { label: 'API requests', used: 612000, limit: 1000000 },
  { label: 'Team seats', used: 21, limit: 25 }
];

function usagePct(used: number, limit: number) {
  return Math.min(100, Math.round((used / limit) * 100));
}

export default function BillingPage() {
  return (
    <Shell
      breadcrumbs={[{ label: 'Billing' }]}
      title="Billing"
      description="Manage your plan, payment method, and invoices."
      toolbar={
        <Button variant="outline" size="md">
          <CreditCard className="h-4 w-4" />
          Manage payment method
        </Button>
      }
    >
      <div className="mb-5 grid grid-cols-2 gap-4 xl:grid-cols-4">
        <StatCard icon={Wallet} label="Amount due" value="$299.00" hint="Due Jul 15, 2026" tone="warning" />
        <StatCard icon={Calendar} label="Next payment" value="Aug 1" hint="auto-charged" tone="brand" />
        <StatCard icon={TrendingUp} label="Lifetime spend" value="$4,218" delta="+$299" hint="this month" tone="success" />
        <StatCard icon={CreditCard} label="Payment method" value="•••• 4242" hint="Visa · exp 08/28" tone="info" />
      </div>

      <div className="grid gap-5 xl:grid-cols-[0.9fr_1.4fr]">
        <div className="animate-fade-up space-y-5">
          <BillingPanel />

          {/* Payment method */}
          <Card>
            <CardHeader>
              <h2 className="text-base font-semibold text-fg">Payment method</h2>
            </CardHeader>
            <CardBody className="pt-0">
              <div className="flex items-center gap-3 rounded-xl border border-line bg-surface-2 p-3.5">
                <span className="flex h-10 w-14 items-center justify-center rounded-lg bg-brand-gradient text-xs font-bold tracking-wide text-white">
                  VISA
                </span>
                <div className="flex-1">
                  <p className="text-sm font-medium text-fg">Visa ending in 4242</p>
                  <p className="text-xs text-subtle">Expires 08/28</p>
                </div>
                <Badge tone="success" dot>
                  Active
                </Badge>
              </div>
            </CardBody>
          </Card>

          {/* Usage this cycle */}
          <Card>
            <CardHeader>
              <div>
                <h2 className="text-base font-semibold text-fg">Usage this cycle</h2>
                <p className="mt-0.5 text-xs text-subtle">Resets Aug 1, 2026</p>
              </div>
            </CardHeader>
            <CardBody className="space-y-4 pt-0">
              {usage.map((u) => {
                const pct = usagePct(u.used, u.limit);
                return (
                  <div key={u.label}>
                    <div className="mb-1 flex items-center justify-between text-sm">
                      <span className="text-muted">{u.label}</span>
                      <span className="text-xs tabular-nums text-subtle">
                        {u.used.toLocaleString()} / {u.limit.toLocaleString()}
                      </span>
                    </div>
                    <div className="h-1.5 overflow-hidden rounded-full bg-surface-2">
                      <div
                        className={`h-full rounded-full ${pct >= 90 ? 'bg-danger' : pct >= 75 ? 'bg-warning' : 'bg-brand-gradient'}`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </CardBody>
          </Card>
        </div>

        {/* Invoices */}
        <Card className="animate-fade-up" style={{ animationDelay: '80ms' }}>
          <CardHeader>
            <div>
              <h2 className="text-base font-semibold text-fg">Invoices</h2>
              <p className="mt-0.5 text-xs text-subtle">Download receipts for your records</p>
            </div>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4" />
              Export all
            </Button>
          </CardHeader>
          <CardBody className="pt-0">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-line text-xs font-semibold uppercase tracking-[0.06em] text-faint">
                    <th className="pb-3 pr-4">Invoice</th>
                    <th className="pb-3 pr-4">Date</th>
                    <th className="pb-3 pr-4">Amount</th>
                    <th className="pb-3 pr-4">Status</th>
                    <th className="pb-3 pr-4"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {invoices.map((invoice) => (
                    <tr key={invoice.id}>
                      <td className="py-3 pr-4">
                        <p className="flex items-center gap-2 font-medium text-fg">
                          <Receipt className="h-4 w-4 text-faint" />
                          {invoice.id}
                        </p>
                        <p className="pl-6 text-xs text-faint">{invoice.description}</p>
                      </td>
                      <td className="py-3 pr-4 text-muted">{invoice.date}</td>
                      <td className="py-3 pr-4 tabular-nums font-medium text-fg">{invoice.amount}</td>
                      <td className="py-3 pr-4">
                        <Badge tone={invoiceStatusMeta[invoice.status].tone}>
                          {invoiceStatusMeta[invoice.status].label}
                        </Badge>
                      </td>
                      <td className="py-3 pr-4">
                        <button className="inline-flex items-center gap-1.5 text-xs font-medium text-brand hover:text-brand-strong">
                          <Download className="h-3.5 w-3.5" />
                          PDF
                        </button>
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
