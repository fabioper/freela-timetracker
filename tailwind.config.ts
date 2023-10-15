/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{ts,tsx}",
    "./shared/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1rem",
    },
    extend: {
      fontFamily: {
        sans: "var(--font-inter)",
      },
      colors: {
        primary: "var(--primary-color",
        "surface-border": "var(--surface-border)",
        card: "#101010",
        "card-border": "#343446",
        "card-hover": "var(--primary-color)",
      },
      gridTemplateColumns: {
        auto: "repeat(auto-fill, minmax(25rem, 1fr))",
      },
    },
  },
  plugins: [],
}
