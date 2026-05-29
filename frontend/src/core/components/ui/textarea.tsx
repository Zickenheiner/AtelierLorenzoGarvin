import { cn } from '@/core/utils/cn';
import * as React from 'react';

type TextareaProps = React.ComponentProps<'textarea'>;

function Textarea({ className, ...props }: TextareaProps) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        'w-full border border-[#c6c6c6] bg-transparent p-3 text-[15px] leading-[1.6] text-[var(--lga-ink)]',
        'placeholder:text-[var(--lga-muted)]',
        'focus:border-[var(--lga-ink)] focus:outline-none transition-colors',
        'aria-invalid:border-red-400 aria-invalid:focus:border-red-500',
        'disabled:cursor-not-allowed disabled:opacity-50',
        'font-[var(--font-body)]',
        className,
      )}
      {...props}
    />
  );
}

export { Textarea };
export type { TextareaProps };
