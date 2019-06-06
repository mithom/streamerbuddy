module.exports = {
  mode: 'spa',
  head: {title: 'StreamerBuddy'}, // Headers of the page
  loading: true, // Disable default loading bar
  build: {
    extend(config, {isDev, isClient}) {
      //add vue compiler for on the fly compiling
      config.resolve.alias["vue$"] = "vue/dist/vue.esm.js";

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
  router:{
    middleware: 'titlebar'
  },
  plugins: ['~/plugins/runtime-template-plugin'],
  dev: process.env.NODE_ENV === 'DEV',
  css: [
    '@/assets/css/global.css'
  ]
}
