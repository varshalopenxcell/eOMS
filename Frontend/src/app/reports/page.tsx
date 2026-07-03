import { FileText } from 'lucide-react';
import { PagePlaceholder } from '@/components/ui/PagePlaceholder';

export default function ReportsPage() {
  return (
    <PagePlaceholder
      title="Reports"
      description="Schedule, export, and share operational and financial reports."
      icon={FileText}
      emptyTitle="No reports generated yet"
      emptyDescription="Generate scheduled or on-demand reports for sales, tax, inventory, and fulfillment — exportable as CSV or PDF."
      actionLabel="Generate report"
    />
  );
}
