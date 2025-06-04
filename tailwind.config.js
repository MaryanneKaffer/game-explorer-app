import { heroui } from "@heroui/theme";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)"],
        mono: ["var(--font-mono)"],
      },
      keyframes: {
        rainbow: {
          "0%": { boxShadow: "0 4px 10px rgba(255, 0, 0, 0.8)" },
          "25%": { boxShadow: "0 4px 10px rgba(255, 165, 0, 0.8)" },
          "50%": { boxShadow: "0 4px 10px rgba(0, 255, 0, 0.8)" },
          "75%": { boxShadow: "0 4px 10px rgba(0, 0, 255, 0.8)" },
          "100%": { boxShadow: "0 4px 10px rgba(255, 0, 255, 0.8)" },
        },
      },
      animation: {
        "rainbow-glow": "rainbow 3s infinite",
      },
    },
  },
  darkMode: "class",
  plugins: [heroui()],
};
