/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      spacing: {
        128: "32rem",
        192: "48rem",
      },
      fontFamily: {
        sans: ["var(--sans-font)"],
        serif: ["var(--serif-font)"],
      },
    },
  },
  plugins: [],
};
