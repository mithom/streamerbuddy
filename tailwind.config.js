const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  // Custom config here (example: https://github.com/tailwindcss/tailwindcss/blob/next/stubs/defaultConfig.stub.js)
  theme: {
    extend: {
      colors: {
        ...defaultTheme.colors
      },
      inset: {
        '6': '6rem'
      },
      minHeight: {
        '64': '16rem'
      }
    },
    variants: 'all'
  }
}
