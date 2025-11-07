import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class', 
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
  /* Cores Primárias (Light) */
      'color-primary-100-on-light': '#FDFDFE',
      'color-primary-200-on-light': '#F7FAFF',
      'color-primary-300-on-light': '#ECF2FE',
      'color-primary-400-on-light': '#DEEAFF',
      'color-primary-500-on-light': '#CDE0FF',
      'color-primary-600-on-light': '#BAD3FF',
      'color-primary-700-on-light': '#A3C0F8',
      'color-primary-800-on-light': '#82A7EE',
      'color-primary-900-on-light': '#0239AD',
      'color-primary-1000-on-light': '#002499',
      'color-primary-1100-on-light': '#2D5FC5',
      'color-primary-1200-on-light': '#192F5B',

        /* Cores Primárias (Dark) */
      'color-primary-100-on-dark':'#0F1A2E',
      'color-primary-200-on-dark': '#0F1C35',
      'color-primary-300-on-dark': '#062464',
      'color-primary-400-on-dark': '#002786',
      'color-primary-500-on-dark': '#00309C',
      'color-primary-600-on-dark': '#043BAF',
      'color-primary-700-on-dark': '#0A47C8',
      'color-primary-800-on-dark': '#0953EB',
      'color-primary-900-on-dark': '#225BFF',
      'color-primary-1000-on-dark': '#0E57EF',
      'color-primary-1100-on-dark': '#89AFFF',
      'color-primary-1200-on-dark': '#CFE2FF',

        // Tons neutros (Light)
        'color-neutral-50-on-light': '#FDFCFD',
        'color-neutral-100-on-light': '#F7F6F7',
        'color-neutral-200-on-light': '#EAEAEA',
        'color-neutral-300-on-light': '#DCDCDC',
        'color-neutral-400-on-light': '#C9C9C9',
        'color-neutral-500-on-light': '#BDBDBD',
        'color-neutral-600-on-light': '#AEAEAE',
        'color-neutral-700-on-light': '#A0A0A0',
        'color-neutral-800-on-light': '#909090',
        'color-neutral-900-on-light': '#7B7B7B',
        'color-neutral-950-on-light': '#646464',
        
        // Tons neutros (Dark)
        'color-neutral-950-on-dark': '#393939',
        'color-neutral-900-on-dark': '#484848',
        'color-neutral-800-on-dark': '#5B5B5B',
        'color-neutral-700-on-dark': '#6D6D6D',
        'color-neutral-600-on-dark': '#818181',
        'color-neutral-500-on-dark': '#939393',
        'color-neutral-400-on-dark': '#A6A6A6',
        'color-neutral-300-on-dark': '#BABABA',
        'color-neutral-200-on-dark': '#CDCDCD',
        'color-neutral-100-on-dark': '#E6E6E6',
        'color-neutral-50-on-dark': '#F9F9F9',

        // Tons semânticos de sucesso (Light)
        'color-semantic-success-50-on-light': '#FDFEFE', 
        'color-semantic-success-100-on-light': '#E4F4F3',
        'color-semantic-success-200-on-light': '#C9EAE6',
        'color-semantic-success-300-on-light': '#ADDED9',
        'color-semantic-success-400-on-light': '#90D4CE',
        'color-semantic-success-500-on-light': '#69C2BC',
        'color-semantic-success-600-on-light': '#48B2AB',
        'color-semantic-success-700-on-light': '#34A099',
        'color-semantic-success-800-on-light': '#238E86',
        'color-semantic-success-900-on-light': '#007C74',

        // Tons semânticos de sucesso (Dark)
        'color-semantic-success-950-on-dark': '#003F3B',
        'color-semantic-success-900-on-dark': '#005853',
        'color-semantic-success-800-on-dark': '#00716A',
        'color-semantic-success-700-on-dark': '#008C82',
        'color-semantic-success-600-on-dark': '#00A49A',
        'color-semantic-success-500-on-dark': '#15BCB1',
        'color-semantic-success-400-on-dark': '#36CEC3',
        'color-semantic-success-300-on-dark': '#53DDD4',
        'color-semantic-success-200-on-dark': '#72EAE3',
        'color-semantic-success-100-on-dark': '#9FF5F0',
        'color-semantic-success-50-on-dark': '#E8FAFA',

        // Tons semânticos de aviso/alerta (Light)
        'color-semantic-warning-50-on-light': '#FFFEFB',
        'color-semantic-warning-100-on-light': '#FEF8E3',
        'color-semantic-warning-200-on-light': '#FDECC8',
        'color-semantic-warning-300-on-light': '#FCD7AE',
        'color-semantic-warning-400-on-light': '#FBC394',
        'color-semantic-warning-500-on-light': '#F9AC78',
        'color-semantic-warning-600-on-light': '#F7965B',
        'color-semantic-warning-700-on-light': '#EF7E3E',
        'color-semantic-warning-800-on-light': '#E76521',
        'color-semantic-warning-900-on-light': '#D7571B',

        // Tons semânticos de aviso/alerta (Dark)
        'color-semantic-warning-950-on-dark': '#422201',
        'color-semantic-warning-900-on-dark': '#613400',
        'color-semantic-warning-800-on-dark': '#814400',
        'color-semantic-warning-700-on-dark': '#A05700',
        'color-semantic-warning-600-on-dark': '#BE6D00',
        'color-semantic-warning-500-on-dark': '#E08500',
        'color-semantic-warning-400-on-dark': '#F9A320',
        'color-semantic-warning-300-on-dark': '#FDC056',
        'color-semantic-warning-200-on-dark': '#FFD988',
        'color-semantic-warning-100-on-dark': '#FFF3C2',
        'color-semantic-warning-50-on-dark': '#FFFBEB',

        // Tons semânticos de erro (Light)
        'color-semantic-error-50-on-light': '#FFFCFD',
        'color-semantic-error-100-on-light': '#FEE5E6',
        'color-semantic-error-200-on-light': '#FCD3D4',
        'color-semantic-error-300-on-light': '#F9BFC1',
        'color-semantic-error-400-on-light': '#F7AEAF',
        'color-semantic-error-500-on-light': '#F49899',
        'color-semantic-error-600-on-light': '#F28587',
        'color-semantic-error-700-on-light': '#EF7375',
        'color-semantic-error-800-on-light': '#EC6063',
        'color-semantic-error-900-on-light': '#EA4C4F',

        // Tons semânticos de erro (Dark)
        'color-semantic-error-950-on-dark': '#4C0006',
        'color-semantic-error-900-on-dark': '#6E000B',
        'color-semantic-error-800-on-dark': '#920010',
        'color-semantic-error-700-on-dark': '#B60015',
        'color-semantic-error-600-on-dark': '#D4001A',
        'color-semantic-error-500-on-dark': '#F40020',
        'color-semantic-error-400-on-dark': '#FA2D49',
        'color-semantic-error-300-on-dark': '#FF5870',
        'color-semantic-error-200-on-dark': '#FF8097',
        'color-semantic-error-100-on-dark': '#FFB0C7',
        'color-semantic-error-50-on-dark': '#FFE8EF',
      },
      
      fontFamily: {
        'sans': ['Inter', 'ui-sans-serif', 'system-ui'], 
        'heading': ['Oswald', 'sans-serif'], 
      },
      
      fontSize: {
        'display-xl': ['4.5rem', { lineHeight: '5rem', fontWeight: '800' }],
        'display-lg': ['3.5rem', { lineHeight: '4rem', fontWeight: '800' }],
        'h1': ['2.5rem', { lineHeight: '3rem', fontWeight: '700' }],
        'h2': ['2rem', { lineHeight: '2.5rem', fontWeight: '700' }],
        'h3': ['1.5rem', { lineHeight: '2rem', fontWeight: '600' }],
        'body-lg': ['1.125rem', { lineHeight: '1.75rem', fontWeight: '400' }],
        'body-md': ['1rem', { lineHeight: '1.5rem', fontWeight: '400' }],
        'body-sm': ['0.875rem', { lineHeight: '1.25rem', fontWeight: '400' }],
        'label-sm': ['0.75rem', { lineHeight: '1rem', fontWeight: '500' }],
      },

      spacing: {
        'px-24': '1.5rem',    
        'px-32': '2rem',      
        'px-40': '2.5rem',    
        'px-50': '3.125rem',  
        'px-60': '3.75rem',   
        'px-160': '10rem',    
        'px-240': '15rem',    
        'h-616': '38.5rem',   
      },

      height: {
        'h-616': '38.5rem',
      },

      maxWidth: {
        'corpo-fixo': '1232px', 
      },

      screens: {
        'sm-custom': '360px', 
        'md-custom': '656px',
        'lg-custom': '1024px',
        'xl-custom': '1280px',
        '2xl-custom': '1440px',
      },
      
      boxShadow: {
        'level-0': '0 0 0 rgba(0, 0, 0, 0)', 
        'level-1': '0 1px 16px rgba(0, 0, 0, 0.25)', 
        'level-2': '0 3px 16px rgba(0, 0, 0, 0.25)', 
        'level-3': '0 6px 16px rgba(0, 0, 0, 0.25)', 
        'level-4': '0 8px 16px rgba(0, 0, 0, 0.25)', 
        'level-5': '0 12px 16px rgba(0, 0, 0, 0.25)', 
      },
    },
  },
  plugins: [],
};

export default config;