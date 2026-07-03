import { HTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

type BadgeTone = 'neutral' | 'primary' | 'success' | 'warning' | 'danger' | 'info';

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: BadgeTone;
  /** Adds a leading status dot for live/state indicators. */
  dot?: boolean;
}

const toneStyles: Record<BadgeTone, string> = {
  neutral: 'bg-surface-2 text-muted ring-1 ring-inset ring-line',
  primary: 'bg-brand-soft text-brand-fg ring-1 ring-inset ring-brand/20',
  success: 'bg-success-soft text-success-fg ring-1 ring-inset ring-success/20',
  warning: 'bg-warning-soft text-warning-fg ring-1 ring-inset ring-warning/20',
  danger: 'bg-danger-soft text-danger-fg ring-1 ring-inset ring-danger/20',
  info: 'bg-info-soft text-info-fg ring-1 ring-inset ring-info/20'
};

const dotStyles: Record<BadgeTone, string> = {
  neutral: 'bg-faint',
  primary: 'bg-brand',
  success: 'bg-success',
  warning: 'bg-warning',
  danger: 'bg-danger',
  info: 'bg-info'
};

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(({ className, tone = 'neutral', dot, children, ...props }, ref) => (
  <span
    ref={ref}
    className={cn(
      'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold tracking-[0.01em]',
      toneStyles[tone],
      className
    )}
    {...props}
  >
    {dot ? <span className={cn('h-1.5 w-1.5 rounded-full', dotStyles[tone])} /> : null}
    {children}
  </span>
));
Badge.displayName = 'Badge';

export { Badge };
export type { BadgeTone };
