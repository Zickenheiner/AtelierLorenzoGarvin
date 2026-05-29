import { cn } from '@/core/utils/cn';
import { Loader2 } from 'lucide-react';
import * as React from 'react';

interface LoadingStateProps extends React.ComponentProps<'div'> {
  label?: string;
  withSpinner?: boolean;
}

function LoadingState({
  className,
  label = 'Chargement…',
  withSpinner = false,
  ...props
}: LoadingStateProps) {
  return (
    <div
      data-slot="loading-state"
      className={cn(
        'flex min-h-[40vh] items-center justify-center gap-3 text-[13px] text-[var(--lga-muted)]',
        'font-[var(--font-body)]',
        className,
      )}
      {...props}
    >
      {withSpinner ? (
        <Loader2 className="h-4 w-4 animate-spin" strokeWidth={1.5} />
      ) : null}
      <span>{label}</span>
    </div>
  );
}

export { LoadingState };
export type { LoadingStateProps };
