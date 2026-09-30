import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        // Deep navy — primary dark surfaces
        navy: {
          DEFAULT: "#0A1A2F",
          900: "#081524",
          800: "#0E2136",
          700: "#16324F",
          600: "#1F4368",
        },
        // Brand green — CTAs, links, highlights (from the koiden logo)
        brand: {
          DEFAULT: "#1E7A5E",
          strong: "#155E48",
          soft: "#2FA079",
          tint: "#E6F2EC",
        },
        // Light / neutral surfaces + text
        light: "#F3F7FC",
        line: "#E3EAF2",
        "line-dark": "#22374F",
        ink: "#0B1B2B",
        slate: "#475569",
        muted: "#7C8B9E",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      maxWidth: {
        content: "1240px",
      },
      letterSpacing: {
        eyebrow: "0.16em",
        tight2: "-0.02em",
        tight3: "-0.035em",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
      boxShadow: {
        card: "0 1px 2px rgba(11,27,43,0.04), 0 12px 32px -12px rgba(11,27,43,0.14)",
        "card-hover":
          "0 2px 4px rgba(11,27,43,0.06), 0 24px 48px -16px rgba(11,27,43,0.22)",
      },
      fontSize: {
        "7xl": ["4.5rem", { lineHeight: "1.02", letterSpacing: "-0.035em" }],
        "8xl": ["6rem", { lineHeight: "0.98", letterSpacing: "-0.04em" }],
      },
    },
  },
  plugins: [],
};

export default config;
