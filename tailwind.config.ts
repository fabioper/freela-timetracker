/** @type {import('tailwindcss').Config} */
module.exports = {
  /* darkMode: ["class"], */
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
    },
    extend: {
      fontFamily: {
        sans: "var(--font-inter)",
      },
      colors: {
        "surface-border": "var(--surface-border)",
      },
    },
  },
  plugins: [],
}
