import { cn } from '@/core/utils/cn';
import * as React from 'react';

type ErrorAlertProps = React.ComponentProps<'div'>;

function ErrorAlert({ className, children, ...props }: ErrorAlertProps) {
  if (!children) return null;
  return (
    <div
      role="alert"
      data-slot="error-alert"
      className={cn(
        'rounded-sm border border-red-200 bg-red-50 px-4 py-2 text-[13px] text-red-600',
        'font-[var(--font-body)]',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export { ErrorAlert };
export type { ErrorAlertProps };
