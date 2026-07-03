import { Boxes } from 'lucide-react';
import { PagePlaceholder } from '@/components/ui/PagePlaceholder';

export default function InventoryPage() {
  return (
    <PagePlaceholder
      title="Inventory"
      description="Track stock levels, low-stock thresholds, and replenishment across locations."
      icon={Boxes}
      emptyTitle="Inventory tracking is coming online"
      emptyDescription="Connect a warehouse or product feed to see real-time stock counts, reorder points, and variance reports here."
      actionLabel="Add stock item"
    />
  );
}
