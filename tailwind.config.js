/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: '#003366',
        parchment: '#F5E6D3',
        seafoam: '#7BAEA3',
      },
      fontFamily: {
        serif: ['Crimson Text', 'serif'],
        sans: ['Open Sans', 'sans-serif'],
      },
      keyframes: {
        wave: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        }
      },
      animation: {
        wave: 'wave 3s ease-in-out infinite',
      }
    },
  },
  plugins: [],
};