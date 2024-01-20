/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}', './node_modules/tw-elements-react/dist/js/**/*.js'],
  theme: {
    extend: {},
    backgroundPosition: {
      bottom: 'bottom',
      center: 'center',
      'x-25': '25% 0',
      'y-50': '0 50%',
      left: 'left',
      'left-bottom': 'left bottom',
      'left-top': 'left top',
      right: 'right',
      'right-bottom': 'right bottom',
      'right-top': 'right top',
      top: 'top'
    }
  },
  darkMode: 'class',
  plugins: [require('tw-elements-react/dist/plugin.cjs')]
};
