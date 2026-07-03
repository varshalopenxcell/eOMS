import { Plug } from 'lucide-react';
import { PagePlaceholder } from '@/components/ui/PagePlaceholder';

export default function IntegrationsPage() {
  return (
    <PagePlaceholder
      title="Integrations"
      description="Connect storefronts, marketplaces, ERPs, and payment providers."
      icon={Plug}
      emptyTitle="Connect your first integration"
      emptyDescription="Sync orders and inventory with Shopify, Amazon, WooCommerce, and more — bi-directional and real-time."
      actionLabel="Browse integrations"
    />
  );
}
