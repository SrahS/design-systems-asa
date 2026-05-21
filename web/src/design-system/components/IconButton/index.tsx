"use client";

import type { ButtonHTMLAttributes, ReactNode, Ref } from "react";
import { cn } from "@/design-system/utils/cn";
import {
  iconButtonVariants,
  type IconButtonVariants,
} from "./IconButton.variants";

type IconButtonProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "aria-label"
> &
  IconButtonVariants & {
    /** Texto descritivo obrigatório (acessibilidade). */
    "aria-label": string;
    /** Ícone visual; deve ser um nó já dimensionado (ex.: `<Plus size={18} />`). */
    icon: ReactNode;
    ref?: Ref<HTMLButtonElement>;
  };

export const IconButton = ({
  className,
  size,
  tone,
  icon,
  ref,
  ...props
}: IconButtonProps) => {
  return (
    <button
      ref={ref}
      type="button"
      className={cn(iconButtonVariants({ size, tone }), className)}
      {...props}
    >
      <span aria-hidden="true" className="inline-flex">
        {icon}
      </span>
    </button>
  );
};

export { iconButtonVariants };
export type { IconButtonProps };
