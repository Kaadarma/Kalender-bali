/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'stitch-blue': '#eef5fc',
        'galungan-red': '#ff7675',
        'kuningan-yellow': '#ffeaa7',
        'purnama-gold': '#fdcb6e',
      }
    },
  },
  plugins: [],
}