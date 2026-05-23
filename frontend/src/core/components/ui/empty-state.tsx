import { cn } from '@/core/utils/cn';
import * as React from 'react';

interface EmptyStateProps extends React.ComponentProps<'div'> {
  message: string;
  action?: React.ReactNode;
}

function EmptyState({ className, message, action, ...props }: EmptyStateProps) {
  return (
    <div
      data-slot="empty-state"
      className={cn(
        'flex min-h-[40vh] flex-col items-center justify-center gap-4 rounded-sm bg-white p-10 text-center shadow-[0_4px_24px_rgba(0,0,0,0.04)]',
        className,
      )}
      {...props}
    >
      <p
        className="text-[15px] text-[var(--lga-ink)]"
        style={{ fontFamily: 'var(--font-body)' }}
      >
        {message}
      </p>
      {action}
    </div>
  );
}

export { EmptyState };
export type { EmptyStateProps };
