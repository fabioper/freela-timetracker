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
        card: "#15151c",
        "card-border": "#343446",
        "card-hover": "var(--primary-color)",
      },
      gridTemplateColumns: {
        auto: "repeat(auto-fit, minmax(25rem, 1fr))",
      },
    },
  },
  plugins: [],
}
