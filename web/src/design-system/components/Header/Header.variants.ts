import { cva, type VariantProps } from "class-variance-authority";

/**
 * Header — chrome de topo dark. Inspirado em
 * `app/src/features/dashboard/components/DashboardHeader`.
 *
 * Layout: avatar (botão de menu/perfil) + textos à esquerda,
 * conteúdo livre (`trailing`) à direita — tipicamente uma pill
 * de saldo, badge de status ou ações.
 */
export const headerRootVariants = cva(
  "flex w-full items-center justify-between gap-3",
  {
    variants: {
      density: {
        compact: "py-2",
        comfortable: "pt-3 pb-8",
      },
    },
    defaultVariants: {
      density: "comfortable",
    },
  }
);

export const headerAvatarVariants = cva(
  [
    "inline-flex items-center justify-center shrink-0",
    "h-[54px] w-[54px] rounded-2xl",
    "bg-surface-2 border border-stroke text-text-muted",
    "transition-colors duration-150",
    "hover:bg-surface-3",
    "active:opacity-pressed-strong",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
    "focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    "disabled:cursor-not-allowed disabled:opacity-50 disabled:pointer-events-none",
  ].join(" "),
);

export const headerAvatarInnerVariants = cva(
  [
    "inline-flex h-[42px] w-[42px] items-center justify-center",
    "rounded-xl bg-pill",
  ].join(" "),
);

export type HeaderRootVariants = VariantProps<typeof headerRootVariants>;
