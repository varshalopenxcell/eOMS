'use client';

import {
  Bar,
  BarChart,
  Cell,
  LabelList,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts';
import { ChevronDown } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { CHART, monthlyComparison, orderStatus, regions, salesByChannel } from './data';

function CardHead({ title, subtitle, control }: { title: string; subtitle?: string; control?: string }) {
  return (
    <div className="flex items-start justify-between gap-3 p-5 pb-3">
      <div>
        <h3 className="text-sm font-semibold text-fg">{title}</h3>
        {subtitle ? <p className="mt-0.5 text-xs text-subtle">{subtitle}</p> : null}
      </div>
      {control ? (
        <button className="inline-flex items-center gap-1.5 rounded-lg border border-line bg-surface px-2.5 py-1.5 text-xs font-medium text-muted transition hover:border-line-strong hover:text-fg">
          {control}
          <ChevronDown className="h-3.5 w-3.5" />
        </button>
      ) : null}
    </div>
  );
}

/* ---------- Sales by Channel (vertical bars) ---------- */
export function SalesByChannel() {
  return (
    <Card className="animate-fade-up" style={{ animationDelay: '220ms' }}>
      <CardHead title="Sales by Channel" control="This month" />
      <div className="h-[240px] px-3 pb-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={salesByChannel} margin={{ top: 20, left: 0, right: 0, bottom: 0 }} barCategoryGap="28%">
            <defs>
              <linearGradient id="bar-brand" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#818CF8" />
                <stop offset="100%" stopColor="#6366F1" />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="name"
              tickLine={false}
              axisLine={false}
              tick={{ fill: 'rgb(var(--subtle))', fontSize: 11 }}
              dy={6}
            />
            <YAxis hide domain={[0, 90]} />
            <Tooltip
              cursor={{ fill: 'rgb(var(--surface-2))' }}
              contentStyle={{
                borderRadius: 12,
                border: '1px solid rgb(var(--line))',
                background: 'rgb(var(--elevated))',
                fontSize: 12
              }}
              formatter={(v: number) => [`$${v}K`, 'Sales']}
              labelStyle={{ color: 'rgb(var(--fg))', fontWeight: 600 }}
            />
            <Bar dataKey="value" fill="url(#bar-brand)" radius={[6, 6, 0, 0]} maxBarSize={44}>
              <LabelList
                dataKey="value"
                position="top"
                formatter={(v: number) => `$${v}K`}
                style={{ fill: 'rgb(var(--muted))', fontSize: 11, fontWeight: 600 }}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}

/* ---------- Order Status Breakdown (donut) ---------- */
export function OrderStatusBreakdown() {
  const total = orderStatus.reduce((s, o) => s + o.value, 0);
  return (
    <Card className="animate-fade-up" style={{ animationDelay: '260ms' }}>
      <CardHead title="Order Status Breakdown" subtitle="This month" />
      <div className="flex flex-col items-center gap-4 p-5 pt-1 sm:flex-row">
        <div className="relative h-[160px] w-[160px] shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={orderStatus}
                dataKey="value"
                nameKey="name"
                innerRadius={54}
                outerRadius={76}
                paddingAngle={2}
                stroke="none"
                isAnimationActive={false}
              >
                {orderStatus.map((o) => (
                  <Cell key={o.name} fill={o.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-xl font-bold tabular-nums text-fg">{total.toLocaleString()}</span>
            <span className="text-[11px] text-subtle">Total Orders</span>
          </div>
        </div>
        <ul className="flex-1 space-y-2">
          {orderStatus.map((o) => (
            <li key={o.name} className="flex items-center gap-2 text-sm">
              <span className="h-2.5 w-2.5 rounded-full" style={{ background: o.color }} />
              <span className="flex-1 text-muted">{o.name}</span>
              <span className="font-semibold tabular-nums text-fg">{o.value.toLocaleString()}</span>
              <span className="w-10 text-right text-xs tabular-nums text-subtle">({o.pct}%)</span>
            </li>
          ))}
        </ul>
      </div>
    </Card>
  );
}

/* ---------- Revenue by Region (dotted map + bars) ---------- */
export function RevenueByRegion() {
  return (
    <Card className="animate-fade-up" style={{ animationDelay: '300ms' }}>
      <CardHead title="Revenue by Region" subtitle="This month" />
      <div className="p-5 pt-1">
        <div className="relative mb-4 h-24 overflow-hidden rounded-xl border border-line bg-surface-2">
          <div className="bg-dots absolute inset-0 [mask-image:radial-gradient(120%_120%_at_50%_50%,black,transparent_75%)]" />
          <div className="absolute inset-0 flex items-center justify-between px-6">
            {[70, 45, 88, 30, 20].map((h, i) => (
              <div key={i} className="flex flex-col items-center gap-1">
                <span
                  className="h-2 w-2 rounded-full bg-brand"
                  style={{ opacity: h / 100, boxShadow: `0 0 ${h / 6}px rgb(99 102 241 / 0.7)` }}
                />
              </div>
            ))}
          </div>
        </div>
        <ul className="space-y-3">
          {regions.map((r) => (
            <li key={r.name}>
              <div className="mb-1 flex items-center justify-between text-xs">
                <span className="text-muted">{r.name}</span>
                <span className="font-semibold tabular-nums text-fg">{r.revenue}</span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-surface-2">
                <div className="h-full rounded-full bg-brand-gradient" style={{ width: `${r.value}%` }} />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Card>
  );
}

/* ---------- Monthly Comparison (grouped bars) ---------- */
export function MonthlyComparison() {
  return (
    <Card className="animate-fade-up" style={{ animationDelay: '340ms' }}>
      <CardHead title="Monthly Comparison" subtitle="This month vs last month" />
      <div className="px-5 pb-2">
        <div className="mb-2 flex items-center gap-4">
          <span className="flex items-center gap-2 text-xs font-medium text-muted">
            <span className="h-2.5 w-2.5 rounded-full bg-brand" /> This Month
          </span>
          <span className="flex items-center gap-2 text-xs font-medium text-muted">
            <span className="h-2.5 w-2.5 rounded-full" style={{ background: CHART.slate }} /> Last Month
          </span>
        </div>
      </div>
      <div className="h-[196px] px-3 pb-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={monthlyComparison} margin={{ top: 8, left: 0, right: 0, bottom: 0 }} barGap={4}>
            <XAxis
              dataKey="week"
              tickLine={false}
              axisLine={false}
              tick={{ fill: 'rgb(var(--subtle))', fontSize: 11 }}
              dy={6}
            />
            <YAxis hide />
            <Tooltip
              cursor={{ fill: 'rgb(var(--surface-2))' }}
              contentStyle={{
                borderRadius: 12,
                border: '1px solid rgb(var(--line))',
                background: 'rgb(var(--elevated))',
                fontSize: 12
              }}
              formatter={(v: number, name: string) => [`$${v}K`, name === 'current' ? 'This Month' : 'Last Month']}
              labelStyle={{ color: 'rgb(var(--fg))', fontWeight: 600 }}
            />
            <Bar dataKey="previous" fill={CHART.slate} radius={[5, 5, 0, 0]} maxBarSize={20} />
            <Bar dataKey="current" fill={CHART.brand} radius={[5, 5, 0, 0]} maxBarSize={20} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
