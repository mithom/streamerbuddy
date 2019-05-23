const { join } = require('path')
const { i18n } = require('./i18n')

module.exports = {
  mode: 'spa',
  head: { title: 'StreamerBuddy' }, // Headers of the page
  loading: true, // Disable default loading bar
  modules: [
    'nuxt-purgecss',
    ['nuxt-i18n', i18n]
  ],
  purgeCSS: {
    mode: 'postcss'
  },
  build: {
    postcss: {
      plugins: {
        tailwindcss: join(__dirname, 'tailwind.config.js'),
        'postcss-nested': {}
      }
    },
    extend(config, { isDev, isClient }) {
      if (isDev && isClient) {
        // Run ESLint on save
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
      // Extend only webpack config for client-bundle
      if (isClient) {
        config.target = 'electron-renderer'
      }
    }
  },
  router: {
    middleware: 'titlebar'
  },
  dev: process.env.NODE_ENV === 'DEV'
}
