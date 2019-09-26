const webpack = require('webpack')

module.exports = {
  mode: 'spa',
  head: { title: 'StreamerBuddy' }, // Headers of the page
  loading: true, // Disable default loading bar
  modules: [
    'portal-vue/nuxt',
    '@nuxtjs/date-fns',
    'nuxt-fontawesome',
    'nuxt-i18n',
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
  fontawesome:{
    component: 'fa',
    imports: [
      {
        set: '@fortawesome/free-solid-svg-icons',
        icons: ['faSignOutAlt', 'faMoon', 'faGlobe', 'faWrench', 'faPlug', 'faMap', 'faAddressCard', 'faHashtag']
      },
    ]
  },
  i18n:{
    locales: [
      {
        code: 'en',
        iso: 'en-US',
        name: 'English',
        file: 'en.js'
      },
      {
        code: 'nl',
        iso: 'nl-BE',
        name: 'Nederlands',
        file: 'nl.js'
      },
      {
        code: 'de',
        iso: 'de-DE',
        name: 'Deutsch',
        file: 'de.js'
      }
    ],
    defaultLocale: 'en',
    VueI18n:{
      fallbackLocale: 'en',
    },
    lazy: true,
    langDir: 'i18n/',
    detectBrowserLanguage: false,
    vuex: {
      syncLocale: true,
    }
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
    middleware: 'translate'
  },
  plugins:[
    '~/plugins/component-plugin',
    '~/plugins/vue-js-plugins',
    '~/plugins/common-filters'
  ],
  dev: process.env.NODE_ENV === 'DEV'
}
