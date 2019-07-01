const webpack = require('webpack')

module.exports = {
  mode: 'spa',
  head: { title: 'StreamerBuddy' }, // Headers of the page
  loading: true, // Disable default loading bar
  modules: [],
  devModules: [
    '@nuxtjs/tailwindcss'
  ],
  build: {
    postcss: {
      plugins: {
        'tailwindcss': 'tailwind.config.js',
        'postcss-nested':{}
      }
    },
    webpack:{
      module:{
        noParse: /\/app\/native-require.js$/
      }
    },
    extend(config, {isDev, isClient}) {
      if (isDev && isClient) {
        // Run ESLint on save
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/,
          options:{
            fix: true
          }
        })
      }
      // Extend only webpack config for client-bundle
      if (isClient) {
        config.target = 'electron-renderer'
      }
    }
  },
  vue: {
    config: {
      devtools: true
    }
  },
  router: {
    middleware: ['titlebar']
  },
  plugins:[
    '~/plugins/component-plugin'
  ],
  dev: process.env.NODE_ENV === 'DEV'
}
