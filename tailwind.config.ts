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
        'courierPrime': ['var(--font-courierPrime)'],
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
        "border-gradient": `linear-gradient(${theme('colors.blue')}, ${theme('colors.pink')})`,
      }),
      backgroundSize: {
        'size-200': '200% 200%',
      },
      backgroundPosition: {
        'pos-0': '0% 0%',
        'pos-100': '100% 100%',
      },
    },
    screens: {
      'xs': '340px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
      '3xl': '1920px',
      '4xl': '2560px',
      '5xl': '3840px',
      '6xl': '7680px',
    },
  },
  plugins: [],
};
export default config;
