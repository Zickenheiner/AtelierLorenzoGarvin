import { cn } from '@/core/utils/cn';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

const cardVariants = cva('bg-white', {
  variants: {
    elevation: {
      none: '',
      sm: 'shadow-[0_4px_24px_rgba(0,0,0,0.04)]',
      md: 'shadow-[0_4px_24px_rgba(0,0,0,0.06)]',
    },
    radius: {
      none: '',
      sm: 'rounded-sm',
      md: 'rounded-md',
    },
    padding: {
      none: '',
      sm: 'p-5',
      md: 'p-6',
      lg: 'p-8',
      xl: 'p-10',
    },
  },
  defaultVariants: {
    elevation: 'md',
    radius: 'sm',
    padding: 'lg',
  },
});

interface CardProps
  extends React.ComponentProps<'div'>, VariantProps<typeof cardVariants> {}

function Card({ className, elevation, radius, padding, ...props }: CardProps) {
  return (
    <div
      data-slot="card"
      className={cn(cardVariants({ elevation, radius, padding, className }))}
      {...props}
    />
  );
}

export { Card, cardVariants };
export type { CardProps };
