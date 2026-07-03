import { CheckCircle2 } from 'lucide-react';
import { Shell } from '@/components/ui/Shell';
import { Card, CardBody, CardHeader } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { BillingPanel } from './billing';

const checklist = [
  'Role-based access enabled',
  'Tenant isolation enforced',
  'Stripe billing connected',
  'Audit logging active'
];

export default function SettingsPage() {
  return (
    <Shell
      title="Organization settings"
      description="Manage billing, team members, security, and preferences."
      actions={<Badge tone="primary">Enterprise</Badge>}
    >
      <div className="grid gap-4 xl:grid-cols-[1.4fr_0.9fr]">
        <Card className="animate-fade-up">
          <CardHeader>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.08em] text-subtle">Overview</p>
              <h2 className="mt-1 text-base font-semibold text-fg">Settings summary</h2>
            </div>
          </CardHeader>
          <CardBody className="pt-0">
            <p className="text-sm leading-relaxed text-muted">
              Organization configuration and security controls are handled here. Use this panel to keep operations
              aligned with tenant policy.
            </p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {checklist.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-2.5 rounded-xl border border-line bg-surface-2 px-4 py-3 text-sm text-fg/80"
                >
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-success" />
                  {item}
                </div>
              ))}
            </div>
          </CardBody>
        </Card>

        <div className="animate-fade-up" style={{ animationDelay: '80ms' }}>
          <BillingPanel />
        </div>
      </div>
    </Shell>
  );
}
