import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class", // Enable dark mode using a CSS class
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/client/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
    fontSize: {
      xs: "0.75rem",
      sm: "0.85rem",
      base: "0.90rem",
      lg: "1.20rem",
      xl: "1.20rem",
      "2xl": "1.4rem",
      "3xl": "1.775rem",
      "4xl": "2.00rem",
      "5xl": "3rem",
      "6xl": "4rem",
      "7xl": "5rem",
    },
    screens: {
      sm: "640px",
      md: "1024px",
      lg: "2056px",
      xl: "2656px",
      "2xl": "3256px",
    },
  },
  plugins: [],
};
export default config;
