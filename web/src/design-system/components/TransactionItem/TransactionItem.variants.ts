import { cva, type VariantProps } from "class-variance-authority";

/**
 * Linha de transação — paridade com `app/src/components/TransactionItem`.
 * Layout: ícone em pill + título/data à esquerda + valor à direita.
 *
 * O componente em si é "burro": recebe título, meta, valor formatado
 * e ícone, sem conhecer Redux/serviços. Mapear domínio em features.
 */
export const transactionItemVariants = cva(
  [
    "flex w-full items-center justify-between gap-3",
    "bg-surface-2 border border-pill",
    "rounded-xl p-4",
    "transition-colors duration-150 text-left",
  ].join(" "),
  {
    variants: {
      interactive: {
        true: [
          "cursor-pointer",
          "hover:bg-surface-3",
          "active:opacity-pressed-soft",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
          "focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        ].join(" "),
        false: "",
      },
    },
    defaultVariants: {
      interactive: false,
    },
  }
);

/**
 * Tom do valor exibido. Espelha a separação visual entre entrada/
 * saída do dashboard: `success` (receita), `danger` (despesa),
 * `default` (neutro/transferências).
 */
export const transactionItemAmountVariants = cva(
  "text-sm font-semibold whitespace-nowrap",
  {
    variants: {
      tone: {
        default: "text-text",
        success: "text-success",
        danger: "text-danger",
        muted: "text-text-muted",
      },
    },
    defaultVariants: {
      tone: "default",
    },
  }
);

export type TransactionItemVariants = VariantProps<typeof transactionItemVariants>;
export type TransactionItemAmountVariants = VariantProps<
  typeof transactionItemAmountVariants
>;
