/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        melagllikItalic: ["MyCustomFont", "sans-serif"],
        melagllik: ["MyCustomFont2", "sans-serif"],
        newRomantics: ["MyCustomFont3", "sans-serif"],
        planetKosmos: ["MyCustomFont4", "sans-serif"],
        atherosser: ["MyCustomFont5", "sans-serif"],
        magazineLetter: ["MyCustomFont6", "sans-serif"],
      },
    },
  },
  plugins: [],
};
