import { LucideIcon } from 'lucide-react';
import { ArrowDownRight, ArrowUpRight } from 'lucide-react';
import { Card } from './Card';

export type StatTone = 'brand' | 'success' | 'warning' | 'danger' | 'info' | 'violet';

const toneColor: Record<StatTone, string> = {
  brand: '#6366F1',
  success: '#10B981',
  warning: '#F59E0B',
  danger: '#EF4444',
  info: '#0EA5E9',
  violet: '#8B5CF6'
};

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
  hint?: string;
  delta?: string;
  trend?: 'up' | 'down';
  tone?: StatTone;
}

/** Compact KPI tile used across the operational modules. */
export function StatCard({ icon: Icon, label, value, hint, delta, trend = 'up', tone = 'brand' }: StatCardProps) {
  const color = toneColor[tone];
  const positive = trend === 'up';
  const TrendIcon = positive ? ArrowUpRight : ArrowDownRight;

  return (
    <Card className="relative overflow-hidden p-4">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-20 opacity-[0.06]"
        style={{ background: `linear-gradient(180deg, ${color}, transparent)` }}
      />
      <div className="relative">
        <span
          className="flex h-9 w-9 items-center justify-center rounded-xl"
          style={{ backgroundColor: `${color}1f`, color }}
        >
          <Icon className="h-[18px] w-[18px]" strokeWidth={2} />
        </span>
        <p className="mt-3 text-sm font-medium text-muted">{label}</p>
        <p className="mt-1 text-2xl font-bold leading-none tracking-tight tabular-nums text-fg">{value}</p>
        <div className="mt-2 flex items-center gap-1.5 text-xs">
          {delta ? (
            <span className={`inline-flex items-center gap-0.5 font-semibold ${positive ? 'text-success' : 'text-danger'}`}>
              <TrendIcon className="h-3.5 w-3.5" />
              {delta}
            </span>
          ) : null}
          {hint ? <span className="text-subtle">{hint}</span> : null}
        </div>
      </div>
    </Card>
  );
}
