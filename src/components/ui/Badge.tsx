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
          'bg-primary-semantic-success-100-on-light dark:bg-primary-semantic-success-900-on-dark ' +
          'text-semantic-success-900-on-light dark:text-semantic-success-200-on-dark ' +
          'hover:bg-primary-semantic-success-200-on-light dark:hover:bg-primary-semantic-success-800-on-dark',
        
        warning:
          'border-transparent ' +
          'bg-primary-semantic-warning-100-on-light dark:bg-primary-semantic-warning-900-on-dark ' +
          'text-semantic-warning-900-on-light dark:text-semantic-warning-200-on-dark ' +
          'hover:bg-primary-semantic-warning-200-on-light dark:hover:bg-primary-semantic-warning-800-on-dark',
        
        default:
          'border-transparent ' +
          'bg-primary-primary-500-on-light dark:bg-primary-primary-dark-600-on-dark ' +
          'text-primary-1200-on-light dark:text-primary-dark-400-on-dark ' +
          'hover:bg-primary-primary-600-on-light dark:hover:bg-primary-primary-dark-500-on-dark',

        soon:
          'border-transparent ' +
          'bg-primary-neutral-100-on-light dark:bg-primary-neutral-900-on-dark ' +
          'text-neutral-900-on-light dark:text-neutral-100-on-dark ' +
          'hover:bg-primary-neutral-200-on-light dark:hover:bg-primary-neutral-800-on-dark',
        
        outline: 
          'text-neutral-900-on-light dark:text-neutral-100-on-dark ' +
          'border-color-neutral-400-on-light dark:border-color-neutral-600-on-dark ' +
          'bg-transparent dark:bg-primary-neutral-950-on-dark',
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
