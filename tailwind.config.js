/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#1A237E",
          light: "#343d96",
        },
        secondary: {
          DEFAULT: "#F8BBD0",
          light: "#fec1d6",
        },
        accent: "#805062",
        background: "#f9f9f9",
      },
      fontFamily: {
        sans: ['Noto Sans KR', 'sans-serif'],
        display: ['Plus Jakarta Sans', 'sans-serif'],
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      }
    },
  },
  plugins: [],
}
