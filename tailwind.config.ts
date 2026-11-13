import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "#062c66",
        forest: "#062c66",
        moss: "#536d77",
        cream: "#f7f1e7",
        paper: "#fffaf2",
        clay: "#74613d",
        gold: "#c99a2d"
      },
      fontFamily: {
        sans: ["var(--font-sans)", "sans-serif"],
        serif: ["var(--font-serif)", "serif"]
      },
      boxShadow: { soft: "0 24px 80px rgba(38, 53, 45, 0.08)" }
    }
  },
  plugins: []
} satisfies Config;
