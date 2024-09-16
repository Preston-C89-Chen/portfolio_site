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
        blueOne: 'rgba(147, 250, 186, 1)',
        blueTwo: 'rgba(140, 238, 214, 1)',
        blueThree: 'rgba(130, 224, 249, 1)',
        bannerColor: 'rgba(23, 27, 34, 0.4)',
        // cardColor : '#404040',
        menuBg: 'rgba(0, 0, 0, 0.3)',
      }
    },
  },
  plugins: [
    require('flowbite/plugin'),
    addVariablesForColors
  ],
}
export default config
