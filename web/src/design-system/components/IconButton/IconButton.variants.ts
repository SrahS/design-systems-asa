import { cva, type VariantProps } from "class-variance-authority";

/**
 * IconButton — paridade com `app/src/components/IconButton`.
 * 36×36 redondo (`rounded-pill`), fundo `pill` + borda `stroke`,
 * ícone `off-white`, com press state `opacity-pressed-soft`.
 */
export const iconButtonVariants = cva(
  [
    "inline-flex items-center justify-center shrink-0",
    "bg-pill border border-stroke text-off-white",
    "transition-colors duration-150",
    "hover:bg-surface-3",
    "active:opacity-pressed-soft",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
    "focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    "disabled:cursor-not-allowed disabled:opacity-50 disabled:pointer-events-none",
  ].join(" "),
  {
    variants: {
      size: {
        sm: "h-8 w-8 rounded-pill",
        md: "h-9 w-9 rounded-pill",
        lg: "h-11 w-11 rounded-pill",
      },
      tone: {
        default: "",
        primary:
          "bg-primary border-pill-stroke text-text hover:bg-primary-hover",
        danger:
          "bg-danger/15 border-danger/30 text-danger hover:bg-danger/20",
      },
    },
    defaultVariants: {
      size: "md",
      tone: "default",
    },
  }
);

export type IconButtonVariants = VariantProps<typeof iconButtonVariants>;
