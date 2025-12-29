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
        'xs': '0.64rem',
        'sm': '0.8rem',
        'base': '1rem',
        'md': '1.25rem',
        'lg': '1.563rem',
        'xl': '1.953rem',
        '2xl': '2.441rem',
        '3xl': '3.052rem',
        '4xl': '3.815rem',
        '5xl': '4.768rem',
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
