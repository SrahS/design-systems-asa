import { cva, type VariantProps } from "class-variance-authority";

/**
 * Wrapper de tela. Paridade com `app/src/components/ScreenContainer`:
 * - fundo `background`
 * - padding horizontal = `--screen-horizontal-padding`
 * - largura máxima = `--max-content-width` (responsável por centralizar)
 *
 * Variante `wide` permite telas/views ricas (dashboards) usarem
 * um teto maior, espelhando a decisão pontual descrita em §5.7
 * do plano (max 1232px em telas largas).
 */
export const screenContainerVariants = cva(
  "mx-auto flex w-full flex-col bg-background",
  {
    variants: {
      width: {
        default: "max-w-[var(--max-content-width)]",
        wide: "max-w-[1232px]",
        full: "max-w-none",
      },
      padded: {
        true: "px-[var(--screen-horizontal-padding)]",
        false: "px-0",
      },
      grow: {
        true: "min-h-screen",
        false: "",
      },
    },
    defaultVariants: {
      width: "default",
      padded: true,
      grow: true,
    },
  }
);

export type ScreenContainerVariants = VariantProps<typeof screenContainerVariants>;
