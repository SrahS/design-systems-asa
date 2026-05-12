import { cva, type VariantProps } from "class-variance-authority";

/**
 * Variantes do Badge. Tokens semânticos do app:
 * - `neutral`: pill em superfície clara para meta-info.
 * - `success`, `warning`, `danger`: estados semânticos.
 * - `outline`: apenas borda, fundo transparente.
 */
export const badgeVariants = cva(
  [
    "inline-flex items-center gap-1 rounded-pill",
    "px-2.5 py-0.5 text-xs font-semibold leading-none",
    "border transition-colors duration-150 select-none",
  ].join(" "),
  {
    variants: {
      variant: {
        neutral: "bg-pill border-pill-stroke text-text",
        success:
          "bg-success/15 border-success/30 text-success",
        warning:
          "bg-warning/15 border-warning/30 text-warning",
        danger:
          "bg-danger/15 border-danger/30 text-danger",
        primary:
          "bg-category-deposit-card border-category-deposit-border text-text",
        outline: "bg-transparent border-stroke text-text-muted",
      },
    },
    defaultVariants: {
      variant: "neutral",
    },
  }
);

export type BadgeVariants = VariantProps<typeof badgeVariants>;
