import { BarChart3 } from 'lucide-react';
import { PagePlaceholder } from '@/components/ui/PagePlaceholder';

export default function AnalyticsPage() {
  return (
    <PagePlaceholder
      title="Analytics"
      description="Deep-dive dashboards for revenue, cohorts, and channel performance."
      icon={BarChart3}
      emptyTitle="Build your first analytics view"
      emptyDescription="Create custom dashboards and saved segments to explore trends across products, channels, and customer cohorts."
      actionLabel="New dashboard"
    />
  );
}
