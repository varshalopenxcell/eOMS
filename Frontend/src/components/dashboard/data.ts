import {
  Receipt,
  ShoppingCart,
  Wallet,
  PackageCheck,
  Undo2,
  type LucideIcon
} from 'lucide-react';
import type { BadgeTone } from '@/components/ui/Badge';

export const CHART = {
  brand: '#6366F1',
  amber: '#F59E0B',
  blue: '#0EA5E9',
  green: '#22C55E',
  red: '#EF4444',
  violet: '#8B5CF6',
  slate: '#94A3B8'
};

export type Trend = 'up' | 'down';

export interface Kpi {
  key: string;
  label: string;
  value: string;
  delta: string;
  trend: Trend;
  compare: string;
  icon: LucideIcon;
  color: string;
  data: number[];
}

export const kpis: Kpi[] = [
  {
    key: 'revenue',
    label: 'Revenue',
    value: '$184,2K',
    delta: '12.4%',
    trend: 'up',
    compare: 'vs Nov 1 - Nov 30',
    icon: Receipt,
    color: CHART.brand,
    data: [22, 26, 24, 30, 28, 34, 31, 38, 35, 42, 40, 47, 44, 52]
  },
  {
    key: 'orders',
    label: 'Orders',
    value: '2,840',
    delta: '3.2%',
    trend: 'down',
    compare: 'vs Nov 1 - Nov 30',
    icon: ShoppingCart,
    color: CHART.amber,
    data: [40, 38, 42, 36, 39, 34, 37, 32, 35, 31, 33, 30, 32, 29]
  },
  {
    key: 'aov',
    label: 'Avg. Order Value',
    value: '$64.86',
    delta: '8.7%',
    trend: 'up',
    compare: 'vs Nov 1 - Nov 30',
    icon: Wallet,
    color: CHART.blue,
    data: [30, 32, 31, 35, 34, 38, 40, 39, 44, 46, 45, 50, 52, 55]
  },
  {
    key: 'fulfillment',
    label: 'Fulfillment Rate',
    value: '97.8%',
    delta: '2.7%',
    trend: 'up',
    compare: 'vs Nov 1 - Nov 30',
    icon: PackageCheck,
    color: CHART.green,
    data: [90, 91, 92, 91.5, 93, 94, 93.5, 95, 96, 95.5, 96.5, 97, 97.5, 97.8]
  },
  {
    key: 'return',
    label: 'Return Rate',
    value: '1.78%',
    delta: '0.4%',
    trend: 'up',
    compare: 'vs Nov 1 - Nov 30',
    icon: Undo2,
    color: CHART.red,
    data: [3, 2.6, 2.8, 2.4, 2.7, 2.2, 2.5, 2.1, 2.3, 1.9, 2.1, 1.8, 2.0, 1.78]
  }
];

// 31 days of December for the main revenue chart (30D view)
const days = Array.from({ length: 31 }, (_, i) => i + 1);
const revenueBase = [
  95, 98, 92, 105, 110, 108, 120, 118, 112, 125, 132, 128, 140, 138, 128, 130,
  145, 150, 148, 160, 158, 165, 172, 168, 178, 185, 182, 190, 188, 195, 198
];
const ordersBase = [
  1400, 1450, 1380, 1520, 1600, 1560, 1720, 1680, 1620, 1780, 1850, 1800, 1950, 1900,
  1987, 1820, 2050, 2120, 2080, 2200, 2180, 2260, 2340, 2300, 2420, 2500, 2460, 2580, 2540, 2620, 2680
];

export const revenueSeries = days.map((d) => ({
  day: `Dec ${d}`,
  short: d % 4 === 1 ? `Dec ${d}` : '',
  revenue: revenueBase[d - 1] * 1000,
  orders: ordersBase[d - 1]
}));

export const rangeTabs = ['7D', '30D', '90D', '1Y'] as const;

export const salesByChannel = [
  { name: 'Shopify', value: 77.4 },
  { name: 'Amazon', value: 51.6 },
  { name: 'WooCommerce', value: 29.1 },
  { name: 'eBay', value: 14.7 },
  { name: 'Others', value: 11.4 }
];

export const orderStatus = [
  { name: 'Completed', value: 1856, pct: 65, color: CHART.blue },
  { name: 'Processing', value: 568, pct: 20, color: CHART.amber },
  { name: 'Pending', value: 227, pct: 8, color: CHART.violet },
  { name: 'Shipped', value: 142, pct: 5, color: CHART.green },
  { name: 'Cancelled', value: 47, pct: 2, color: CHART.red }
];

export const regions = [
  { name: 'North America', value: 82, revenue: '$96.4K' },
  { name: 'Europe', value: 64, revenue: '$52.1K' },
  { name: 'Asia Pacific', value: 48, revenue: '$24.8K' },
  { name: 'Latin America', value: 26, revenue: '$8.3K' },
  { name: 'Middle East & Africa', value: 14, revenue: '$2.6K' }
];

export const monthlyComparison = [
  { week: 'Week 1', current: 38, previous: 32 },
  { week: 'Week 2', current: 52, previous: 44 },
  { week: 'Week 3', current: 46, previous: 50 },
  { week: 'Week 4', current: 64, previous: 55 },
  { week: 'Week 5', current: 72, previous: 61 }
];

export interface Order {
  id: string;
  customer: string;
  amount: string;
  status: string;
  tone: BadgeTone;
}

export const recentOrders: Order[] = [
  { id: '#ORD-10432', customer: 'John Doe', amount: '$129.99', status: 'Completed', tone: 'success' },
  { id: '#ORD-10431', customer: 'Jane Smith', amount: '$249.00', status: 'Processing', tone: 'info' },
  { id: '#ORD-10430', customer: 'Robert Brown', amount: '$89.50', status: 'Shipped', tone: 'primary' },
  { id: '#ORD-10429', customer: 'Emily Davis', amount: '$159.00', status: 'Pending', tone: 'warning' },
  { id: '#ORD-10428', customer: 'Michael Lee', amount: '$299.00', status: 'Completed', tone: 'success' }
];

export const topChannels = [
  { name: 'Shopify', pct: 42, color: CHART.brand },
  { name: 'Amazon', pct: 28, color: CHART.amber },
  { name: 'WooCommerce', pct: 16, color: CHART.blue },
  { name: 'eBay', pct: 8, color: CHART.violet },
  { name: 'Others', pct: 6, color: CHART.slate }
];

export interface Alert {
  title: string;
  detail: string;
  tone: BadgeTone;
}

export const alerts: Alert[] = [
  { title: '5 orders require attention', detail: 'High priority orders pending', tone: 'danger' },
  { title: 'Low stock alert', detail: '12 products are running low', tone: 'warning' },
  { title: 'Payment failed', detail: '3 payments need attention', tone: 'info' }
];
