import { cn } from '@/core/utils/cn';
import * as React from 'react';

type LabelProps = React.ComponentProps<'label'>;

function Label({ className, ...props }: LabelProps) {
  return (
    <label
      data-slot="label"
      className={cn(
        'mb-1 text-[11px] font-semibold tracking-[0.2em] text-[var(--lga-muted)] uppercase',
        'font-[var(--font-body)]',
        className,
      )}
      {...props}
    />
  );
}

export { Label };
export type { LabelProps };
