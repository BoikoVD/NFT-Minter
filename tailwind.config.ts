import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'spaceGrotesk': ['var(--font-spaceGrotesk)'],
        'poppins': ['var(--font-poppins)'],
      },
      colors: {
        'white': '#FFFFFF',
        'black': '#000000',
        'purple': '#400061',
        'tyrian-purple': '#620049',
        'pink': '#FF00BF',
        'blue': '#5500FF'
      },
      backgroundImage: ({ theme }) => ({
        "layout-gradient": `linear-gradient(${theme('colors.purple')}, ${theme('colors.tyrian-purple')})`,
        "button-gradient": `linear-gradient(0.25turn, ${theme('colors.pink')}, ${theme('colors.blue')}, ${theme('colors.pink')})`,
      }),
      backgroundSize: {
        'size-200': '200% 200%',
      },
      backgroundPosition: {
        'pos-0': '0% 0%',
        'pos-100': '100% 100%',
      },
    },
  },
  plugins: [],
};
export default config;
