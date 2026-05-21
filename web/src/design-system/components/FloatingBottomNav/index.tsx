"use client";

import type { ReactNode } from "react";
import { cn } from "@/design-system/utils/cn";
import {
  floatingBottomNavItemVariants,
  floatingBottomNavPillVariants,
  floatingBottomNavRootVariants,
} from "./FloatingBottomNav.variants";

export const FLOATING_BOTTOM_NAV_OFFSET_PX = 18;

export type FloatingBottomNavItem<TKey extends string = string> = {
  key: TKey;
  icon: ReactNode;
  label: string;
};

type FloatingBottomNavProps<TKey extends string = string> = {
  items: ReadonlyArray<FloatingBottomNavItem<TKey>>;
  active?: TKey;
  visible?: boolean;
  onSelect?: (key: TKey) => void;
  /** Offset extra (em px) somado ao offset base de 18px. */
  bottomOffsetPx?: number;
  className?: string;
};

export const FloatingBottomNav = <TKey extends string = string>({
  items,
  active,
  visible = true,
  onSelect,
  bottomOffsetPx = 0,
  className,
}: FloatingBottomNavProps<TKey>) => {
  return (
    <div
      className={cn(floatingBottomNavRootVariants({ visible }), className)}
      style={{ bottom: FLOATING_BOTTOM_NAV_OFFSET_PX + bottomOffsetPx }}
    >
      <nav
        aria-label="Navegação principal"
        className={floatingBottomNavPillVariants()}
      >
        {items.map((item) => {
          const isActive = active === item.key;
          return (
            <button
              key={item.key}
              type="button"
              onClick={() => onSelect?.(item.key)}
              aria-label={item.label}
              aria-current={isActive ? "page" : undefined}
              className={floatingBottomNavItemVariants({
                state: isActive ? "active" : "inactive",
              })}
            >
              <span aria-hidden="true" className="inline-flex">
                {item.icon}
              </span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export type { FloatingBottomNavProps };
