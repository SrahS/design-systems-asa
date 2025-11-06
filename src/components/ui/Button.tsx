import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { ChevronRight, Loader2 } from 'lucide-react';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md font-family-sans transition-colors whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none' +
  ' focus-visible:ring-color-primary-500-on-light dark:focus-visible:ring-color-primary-dark-500-on-dark',
  {
    variants: {
      variant: {
        primary:
          'bg-color-primary-800-on-light dark:bg-color-primary-dark-600-on-dark ' +
          'text-color-neutral-50-on-light dark:text-color-neutral-50-on-dark ' +
          'hover:bg-color-primary-900-on-light dark:hover:bg-color-primary-dark-700-on-dark shadow-md',

        secondary:
          'bg-color-neutral-200-on-light dark:bg-color-neutral-900-on-dark ' +
          'text-color-neutral-900-on-light dark:text-color-neutral-100-on-dark ' +
          'hover:bg-color-neutral-300-on-light dark:hover:bg-color-neutral-800-on-dark',

        ghost:
          'hover:bg-color-neutral-100-on-light dark:hover:bg-color-neutral-900-on-dark ' +
          'text-color-neutral-700-on-light dark:text-color-neutral-300-on-dark',

        link: 
          'text-color-primary-700-on-light dark:text-color-primary-dark-400-on-dark underline-offset-4 hover:underline',
        
        destructive:
          'bg-color-semantic-error-700-on-light dark:bg-color-semantic-error-600-on-dark ' +
          'text-color-neutral-50-on-light dark:text-color-neutral-50-on-dark ' +
          'hover:bg-color-semantic-error-800-on-light dark:hover:bg-color-semantic-error-700-on-dark shadow-md',
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
