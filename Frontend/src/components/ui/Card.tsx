import { HTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /** Adds a hover lift + shadow, for cards that behave like entry points. */
  interactive?: boolean;
}

const Card = forwardRef<HTMLDivElement, CardProps>(({ className, interactive, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'rounded-2xl border border-line bg-surface shadow-card transition duration-200',
      interactive && 'hover:-translate-y-0.5 hover:border-line-strong hover:shadow-lift',
      className
    )}
    {...props}
  />
));
Card.displayName = 'Card';

const CardHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('flex items-center justify-between gap-4 p-5', className)} {...props} />
));
CardHeader.displayName = 'CardHeader';

const CardBody = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('p-5 pt-0', className)} {...props} />
));
CardBody.displayName = 'CardBody';

export { Card, CardHeader, CardBody };
