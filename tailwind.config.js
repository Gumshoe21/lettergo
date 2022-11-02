/** @type {import('tailwindcss').Config} */
const defaultTheme = 'tailwindcss/defaultTheme';
const colors = require('tailwindcss/colors');

const brandColor = colors.indigo;

module.exports = {
  content: [
    './src//pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    container: {
      center: true
    },
    extend: {
      colors: ({ colors }) => ({
        primary: brandColor
      }),
      ringColor: {
        DEFAULT: brandColor['500']
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        letterFadeIn: {
          '0%': { bg: 'none' },
          '100%': { bg: 'green.600' }
        }
      },
      animation: {
        fadeIn: 'fadeIn 1s ease-in-out'
      }
    }
  }
};
