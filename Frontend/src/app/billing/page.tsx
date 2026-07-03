import { Receipt } from 'lucide-react';
import { Shell } from '@/components/ui/Shell';
import { Card } from '@/components/ui/Card';
import { EmptyState } from '@/components/ui/EmptyState';
import { Button } from '@/components/ui/Button';
import { BillingPanel } from '../settings/billing';

export default function BillingPage() {
  return (
    <Shell
      breadcrumbs={[{ label: 'Billing' }]}
      title="Billing"
      description="Manage your plan, payment method, and invoices."
      toolbar={<Button variant="outline" size="md">Manage payment method</Button>}
    >
      <div className="grid gap-5 xl:grid-cols-[0.9fr_1.4fr]">
        <div className="animate-fade-up">
          <BillingPanel />
        </div>
        <Card className="animate-fade-up p-2" style={{ animationDelay: '80ms' }}>
          <EmptyState
            icon={Receipt}
            title="No invoices yet"
            description="Paid invoices and receipts will appear here. You can download any invoice as a PDF for your records."
          />
        </Card>
      </div>
    </Shell>
  );
}
