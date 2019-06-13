module.exports = {
  mode: 'spa',
  head: { title: 'StreamerBuddy' }, // Headers of the page
  loading: true, // Disable default loading bar
  modules: [
    ['nuxt-i18n', {}]
  ],
  devModules: [
    '@nuxtjs/tailwindcss'
  ],
  build: {
    postcss: {
      plugins: {
        tailwindcss: 'tailwind.config.js',
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
