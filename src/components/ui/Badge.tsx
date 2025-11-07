import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-family-sans transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        success:
          'border-transparent ' + 
          'bg-semantic-success-100-on-light' +
          'text-semantic-success-900-on-light' +
          'hover:bg-semantic-success-200-on-light',
        
        warning:
          'border-transparent ' +
          'bg-semantic-warning-100-on-light ' +
          'text-semantic-warning-900-on-light ' +
          'hover:bg-semantic-warning-200-on-light',
        
        default:
          'border-transparent ' +
          'bg-primary-500-on-light ' +
          'text-primary-1200-on-light ' +
          'hover:bg-primary-600-on-light',

        soon:
          'bg-neutral-100-on-light' +
          'text-neutral-900-on-light' +
          'bg-transparent',
        
        outline: 
          'text-neutral-900-on-light  ' +
          'border-color-neutral-400-on-light' +
          'bg-transparent',
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
