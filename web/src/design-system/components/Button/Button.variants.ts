import { cva, type VariantProps } from "class-variance-authority";

/**
 * Variantes do Button. Sem cores hard-coded:
 * tudo via tokens semânticos definidos em `@theme` (globals.css).
 *
 * - `primary`: ação principal (roxo do brand).
 * - `secondary`: ação secundária em superfície escura com borda.
 * - `ghost`: ação não visualmente proeminente; cresce no hover.
 * - `danger`: ação destrutiva (vermelho semântico).
 * - `link`: aparência textual.
 */
export const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2 whitespace-nowrap",
    "font-sans font-semibold leading-none",
    "transition-colors duration-150 select-none",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
    "focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    "disabled:cursor-not-allowed disabled:opacity-50 disabled:pointer-events-none",
  ].join(" "),
  {
    variants: {
      variant: {
        primary: [
          "bg-primary text-text shadow-soft",
          "hover:bg-primary-hover",
          "active:opacity-pressed-strong",
        ].join(" "),
        secondary: [
          "bg-surface-2 text-text border border-stroke",
          "hover:bg-surface-3",
          "active:opacity-pressed-soft",
        ].join(" "),
        ghost: [
          "bg-transparent text-text-muted",
          "hover:bg-pill hover:text-text",
          "active:opacity-pressed-soft",
        ].join(" "),
        danger: [
          "bg-danger text-text shadow-soft",
          "hover:opacity-pressed-soft",
          "active:opacity-pressed-strong",
        ].join(" "),
        link: [
          "bg-transparent text-primary underline-offset-4 px-0 h-auto",
          "hover:underline",
          "active:opacity-pressed-soft",
        ].join(" "),
      },
      size: {
        sm: "h-9 px-3 rounded-sm text-sm",
        md: "h-10 px-4 rounded-md text-md",
        lg: "h-12 px-6 rounded-lg text-lg",
        icon: "h-10 w-10 rounded-md",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export type ButtonVariants = VariantProps<typeof buttonVariants>;
