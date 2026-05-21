"use client";

import type { ReactNode, Ref } from "react";
import { cn } from "@/design-system/utils/cn";
import {
  transactionItemAmountVariants,
  transactionItemVariants,
  type TransactionItemAmountVariants,
} from "./TransactionItem.variants";

type TransactionItemProps = {
  title: string;
  meta?: string;
  amount: string;
  icon: ReactNode;
  amountTone?: TransactionItemAmountVariants["tone"];
  onClick?: () => void;
  className?: string;
  /** Label opcional para leitores de tela quando interativo. */
  "aria-label"?: string;
  ref?: Ref<HTMLElement>;
};

export const TransactionItem = ({
  title,
  meta,
  amount,
  icon,
  amountTone = "default",
  onClick,
  className,
  "aria-label": ariaLabel,
  ref,
}: TransactionItemProps) => {
  const isInteractive = Boolean(onClick);

  const body = (
    <>
      <div className="flex items-center gap-3 min-w-0">
        <span
          aria-hidden="true"
          className={cn(
            "inline-flex h-9 w-9 shrink-0 items-center justify-center",
            "rounded-md bg-pill border border-stroke text-text"
          )}
        >
          {icon}
        </span>
        <span className="flex min-w-0 flex-col gap-0.5">
          <span className="truncate text-sm font-semibold text-text">
            {title}
          </span>
          {meta ? (
            <span className="truncate text-xs font-medium text-text-subtle">
              {meta}
            </span>
          ) : null}
        </span>
      </div>
      <span className={transactionItemAmountVariants({ tone: amountTone })}>
        {amount}
      </span>
    </>
  );

  if (isInteractive) {
    return (
      <button
        ref={ref as Ref<HTMLButtonElement>}
        type="button"
        onClick={onClick}
        aria-label={ariaLabel ?? `Ver detalhes de ${title}`}
        className={cn(
          transactionItemVariants({ interactive: true }),
          className
        )}
      >
        {body}
      </button>
    );
  }

  return (
    <div
      ref={ref as Ref<HTMLDivElement>}
      className={cn(transactionItemVariants({ interactive: false }), className)}
    >
      {body}
    </div>
  );
};

export {
  transactionItemVariants,
  transactionItemAmountVariants,
};
export type { TransactionItemProps };
