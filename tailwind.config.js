/** @type {import('tailwindcss').Config} */
export default {
  //En que archivos podemos encontrar codigo de tailwind
  content: [
    "./index.html",
    "./src/**/*.{vue,js,jsx,ts,tsx}" //Para que entre a src y busque en todas las carpetas ext 
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

