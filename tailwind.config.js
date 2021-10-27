const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  mode: 'jit',
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx,svg}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Inter', ...defaultTheme.fontFamily.sans],
      },
      animation: {
        'float': 'wiggle 5s linear infinite',
      },
      keyframes: {
        wiggle: {
          '50%': { transform: 'translateX(0) translateY(0)' },
          '0%, 100%': { transform: 'translateX(10px) translateY(-20px)' },
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/line-clamp'),
  ],
};
