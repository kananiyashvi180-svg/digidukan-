/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#111827",
        secondary: "#3b82f6",
        accent: "#fbbf24",
      },
    },
  },
  plugins: [],
}
