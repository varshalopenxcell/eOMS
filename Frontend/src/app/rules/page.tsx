import { SlidersHorizontal } from 'lucide-react';
import { PagePlaceholder } from '@/components/ui/PagePlaceholder';

export default function RulesPage() {
  return (
    <PagePlaceholder
      title="Rules"
      description="Define conditional business rules for pricing, tax, and fraud."
      icon={SlidersHorizontal}
      emptyTitle="No rules defined yet"
      emptyDescription="Set up if-this-then-that rules for discounts, fraud screening, tax handling, and inventory allocation."
      actionLabel="Add rule"
    />
  );
}
