import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          black: '#000000',
          dark: '#0a0a0a',
          darker: '#111111',
          red: '#dc2626',
          'red-dark': '#b91c1c',
          'red-light': '#ef4444',
          white: '#ffffff',
          gray: '#888888',
          'gray-light': '#cccccc',
          border: '#222222',
        }
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;
