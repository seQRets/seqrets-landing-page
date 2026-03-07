import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        display: ["Inter", "system-ui", "sans-serif"],
        body: ["Inter", "system-ui", "sans-serif"],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        warm: {
          DEFAULT: "hsl(var(--warm))",
          muted: "hsl(var(--warm-muted))",
        },
        "section-alt": "hsl(var(--section-alt))",
        "section-warm": "hsl(var(--section-warm))",
        "warm-surface": "hsl(var(--warm-surface))",
        "warm-border": "hsl(var(--warm-border))",
        "accent-crypto": "hsl(var(--accent-crypto))",
        "accent-smart": "hsl(var(--accent-smart))",
        "accent-inherit": "hsl(var(--accent-inherit))",
        "accent-ai": "hsl(var(--accent-ai))",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "0.8" },
        },
        "text-cycle-in": {
          "0%": { opacity: "0", transform: "translateY(12px)", filter: "blur(4px)" },
          "100%": { opacity: "1", transform: "translateY(0)", filter: "blur(0px)" },
        },
        "text-cycle-out": {
          "0%": { opacity: "1", transform: "translateY(0)", filter: "blur(0px)" },
          "100%": { opacity: "0", transform: "translateY(-12px)", filter: "blur(4px)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s ease-out forwards",
        "pulse-glow": "pulse-glow 3s ease-in-out infinite",
        "text-cycle-in": "text-cycle-in 0.4s ease-out forwards",
        "text-cycle-out": "text-cycle-out 0.3s ease-in forwards",
      },
    },
  },
  plugins: [tailwindcssAnimate],
} satisfies Config;
