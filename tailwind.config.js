/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark_blue: '#2E4052',
          light_blue: '#A5C9CA',
          cream: '#F0E5D8',
          tan: '#D9BF77',
          orange: '#C84B31',
        },
      },
    },
  },
  plugins: [],
}

