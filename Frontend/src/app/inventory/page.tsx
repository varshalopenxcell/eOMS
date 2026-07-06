import { Boxes, PackageCheck, PackageX, AlertTriangle, Plus } from 'lucide-react';
import { Shell } from '@/components/ui/Shell';
import { Card, CardBody, CardHeader } from '@/components/ui/Card';
import { Badge, type BadgeTone } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { StatCard } from '@/components/ui/StatCard';

type StockStatus = 'in_stock' | 'low' | 'out';

const stock: { sku: string; name: string; warehouse: string; onHand: number; reorderAt: number; status: StockStatus }[] = [
  { sku: 'SKU-1001', name: 'Wireless Mechanical Keyboard', warehouse: 'Newark, NJ', onHand: 154, reorderAt: 40, status: 'in_stock' },
  { sku: 'SKU-1002', name: 'Ergonomic Office Chair', warehouse: 'Newark, NJ', onHand: 42, reorderAt: 25, status: 'in_stock' },
  { sku: 'SKU-1003', name: 'USB-C Docking Station', warehouse: 'Reno, NV', onHand: 0, reorderAt: 30, status: 'out' },
  { sku: 'SKU-1004', name: '27" 4K Monitor', warehouse: 'Reno, NV', onHand: 18, reorderAt: 20, status: 'low' },
  { sku: 'SKU-1005', name: 'Noise-Cancelling Headphones', warehouse: 'Atlanta, GA', onHand: 76, reorderAt: 30, status: 'in_stock' },
  { sku: 'SKU-1006', name: 'Standing Desk Converter', warehouse: 'Atlanta, GA', onHand: 5, reorderAt: 15, status: 'low' },
  { sku: 'SKU-1007', name: 'Webcam 1080p Pro', warehouse: 'Newark, NJ', onHand: 210, reorderAt: 50, status: 'in_stock' },
  { sku: 'SKU-1009', name: 'Wireless Charging Pad', warehouse: 'Reno, NV', onHand: 0, reorderAt: 40, status: 'out' }
];

const statusMeta: Record<StockStatus, { label: string; tone: BadgeTone }> = {
  in_stock: { label: 'In stock', tone: 'success' },
  low: { label: 'Low stock', tone: 'warning' },
  out: { label: 'Out of stock', tone: 'danger' }
};

export default function InventoryPage() {
  return (
    <Shell
      title="Inventory"
      description="Track stock levels, low-stock thresholds, and replenishment across locations."
      toolbar={
        <Button size="md">
          <Plus className="h-4 w-4" />
          Add stock item
        </Button>
      }
    >
      <div className="mb-4 grid grid-cols-2 gap-4 xl:grid-cols-4">
        <StatCard icon={Boxes} label="Total SKUs" value="1,284" delta="+3.2%" hint="vs last week" tone="brand" />
        <StatCard icon={PackageCheck} label="In stock" value="1,092" hint="85% of catalog" tone="success" />
        <StatCard icon={AlertTriangle} label="Low stock" value="147" delta="+12" trend="down" hint="need reorder" tone="warning" />
        <StatCard icon={PackageX} label="Out of stock" value="45" delta="-8" hint="vs last week" tone="danger" />
      </div>

      <Card>
        <CardHeader>
          <div>
            <h2 className="text-base font-semibold text-fg">Stock levels</h2>
            <p className="mt-0.5 text-xs text-subtle">Across 3 active warehouses</p>
          </div>
          <Badge tone="neutral" dot>
            Live
          </Badge>
        </CardHeader>
        <CardBody className="pt-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-line text-xs font-semibold uppercase tracking-[0.06em] text-faint">
                  <th className="pb-3 pr-4">SKU</th>
                  <th className="pb-3 pr-4">Product</th>
                  <th className="pb-3 pr-4">Warehouse</th>
                  <th className="pb-3 pr-4">On hand</th>
                  <th className="pb-3 pr-4">Reorder at</th>
                  <th className="pb-3 pr-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {stock.map((row) => (
                  <tr key={row.sku}>
                    <td className="py-3 pr-4 font-mono text-xs text-muted">{row.sku}</td>
                    <td className="py-3 pr-4 font-medium text-fg">{row.name}</td>
                    <td className="py-3 pr-4 text-muted">{row.warehouse}</td>
                    <td className="py-3 pr-4 tabular-nums text-fg">{row.onHand}</td>
                    <td className="py-3 pr-4 tabular-nums text-subtle">{row.reorderAt}</td>
                    <td className="py-3 pr-4">
                      <Badge tone={statusMeta[row.status].tone}>{statusMeta[row.status].label}</Badge>
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
