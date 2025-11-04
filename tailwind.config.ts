import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Tons primários (Light)
        'ref-color-primary-50-on-light': '#FDFCFE',
        'ref-color-primary-100-on-light': '#F9F4F6',
        'ref-color-primary-200-on-light': '#F3EFE9',
        'ref-color-primary-300-on-light': '#F0E5CC',
        'ref-color-primary-400-on-light': '#F2ECC2',
        'ref-color-primary-500-on-light': '#F0E0AF',
        'ref-color-primary-600-on-light': '#E4B79D',
        'ref-color-primary-700-on-light': '#E39886',
        'ref-color-primary-800-on-light': '#EB623D',
        'ref-color-primary-900-on-light': '#E3381B',

        // Tons primários (Dark)
        'ref-color-primary-950-on-dark': '#322F26',
        'ref-color-primary-960-on-dark': '#3F2D2E',
        'ref-color-primary-970-on-dark': '#4F2E30',
        'ref-color-primary-980-on-dark': '#602B30',
        'ref-color-primary-990-on-dark': '#752A2D',
        'ref-color-primary-dark-800-on-dark': '#A43A2F',
        'ref-color-primary-dark-700-on-dark': '#B94D2C',
        'ref-color-primary-dark-600-on-dark': '#C65D2C',
        'ref-color-primary-dark-500-on-dark': '#D4682A',
        'ref-color-primary-dark-400-on-dark': '#E76B26',
        'ref-color-primary-default-on-dark': '#F7680A',

        // Tons neutros (Light)
        'ref-color-neutral-50-on-light': '#FDFCFD',
        'ref-color-neutral-100-on-light': '#F7F6F7',
        'ref-color-neutral-200-on-light': '#EAEAEA',
        'ref-color-neutral-300-on-light': '#DCDCDC',
        'ref-color-neutral-400-on-light': '#C9C9C9',
        'ref-color-neutral-500-on-light': '#BDBDBD',
        'ref-color-neutral-600-on-light': '#AEAEAE',
        'ref-color-neutral-700-on-light': '#A0A0A0',
        'ref-color-neutral-800-on-light': '#909090',
        'ref-color-neutral-900-on-light': '#7B7B7B',
        'ref-color-neutral-950-on-light': '#646464',
        
        // Tons neutros (Dark)
        'ref-color-neutral-950-on-dark': '#393939',
        'ref-color-neutral-900-on-dark': '#484848',
        'ref-color-neutral-800-on-dark': '#5B5B5B',
        'ref-color-neutral-700-on-dark': '#6D6D6D',
        'ref-color-neutral-600-on-dark': '#818181',
        'ref-color-neutral-500-on-dark': '#939393',
        'ref-color-neutral-400-on-dark': '#A6A6A6',
        'ref-color-neutral-300-on-dark': '#BABABA',
        'ref-color-neutral-200-on-dark': '#CDCDCD',
        'ref-color-neutral-100-on-dark': '#E6E6E6',
        'ref-color-neutral-50-on-dark': '#F9F9F9',

        // Tons semânticos de sucesso (Light)
        'ref-color-semantic-success-50-on-light': '#FDFEFE', 
        'ref-color-semantic-success-100-on-light': '#E4F4F3',
        'ref-color-semantic-success-200-on-light': '#C9EAE6',
        'ref-color-semantic-success-300-on-light': '#ADDED9',
        'ref-color-semantic-success-400-on-light': '#90D4CE',
        'ref-color-semantic-success-500-on-light': '#69C2BC',
        'ref-color-semantic-success-600-on-light': '#48B2AB',
        'ref-color-semantic-success-700-on-light': '#34A099',
        'ref-color-semantic-success-800-on-light': '#238E86',
        'ref-color-semantic-success-900-on-light': '#007C74',

        // Tons semânticos de sucesso (Dark)
        'ref-color-semantic-success-950-on-dark': '#003F3B',
        'ref-color-semantic-success-900-on-dark': '#005853',
        'ref-color-semantic-success-800-on-dark': '#00716A',
        'ref-color-semantic-success-700-on-dark': '#008C82',
        'ref-color-semantic-success-600-on-dark': '#00A49A',
        'ref-color-semantic-success-500-on-dark': '#15BCB1',
        'ref-color-semantic-success-400-on-dark': '#36CEC3',
        'ref-color-semantic-success-300-on-dark': '#53DDD4',
        'ref-color-semantic-success-200-on-dark': '#72EAE3',
        'ref-color-semantic-success-100-on-dark': '#9FF5F0',
        'ref-color-semantic-success-50-on-dark': '#E8FAFA',

        // Tons semânticos de aviso/alerta (Light)
        'ref-color-semantic-warning-50-on-light': '#FFFEFB',
        'ref-color-semantic-warning-100-on-light': '#FEF8E3',
        'ref-color-semantic-warning-200-on-light': '#FDECC8',
        'ref-color-semantic-warning-300-on-light': '#FCD7AE',
        'ref-color-semantic-warning-400-on-light': '#FBC394',
        'ref-color-semantic-warning-500-on-light': '#F9AC78',
        'ref-color-semantic-warning-600-on-light': '#F7965B',
        'ref-color-semantic-warning-700-on-light': '#EF7E3E',
        'ref-color-semantic-warning-800-on-light': '#E76521',
        'ref-color-semantic-warning-900-on-light': '#D7571B',

        // Tons semânticos de aviso/alerta (Dark)
        'ref-color-semantic-warning-950-on-dark': '#422201',
        'ref-color-semantic-warning-900-on-dark': '#613400',
        'ref-color-semantic-warning-800-on-dark': '#814400',
        'ref-color-semantic-warning-700-on-dark': '#A05700',
        'ref-color-semantic-warning-600-on-dark': '#BE6D00',
        'ref-color-semantic-warning-500-on-dark': '#E08500',
        'ref-color-semantic-warning-400-on-dark': '#F9A320',
        'ref-color-semantic-warning-300-on-dark': '#FDC056',
        'ref-color-semantic-warning-200-on-dark': '#FFD988',
        'ref-color-semantic-warning-100-on-dark': '#FFF3C2',
        'ref-color-semantic-warning-50-on-dark': '#FFFBEB',

        // Tons semânticos de erro (Light)
        'ref-color-semantic-error-50-on-light': '#FFFCFD',
        'ref-color-semantic-error-100-on-light': '#FEE5E6',
        'ref-color-semantic-error-200-on-light': '#FCD3D4',
        'ref-color-semantic-error-300-on-light': '#F9BFC1',
        'ref-color-semantic-error-400-on-light': '#F7AEAF',
        'ref-color-semantic-error-500-on-light': '#F49899',
        'ref-color-semantic-error-600-on-light': '#F28587',
        'ref-color-semantic-error-700-on-light': '#EF7375',
        'ref-color-semantic-error-800-on-light': '#EC6063',
        'ref-color-semantic-error-900-on-light': '#EA4C4F',

        // Tons semânticos de erro (Dark)
        'ref-color-semantic-error-950-on-dark': '#4C0006',
        'ref-color-semantic-error-900-on-dark': '#6E000B',
        'ref-color-semantic-error-800-on-dark': '#920010',
        'ref-color-semantic-error-700-on-dark': '#B60015',
        'ref-color-semantic-error-600-on-dark': '#D4001A',
        'ref-color-semantic-error-500-on-dark': '#F40020',
        'ref-color-semantic-error-400-on-dark': '#FA2D49',
        'ref-color-semantic-error-300-on-dark': '#FF5870',
        'ref-color-semantic-error-200-on-dark': '#FF8097',
        'ref-color-semantic-error-100-on-dark': '#FFB0C7',
        'ref-color-semantic-error-50-on-dark': '#FFE8EF',
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
