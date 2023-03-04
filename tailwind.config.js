/** @type {import('tailwindcss').Config} */
module.exports = {
  safelist: [
    {
      pattern:
        /border-(red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose|slate)-(300|400|500)/,
      variants: ["hover"],
    },
  ],
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
