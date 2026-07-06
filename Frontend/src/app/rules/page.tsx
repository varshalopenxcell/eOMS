import { SlidersHorizontal, ShieldAlert, Percent, Scale, Plus } from 'lucide-react';
import { Shell } from '@/components/ui/Shell';
import { Card, CardBody, CardHeader } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { StatCard } from '@/components/ui/StatCard';

const categoryTone = {
  Pricing: 'primary',
  Fraud: 'danger',
  Tax: 'info',
  Inventory: 'warning'
} as const;

type Category = keyof typeof categoryTone;

const rules: { name: string; category: Category; condition: string; action: string; enabled: boolean }[] = [
  { name: 'Volume discount tier', category: 'Pricing', condition: 'Quantity ≥ 50', action: 'Apply 10% discount', enabled: true },
  { name: 'High-risk fraud screen', category: 'Fraud', condition: 'Risk score > 80', action: 'Hold + manual review', enabled: true },
  { name: 'EU VAT handling', category: 'Tax', condition: 'Ship-to in EU', action: 'Add 20% VAT', enabled: true },
  { name: 'Backorder allocation', category: 'Inventory', condition: 'Stock = 0', action: 'Allow backorder (max 30d)', enabled: false },
  { name: 'First-order coupon', category: 'Pricing', condition: 'Customer orders = 0', action: 'Apply WELCOME15', enabled: true },
  { name: 'Address mismatch flag', category: 'Fraud', condition: 'Billing ≠ shipping country', action: 'Require verification', enabled: false }
];

export default function RulesPage() {
  return (
    <Shell
      title="Rules"
      description="Conditional business rules for pricing, tax, fraud, and inventory."
      toolbar={
        <Button size="md">
          <Plus className="h-4 w-4" />
          Add rule
        </Button>
      }
    >
      <div className="mb-4 grid grid-cols-2 gap-4 xl:grid-cols-4">
        <StatCard icon={SlidersHorizontal} label="Active rules" value="27" hint="6 disabled" tone="brand" />
        <StatCard icon={Percent} label="Pricing rules" value="11" hint="discounts + tiers" tone="violet" />
        <StatCard icon={ShieldAlert} label="Fraud blocks (30d)" value="63" delta="+9" trend="down" hint="orders held" tone="danger" />
        <StatCard icon={Scale} label="Tax rules" value="8" hint="across regions" tone="info" />
      </div>

      <Card>
        <CardHeader>
          <h2 className="text-base font-semibold text-fg">Rule library</h2>
        </CardHeader>
        <CardBody className="pt-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-line text-xs font-semibold uppercase tracking-[0.06em] text-faint">
                  <th className="pb-3 pr-4">Rule</th>
                  <th className="pb-3 pr-4">Category</th>
                  <th className="pb-3 pr-4">Condition</th>
                  <th className="pb-3 pr-4">Action</th>
                  <th className="pb-3 pr-4">State</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {rules.map((r) => (
                  <tr key={r.name}>
                    <td className="py-3 pr-4 font-medium text-fg">{r.name}</td>
                    <td className="py-3 pr-4">
                      <Badge tone={categoryTone[r.category]}>{r.category}</Badge>
                    </td>
                    <td className="py-3 pr-4">
                      <code className="rounded bg-surface-2 px-1.5 py-0.5 text-xs text-muted">{r.condition}</code>
                    </td>
                    <td className="py-3 pr-4 text-muted">{r.action}</td>
                    <td className="py-3 pr-4">
                      <Badge tone={r.enabled ? 'success' : 'neutral'} dot>
                        {r.enabled ? 'Enabled' : 'Disabled'}
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
