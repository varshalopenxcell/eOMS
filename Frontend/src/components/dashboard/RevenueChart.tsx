'use client';

import { useState } from 'react';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts';
import { Download } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { CHART, rangeTabs, revenueSeries } from './data';

interface TooltipEntry {
  dataKey: string;
  value: number;
  color: string;
}
interface ChartTooltipProps {
  active?: boolean;
  payload?: TooltipEntry[];
  label?: string;
}

function ChartTooltip({ active, payload, label }: ChartTooltipProps) {
  if (!active || !payload?.length) return null;
  const revenue = payload.find((p) => p.dataKey === 'revenue');
  const orders = payload.find((p) => p.dataKey === 'orders');
  return (
    <div className="min-w-[168px] rounded-xl border border-line bg-elevated p-3 shadow-lift">
      <p className="mb-2 text-xs font-semibold text-fg">{label}, 2024</p>
      {revenue ? (
        <div className="flex items-center justify-between gap-6 text-sm">
          <span className="flex items-center gap-2 text-muted">
            <span className="h-2 w-2 rounded-full" style={{ background: CHART.brand }} /> Revenue
          </span>
          <span className="font-semibold tabular-nums text-fg">${Math.round(revenue.value).toLocaleString()}</span>
        </div>
      ) : null}
      {orders ? (
        <div className="mt-1 flex items-center justify-between gap-6 text-sm">
          <span className="flex items-center gap-2 text-muted">
            <span className="h-2 w-2 rounded-full" style={{ background: CHART.amber }} /> Orders
          </span>
          <span className="font-semibold tabular-nums text-fg">{Math.round(orders.value).toLocaleString()}</span>
        </div>
      ) : null}
    </div>
  );
}

const inlineStats = [
  { label: 'Revenue', value: '$184,2K', delta: '+12.4%', positive: true },
  { label: 'Orders', value: '2,840', delta: '-3.2%', positive: false },
  { label: 'AOV', value: '$64.86', delta: '+8.7%', positive: true }
];

export function RevenueChart() {
  const [range, setRange] = useState<(typeof rangeTabs)[number]>('30D');
  const data = range === '7D' ? revenueSeries.slice(-7) : revenueSeries;

  return (
    <Card className="animate-fade-up" style={{ animationDelay: '160ms' }}>
      <div className="flex flex-col gap-4 border-b border-line p-5 xl:flex-row xl:items-start xl:justify-between">
        <div>
          <h2 className="text-base font-semibold text-fg">Revenue &amp; Order Volume</h2>
          <p className="mt-1 text-sm text-muted">Track your revenue and order volume over time.</p>
          <div className="mt-4 flex flex-wrap gap-6">
            {inlineStats.map((s) => (
              <div key={s.label}>
                <p className="text-lg font-bold tabular-nums text-fg">{s.value}</p>
                <p className="text-xs text-subtle">
                  {s.label}{' '}
                  <span className={s.positive ? 'font-semibold text-success' : 'font-semibold text-danger'}>{s.delta}</span>
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <div className="inline-flex rounded-xl border border-line bg-surface-2 p-1">
            {rangeTabs.map((r) => (
              <button
                key={r}
                onClick={() => setRange(r)}
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                  range === r ? 'bg-surface text-fg shadow-xs' : 'text-subtle hover:text-fg'
                }`}
              >
                {r}
              </button>
            ))}
          </div>
          <button className="inline-flex items-center gap-2 rounded-xl border border-line bg-surface px-3 py-2 text-xs font-semibold text-muted shadow-xs transition hover:border-line-strong hover:text-fg">
            <Download className="h-4 w-4" />
            Export
          </button>
        </div>
      </div>

      <div className="p-5 pt-4">
        <div className="mb-3 flex items-center justify-end gap-5">
          <span className="flex items-center gap-2 text-xs font-medium text-muted">
            <span className="h-2.5 w-2.5 rounded-full" style={{ background: CHART.brand }} /> Revenue
          </span>
          <span className="flex items-center gap-2 text-xs font-medium text-muted">
            <span className="h-2.5 w-2.5 rounded-full" style={{ background: CHART.amber }} /> Orders
          </span>
        </div>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 8, left: 0, right: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="rev-main" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={CHART.brand} stopOpacity={0.32} />
                  <stop offset="100%" stopColor={CHART.brand} stopOpacity={0} />
                </linearGradient>
                <linearGradient id="ord-main" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={CHART.amber} stopOpacity={0.22} />
                  <stop offset="100%" stopColor={CHART.amber} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="4 4" stroke="rgb(var(--line))" vertical={false} />
              <XAxis
                dataKey="short"
                interval={0}
                tickLine={false}
                axisLine={false}
                tick={{ fill: 'rgb(var(--subtle))', fontSize: 11 }}
                dy={10}
              />
              <YAxis
                yAxisId="left"
                tickLine={false}
                axisLine={false}
                width={52}
                tick={{ fill: 'rgb(var(--subtle))', fontSize: 11 }}
                tickFormatter={(v) => `$${v / 1000}K`}
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                tickLine={false}
                axisLine={false}
                width={40}
                tick={{ fill: 'rgb(var(--subtle))', fontSize: 11 }}
                tickFormatter={(v) => (v >= 1000 ? `${v / 1000}K` : `${v}`)}
              />
              <Tooltip content={<ChartTooltip />} cursor={{ stroke: 'rgb(var(--line-strong))', strokeWidth: 1 }} />
              <Area
                yAxisId="right"
                type="monotone"
                dataKey="orders"
                stroke={CHART.amber}
                strokeWidth={2}
                fill="url(#ord-main)"
                isAnimationActive={false}
              />
              <Area
                yAxisId="left"
                type="monotone"
                dataKey="revenue"
                stroke={CHART.brand}
                strokeWidth={2.5}
                fill="url(#rev-main)"
                isAnimationActive={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </Card>
  );
}
