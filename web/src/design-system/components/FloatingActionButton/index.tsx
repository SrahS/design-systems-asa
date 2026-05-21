"use client";

import type { ButtonHTMLAttributes, ReactNode, Ref } from "react";
import { cn } from "@/design-system/utils/cn";
import {
  floatingActionButtonVariants,
  type FloatingActionButtonVariants,
} from "./FloatingActionButton.variants";

type FloatingActionButtonProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "aria-label"
> &
  FloatingActionButtonVariants & {
    "aria-label": string;
    icon: ReactNode;
    ref?: Ref<HTMLButtonElement>;
  };

export const FloatingActionButton = ({
  className,
  size,
  position,
  icon,
  ref,
  ...props
}: FloatingActionButtonProps) => {
  return (
    <button
      ref={ref}
      type="button"
      className={cn(
        floatingActionButtonVariants({ size, position }),
        className
      )}
      {...props}
    >
      <span aria-hidden="true" className="inline-flex">
        {icon}
      </span>
    </button>
  );
};

export { floatingActionButtonVariants };
export type { FloatingActionButtonProps };
