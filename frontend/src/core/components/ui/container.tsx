import { cn } from '@/core/utils/cn';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

const containerVariants = cva('mx-auto w-full', {
  variants: {
    size: {
      sm: 'max-w-[640px]',
      md: 'max-w-[860px]',
      lg: 'max-w-[1216px]',
      xl: 'max-w-[1280px]',
    },
  },
  defaultVariants: {
    size: 'lg',
  },
});

interface ContainerProps
  extends React.ComponentProps<'div'>, VariantProps<typeof containerVariants> {}

function Container({ className, size, ...props }: ContainerProps) {
  return (
    <div
      data-slot="container"
      className={cn(containerVariants({ size, className }))}
      {...props}
    />
  );
}

export { Container, containerVariants };
export type { ContainerProps };
