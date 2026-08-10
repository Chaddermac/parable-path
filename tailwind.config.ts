import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "#26352d",
        forest: "#1f4b3a",
        moss: "#71836a",
        cream: "#f3eee2",
        paper: "#fbf8f0",
        clay: "#a85740",
        gold: "#c8924b"
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
