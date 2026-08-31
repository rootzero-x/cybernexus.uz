/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Legacy names kept so existing pages keep rendering while they are
        // migrated onto the new scale below.
        "neon-green": "#00ff9d",
        "neon-blue": "#00e5ff",

        // Depth scale — the "space" the 3D layers sit in.
        void: {
          950: "#000208",
          900: "#03060f",
          850: "#060b18",
          800: "#0a1120",
          700: "#111a2e",
          600: "#1a2540",
        },

        // Primary accent (signal green) and secondary (cyan).
        signal: {
          50: "#e6fff5",
          100: "#b3ffe1",
          200: "#80ffcd",
          300: "#4dffb9",
          400: "#1affa5",
          500: "#00ff9d",
          600: "#00cc7e",
          700: "#00995e",
          800: "#00663f",
          900: "#00331f",
        },
        cyber: {
          50: "#e6fcff",
          100: "#b3f5ff",
          200: "#80eeff",
          300: "#4de7ff",
          400: "#1ae0ff",
          500: "#00e5ff",
          600: "#00b7cc",
          700: "#008999",
          800: "#005c66",
          900: "#002e33",
        },
        // Warning / danger, tuned to sit inside the neon palette.
        plasma: "#ff2d95",
        ember: "#ff6b35",
      },

      fontFamily: {
        mono: ["'JetBrains Mono'", "'Fira Code'", "ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
        display: ["'Space Grotesk'", "'Inter'", "ui-sans-serif", "system-ui", "sans-serif"],
      },

      boxShadow: {
        neon: "0 0 10px rgba(0, 255, 157, 0.5)",
        "neon-blue": "0 0 10px rgba(0, 229, 255, 0.5)",
        "glow-sm": "0 0 12px -2px rgba(0,255,157,.35)",
        glow: "0 0 28px -4px rgba(0,255,157,.45), 0 0 64px -18px rgba(0,229,255,.35)",
        "glow-lg": "0 0 48px -6px rgba(0,255,157,.5), 0 0 120px -24px rgba(0,229,255,.45)",
        "glow-cyan": "0 0 28px -4px rgba(0,229,255,.5), 0 0 72px -20px rgba(0,229,255,.35)",
        "glow-plasma": "0 0 28px -4px rgba(255,45,149,.5)",
        // Raised glass panel: a real drop shadow plus an inner top highlight.
        panel: "0 24px 60px -20px rgba(0,0,0,.9), inset 0 1px 0 0 rgba(255,255,255,.06)",
        "panel-lg": "0 40px 100px -28px rgba(0,0,0,.95), inset 0 1px 0 0 rgba(255,255,255,.08)",
      },

      backgroundImage: {
        "grid-fade":
          "linear-gradient(rgba(0,255,157,.055) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,157,.055) 1px, transparent 1px)",
        "holo":
          "linear-gradient(135deg, rgba(0,255,157,.14) 0%, rgba(0,229,255,.06) 40%, transparent 70%)",
        "signal-sweep":
          "linear-gradient(90deg, transparent, rgba(0,255,157,.7), transparent)",
      },

      backgroundSize: {
        grid: "56px 56px",
        "grid-sm": "28px 28px",
      },

      animation: {
        scanline: "scanline 6s linear infinite",
        "float-slow": "float 7s ease-in-out infinite",
        "float-mid": "float 5s ease-in-out infinite",
        sweep: "sweep 2.6s linear infinite",
        "pulse-glow": "pulse-glow 2.4s ease-in-out infinite",
        "fade-up": "fade-up .7s cubic-bezier(.16,1,.3,1) both",
        "spin-slow": "spin 18s linear infinite",
        flicker: "flicker 4s steps(1) infinite",
      },

      keyframes: {
        scanline: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" },
        },
        float: {
          "0%,100%": { transform: "translate3d(0,0,0)" },
          "50%": { transform: "translate3d(0,-12px,0)" },
        },
        sweep: {
          "0%": { transform: "translateX(-120%)" },
          "100%": { transform: "translateX(120%)" },
        },
        "pulse-glow": {
          "0%,100%": { opacity: ".55", filter: "brightness(1)" },
          "50%": { opacity: "1", filter: "brightness(1.35)" },
        },
        "fade-up": {
          from: { opacity: "0", transform: "translate3d(0,18px,0)" },
          to: { opacity: "1", transform: "translate3d(0,0,0)" },
        },
        flicker: {
          "0%,96%,100%": { opacity: "1" },
          "97%": { opacity: ".72" },
          "98%": { opacity: "1" },
          "99%": { opacity: ".85" },
        },
      },

      transitionTimingFunction: {
        spring: "cubic-bezier(.16,1,.3,1)",
      },
    },
  },
  plugins: [],
};
