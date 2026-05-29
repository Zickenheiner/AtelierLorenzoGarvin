import { cn } from '@/core/utils/cn';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

const sectionVariants = cva('w-full', {
  variants: {
    background: {
      bg: 'bg-[var(--lga-bg)]',
      surface: 'bg-[var(--lga-surface)]',
      transparent: 'bg-transparent',
    },
    padding: {
      none: '',
      sides: 'px-6 sm:px-8',
      block: 'py-16 sm:py-20 lg:py-24',
      both: 'px-6 py-16 sm:px-8 sm:py-20 lg:py-24',
    },
  },
  defaultVariants: {
    background: 'bg',
    padding: 'sides',
  },
});

interface SectionProps
  extends
    React.ComponentProps<'section'>,
    VariantProps<typeof sectionVariants> {}

function Section({ className, background, padding, ...props }: SectionProps) {
  return (
    <section
      data-slot="section"
      className={cn(sectionVariants({ background, padding, className }))}
      {...props}
    />
  );
}

export { Section, sectionVariants };
export type { SectionProps };
