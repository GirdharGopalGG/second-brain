/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        gray:{
          100:'#fefffe',  //sidebar
          200:'#41474b',
          300:'#f8fbfd',  //main f8fbfd

        },
        blue:{
          300:'#5146e5',
          200:'#3c35b2',
          100:'#dfe9fe',
          150:'#184fde'     //login text

        }
      }
    },
  },
  plugins: [],
}

