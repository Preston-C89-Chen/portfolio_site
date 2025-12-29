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
        gilroy: ['var(--font-gilroy)'],
        tiro: ['var(--font-tiro-devanagari)'],
      },
      animation: {
        aurora: "aurora 60s linear infinite"
      },
      keyframes: {
        aurora: {
          from: {
            backgroundPosition: "50% 50%, 50% 50%",
          },
          to: {
            backgroundPosition: "350% 50%, 350% 50%",
          },
        },
      },
      colors: {
        // Primary Accent Gradient
        blueOne: 'rgba(147, 250, 186, 1)',     // Mint Green
        blueTwo: 'rgba(140, 238, 214, 1)',     // Teal
        blueThree: 'rgba(130, 224, 249, 1)',   // Cyan Blue

        // Semantic Colors for Design Engineering
        colorCode: '#00D9FF',                   // Code snippets - bright cyan
        colorDesign: '#B4F8C8',                // Design tools - mint
        colorInteraction: '#A0E7E5',           // Interactive elements
        colorDataViz: '#FFA6C9',               // Data visualization - pink

        // Backgrounds
        bannerColor: 'rgba(23, 27, 34, 0.4)',
        menuBg: 'rgba(0, 0, 0, 0.3)',

        // Surface Elevation (Glass)
        surface1: 'rgba(23, 27, 34, 0.4)',     // Glass surface
        surface2: 'rgba(31, 41, 55, 0.6)',     // Elevated
        surface3: 'rgba(40, 50, 65, 0.8)',     // Highest
      }
    },
  },
  plugins: [
    require('flowbite/plugin'),
    addVariablesForColors
  ],
}
export default config
