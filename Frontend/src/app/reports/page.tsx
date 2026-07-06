import { FileText, FileSpreadsheet, Download, Clock, Plus, DollarSign, Boxes, Truck, Users } from 'lucide-react';
import { Shell } from '@/components/ui/Shell';
import { Card, CardBody, CardHeader } from '@/components/ui/Card';
import { Badge, type BadgeTone } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { StatCard } from '@/components/ui/StatCard';

const templates = [
  { name: 'Sales summary', description: 'Revenue, orders, and AOV by period', icon: DollarSign },
  { name: 'Inventory valuation', description: 'Stock on hand and cost basis', icon: Boxes },
  { name: 'Fulfillment SLA', description: 'Dispatch and delivery performance', icon: Truck },
  { name: 'Customer cohorts', description: 'Retention and lifetime value', icon: Users }
];

type ReportStatus = 'ready' | 'scheduled' | 'generating';

const recent: { name: string; type: string; format: 'PDF' | 'CSV'; generated: string; status: ReportStatus }[] = [
  { name: 'June Sales Summary', type: 'Sales', format: 'PDF', generated: 'Jul 1, 2026', status: 'ready' },
  { name: 'Q2 Inventory Valuation', type: 'Inventory', format: 'CSV', generated: 'Jul 1, 2026', status: 'ready' },
  { name: 'Weekly Fulfillment SLA', type: 'Fulfillment', format: 'PDF', generated: 'Jul 5, 2026', status: 'ready' },
  { name: 'July Tax Report', type: 'Finance', format: 'CSV', generated: 'Scheduled Aug 1', status: 'scheduled' },
  { name: 'Customer Cohorts H1', type: 'Customers', format: 'PDF', generated: 'In progress', status: 'generating' }
];

const statusMeta: Record<ReportStatus, { label: string; tone: BadgeTone }> = {
  ready: { label: 'Ready', tone: 'success' },
  scheduled: { label: 'Scheduled', tone: 'info' },
  generating: { label: 'Generating', tone: 'warning' }
};

export default function ReportsPage() {
  return (
    <Shell
      title="Reports"
      description="Generate, schedule, and export operational and financial reports."
      toolbar={
        <Button size="md">
          <Plus className="h-4 w-4" />
          Generate report
        </Button>
      }
    >
      <div className="mb-4 grid grid-cols-2 gap-4 xl:grid-cols-4">
        <StatCard icon={FileText} label="Reports generated" value="342" delta="+24" hint="this month" tone="brand" />
        <StatCard icon={Clock} label="Scheduled" value="12" hint="recurring" tone="info" />
        <StatCard icon={Download} label="Exports (30d)" value="1,088" delta="+11%" hint="CSV + PDF" tone="success" />
        <StatCard icon={FileSpreadsheet} label="Templates" value="18" hint="available" tone="violet" />
      </div>

      <div className="mb-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {templates.map((t) => {
          const Icon = t.icon;
          return (
            <Card key={t.name} interactive>
              <CardBody className="pt-5">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-soft text-brand">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 text-sm font-semibold text-fg">{t.name}</h3>
                <p className="mt-1 text-xs leading-relaxed text-muted">{t.description}</p>
                <Button variant="outline" size="sm" className="mt-4 w-full">
                  Generate
                </Button>
              </CardBody>
            </Card>
          );
        })}
      </div>

      <Card>
        <CardHeader>
          <h2 className="text-base font-semibold text-fg">Recent reports</h2>
        </CardHeader>
        <CardBody className="pt-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-line text-xs font-semibold uppercase tracking-[0.06em] text-faint">
                  <th className="pb-3 pr-4">Report</th>
                  <th className="pb-3 pr-4">Type</th>
                  <th className="pb-3 pr-4">Format</th>
                  <th className="pb-3 pr-4">Generated</th>
                  <th className="pb-3 pr-4">Status</th>
                  <th className="pb-3 pr-4"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {recent.map((r) => (
                  <tr key={r.name}>
                    <td className="py-3 pr-4 font-medium text-fg">{r.name}</td>
                    <td className="py-3 pr-4 text-muted">{r.type}</td>
                    <td className="py-3 pr-4">
                      <Badge tone="neutral">{r.format}</Badge>
                    </td>
                    <td className="py-3 pr-4 text-subtle">{r.generated}</td>
                    <td className="py-3 pr-4">
                      <Badge tone={statusMeta[r.status].tone}>{statusMeta[r.status].label}</Badge>
                    </td>
                    <td className="py-3 pr-4">
                      {r.status === 'ready' ? (
                        <button className="inline-flex items-center gap-1.5 text-xs font-medium text-brand hover:text-brand-strong">
                          <Download className="h-3.5 w-3.5" />
                          Download
                        </button>
                      ) : (
                        <span className="text-xs text-faint">—</span>
                      )}
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
