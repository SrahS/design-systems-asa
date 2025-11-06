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
          'bg-color-semantic-success-100-on-light dark:bg-color-semantic-success-900-on-dark ' +
          'text-color-semantic-success-900-on-light dark:text-color-semantic-success-200-on-dark ' +
          'hover:bg-color-semantic-success-200-on-light dark:hover:bg-color-semantic-success-800-on-dark',
        
        warning:
          'border-transparent ' +
          'bg-color-semantic-warning-100-on-light dark:bg-color-semantic-warning-900-on-dark ' +
          'text-color-semantic-warning-900-on-light dark:text-color-semantic-warning-200-on-dark ' +
          'hover:bg-color-semantic-warning-200-on-light dark:hover:bg-color-semantic-warning-800-on-dark',
        
        default:
          'border-transparent ' +
          'bg-color-primary-500-on-light dark:bg-color-primary-dark-600-on-dark ' +
          'text-color-primary-900-on-light dark:text-color-primary-dark-400-on-dark ' +
          'hover:bg-color-primary-600-on-light dark:hover:bg-color-primary-dark-500-on-dark',

        soon:
          'border-transparent ' +
          'bg-color-neutral-100-on-light dark:bg-color-neutral-900-on-dark ' +
          'text-color-neutral-900-on-light dark:text-color-neutral-100-on-dark ' +
          'hover:bg-color-neutral-200-on-light dark:hover:bg-color-neutral-800-on-dark',
        
        outline: 
          'text-color-neutral-900-on-light dark:text-color-neutral-100-on-dark ' +
          'border-color-neutral-400-on-light dark:border-color-neutral-600-on-dark ' +
          'bg-transparent dark:bg-color-neutral-950-on-dark',
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
