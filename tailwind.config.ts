import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        mukta: ["Mukta", "sans-serif"],
        ptserif: ["PT Serif", "serif"],
      },
      colors: {
        lake: {
          50: "#F4F6F7",
          100: "#DBE4E7",
          200: "#C5D1D7",
          300: "#AEBFC7",
          400: "#96ADB7",
          500: "#7F9AA8",
          600: "#698897",
          700: "#485E69",
          800: "#2D3A41",
          900: "#2A373D",
          950: "#161D20",
        },
        brown: {
          50: "#F4F3F2",
          100: "#E7DDD2",
          200: "#D7C7B3",
          300: "#C7B195",
          400: "#B79A77",
          500: "#A68459",
          600: "#8B6E4A",
          700: "#6B5438",
          800: "#4B3C28",
          900: "#2E2419",
          950: "#100C08",
        },
        accent: {
          mint: "#E0EAE0",
          blush: "#EEE5E3",
          gray: "#D2D2D3",
        },
      },
    },
  },
  plugins: [],
};
export default config;
