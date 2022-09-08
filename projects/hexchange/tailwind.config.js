module.exports = {
  content: ["./*.html"],
  theme: {
    extend: {},
    screens: {
      'sm': '425px',
      // => @media (min-width: 576px) { ... }

      'md': '768px',
      // => @media (min-width: 960px) { ... }

      'lg': '1440px',
      // => @media (min-width: 1440px) { ... }
    },

    fontFamily: {
      'body': ['"Consolas"'],
    },
  },
  plugins: [],
}