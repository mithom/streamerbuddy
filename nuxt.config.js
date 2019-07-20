const webpack = require('webpack')

module.exports = {
  mode: 'spa',
  head: { title: 'StreamerBuddy' }, // Headers of the page
  loading: true, // Disable default loading bar
  modules: [
    'portal-vue/nuxt'
  ],
  devModules: [
    '@nuxtjs/tailwindcss'
  ],
  server:{
    host: '127.0.0.1',
    port: 41263
  },
  build: {
    postcss: {
      plugins: {
        'tailwindcss': 'tailwind.config.js',
      }
    },
    webpack:{
      module:{
        noParse: [
          /\/app\/native-require.js$/
        ]
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
    '~/plugins/component-plugin',
    '~/plugins/vue-js-modal',
    '~plugins/common-filters'
  ],
  dev: process.env.NODE_ENV === 'DEV'
}
