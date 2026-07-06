import { Plug, Zap, RefreshCcw, Plus } from 'lucide-react';
import { Shell } from '@/components/ui/Shell';
import { Card, CardBody, CardHeader } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { StatCard } from '@/components/ui/StatCard';

type IntegrationStatus = 'connected' | 'available' | 'error';

const integrations: { name: string; category: string; description: string; status: IntegrationStatus; lastSync?: string; initials: string; color: string }[] = [
  { name: 'Shopify', category: 'Storefront', description: 'Sync orders, products, and inventory bi-directionally.', status: 'connected', lastSync: '2 min ago', initials: 'Sh', color: '#95BF47' },
  { name: 'Amazon', category: 'Marketplace', description: 'Import FBA and FBM orders in real time.', status: 'connected', lastSync: '5 min ago', initials: 'Az', color: '#FF9900' },
  { name: 'Stripe', category: 'Payments', description: 'Process payments, refunds, and reconciliation.', status: 'connected', lastSync: '1 min ago', initials: 'St', color: '#635BFF' },
  { name: 'QuickBooks', category: 'Accounting', description: 'Push invoices and sync financial records.', status: 'error', lastSync: 'Failed 3h ago', initials: 'Qb', color: '#2CA01C' },
  { name: 'WooCommerce', category: 'Storefront', description: 'Connect your WordPress store catalog.', status: 'available', initials: 'Wo', color: '#96588A' },
  { name: 'ShipStation', category: 'Shipping', description: 'Automate label creation and tracking.', status: 'available', initials: 'Ss', color: '#0A6CFF' },
  { name: 'Klaviyo', category: 'Marketing', description: 'Trigger email + SMS flows on order events.', status: 'available', initials: 'Kl', color: '#111111' },
  { name: 'NetSuite', category: 'ERP', description: 'Enterprise resource planning sync.', status: 'available', initials: 'Ns', color: '#1F6FBF' }
];

const statusMeta = {
  connected: { label: 'Connected', tone: 'success' as const },
  available: { label: 'Available', tone: 'neutral' as const },
  error: { label: 'Action needed', tone: 'danger' as const }
};

export default function IntegrationsPage() {
  return (
    <Shell
      title="Integrations"
      description="Connect storefronts, marketplaces, ERPs, and payment providers."
      toolbar={
        <Button size="md">
          <Plus className="h-4 w-4" />
          Browse marketplace
        </Button>
      }
    >
      <div className="mb-4 grid grid-cols-2 gap-4 xl:grid-cols-4">
        <StatCard icon={Plug} label="Connected apps" value="3" hint="of 40+ available" tone="brand" />
        <StatCard icon={RefreshCcw} label="Records synced (24h)" value="18,402" delta="+6%" hint="orders + inventory" tone="info" />
        <StatCard icon={Zap} label="Webhooks delivered" value="99.8%" hint="last 7 days" tone="success" />
        <StatCard icon={Plug} label="Sync errors" value="1" delta="-4" hint="needs attention" tone="danger" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {integrations.map((it) => (
          <Card key={it.name} interactive>
            <CardBody className="pt-5">
              <div className="flex items-start justify-between">
                <span
                  className="flex h-11 w-11 items-center justify-center rounded-xl text-sm font-bold text-white"
                  style={{ backgroundColor: it.color }}
                >
                  {it.initials}
                </span>
                <Badge tone={statusMeta[it.status].tone} dot={it.status !== 'available'}>
                  {statusMeta[it.status].label}
                </Badge>
              </div>
              <h3 className="mt-4 text-sm font-semibold text-fg">{it.name}</h3>
              <p className="text-xs text-faint">{it.category}</p>
              <p className="mt-2 text-xs leading-relaxed text-muted">{it.description}</p>
              <div className="mt-4 flex items-center justify-between">
                {it.lastSync ? (
                  <span className="text-[11px] text-subtle">Sync: {it.lastSync}</span>
                ) : (
                  <span className="text-[11px] text-faint">Not connected</span>
                )}
                <Button variant={it.status === 'available' ? 'primary' : 'outline'} size="sm">
                  {it.status === 'available' ? 'Connect' : it.status === 'error' ? 'Fix' : 'Manage'}
                </Button>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
    </Shell>
  );
}
