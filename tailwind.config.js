module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Roboto', 'sans-serif'],
      },
      colors: {
        'black-me': '#1c1a19',
        'yellow-me': '#fdbf5a',
        'gray-me': '#828282',
      },
      backgroundImage: {
        'map': "url('./assets/images/bg-map.jpg')",
      },
      boxShadow: {
        'me': '0px 3px 20px rgba(0, 0, 0, 0.2)',
        'me-2': '0px 10px 20px -5px rgba(0, 0, 0, 0.1)',
        'me-3': '0px 5px 20px 2px rgba(0, 0, 0, 0.1)',
      }
    },
  },
  plugins: [],
}

