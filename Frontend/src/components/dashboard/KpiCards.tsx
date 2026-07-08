'use client';

import { Area, AreaChart, ResponsiveContainer } from 'recharts';
import { ArrowDownRight, ArrowUpRight, MoreHorizontal } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { kpis } from './data';

export function KpiCards() {
  return (
    <section className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-5">
      {kpis.map((kpi, i) => {
        const Icon = kpi.icon;
        const positive = kpi.trend === 'up';
        const TrendIcon = positive ? ArrowUpRight : ArrowDownRight;
        return (
          <Card
            key={kpi.key}
            interactive
            className="relative animate-fade-up overflow-hidden"
            style={{ animationDelay: `${i * 60}ms` }}
          >
            <div
              className="pointer-events-none absolute inset-x-0 top-0 h-24 opacity-[0.07]"
              style={{ background: `linear-gradient(180deg, ${kpi.color}, transparent)` }}
            />
            <div className="relative p-4">
              <div className="flex items-center justify-between">
                <span
                  className="flex h-9 w-9 items-center justify-center rounded-xl"
                  style={{ backgroundColor: `${kpi.color}1f`, color: kpi.color }}
                >
                  <Icon className="h-[18px] w-[18px]" strokeWidth={2} />
                </span>
                <button className="text-faint transition hover:text-muted" aria-label="More">
                  <MoreHorizontal className="h-4 w-4" />
                </button>
              </div>

              <p className="mt-3 text-sm font-medium text-muted">{kpi.label}</p>
              <p className="mt-1 text-[26px] font-bold tabular-nums leading-none tracking-tight text-fg">{kpi.value}</p>

              <div className="mt-2 flex flex-wrap items-center gap-x-1.5 gap-y-0.5 text-xs">
                <span
                  className={`inline-flex items-center gap-0.5 whitespace-nowrap font-semibold ${
                    positive ? 'text-success' : 'text-danger'
                  }`}
                >
                  <TrendIcon className="h-3.5 w-3.5" />
                  {kpi.delta}
                </span>
                <span className="whitespace-nowrap text-subtle">{kpi.compare}</span>
              </div>

              <div className="mt-3 h-11">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={kpi.data.map((v, idx) => ({ i: idx, v }))} margin={{ top: 2, left: 0, right: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id={`kpi-${kpi.key}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={kpi.color} stopOpacity={0.32} />
                        <stop offset="100%" stopColor={kpi.color} stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <Area
                      type="monotone"
                      dataKey="v"
                      stroke={kpi.color}
                      strokeWidth={2}
                      fill={`url(#kpi-${kpi.key})`}
                      isAnimationActive={false}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </Card>
        );
      })}
    </section>
  );
}
