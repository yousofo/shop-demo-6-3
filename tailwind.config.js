/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        yDark:"#24282A",
        yPaige:"#F6F0EA",
        yCyan:"#009dd9",
      },
      screens:{
        xs:"375px"
      }
    },
  },
  plugins: [],
}

