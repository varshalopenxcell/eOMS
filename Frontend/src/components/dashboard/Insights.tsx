'use client';

import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts';
import {
  AlertTriangle,
  CreditCard,
  FilePlus2,
  PackagePlus,
  Undo2,
  Upload,
  ChevronDown,
  type LucideIcon
} from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { alerts, recentOrders, topChannels } from './data';

export function RecentOrders() {
  return (
    <Card className="animate-fade-up" style={{ animationDelay: '200ms' }}>
      <div className="flex items-center justify-between p-5 pb-3">
        <h3 className="text-sm font-semibold text-fg">Recent Orders</h3>
        <button className="text-xs font-semibold text-brand hover:text-brand-strong">View all</button>
      </div>
      <div className="px-2 pb-3">
        {recentOrders.map((o) => (
          <div
            key={o.id}
            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition hover:bg-surface-2"
          >
            <div className="min-w-0 flex-1">
              <p className="font-semibold text-fg">{o.id}</p>
              <p className="truncate text-xs text-subtle">{o.customer}</p>
            </div>
            <span className="font-semibold tabular-nums text-fg">{o.amount}</span>
            <Badge tone={o.tone} className="w-[92px] justify-center">
              {o.status}
            </Badge>
          </div>
        ))}
      </div>
    </Card>
  );
}

export function TopChannels() {
  return (
    <Card className="animate-fade-up" style={{ animationDelay: '240ms' }}>
      <div className="flex items-center justify-between p-5 pb-2">
        <h3 className="text-sm font-semibold text-fg">Top Selling Channels</h3>
        <button className="inline-flex items-center gap-1.5 rounded-lg border border-line bg-surface px-2.5 py-1.5 text-xs font-medium text-muted transition hover:border-line-strong hover:text-fg">
          This month
          <ChevronDown className="h-3.5 w-3.5" />
        </button>
      </div>
      <div className="flex items-center gap-4 p-5 pt-2">
        <div className="relative h-[128px] w-[128px] shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={topChannels}
                dataKey="pct"
                nameKey="name"
                innerRadius={42}
                outerRadius={62}
                paddingAngle={2}
                stroke="none"
                isAnimationActive={false}
              >
                {topChannels.map((c) => (
                  <Cell key={c.name} fill={c.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-base font-bold tabular-nums text-fg">$184.2K</span>
            <span className="text-[10px] text-subtle">Total Revenue</span>
          </div>
        </div>
        <ul className="flex-1 space-y-2.5">
          {topChannels.map((c) => (
            <li key={c.name} className="flex items-center gap-2 text-sm">
              <span className="h-2.5 w-2.5 rounded-full" style={{ background: c.color }} />
              <span className="flex-1 text-muted">{c.name}</span>
              <span className="font-semibold tabular-nums text-fg">{c.pct}%</span>
            </li>
          ))}
        </ul>
      </div>
    </Card>
  );
}

const alertIcon: Record<string, LucideIcon> = {
  danger: AlertTriangle,
  warning: AlertTriangle,
  info: CreditCard
};

export function AlertsPanel() {
  return (
    <Card className="animate-fade-up" style={{ animationDelay: '280ms' }}>
      <div className="flex items-center justify-between p-5 pb-3">
        <h3 className="text-sm font-semibold text-fg">Alerts &amp; Notifications</h3>
        <button className="text-xs font-semibold text-brand hover:text-brand-strong">View all</button>
      </div>
      <div className="space-y-1 px-2 pb-3">
        {alerts.map((a) => {
          const Icon = alertIcon[a.tone] ?? AlertTriangle;
          const tint =
            a.tone === 'danger'
              ? 'bg-danger-soft text-danger'
              : a.tone === 'warning'
                ? 'bg-warning-soft text-warning'
                : 'bg-info-soft text-info';
          return (
            <div key={a.title} className="flex items-start gap-3 rounded-xl px-3 py-2.5 transition hover:bg-surface-2">
              <span className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${tint}`}>
                <Icon className="h-4 w-4" />
              </span>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-fg">{a.title}</p>
                <p className="text-xs text-subtle">{a.detail}</p>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}

const quickActions: { label: string; icon: LucideIcon }[] = [
  { label: 'Create Order', icon: FilePlus2 },
  { label: 'Import Orders', icon: Upload },
  { label: 'Add Product', icon: PackagePlus },
  { label: 'Create Return', icon: Undo2 }
];

export function QuickActions() {
  return (
    <Card className="animate-fade-up" style={{ animationDelay: '320ms' }}>
      <div className="p-5 pb-3">
        <h3 className="text-sm font-semibold text-fg">Quick Actions</h3>
      </div>
      <div className="grid grid-cols-2 gap-2.5 p-5 pt-0">
        {quickActions.map((a) => {
          const Icon = a.icon;
          return (
            <button
              key={a.label}
              className="group flex items-center gap-2.5 rounded-xl border border-line bg-surface px-3 py-3 text-sm font-medium text-muted transition hover:-translate-y-0.5 hover:border-brand/40 hover:text-fg hover:shadow-soft"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-soft text-brand transition group-hover:bg-brand-gradient group-hover:text-white">
                <Icon className="h-4 w-4" />
              </span>
              {a.label}
            </button>
          );
        })}
      </div>
    </Card>
  );
}
