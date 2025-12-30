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
        sans: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Helvetica Neue', 'Arial', 'sans-serif'],
        mono: ['JetBrains Mono', 'Courier New', 'monospace'],
        gilroy: ['var(--font-gilroy)'],
        tiro: ['var(--font-tiro-devanagari)'],
      },
      fontSize: {
        // Devouring Details type scale (pixel-based, precise)
        '12': '0.75rem',      // 12px
        '13': '0.8125rem',    // 13px
        '14': '0.875rem',     // 14px
        '15': '0.9375rem',    // 15px
        '16': '1rem',         // 16px - base
        '18': '1.125rem',     // 18px
        '20': '1.25rem',      // 20px
        '24': '1.5rem',       // 24px
        '32': '2rem',         // 32px
        '40': '2.5rem',       // 40px
        '48': '3rem',         // 48px
        '64': '4rem',         // 64px

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
        // Swiss Design Colors
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
      },
    },
  },
  plugins: [
    require('flowbite/plugin'),
    addVariablesForColors
  ],
}
export default config
