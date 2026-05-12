import type { HTMLAttributes, Ref } from "react";
import { cn } from "@/design-system/utils/cn";
import {
  screenContainerVariants,
  type ScreenContainerVariants,
} from "./ScreenContainer.variants";

type ScreenContainerProps = HTMLAttributes<HTMLDivElement> &
  ScreenContainerVariants & {
    ref?: Ref<HTMLDivElement>;
  };

export const ScreenContainer = ({
  className,
  width,
  padded,
  grow,
  children,
  ref,
  ...props
}: ScreenContainerProps) => {
  return (
    <div
      ref={ref}
      className={cn(
        screenContainerVariants({ width, padded, grow }),
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export { screenContainerVariants };
export type { ScreenContainerProps };
