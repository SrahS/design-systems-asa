import { cva, type VariantProps } from "class-variance-authority";

/**
 * Variantes do Card. Reflete as superfícies do tema app:
 * `surface`, `surface-2` e `surface-3`, mais variantes
 * `outline` (apenas borda) e `primary` (destaque de brand).
 */
export const cardVariants = cva(
  "rounded-xl transition-colors duration-200",
  {
    variants: {
      variant: {
        surface: "bg-surface border border-stroke",
        "surface-2": "bg-surface-2 border border-pill-stroke shadow-soft",
        "surface-3": "bg-surface-3 border border-stroke shadow-soft",
        outline: "bg-transparent border border-stroke",
        primary:
          "bg-category-deposit-card border border-category-deposit-border shadow-soft",
      },
      padding: {
        none: "p-0",
        sm: "p-3",
        md: "p-4",
        lg: "p-5",
        xl: "p-6",
      },
      interactive: {
        true: "cursor-pointer hover:bg-surface-3 active:opacity-pressed-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        false: "",
      },
    },
    defaultVariants: {
      variant: "surface-2",
      padding: "md",
      interactive: false,
    },
  }
);

export type CardVariants = VariantProps<typeof cardVariants>;
