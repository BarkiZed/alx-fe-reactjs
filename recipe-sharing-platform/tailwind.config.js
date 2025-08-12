/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './public/index.html',      // Add this line
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
