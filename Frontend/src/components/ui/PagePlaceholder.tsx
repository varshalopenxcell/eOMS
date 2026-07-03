import { LucideIcon, Plus } from 'lucide-react';
import { Shell } from './Shell';
import { Card } from './Card';
import { EmptyState } from './EmptyState';
import { Button } from './Button';

interface PagePlaceholderProps {
  title: string;
  description: string;
  icon: LucideIcon;
  emptyTitle: string;
  emptyDescription: string;
  actionLabel?: string;
}

export function PagePlaceholder({
  title,
  description,
  icon,
  emptyTitle,
  emptyDescription,
  actionLabel
}: PagePlaceholderProps) {
  return (
    <Shell
      breadcrumbs={[{ label: title }]}
      title={title}
      description={description}
      toolbar={
        actionLabel ? (
          <Button size="md">
            <Plus className="h-4 w-4" />
            {actionLabel}
          </Button>
        ) : undefined
      }
    >
      <Card className="p-2">
        <EmptyState icon={icon} title={emptyTitle} description={emptyDescription} />
      </Card>
    </Shell>
  );
}
