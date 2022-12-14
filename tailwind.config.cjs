/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    fontFamily: {
      rubik: ['Rubik', 'sans-serif'],
      josefin: ['Josefin Slab', 'sans-serif'],
    },
    extend: {},
  },
  plugins: [],
};
