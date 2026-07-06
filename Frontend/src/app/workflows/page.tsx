import { Workflow, Zap, CheckCircle2, Activity, Plus } from 'lucide-react';
import { Shell } from '@/components/ui/Shell';
import { Card, CardBody, CardHeader } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { StatCard } from '@/components/ui/StatCard';

const workflows = [
  { name: 'Auto-route by region', trigger: 'Order created', action: 'Assign nearest warehouse', runs: 4210, success: 99.4, enabled: true },
  { name: 'High-value order review', trigger: 'Order > $1,000', action: 'Flag for manual approval', runs: 182, success: 100, enabled: true },
  { name: 'Low-stock reorder alert', trigger: 'Stock < reorder point', action: 'Notify purchasing team', runs: 640, success: 98.1, enabled: true },
  { name: 'Abandoned cart follow-up', trigger: 'Cart idle 24h', action: 'Send email reminder', runs: 2890, success: 96.7, enabled: false },
  { name: 'Delivery delay notice', trigger: 'Shipment exception', action: 'Notify customer + CX', runs: 74, success: 100, enabled: true }
];

export default function WorkflowsPage() {
  return (
    <Shell
      title="Workflows"
      description="Automate order routing, notifications, and fulfillment steps."
      toolbar={
        <Button size="md">
          <Plus className="h-4 w-4" />
          New workflow
        </Button>
      }
    >
      <div className="mb-4 grid grid-cols-2 gap-4 xl:grid-cols-4">
        <StatCard icon={Workflow} label="Active workflows" value="14" hint="4 paused" tone="brand" />
        <StatCard icon={Zap} label="Runs this month" value="12,840" delta="+7.5%" hint="vs last month" tone="violet" />
        <StatCard icon={CheckCircle2} label="Success rate" value="98.6%" delta="+0.3%" hint="last 30 days" tone="success" />
        <StatCard icon={Activity} label="Time saved" value="312h" delta="+40h" hint="est. this month" tone="info" />
      </div>

      <Card>
        <CardHeader>
          <h2 className="text-base font-semibold text-fg">Automations</h2>
        </CardHeader>
        <CardBody className="pt-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-line text-xs font-semibold uppercase tracking-[0.06em] text-faint">
                  <th className="pb-3 pr-4">Workflow</th>
                  <th className="pb-3 pr-4">Trigger</th>
                  <th className="pb-3 pr-4">Action</th>
                  <th className="pb-3 pr-4">Runs</th>
                  <th className="pb-3 pr-4">Success</th>
                  <th className="pb-3 pr-4">State</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {workflows.map((w) => (
                  <tr key={w.name}>
                    <td className="py-3 pr-4 font-medium text-fg">{w.name}</td>
                    <td className="py-3 pr-4">
                      <Badge tone="primary">{w.trigger}</Badge>
                    </td>
                    <td className="py-3 pr-4 text-muted">{w.action}</td>
                    <td className="py-3 pr-4 tabular-nums text-muted">{w.runs.toLocaleString()}</td>
                    <td className="py-3 pr-4 tabular-nums text-muted">{w.success}%</td>
                    <td className="py-3 pr-4">
                      <Badge tone={w.enabled ? 'success' : 'neutral'} dot>
                        {w.enabled ? 'Active' : 'Paused'}
                      </Badge>
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
