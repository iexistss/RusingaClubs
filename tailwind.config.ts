import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/pages/**/*.{js,ts,jsx,tsx,mdx}", "./src/components/**/*.{js,ts,jsx,tsx,mdx}", "./src/app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: { blue: { 950: "#032c58", 900: "#064687" }, silver: "#9BB0C8", violet: "#A83D96", shamrock: "#2E8B3D", bumblebee: "#FFD200", orange: "#FF7900" },
      fontFamily: { sans: ["var(--font-poppins)", "Arial", "sans-serif"], serif: ["var(--font-merriweather)", "Georgia", "serif"] },
      boxShadow: { soft: "0 16px 45px rgba(6, 70, 135, .09)", card: "0 8px 24px rgba(6, 70, 135, .07)" },
      backgroundImage: { "hero-grid": "linear-gradient(rgba(6,70,135,.06) 1px, transparent 1px), linear-gradient(90deg, rgba(6,70,135,.06) 1px, transparent 1px)" }
    }
  },
  plugins: []
};
export default config;
