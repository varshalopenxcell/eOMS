import { Warehouse, MapPin, Boxes, Users, Plus } from 'lucide-react';
import { Shell } from '@/components/ui/Shell';
import { Card, CardBody } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { StatCard } from '@/components/ui/StatCard';

const warehouses = [
  { name: 'Newark Fulfillment Center', code: 'NWK-01', location: 'Newark, NJ', capacity: 82, skus: 512, staff: 34, status: 'Operational' as const },
  { name: 'Reno Distribution Hub', code: 'RNO-02', location: 'Reno, NV', capacity: 64, skus: 388, staff: 21, status: 'Operational' as const },
  { name: 'Atlanta Regional Depot', code: 'ATL-03', location: 'Atlanta, GA', capacity: 91, skus: 274, staff: 18, status: 'Near capacity' as const },
  { name: 'Dallas Overflow', code: 'DAL-04', location: 'Dallas, TX', capacity: 12, skus: 110, staff: 6, status: 'Onboarding' as const }
];

const statusTone = {
  Operational: 'success',
  'Near capacity': 'warning',
  Onboarding: 'info'
} as const;

function capacityTone(pct: number) {
  if (pct >= 85) return 'bg-danger';
  if (pct >= 65) return 'bg-warning';
  return 'bg-brand-gradient';
}

export default function WarehousesPage() {
  return (
    <Shell
      title="Warehouses"
      description="Monitor capacity, staffing, and throughput across every fulfillment location."
      toolbar={
        <Button size="md">
          <Plus className="h-4 w-4" />
          Add warehouse
        </Button>
      }
    >
      <div className="mb-4 grid grid-cols-2 gap-4 xl:grid-cols-4">
        <StatCard icon={Warehouse} label="Active locations" value="4" hint="across 4 states" tone="brand" />
        <StatCard icon={Boxes} label="Total capacity used" value="72%" delta="+4%" trend="down" hint="vs last month" tone="warning" />
        <StatCard icon={Users} label="Warehouse staff" value="79" delta="+6" hint="headcount" tone="info" />
        <StatCard icon={MapPin} label="Avg. dispatch time" value="1.4h" delta="-0.3h" hint="order to ship" tone="success" />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {warehouses.map((w) => (
          <Card key={w.code} interactive>
            <CardBody className="pt-5">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-soft text-brand">
                    <Warehouse className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="text-sm font-semibold text-fg">{w.name}</h3>
                    <p className="mt-0.5 flex items-center gap-1 text-xs text-subtle">
                      <MapPin className="h-3 w-3" />
                      {w.location} · {w.code}
                    </p>
                  </div>
                </div>
                <Badge tone={statusTone[w.status]}>{w.status}</Badge>
              </div>

              <div className="mt-4">
                <div className="mb-1 flex items-center justify-between text-xs">
                  <span className="text-muted">Capacity used</span>
                  <span className="font-semibold tabular-nums text-fg">{w.capacity}%</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-surface-2">
                  <div className={`h-full rounded-full ${capacityTone(w.capacity)}`} style={{ width: `${w.capacity}%` }} />
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-lg bg-surface-2 px-3 py-2">
                  <p className="text-xs text-faint">SKUs stored</p>
                  <p className="mt-0.5 font-semibold tabular-nums text-fg">{w.skus}</p>
                </div>
                <div className="rounded-lg bg-surface-2 px-3 py-2">
                  <p className="text-xs text-faint">Staff on site</p>
                  <p className="mt-0.5 font-semibold tabular-nums text-fg">{w.staff}</p>
                </div>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
    </Shell>
  );
}
