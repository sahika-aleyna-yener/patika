/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#FF8C42',
        'primary-light': '#FFAD75',
        'primary-dark': '#E07030',
        bg: '#FFF9F0',
        card: '#FFFFFF',
        border: '#FFD9A0',
        text: '#3D2B1F',
        'text-light': '#7A5C4A',
        success: '#4CAF50',
        warning: '#FF9800',
        danger: '#F44336',
        info: '#2196F3',
        premium: '#9C27B0',
      },
      fontFamily: {
        nunito: ['Nunito', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

