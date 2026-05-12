/**
 * Constantes de layout — paridade com `app/src/constants/layout.ts`.
 *
 * Em px para uso programático; equivalentes em rem ficam expostos
 * como CSS vars (`--screen-horizontal-padding`, `--max-content-width`)
 * em `web/src/app/globals.css @theme` para consumo via classes Tailwind.
 */

export const layout = {
  screenHorizontalPadding: 18,
  maxContentWidth: 520,
} as const;

export type Layout = typeof layout;
