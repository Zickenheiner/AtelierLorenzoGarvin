import { cn } from '@/core/utils/cn';
import { cva, type VariantProps } from 'class-variance-authority';
import { Slot } from 'radix-ui';
import * as React from 'react';

const buttonVariants = cva(
  [
    'inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap uppercase tracking-[0.2em] transition-opacity outline-none',
    'disabled:pointer-events-none disabled:opacity-50',
    '[&_svg]:pointer-events-none [&_svg]:shrink-0',
    'font-[var(--font-body)]',
  ].join(' '),
  {
    variants: {
      variant: {
        primary: 'bg-black text-white font-bold hover:opacity-85',
        secondary:
          'border border-[var(--lga-ink)] bg-transparent text-[var(--lga-ink)] font-bold hover:opacity-70',
        ghost:
          'border border-[#c6c6c6] bg-transparent text-[var(--lga-muted)] font-semibold hover:border-[var(--lga-ink)] hover:text-[var(--lga-ink)]',
        destructive: 'bg-red-600 text-white font-bold hover:opacity-85',
        link: 'border-b border-[var(--lga-ink)] bg-transparent text-[var(--lga-ink)] font-bold pb-1 hover:opacity-70',
      },
      size: {
        default: 'h-[44px] px-6 text-[12px]',
        sm: 'h-[40px] px-5 text-[11px]',
        xs: 'h-[36px] px-4 text-[10px]',
        icon: 'h-[44px] w-[44px] text-[12px]',
        'icon-sm': 'h-[36px] w-[36px] text-[10px]',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
    },
  },
);

interface ButtonProps
  extends React.ComponentProps<'button'>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot.Root : 'button';
  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
export type { ButtonProps };
