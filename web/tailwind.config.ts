import type { Config } from "tailwindcss";

/**
 * Tailwind 4 lê tokens diretamente do CSS (`@theme` em
 * `src/app/globals.css`). Esta config existe apenas para
 * `content` — toda definição de paleta/spacing/radius/sombra
 * vive em CSS como fonte única.
 *
 * Não adicionar `theme.extend.*` aqui. Tokens novos = `@theme`.
 */
const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/design-system/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
  ],
};

export default config;
