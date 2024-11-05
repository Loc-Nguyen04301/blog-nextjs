import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primaryColor: "var(--primary-color)",
        primaryColorBold: "var(--primary-color-bold)",
        subTitleColor: "var(--sub-title-color)",
      },
    },
    screens: {
      'sm': '600px',
      'md': '900px',
      'lg': '1200px',
      // 'xl': '1536px'
    },
    fontFamily: {
      sans: ['var(--font-lato)'],
      mono: ['var(--font-roboto-mono)'],
    }
  },
  plugins: [],
};
export default config;
