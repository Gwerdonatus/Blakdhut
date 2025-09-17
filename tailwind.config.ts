import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#facc15", // yellow (primary)
          dark: "#ca8a04",    // darker yellow
        },
        dark: {
          DEFAULT: "#0a0a0a", // almost black background
          light: "#1a1a1a",   // lighter black/gray
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 4px 20px rgba(250, 204, 21, 0.2)", // yellow glow
      },
    },
  },
  plugins: [],
};
export default config;
