/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: '#2C4C3B',
        sand: '#F5F5DC',
      }
    },
  },
  plugins: [],
}