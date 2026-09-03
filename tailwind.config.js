/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#22de7e',
          glow: 'rgba(34, 222, 126, 0.3)',
          dim: 'rgba(34, 222, 126, 0.12)',
        },
        surface: {
          0: '#07090b',
          1: '#0b0e11',
          2: '#0f1316',
          3: '#161b1f',
          4: '#1c2124',
        }
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        display: ['Space Grotesk', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      }
    },
  },
  plugins: [],
}
