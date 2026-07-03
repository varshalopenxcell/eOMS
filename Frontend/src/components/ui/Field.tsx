import { ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes, InputHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

const controlClassName =
  'mt-2 w-full rounded-xl border border-line bg-field px-4 py-2.5 text-sm text-fg outline-none transition placeholder:text-faint focus:border-brand/60 focus:shadow-focus';

function Label({ children }: { children: ReactNode }) {
  return <span className="block text-sm font-medium text-fg">{children}</span>;
}

export function TextField({ label, className, ...props }: { label: string } & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block">
      <Label>{label}</Label>
      <input className={cn(controlClassName, className)} {...props} />
    </label>
  );
}

export function TextAreaField({
  label,
  className,
  ...props
}: { label: string } & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <label className="block">
      <Label>{label}</Label>
      <textarea className={cn(controlClassName, 'resize-none', className)} {...props} />
    </label>
  );
}

export function SelectField({
  label,
  className,
  children,
  ...props
}: { label: string } & SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <label className="block">
      <Label>{label}</Label>
      <select className={cn(controlClassName, className)} {...props}>
        {children}
      </select>
    </label>
  );
}
