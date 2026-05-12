"use client";

import type { HTMLAttributes, Ref } from "react";
import { cn } from "@/design-system/utils/cn";
import { cardVariants, type CardVariants } from "./Card.variants";

type CardProps = HTMLAttributes<HTMLDivElement> &
  CardVariants & {
    ref?: Ref<HTMLDivElement>;
  };

export const Card = ({
  className,
  variant,
  padding,
  interactive,
  onClick,
  children,
  ref,
  ...props
}: CardProps) => {
  const isInteractive = interactive ?? Boolean(onClick);

  return (
    <div
      ref={ref}
      role={isInteractive ? "button" : undefined}
      tabIndex={isInteractive ? 0 : undefined}
      onClick={onClick}
      className={cn(
        cardVariants({ variant, padding, interactive: isInteractive }),
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export { cardVariants };
export type { CardProps };
