import type { Config } from "tailwindcss"
import plugin from "tailwindcss"

export default {
  content: ["./src/**/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        background: "var(--color-background)",
        text: "var(--color-text)",
        "custom-gray": "#202020",
        "custom-green": "#00FF00",
      },
      fontFamily: {
        display: "var(--font-jost)",
        inter: "var(--font-inter)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
      spacing: {
        section: "128px",
        "section-m": "64px 16px",
        sectionX: "128px",
        "sectionX-m": "16px",
        sectionY: "128px",
        "sectionY-m": "64px",
      },
    },
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities({
        ".drag-none": {
          "-webkit-user-drag": "none",
          "-khtml-user-drag": "none",
          "-moz-user-drag": "none",
          "-o-user-drag": "none",
          "user-drag": "none",
        },
      })
    }),
  ],
} satisfies Config
