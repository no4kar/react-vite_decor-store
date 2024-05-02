/** @type {import('tailwindcss').Config} */
export default {
  mode: 'jit',
  content: ['./src/**/*.{html,js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        manrope: {
          regular: ['"Manrope Regular"', 'Helvetica Neue', 'Arial', 'sans-serif'],
          light: ['"Manrope Light"', 'Helvetica Neue', 'Arial', 'sans-serif'],
          medium: ['"Manrope Medium"', 'Helvetica Neue', 'Arial', 'sans-serif'],
        },
      },
      colors: {
        'black': '#202020',
        'gray': {
          100: '#fffbfb',
          200: '#fcfcfc',
          300: '#f1f1f1',
          400: '#d7d7d7',
          500: '#bdbdbd',
          600: '#898989',
        },
        'accent': '#007fe1',
        'system': {
          'success': '#00d36e',
          'warn': '#fc0',
          'error': '#551d1d',
        },
      },
    },
    screens: {
      'sm': '834px',
      'md': '1219px',
    },
  },
  plugins: [],
}
