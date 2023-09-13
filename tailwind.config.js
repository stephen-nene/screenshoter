/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {

      colors:{
        "dark-purple":"#081A51",
        "light-white":"rgba(255,255,255,0.17",
        "red":"#E74438",
        "green":"#6ECE9D",
        "light-white":"#303A67",
        "gold":"#F7F744"
      },
    },
    
  },
  plugins: [],
}
