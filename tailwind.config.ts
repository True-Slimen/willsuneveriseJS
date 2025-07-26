/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts}'],
  theme: {
    extend: {
      fontFamily: {
        custom: ['BrokenDetroit', 'sans-serif'], // alias "font-custom"
        icons: ['Icons']
      }
    }
  }
}