import type { Config } from 'tailwindcss'
const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");
function addVariablesForColors({ addBase, theme }: any) {
  let allColors = flattenColorPalette(theme("colors"));
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );
 
  addBase({
    ":root": newVars,
  });
}

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/flowbite/**/*.js',
    './src/lib/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Instrument Sans', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Helvetica Neue', 'Arial', 'sans-serif'],
        secondary: ['Figtree', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Courier New', 'monospace'],
        gilroy: ['var(--font-gilroy)'],
        tiro: ['var(--font-tiro-devanagari)'],
      },
      fontSize: {
        // Minimalist Typographic Scale
        'display-xl': ['6.5625rem', { lineHeight: '0', letterSpacing: '-5.5125px' }],  // 105px - Hero
        'display-lg': ['5.5rem', { lineHeight: '1.1', letterSpacing: '-3.872px' }],    // 88px - Tablet
        'display-md': ['4rem', { lineHeight: '1.1', letterSpacing: '-2.048px' }],      // 64px - Large heading
        'display-sm': ['2.75rem', { lineHeight: '1.1', letterSpacing: '-0.968px' }],   // 44px - Mobile heading
        'h1': ['2.3125rem', { lineHeight: '1.1', letterSpacing: '-0.968px' }],         // 37px - H1
        'h1-mobile': ['1.5rem', { lineHeight: '1.1', letterSpacing: '-0.4px' }],       // 24px - Mobile H1
        'body-lg': ['1.25rem', { lineHeight: '1.5', letterSpacing: '-0.2px' }],        // 20px - Large body
        'body': ['1rem', { lineHeight: '1.5', letterSpacing: '-0.2px' }],              // 16px - Base
        'body-sm': ['0.9375rem', { lineHeight: '1.5', letterSpacing: '-0.2px' }],      // 15px - Small

        // Keep Tailwind defaults for compatibility
        'xs': '0.75rem',
        'sm': '0.875rem',
        'base': '1rem',
        'lg': '1.125rem',
        'xl': '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
        '4xl': '2.25rem',
        '5xl': '3rem',
        '6xl': '3.75rem',
        '7xl': '4.5rem',
        '8xl': '6rem',
        '9xl': '8rem',
      },
      lineHeight: {
        '16': '1rem',
        '20': '1.25rem',
        '28': '1.75rem',
        '32': '2rem',
      },
      fontWeight: {
        '500': '500',
        'bold': '700',
      },
      colors: {
        // Minimalist Monochrome Palette
        'bg': '#FFFFFF',
        'text': '#000000',
        'text-muted': '#767676',
        'border': '#E5E5E5',
        'hover': '#F5F5F5',

        // Keep previous Swiss colors for backward compatibility
        'swiss-white': '#FFFFFF',
        'swiss-black': '#000000',
        'swiss-red': '#FF0000',
        'swiss-yellow': '#FFD700',
        'swiss-orange': '#FF6B35',

        // 12-step Gray Scale
        gray: {
          1: '#FCFCFC',
          2: '#F9F9F9',
          3: '#F0F0F0',
          4: '#E8E8E8',
          5: '#E0E0E0',
          6: '#D1D1D1',
          7: '#B4B4B4',
          8: '#8E8E8E',
          9: '#6B6B6B',
          10: '#4A4A4A',
          11: '#2E2E2E',
          12: '#1A1A1A',
        },
      },
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      borderRadius: {
        'none': '0',
      },
      boxShadow: {
        'none': 'none',
      },
      transitionTimingFunction: {
        'rauno': 'cubic-bezier(0.2, 0.8, 0.2, 1)',
        'gentle': 'cubic-bezier(0.4, 0.0, 0.2, 1)',
      },
      transitionDuration: {
        'instant': '0ms',
        'fast': '150ms',
        'base': '200ms',
        'slow': '300ms',
      },
      maxWidth: {
        'container-sm': '640px',
        'container-md': '800px',
        'container-lg': '1280px',
        'container-xl': '2048px',
      },
    },
  },
  plugins: [
    require('flowbite/plugin'),
    addVariablesForColors
  ],
}
export default config
