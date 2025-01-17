import type { Config } from "tailwindcss"

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--color-background)",
        text: "var(--color-text)",
        "custom-gray": "#202020",
      },
      fontFamily: {
        display: "var(--font-jost)",
        inter: "var(--font-inter)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
      spacing: {
        sectionX: "128px",
        "sectionX-m": "64px",
        sectionY: "128px",
        "sectionY-m": "64px",
      },
    },
  },
  plugins: [],
} satisfies Config
