import { Undo2, RefreshCcw, DollarSign, PackageCheck, Plus } from 'lucide-react';
import { Shell } from '@/components/ui/Shell';
import { Card, CardBody, CardHeader } from '@/components/ui/Card';
import { Badge, type BadgeTone } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { StatCard } from '@/components/ui/StatCard';

type ReturnStatus = 'requested' | 'approved' | 'received' | 'refunded' | 'rejected';

const returns: { rma: string; order: string; customer: string; reason: string; amount: string; status: ReturnStatus; date: string }[] = [
  { rma: 'RMA-2041', order: '#o1', customer: 'Ava Thompson', reason: 'Defective item', amount: '$178.00', status: 'refunded', date: 'Jul 2' },
  { rma: 'RMA-2042', order: '#o3', customer: 'Priya Sharma', reason: 'Wrong item shipped', amount: '$329.00', status: 'received', date: 'Jul 3' },
  { rma: 'RMA-2043', order: '#o6', customer: 'Sarah Kim', reason: 'No longer needed', amount: '$79.00', status: 'approved', date: 'Jul 4' },
  { rma: 'RMA-2044', order: '#o9', customer: 'Fatima Al-Sayed', reason: 'Damaged in transit', amount: '$133.50', status: 'requested', date: 'Jul 5' },
  { rma: 'RMA-2045', order: '#o11', customer: 'Priya Sharma', reason: 'Changed mind', amount: '$199.00', status: 'rejected', date: 'Jul 5' }
];

const statusMeta: Record<ReturnStatus, { label: string; tone: BadgeTone }> = {
  requested: { label: 'Requested', tone: 'neutral' },
  approved: { label: 'Approved', tone: 'primary' },
  received: { label: 'Received', tone: 'info' },
  refunded: { label: 'Refunded', tone: 'success' },
  rejected: { label: 'Rejected', tone: 'danger' }
};

export default function ReturnsPage() {
  return (
    <Shell
      title="Returns"
      description="Manage RMAs, refunds, and reverse logistics from a single queue."
      toolbar={
        <Button size="md">
          <Plus className="h-4 w-4" />
          Create return
        </Button>
      }
    >
      <div className="mb-4 grid grid-cols-2 gap-4 xl:grid-cols-4">
        <StatCard icon={Undo2} label="Open returns" value="38" delta="+5" trend="down" hint="vs last week" tone="warning" />
        <StatCard icon={RefreshCcw} label="Return rate" value="3.1%" delta="-0.4%" hint="of orders" tone="success" />
        <StatCard icon={DollarSign} label="Refunds issued" value="$12,480" hint="this month" tone="brand" />
        <StatCard icon={PackageCheck} label="Avg. resolution" value="2.3d" delta="-0.5d" hint="request to refund" tone="info" />
      </div>

      <Card>
        <CardHeader>
          <div>
            <h2 className="text-base font-semibold text-fg">Return requests</h2>
            <p className="mt-0.5 text-xs text-subtle">Reverse logistics queue</p>
          </div>
        </CardHeader>
        <CardBody className="pt-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-line text-xs font-semibold uppercase tracking-[0.06em] text-faint">
                  <th className="pb-3 pr-4">RMA</th>
                  <th className="pb-3 pr-4">Customer</th>
                  <th className="pb-3 pr-4">Reason</th>
                  <th className="pb-3 pr-4">Amount</th>
                  <th className="pb-3 pr-4">Requested</th>
                  <th className="pb-3 pr-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {returns.map((r) => (
                  <tr key={r.rma}>
                    <td className="py-3 pr-4">
                      <p className="font-mono text-xs font-medium text-fg">{r.rma}</p>
                      <p className="text-xs text-faint">Order {r.order}</p>
                    </td>
                    <td className="py-3 pr-4 font-medium text-fg">{r.customer}</td>
                    <td className="py-3 pr-4 text-muted">{r.reason}</td>
                    <td className="py-3 pr-4 tabular-nums text-muted">{r.amount}</td>
                    <td className="py-3 pr-4 text-subtle">{r.date}</td>
                    <td className="py-3 pr-4">
                      <Badge tone={statusMeta[r.status].tone}>{statusMeta[r.status].label}</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardBody>
      </Card>
    </Shell>
  );
}
