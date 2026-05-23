import { cn } from '@/core/utils/cn';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

const inputVariants = cva(
  [
    'w-full bg-transparent text-[var(--lga-ink)]',
    'placeholder:text-[var(--lga-muted)]',
    'focus:outline-none transition-colors',
    'aria-invalid:border-red-400 aria-invalid:focus:border-red-500',
    'disabled:cursor-not-allowed disabled:opacity-50',
    'font-[var(--font-body)]',
  ].join(' '),
  {
    variants: {
      variant: {
        underline:
          'border-0 border-b border-[#c6c6c6] py-3 text-[15px] tracking-[0.02em] focus:border-[var(--lga-ink)]',
        bordered:
          'border border-[#c6c6c6] p-3 text-[15px] focus:border-[var(--lga-ink)]',
      },
    },
    defaultVariants: {
      variant: 'underline',
    },
  },
);

interface InputProps
  extends React.ComponentProps<'input'>, VariantProps<typeof inputVariants> {}

function Input({ className, variant, type = 'text', ...props }: InputProps) {
  return (
    <input
      type={type}
      data-slot="input"
      data-variant={variant}
      className={cn(inputVariants({ variant, className }))}
      {...props}
    />
  );
}

export { Input, inputVariants };
export type { InputProps };
