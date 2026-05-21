import { cva, type VariantProps } from "class-variance-authority";

/**
 * FAB — paridade com `app/src/components/FloatingActionButton`.
 * Circular `primary` com `shadow-lift`, fixo no canto inferior
 * direito (bottom 96 / right `--spacing-lg` no app).
 *
 * Variante `inline` desativa o `position: fixed` para uso em
 * composições onde o botão é posicionado pelo pai.
 */
export const floatingActionButtonVariants = cva(
  [
    "inline-flex items-center justify-center shrink-0",
    "rounded-pill bg-primary text-text",
    "border border-pill-stroke",
    "shadow-lift",
    "transition-colors duration-150",
    "hover:bg-primary-hover",
    "active:opacity-pressed-strong",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
    "focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    "disabled:cursor-not-allowed disabled:opacity-50 disabled:pointer-events-none",
  ].join(" "),
  {
    variants: {
      size: {
        sm: "h-12 w-12",
        md: "h-[58px] w-[58px]",
        lg: "h-16 w-16",
      },
      position: {
        fixed:
          "fixed right-5 bottom-24 z-40",
        inline: "",
      },
    },
    defaultVariants: {
      size: "md",
      position: "fixed",
    },
  }
);

export type FloatingActionButtonVariants = VariantProps<
  typeof floatingActionButtonVariants
>;
