import { cva, type VariantProps } from "class-variance-authority";

/**
 * FloatingBottomNav — pill flutuante com sombra `lift`.
 * Paridade com `app/src/components/FloatingBottomNav` (130×58,
 * `surface-2` + `stroke`, item ativo em `primary` arredondado).
 *
 * Mobile: aparece centralizado, fixo no rodapé com offset 18px.
 * Desktop: idem, escondendo automaticamente em rotas aninhadas
 * via prop `visible` controlada pelo consumidor.
 */

export const floatingBottomNavRootVariants = cva(
  "pointer-events-none fixed inset-x-0 z-30 flex justify-center",
  {
    variants: {
      visible: {
        true: "",
        false: "hidden",
      },
    },
    defaultVariants: {
      visible: true,
    },
  }
);

export const floatingBottomNavPillVariants = cva(
  [
    "pointer-events-auto",
    "flex items-center justify-between gap-2",
    "h-[58px] w-[130px] px-[18px]",
    "rounded-pill bg-surface-2 border border-stroke",
    "shadow-lift",
  ].join(" "),
);

export const floatingBottomNavItemVariants = cva(
  [
    "inline-flex items-center justify-center shrink-0",
    "transition-colors duration-150",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
    "focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    "active:opacity-pressed-strong",
  ].join(" "),
  {
    variants: {
      state: {
        active:
          "h-[45px] w-[45px] rounded-pill bg-primary border border-pill-stroke text-off-white",
        inactive:
          "h-[34px] w-[34px] rounded-pill text-text-subtle hover:text-text",
      },
    },
    defaultVariants: {
      state: "inactive",
    },
  }
);

export type FloatingBottomNavRootVariants = VariantProps<
  typeof floatingBottomNavRootVariants
>;
export type FloatingBottomNavItemVariants = VariantProps<
  typeof floatingBottomNavItemVariants
>;
