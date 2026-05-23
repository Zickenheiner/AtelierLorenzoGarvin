import { cn } from '@/core/utils/cn';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

const headingVariants = cva(
  'tracking-[-0.02em] text-[var(--lga-ink)] font-[var(--font-display)]',
  {
    variants: {
      level: {
        h1: 'text-[28px] leading-[36px] font-medium sm:text-[32px] sm:leading-[40px]',
        h2: 'text-[24px] leading-8 font-medium sm:text-[28px] lg:text-[30px] lg:leading-9',
        h3: 'text-[20px] leading-7 font-medium sm:text-[22px]',
      },
      size: {
        default: '',
        hero: 'text-[40px] leading-[1.05] tracking-[-0.03em] sm:text-[52px] lg:text-[64px]',
        display:
          'text-[44px] leading-[1.05] uppercase sm:text-[56px] font-normal',
      },
    },
    defaultVariants: {
      level: 'h1',
      size: 'default',
    },
  },
);

type HeadingLevel = 'h1' | 'h2' | 'h3';

interface HeadingProps
  extends
    Omit<React.ComponentProps<'h1'>, 'level'>,
    VariantProps<typeof headingVariants> {
  as?: HeadingLevel;
}

function Heading({
  className,
  level = 'h1',
  size,
  as,
  ...props
}: HeadingProps) {
  const Tag = (as ?? level ?? 'h1') as HeadingLevel;
  return (
    <Tag
      data-slot="heading"
      data-level={level}
      data-size={size}
      className={cn(headingVariants({ level, size, className }))}
      {...props}
    />
  );
}

export { Heading, headingVariants };
export type { HeadingProps };
