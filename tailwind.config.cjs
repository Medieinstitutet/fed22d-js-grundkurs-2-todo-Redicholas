/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    fontFamily: {
      fira: ['Fira Mono', 'monospace'],
      josefin: ['Josefin Slab', 'serif'],
    },
    extend: {},
  },
  plugins: [],
};
