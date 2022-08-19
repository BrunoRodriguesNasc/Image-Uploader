/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    fontFamily: {
      'Poppins': ['Poppins', 'sans-serif'],
      'Noto': ['Noto Sans', 'sans-serif'],
    },
    extend: {
      backgroundImage: {
        'img': "url('./assets/image.svg')",
      },
      height: {
        '128': '30rem ',
      },
      width: {
        '98': '25rem',
      },
      boxShadow: {
        'custom': '0px 4px 12px rgba(0, 0, 0, 0.1)',
      },
      colors: {
        gray1: '#F6F8FB',
        gray2: '#4F4F4F',
        gray3: '#828282',
        gray4: '#BDBDBD',
        blueB: 'rgba(151, 190, 244, 1)'
      },
      keyframes: {
        lineAnim: {
          '0%': {
            left: '-40%'
          },
          '50%': {
            left: '20%',
            width: '80%'
          },
          '100%': {
            left: '100%',
            width: '100%'
          }
        }
      },
      animation: {
        lineAnim: 'lineAnim 1.5s linear infinite',
      },
    },
  },
  plugins: [],
}
