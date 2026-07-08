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
import { DashboardToolbar } from '@/components/dashboard/DashboardToolbar';

export default function DashboardPage() {
  return (
    <Shell
      breadcrumbs={[{ label: 'Dashboard', href: '/dashboard' }]}
      title="Overview"
      description="Real-time snapshot of your order operations and business performance."
      toolbar={<DashboardToolbar />}
    >
      <div className="flex flex-col gap-5">
        {/* KPI row — full content width so all five cards have room */}
        <KpiCards />

        <div className="grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1fr)_360px]">
          {/* Primary column */}
          <div className="flex min-w-0 flex-col gap-5">
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
      </div>
    </Shell>
  );
}
