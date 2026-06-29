import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#3b5998",
          foreground: "#FFFFFF",
        },
        secondary: {
          DEFAULT: "#f6f7f9",
          foreground: "#365899",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "#f0f1f3",
          foreground: "#656a73",
        },
        accent: {
          DEFAULT: "#e8ecf0",
          foreground: "#1d2129",
        },
        card: {
          DEFAULT: "#ffffff",
          foreground: "#1d2129",
        },
        nav: {
          dark: "#1f2024",
          top: "#3b5998",
        },
      },
      borderRadius: {
        xl: "15px",
      },
      fontFamily: {
        sans: ["Roboto", "sans-serif"],
      },
    },
  },
  plugins: [],
}
export default config
