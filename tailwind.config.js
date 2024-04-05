/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/preline/dist/*.js",
  ],
  theme: {
    extend: {
      animation: {
        'tilt': 'tilt 12s infinite linear',
        'spin-zoom': 'spin-zoom 20s infinite linear',
        'features': 'features 10s infinite linear',
      },
      keyframes: {
        'tilt': {
          '0%, 50%, 100%': {
            transform: 'rotate(3deg)',
          },
          '25%': {
            transform: 'rotate(2deg)',
          },
          '75%': {
            transform: 'rotate(-3deg)',
          },
        },
        'spin-zoom': {
          '0%': {
            transform: 'rotate(0deg) scale(1)',
          },
          '25%': {
            transform: 'rotate(90deg) scale(1.1)',
          },
          '50%': {
            transform: 'rotate(180deg) scale(1.2)',
          },
          '75%': {
            transform: 'rotate(270deg) scale(1.1)',
          },
          '100%': {
            transform: 'rotate(360deg) scale(1)',
          },
        },
        'features': {
          '0%': {
            transform: 'rotate(0deg) scale(1)',
          },
          '25%': {
            transform: 'rotate(5deg) scale(1.1)',
          },
          '50%': {
            transform: 'rotate(10deg) scale(1.2)',
          },
          '75%': {
            transform: 'rotate(5deg) scale(1.1)',
          },
          '100%': {
            transform: 'rotate(0deg) scale(1)',
          },
        },
      },
    },
    fontFamily: {
      body: ["Poppins"],
    },
  },
  plugins: [require("@tailwindcss/forms"), require("preline/plugin")],
};
