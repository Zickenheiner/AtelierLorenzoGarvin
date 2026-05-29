import { cn } from '@/core/utils/cn';
import * as React from 'react';

type SectionTitleProps = React.ComponentProps<'h2'>;

function SectionTitle({ className, ...props }: SectionTitleProps) {
  return (
    <h2
      data-slot="section-title"
      className={cn(
        'text-[14px] font-bold tracking-[0.2em] text-[var(--lga-ink)] uppercase',
        'font-[var(--font-body)]',
        className,
      )}
      {...props}
    />
  );
}

export { SectionTitle };
export type { SectionTitleProps };
