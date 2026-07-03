import { Truck } from 'lucide-react';
import { PagePlaceholder } from '@/components/ui/PagePlaceholder';

export default function ShippingPage() {
  return (
    <PagePlaceholder
      title="Shipping"
      description="Configure carriers, rates, labels, and delivery tracking."
      icon={Truck}
      emptyTitle="Set up your first carrier"
      emptyDescription="Connect shipping carriers to generate labels, compare live rates, and give customers real-time tracking updates."
      actionLabel="Connect carrier"
    />
  );
}
