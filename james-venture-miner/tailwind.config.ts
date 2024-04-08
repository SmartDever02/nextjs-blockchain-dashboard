import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/features/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'dark-bg': '#171717',
        'gray-bb': '#bbb',
        primary: '#6a8cdb',
        'primary-border': '#222222',
        'card-bg': '#111',
        'link-hover': '#9ccee7',
      },
      boxShadow: {
        'primary-card': '0 0.5rem 1.2rem rgba(82, 85, 92, .15)',
      },
    },
  },
  plugins: [],
};
export default config;
