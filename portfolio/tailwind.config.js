/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Clash Display"', 'sans-serif'],
        body: ['"Cabinet Grotesk"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        glass: 'rgba(255,255,255,0.07)',
        'glass-border': 'rgba(255,255,255,0.15)',
      },
      backdropBlur: {
        glass: '20px',
      },
    },
  },
  plugins: [],
}
