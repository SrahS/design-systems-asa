"use client";

import type { ButtonHTMLAttributes, ReactNode, Ref } from "react";
import { cn } from "@/design-system/utils/cn";
import { buttonVariants, type ButtonVariants } from "./Button.variants";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  ButtonVariants & {
    isLoading?: boolean;
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
    ref?: Ref<HTMLButtonElement>;
  };

export const Button = ({
  className,
  variant,
  size,
  isLoading = false,
  leftIcon,
  rightIcon,
  disabled,
  children,
  ref,
  ...props
}: ButtonProps) => {
  return (
    <button
      ref={ref}
      className={cn(buttonVariants({ variant, size }), className)}
      disabled={disabled || isLoading}
      aria-busy={isLoading || undefined}
      {...props}
    >
      {isLoading ? (
        <Spinner />
      ) : leftIcon ? (
        <span aria-hidden="true" className="inline-flex shrink-0">
          {leftIcon}
        </span>
      ) : null}
      {children}
      {!isLoading && rightIcon ? (
        <span aria-hidden="true" className="inline-flex shrink-0">
          {rightIcon}
        </span>
      ) : null}
    </button>
  );
};

const Spinner = () => (
  <span
    aria-hidden="true"
    className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
  />
);

export { buttonVariants };
export type { ButtonProps };
