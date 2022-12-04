/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    extend: {
      colors: {
        brightRed: 'hsl(12, 88%, 59%)',
        bakGrund: '#393d3b',
        // adda egna här
      },
      fontFamily: {
        glory: "'Give You Glory', cursive",
      },
    },
  },
  plugins: [],
};
