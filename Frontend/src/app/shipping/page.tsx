import { Truck, Package, Clock, CheckCircle2, Plus } from 'lucide-react';
import { Shell } from '@/components/ui/Shell';
import { Card, CardBody, CardHeader } from '@/components/ui/Card';
import { Badge, type BadgeTone } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { StatCard } from '@/components/ui/StatCard';

type ShipStatus = 'delivered' | 'in_transit' | 'label_created' | 'exception';

const shipments: { id: string; order: string; carrier: string; service: string; destination: string; eta: string; status: ShipStatus }[] = [
  { id: 'SHP-4821', order: '#o1', carrier: 'FedEx', service: 'Ground', destination: 'San Francisco, CA', eta: 'Jul 8', status: 'in_transit' },
  { id: 'SHP-4822', order: '#o3', carrier: 'UPS', service: '2-Day Air', destination: 'Austin, TX', eta: 'Jul 7', status: 'in_transit' },
  { id: 'SHP-4823', order: '#o6', carrier: 'USPS', service: 'Priority', destination: 'Seattle, WA', eta: 'Jul 6', status: 'delivered' },
  { id: 'SHP-4824', order: '#o8', carrier: 'DHL', service: 'Express', destination: 'Miami, FL', eta: 'Jul 9', status: 'label_created' },
  { id: 'SHP-4825', order: '#o11', carrier: 'FedEx', service: 'Overnight', destination: 'Boston, MA', eta: 'Jul 6', status: 'exception' },
  { id: 'SHP-4826', order: '#o12', carrier: 'UPS', service: 'Ground', destination: 'Denver, CO', eta: 'Jul 10', status: 'in_transit' }
];

const statusMeta: Record<ShipStatus, { label: string; tone: BadgeTone }> = {
  delivered: { label: 'Delivered', tone: 'success' },
  in_transit: { label: 'In transit', tone: 'primary' },
  label_created: { label: 'Label created', tone: 'neutral' },
  exception: { label: 'Exception', tone: 'danger' }
};

const carriers = [
  { name: 'FedEx', shipments: 128, onTime: 97 },
  { name: 'UPS', shipments: 94, onTime: 95 },
  { name: 'USPS', shipments: 61, onTime: 91 },
  { name: 'DHL', shipments: 22, onTime: 98 }
];

export default function ShippingPage() {
  return (
    <Shell
      title="Shipping"
      description="Track carriers, labels, and live delivery status across all fulfillment."
      toolbar={
        <Button size="md">
          <Plus className="h-4 w-4" />
          Create shipment
        </Button>
      }
    >
      <div className="mb-4 grid grid-cols-2 gap-4 xl:grid-cols-4">
        <StatCard icon={Package} label="Shipments this week" value="305" delta="+8.1%" hint="vs last week" tone="brand" />
        <StatCard icon={Truck} label="In transit" value="112" hint="active deliveries" tone="info" />
        <StatCard icon={CheckCircle2} label="On-time rate" value="96%" delta="+1.4%" hint="last 30 days" tone="success" />
        <StatCard icon={Clock} label="Avg. delivery time" value="2.6d" delta="-0.2d" hint="door to door" tone="violet" />
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.6fr_1fr]">
        <Card>
          <CardHeader>
            <div>
              <h2 className="text-base font-semibold text-fg">Recent shipments</h2>
              <p className="mt-0.5 text-xs text-subtle">Live carrier tracking</p>
            </div>
          </CardHeader>
          <CardBody className="pt-0">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-line text-xs font-semibold uppercase tracking-[0.06em] text-faint">
                    <th className="pb-3 pr-4">Tracking</th>
                    <th className="pb-3 pr-4">Carrier</th>
                    <th className="pb-3 pr-4">Destination</th>
                    <th className="pb-3 pr-4">ETA</th>
                    <th className="pb-3 pr-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {shipments.map((s) => (
                    <tr key={s.id}>
                      <td className="py-3 pr-4">
                        <p className="font-mono text-xs font-medium text-fg">{s.id}</p>
                        <p className="text-xs text-faint">Order {s.order}</p>
                      </td>
                      <td className="py-3 pr-4 text-muted">
                        {s.carrier}
                        <span className="block text-xs text-faint">{s.service}</span>
                      </td>
                      <td className="py-3 pr-4 text-muted">{s.destination}</td>
                      <td className="py-3 pr-4 text-subtle">{s.eta}</td>
                      <td className="py-3 pr-4">
                        <Badge tone={statusMeta[s.status].tone}>{statusMeta[s.status].label}</Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <h2 className="text-base font-semibold text-fg">Carrier performance</h2>
          </CardHeader>
          <CardBody className="space-y-4 pt-0">
            {carriers.map((c) => (
              <div key={c.name}>
                <div className="mb-1 flex items-center justify-between text-sm">
                  <span className="font-medium text-fg">{c.name}</span>
                  <span className="text-xs text-subtle">
                    {c.shipments} shipments · <span className="font-semibold text-fg">{c.onTime}%</span> on-time
                  </span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-surface-2">
                  <div className="h-full rounded-full bg-brand-gradient" style={{ width: `${c.onTime}%` }} />
                </div>
              </div>
            ))}
          </CardBody>
        </Card>
      </div>
    </Shell>
  );
}
