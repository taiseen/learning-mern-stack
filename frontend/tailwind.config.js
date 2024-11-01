/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      container: {
        center: true,
      },
      boxShadow: {
        allSide: '0 0 15px 5px rgba(200, 200, 200, 0.4)'
      }
    },
  },
  plugins: [],
}

