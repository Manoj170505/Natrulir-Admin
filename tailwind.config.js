/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f2f7f3',
          100: '#e1ede3',
          200: '#c5ddcb',
          300: '#9bc4a5',
          400: '#6ba57a',
          500: '#488858',
          600: '#366d44',
          700: '#2b5737',
          800: '#24452e',
          900: '#1e3a27',
          950: '#0e2015',
        },
        earth: {
          50: '#faf9f5',
          100: '#f4f1e8',
          200: '#e8e2cf',
          300: '#d7cbb0',
          400: '#c2b08d',
          500: '#a8946e',
          600: '#8c7754',
          700: '#6e5c41',
          800: '#584935',
          900: '#45392b',
        },
        terracotta: {
          500: '#c86446',
          600: '#ad5136',
          700: '#8e3f28',
        },
        sage: '#8FA892',
        sprout: '#A3D977',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
