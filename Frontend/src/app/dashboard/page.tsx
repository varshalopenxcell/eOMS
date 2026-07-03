import { Calendar, SlidersHorizontal } from 'lucide-react';
import { Shell } from '@/components/ui/Shell';
import { KpiCards } from '@/components/dashboard/KpiCards';
import { RevenueChart } from '@/components/dashboard/RevenueChart';
import {
  MonthlyComparison,
  OrderStatusBreakdown,
  RevenueByRegion,
  SalesByChannel
} from '@/components/dashboard/BottomCharts';
import { AlertsPanel, QuickActions, RecentOrders, TopChannels } from '@/components/dashboard/Insights';

function Toolbar() {
  return (
    <>
      <button className="inline-flex items-center gap-2 rounded-xl border border-line bg-surface px-3.5 py-2.5 text-sm font-medium text-fg shadow-xs transition hover:border-line-strong">
        <Calendar className="h-4 w-4 text-muted" />
        Dec 1 - Dec 31, 2024
      </button>
      <button className="inline-flex items-center gap-2 rounded-xl border border-line bg-surface px-3.5 py-2.5 text-sm font-medium text-fg shadow-xs transition hover:border-line-strong">
        <SlidersHorizontal className="h-4 w-4 text-muted" />
        Filters
      </button>
    </>
  );
}

export default function DashboardPage() {
  return (
    <Shell
      breadcrumbs={[{ label: 'Dashboard', href: '/dashboard' }]}
      title="Overview"
      description="Real-time snapshot of your order operations and business performance."
      toolbar={<Toolbar />}
    >
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1fr)_360px]">
        {/* Primary column */}
        <div className="flex min-w-0 flex-col gap-5">
          <KpiCards />
          <RevenueChart />
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
            <SalesByChannel />
            <OrderStatusBreakdown />
            <RevenueByRegion />
            <MonthlyComparison />
          </div>
        </div>

        {/* Insights sidebar */}
        <aside className="flex flex-col gap-5">
          <RecentOrders />
          <TopChannels />
          <AlertsPanel />
          <QuickActions />
        </aside>
      </div>
    </Shell>
  );
}
