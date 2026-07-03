import { Undo2 } from 'lucide-react';
import { PagePlaceholder } from '@/components/ui/PagePlaceholder';

export default function ReturnsPage() {
  return (
    <PagePlaceholder
      title="Returns"
      description="Handle RMAs, refunds, and reverse logistics in one place."
      icon={Undo2}
      emptyTitle="No return requests yet"
      emptyDescription="When customers request returns, they'll appear here with status, reason codes, and one-click refund actions."
      actionLabel="Create return"
    />
  );
}
