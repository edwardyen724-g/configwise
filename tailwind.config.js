const path = require('path');

module.exports = {
  content: [
    path.join(__dirname, 'src/app/**/*.{js,ts,jsx,tsx}'),
    path.join(__dirname, 'src/components/**/*.{js,ts,jsx,tsx}'),
    path.join(__dirname, 'src/pages/**/*.{js,ts,jsx,tsx}'),
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3B82F6', // Example primary color
        secondary: '#F97316', // Example secondary color
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};