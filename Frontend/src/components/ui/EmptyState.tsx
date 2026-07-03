import { ReactNode } from 'react';
import { LucideIcon } from 'lucide-react';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: ReactNode;
}

export function EmptyState({ icon: Icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="relative flex flex-col items-center gap-5 overflow-hidden rounded-2xl border border-dashed border-line bg-surface-2 px-6 py-20 text-center">
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-40 [mask-image:radial-gradient(60%_60%_at_50%_40%,black,transparent)]" />
      <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-gradient text-white shadow-glow">
        <Icon className="h-6 w-6" strokeWidth={1.75} />
      </div>
      <div className="relative max-w-sm space-y-2">
        <p className="text-base font-semibold text-fg">{title}</p>
        <p className="text-sm leading-relaxed text-muted">{description}</p>
      </div>
      {action ? <div className="relative">{action}</div> : null}
    </div>
  );
}
