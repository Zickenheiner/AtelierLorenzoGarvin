import { cn } from '@/core/utils/cn';
import * as React from 'react';
import { Label } from './label';

interface FieldProps {
  label?: string;
  htmlFor?: string;
  error?: string;
  hint?: string;
  className?: string;
  children: React.ReactNode;
}

function Field({
  label,
  htmlFor,
  error,
  hint,
  className,
  children,
}: FieldProps) {
  return (
    <div data-slot="field" className={cn('flex flex-col', className)}>
      {label ? <Label htmlFor={htmlFor}>{label}</Label> : null}
      {children}
      {hint && !error ? <FieldHint>{hint}</FieldHint> : null}
      {error ? <FieldError>{error}</FieldError> : null}
    </div>
  );
}

function FieldHint({ className, ...props }: React.ComponentProps<'span'>) {
  return (
    <span
      data-slot="field-hint"
      className={cn('mt-1 text-[11px] text-[var(--lga-muted)]', className)}
      {...props}
    />
  );
}

function FieldError({ className, ...props }: React.ComponentProps<'span'>) {
  return (
    <span
      data-slot="field-error"
      className={cn('mt-1 text-[12px] text-red-500', className)}
      {...props}
    />
  );
}

export { Field, FieldError, FieldHint };
export type { FieldProps };
