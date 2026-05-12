/**
 * Espelho JS dos tokens definidos em `@theme` (web/src/app/globals.css),
 * por sua vez espelho de `app/src/theme/theme.ts`.
 *
 * Use estes tokens em contextos onde classes Tailwind/CVA não cabem:
 * - Recharts / SVG inline
 * - composições programáticas
 * - testes
 *
 * Para UI/estilo via classes, prefira sempre os tokens CSS
 * (ex.: `bg-surface`, `text-text-muted`, `shadow-soft`).
 */

export const tokens = {
  colors: {
    background: "#0B0D12",
    surface: "#0F1218",
    surface2: "#141823",
    surface3: "#171B26",
    stroke: "rgba(255,255,255,0.08)",
    pill: "rgba(255,255,255,0.06)",
    pillStroke: "rgba(255,255,255,0.10)",
    shadow: "rgba(0,0,0,0.5)",

    text: "#FFFFFF",
    textMuted: "rgba(255,255,255,0.65)",
    textSubtle: "rgba(255,255,255,0.45)",

    primary: "#7C4DFF",
    primaryHover: "#6D3CFF",
    cyan: "#8FE7FF",
    offWhite: "#F1F3F7",

    warning: "#F9D266",
    success: "#30D158",
    danger: "#FF453A",

    categoryDepositCard: "rgba(124,77,255,0.18)",
    categoryDepositBorder: "rgba(124,77,255,0.95)",
    categoryDepositIconBg: "rgba(124,77,255,0.22)",
    categoryDepositIconBorder: "rgba(124,77,255,0.55)",

    categoryWithdrawCard: "rgba(143,231,255,0.16)",
    categoryWithdrawBorder: "rgba(143,231,255,0.84)",
    categoryWithdrawIconBg: "rgba(143,231,255,0.20)",
    categoryWithdrawIconBorder: "rgba(143,231,255,0.58)",

    categoryTransferCard: "rgba(241,243,247,0.13)",
    categoryTransferBorder: "rgba(241,243,247,0.72)",
    categoryTransferIconBg: "rgba(241,243,247,0.20)",
    categoryTransferIconBorder: "rgba(241,243,247,0.55)",
  },
  spacing: {
    xxs: 4,
    xs: 8,
    sm: 12,
    md: 16,
    lg: 20,
    xl: 24,
    xxl: 32,
    xxxl: 40,
  },
  radius: {
    xxs: 4,
    xs: 8,
    sm: 12,
    md: 16,
    lg: 22,
    xl: 28,
    xxl: 34,
    pill: 999,
  },
  typography: {
    fontFamilySans:
      'Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    fontSizes: {
      xs: 12,
      sm: 14,
      md: 16,
      lg: 18,
      xl: 22,
      xxl: 28,
      display: 40,
    },
    fontWeights: {
      regular: "400",
      medium: "600",
      semibold: "700",
      bold: "800",
    },
    letterSpacing: {
      tight: -0.5,
      normal: 0,
    },
  },
  shadows: {
    soft: "0 10px 18px rgba(0,0,0,0.35)",
    lift: "0 14px 24px rgba(0,0,0,0.45)",
  },
  opacity: {
    pressedSoft: 0.86,
    pressedStrong: 0.85,
    disabled: 0.5,
  },
} as const;

export type Tokens = typeof tokens;
