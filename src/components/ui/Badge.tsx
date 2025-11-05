import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        success:
          'border-transparent bg-ref-color-semantic-success-100-on-light text-ref-color-semantic-success-900-on-light hover:bg-ref-color-semantic-success-200-on-light',
        
        warning:
          'border-transparent bg-ref-color-semantic-warning-100-on-light text-ref-color-semantic-warning-900-on-light hover:bg-ref-color-semantic-warning-200-on-light',
        
        default:
          'border-transparent bg-ref-color-primary-500-on-light text-ref-color-primary-900-on-light hover:bg-ref-color-primary-600-on-light',

        soon:
          'border-transparent bg-ref-color-neutral-100-on-light text-ref-color-neutral-900-on-light hover:bg-ref-color-neutral-200-on-light',
        
        outline: 'text-foreground border-ref-color-neutral-400-on-light text-ref-color-neutral-900-on-light',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
