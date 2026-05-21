import { cva, type VariantProps } from "class-variance-authority";

/**
 * Pill — primitivo genérico para "chips" e selos arredondados
 * em `surface-2` + `stroke` + radius `pill`. É o equivalente
 * web da estética de `BalancePill` no app, mas sem domínio.
 */
export const pillVariants = cva(
  [
    "inline-flex items-center gap-2",
    "rounded-pill border transition-colors duration-150",
    "font-semibold leading-none",
  ].join(" "),
  {
    variants: {
      tone: {
        surface: "bg-surface-2 border-pill-stroke text-text",
        muted: "bg-pill border-stroke text-text-muted",
        primary:
          "bg-category-deposit-card border-category-deposit-border text-text",
        cyan: "bg-category-withdraw-card border-category-withdraw-border text-text",
        outline: "bg-transparent border-stroke text-text-muted",
      },
      size: {
        sm: "h-7 px-3 text-xs",
        md: "h-9 px-4 text-sm",
        lg: "h-11 px-5 text-md",
      },
      interactive: {
        true: "cursor-pointer hover:bg-surface-3 active:opacity-pressed-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        false: "",
      },
    },
    defaultVariants: {
      tone: "surface",
      size: "md",
      interactive: false,
    },
  }
);

export type PillVariants = VariantProps<typeof pillVariants>;
