"use client";

import type {
  ButtonHTMLAttributes,
  HTMLAttributes,
  ReactNode,
  Ref,
} from "react";
import { cn } from "@/design-system/utils/cn";
import { pillVariants, type PillVariants } from "./Pill.variants";

type CommonPillProps = PillVariants & {
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
};

type PillDivProps = HTMLAttributes<HTMLDivElement> &
  CommonPillProps & {
    as?: "div";
    ref?: Ref<HTMLDivElement>;
  };

type PillButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  CommonPillProps & {
    as: "button";
    ref?: Ref<HTMLButtonElement>;
  };

type PillProps = PillDivProps | PillButtonProps;

export const Pill = (props: PillProps) => {
  if (props.as === "button") {
    const {
      as: _as,
      className,
      tone,
      size,
      interactive,
      leftIcon,
      rightIcon,
      children,
      ref,
      ...rest
    } = props;
    return (
      <button
        ref={ref}
        type="button"
        className={cn(
          pillVariants({ tone, size, interactive: interactive ?? true }),
          className
        )}
        {...rest}
      >
        <PillContent leftIcon={leftIcon} rightIcon={rightIcon}>
          {children}
        </PillContent>
      </button>
    );
  }

  const {
    as: _as,
    className,
    tone,
    size,
    interactive,
    leftIcon,
    rightIcon,
    children,
    onClick,
    ref,
    ...rest
  } = props;
  const isInteractive = interactive ?? Boolean(onClick);
  return (
    <div
      ref={ref}
      role={isInteractive ? "button" : undefined}
      tabIndex={isInteractive ? 0 : undefined}
      onClick={onClick}
      className={cn(
        pillVariants({ tone, size, interactive: isInteractive }),
        className
      )}
      {...rest}
    >
      <PillContent leftIcon={leftIcon} rightIcon={rightIcon}>
        {children}
      </PillContent>
    </div>
  );
};

const PillContent = ({
  leftIcon,
  rightIcon,
  children,
}: {
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  children?: ReactNode;
}) => (
  <>
    {leftIcon ? (
      <span aria-hidden="true" className="inline-flex shrink-0">
        {leftIcon}
      </span>
    ) : null}
    <span>{children}</span>
    {rightIcon ? (
      <span aria-hidden="true" className="inline-flex shrink-0">
        {rightIcon}
      </span>
    ) : null}
  </>
);

export { pillVariants };
export type { PillProps };
