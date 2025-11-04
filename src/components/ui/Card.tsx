import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const cardVariants = cva(
  'rounded-xl p-6 transition-all duration-300',
  {
    variants: {
      variant: {
        default:
          'bg-ref-color-neutral-50-on-light shadow-level-1 border border-transparent',

        elevated:
          'bg-ref-color-neutral-50-on-light shadow-level-3 hover:shadow-level-4 transition-shadow border border-transparent',

        outline:
          'bg-ref-color-neutral-50-on-light border border-ref-color-neutral-300-on-light shadow-level-0 hover:border-ref-color-neutral-400-on-light',
        
        primary: 
          'bg-ref-color-primary-50-on-light shadow-level-2 border border-ref-color-primary-400-on-light'
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
        onClick?: () => void;
    }

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, onClick, children, ...props }, ref) => {
    return (
      <div
        className={cn(cardVariants({ variant }), onClick ? 'cursor-pointer' : '', className)}
        ref={ref}
        onClick={onClick}
        {...props}
      >
        {children}
      </div>
    );
  }
);
Card.displayName = 'Card';

export { Card };

