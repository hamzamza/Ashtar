/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#3a3a3a',
        'secondary': 'white',
      },
      minHeight:{
        'screen-200': "calc(100vh - 200px)",
      },
      height:{
        'screen-200': "calc(100vh - 200px)",
      },
     
    },
    
  },
  plugins: [],
}
