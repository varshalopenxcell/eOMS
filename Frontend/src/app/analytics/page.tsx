'use client';

import { Area, AreaChart, Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { DollarSign, ShoppingCart, TrendingUp, Users } from 'lucide-react';
import { Shell } from '@/components/ui/Shell';
import { Card, CardBody, CardHeader } from '@/components/ui/Card';
import { StatCard } from '@/components/ui/StatCard';

const revenueTrend = [
  { month: 'Jan', revenue: 182, orders: 940 },
  { month: 'Feb', revenue: 201, orders: 1010 },
  { month: 'Mar', revenue: 224, orders: 1180 },
  { month: 'Apr', revenue: 218, orders: 1120 },
  { month: 'May', revenue: 265, orders: 1340 },
  { month: 'Jun', revenue: 298, orders: 1490 },
  { month: 'Jul', revenue: 331, orders: 1620 }
];

const channelPerformance = [
  { channel: 'Online Store', value: 148 },
  { channel: 'Amazon', value: 92 },
  { channel: 'Retail POS', value: 61 },
  { channel: 'Wholesale', value: 44 },
  { channel: 'eBay', value: 28 }
];

const topProducts = [
  { name: '27" 4K Monitor', revenue: '$88,410', units: 197, share: 92 },
  { name: 'Ergonomic Office Chair', revenue: '$62,510', units: 190, share: 71 },
  { name: 'Noise-Cancelling Headphones', revenue: '$41,790', units: 210, share: 58 },
  { name: 'Wireless Mechanical Keyboard', revenue: '$33,820', units: 380, share: 44 },
  { name: 'Standing Desk Converter', revenue: '$27,390', units: 110, share: 33 }
];

const tooltipStyle = {
  borderRadius: 12,
  border: '1px solid rgb(var(--line))',
  background: 'rgb(var(--elevated))',
  fontSize: 12
};

export default function AnalyticsPage() {
  return (
    <Shell
      title="Analytics"
      description="Revenue, channel, and product performance across your organization."
    >
      <div className="mb-4 grid grid-cols-2 gap-4 xl:grid-cols-4">
        <StatCard icon={DollarSign} label="Total revenue" value="$1.72M" delta="+14.2%" hint="YTD" tone="brand" />
        <StatCard icon={ShoppingCart} label="Orders" value="8,700" delta="+9.6%" hint="YTD" tone="info" />
        <StatCard icon={TrendingUp} label="Avg. order value" value="$197" delta="+4.1%" hint="vs last year" tone="success" />
        <StatCard icon={Users} label="New customers" value="1,246" delta="+18%" hint="this year" tone="violet" />
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.6fr_1fr]">
        <Card>
          <CardHeader>
            <div>
              <h2 className="text-base font-semibold text-fg">Revenue trend</h2>
              <p className="mt-0.5 text-xs text-subtle">Monthly revenue ($K)</p>
            </div>
          </CardHeader>
          <CardBody className="pt-0">
            <div className="h-[260px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueTrend} margin={{ top: 8, left: -16, right: 8, bottom: 0 }}>
                  <defs>
                    <linearGradient id="rev-area" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#6366F1" stopOpacity={0.35} />
                      <stop offset="100%" stopColor="#6366F1" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgb(var(--line))" vertical={false} />
                  <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fill: 'rgb(var(--subtle))', fontSize: 11 }} dy={6} />
                  <YAxis tickLine={false} axisLine={false} tick={{ fill: 'rgb(var(--subtle))', fontSize: 11 }} />
                  <Tooltip contentStyle={tooltipStyle} formatter={(v: number) => [`$${v}K`, 'Revenue']} labelStyle={{ color: 'rgb(var(--fg))', fontWeight: 600 }} />
                  <Area type="monotone" dataKey="revenue" stroke="#6366F1" strokeWidth={2.5} fill="url(#rev-area)" isAnimationActive={false} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <div>
              <h2 className="text-base font-semibold text-fg">Sales by channel</h2>
              <p className="mt-0.5 text-xs text-subtle">Revenue ($K), this month</p>
            </div>
          </CardHeader>
          <CardBody className="pt-0">
            <div className="h-[260px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={channelPerformance} layout="vertical" margin={{ top: 4, left: 24, right: 16, bottom: 0 }}>
                  <XAxis type="number" hide />
                  <YAxis type="category" dataKey="channel" tickLine={false} axisLine={false} width={92} tick={{ fill: 'rgb(var(--muted))', fontSize: 11 }} />
                  <Tooltip cursor={{ fill: 'rgb(var(--surface-2))' }} contentStyle={tooltipStyle} formatter={(v: number) => [`$${v}K`, 'Revenue']} />
                  <Bar dataKey="value" fill="#6366F1" radius={[0, 6, 6, 0]} maxBarSize={22} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardBody>
        </Card>
      </div>

      <Card className="mt-4">
        <CardHeader>
          <h2 className="text-base font-semibold text-fg">Top products</h2>
        </CardHeader>
        <CardBody className="pt-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-line text-xs font-semibold uppercase tracking-[0.06em] text-faint">
                  <th className="pb-3 pr-4">Product</th>
                  <th className="pb-3 pr-4">Revenue</th>
                  <th className="pb-3 pr-4">Units</th>
                  <th className="pb-3 pr-4">Share</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {topProducts.map((p) => (
                  <tr key={p.name}>
                    <td className="py-3 pr-4 font-medium text-fg">{p.name}</td>
                    <td className="py-3 pr-4 tabular-nums text-muted">{p.revenue}</td>
                    <td className="py-3 pr-4 tabular-nums text-muted">{p.units}</td>
                    <td className="w-40 py-3 pr-4">
                      <div className="h-1.5 overflow-hidden rounded-full bg-surface-2">
                        <div className="h-full rounded-full bg-brand-gradient" style={{ width: `${p.share}%` }} />
                      </div>
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
