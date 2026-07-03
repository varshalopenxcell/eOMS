import { Workflow } from 'lucide-react';
import { PagePlaceholder } from '@/components/ui/PagePlaceholder';

export default function WorkflowsPage() {
  return (
    <PagePlaceholder
      title="Workflows"
      description="Automate order routing, notifications, and fulfillment steps."
      icon={Workflow}
      emptyTitle="Create your first workflow"
      emptyDescription="Build no-code automations that trigger on order events — route by region, auto-tag, notify teams, and more."
      actionLabel="New workflow"
    />
  );
}
