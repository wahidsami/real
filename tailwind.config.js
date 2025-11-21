/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/react-app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#521714',
        secondary: '#D3916A',
        background: '#FFF7F4',
      },
      fontFamily: {
        arabic: ['Cairo', 'sans-serif'],
        english: ['Poppins', 'Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
