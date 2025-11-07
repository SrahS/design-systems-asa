import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { ChevronRight, Loader2 } from 'lucide-react';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md font-family-sans transition-colors whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none' +
  ' focus-visible:ring-color-primary-500-on-light ',
  {
    variants: {
      variant: {
        primary:
          'bg-primary-800-on-light ' +
          'text-neutral-50-on-light ' +
          'bg-primary-900-on-light hover:bg-primary-800-on-light shadow-md',

        secondary:
          'bg-neutral-200-on-light' +
          'text-neutral-900-on-light' +
          'hover:bg-neutral-300-on-light',

        ghost:
          'hover:bg-neutral-100-on-light' +
          'text-neutral-700-on-light',

        link: 
          'text-primary-700-on-light',
        
        destructive:
          'bg-semantic-error-700-on-light' +
          'text-neutral-50-on-light' +
          'hover:bg-semantic-error-800-on-light',
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
            <Loader2 className="mr-2 h-4 w-4 animate-spin text-white" />
        ) : null}
        {children}
      </button>
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
