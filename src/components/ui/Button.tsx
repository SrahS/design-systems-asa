import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { ChevronRight, Loader2 } from 'lucide-react';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md font-medium transition-colors whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ref-color-primary-500-on-light focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none',
  {
    variants: {
      variant: {
        primary:
          'bg-ref-color-primary-800-on-light text-ref-color-neutral-50-on-light hover:bg-ref-color-primary-900-on-light shadow-md',

        secondary:
          'bg-ref-color-neutral-200-on-light text-ref-color-neutral-900-on-light hover:bg-ref-color-neutral-300-on-light',

        ghost:
          'hover:bg-ref-color-neutral-100-on-light text-ref-color-neutral-700-on-light',

        link: 'text-ref-color-primary-700-on-light underline-offset-4 hover:underline',
        
        destructive:
          'bg-ref-color-semantic-error-700-on-light text-ref-color-neutral-50-on-light hover:bg-ref-color-semantic-error-800-on-light shadow-md',
      },
      size: {
        default: 'h-10 px-4 py-2 text-body-md',
        sm: 'h-9 rounded-sm px-3 text-body-sm',
        lg: 'h-11 rounded-lg px-8 text-body-lg',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
      isLoading?: boolean;
    }

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, children, isLoading = false, disabled, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size }), className)}
        ref={ref}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : null}
        {children}
      </button>
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };

