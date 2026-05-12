import type { HTMLAttributes, Ref } from "react";
import { cn } from "@/design-system/utils/cn";
import { badgeVariants, type BadgeVariants } from "./Badge.variants";

type BadgeProps = HTMLAttributes<HTMLSpanElement> &
  BadgeVariants & {
    ref?: Ref<HTMLSpanElement>;
  };

export const Badge = ({
  className,
  variant,
  children,
  ref,
  ...props
}: BadgeProps) => {
  return (
    <span
      ref={ref}
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    >
      {children}
    </span>
  );
};

export { badgeVariants };
export type { BadgeProps };
