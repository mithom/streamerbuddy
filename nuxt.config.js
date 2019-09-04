const webpack = require('webpack')

module.exports = {
  mode: 'spa',
  head: { title: 'StreamerBuddy' }, // Headers of the page
  loading: true, // Disable default loading bar
  modules: [
    'portal-vue/nuxt',
    '@nuxtjs/date-fns',
  ],
  buildModules: [
    '@nuxtjs/tailwindcss'
  ],
  tailwindcss: {
    configPath: '~/tailwind.config.js',
    cssPath: '~/assets/css/tailwind.css'
  },
  purgeCSS:{
    whitelist: ['__nuxt', '__layout'],
    paths:[
      '../streamerbuddy-store/src/**/*.vue',
      '../streamerbuddy-store/src/**/*.js',
      '../streamerbuddy-store/src/**/*.css'
    ]
  },
  server:{
    host: 'localhost',
    port: 41263
  },
  env: {
    baseUrl: 'http://localhost:41263'
  },
  build: {
    babel:{
      plugins:["@babel/plugin-proposal-optional-chaining"]
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
    '~/plugins/vue-js-plugins',
    '~/plugins/common-filters'
  ],
  dev: process.env.NODE_ENV === 'DEV'
}
