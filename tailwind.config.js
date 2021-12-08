const defaultTheme = require('tailwindcss/defaultTheme');
const colors = require('tailwindcss/colors')

module.exports = {
  mode: 'jit',
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx,svg}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      primary: 'var(--color-primary)',
      secondary: 'var(--color-secondary)',
      
      transparent: 'transparent',
      current: 'currentColor',
      black: '#212427',
      white: colors.white,
      gray: colors.trueGray,
      red: colors.red,
      green: colors.green,
      muted: '#A3A3A3'
    },
    extend: {
      
      fontFamily: {
        'sans': ['"M PLUS 2"','Inter', ...defaultTheme.fontFamily.sans],
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
