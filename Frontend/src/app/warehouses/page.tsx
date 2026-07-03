import { Warehouse } from 'lucide-react';
import { PagePlaceholder } from '@/components/ui/PagePlaceholder';

export default function WarehousesPage() {
  return (
    <PagePlaceholder
      title="Warehouses"
      description="Manage fulfillment locations, zones, and routing rules."
      icon={Warehouse}
      emptyTitle="No warehouses configured"
      emptyDescription="Add your first fulfillment location to enable multi-warehouse routing, capacity planning, and stock transfers."
      actionLabel="Add warehouse"
    />
  );
}
